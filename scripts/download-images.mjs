import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const watchesData = JSON.parse(fs.readFileSync('/tmp/watches_meta.json', 'utf-8'));
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images');

fs.mkdirSync(PUBLIC_DIR, { recursive: true });

function curlDownload(url, dest) {
  try {
    execSync(`curl -sL --connect-timeout 10 --max-time 30 -o "${dest}" "${url}"`, { stdio: 'pipe' });
    const stat = fs.statSync(dest);
    if (stat.size < 500) {
      fs.unlinkSync(dest);
      throw new Error(`File too small (${stat.size}b)`);
    }
    return stat.size;
  } catch (e) {
    if (fs.existsSync(dest)) fs.unlinkSync(dest);
    throw e;
  }
}

function curlFetch(url) {
  return execSync(`curl -sL --connect-timeout 10 --max-time 20 "${url}"`, { encoding: 'utf-8', maxBuffer: 5 * 1024 * 1024 });
}

// ─── Brand-specific image URL resolvers ───

function getHamiltonImageUrl(watch) {
  const ref = watch.reference.toLowerCase();
  return `https://www.hamiltonwatch.com/media/catalog/product/cache/bc54b7224dad07746d99daf20f84bdcc/${ref[0]}/${ref[1]}/${ref}.png`;
}

function getTissotImageUrl(watch) {
  const html = curlFetch(watch.referenceUrl);
  const match = html.match(/demandware\.static[^"']*_shadow\.png/);
  if (match) return 'https://www.tissotwatches.com/dw/image/v2/BKKD_PRD/on/' + match[0];
  const fallback = html.match(/demandware\.static[^"']*product-pictures[^"']*\.png/);
  if (fallback) return 'https://www.tissotwatches.com/dw/image/v2/BKKD_PRD/on/' + fallback[0];
  throw new Error('No image in page');
}

function getSeikoImageUrl(watch) {
  const html = curlFetch(watch.referenceUrl);
  const match = html.match(/property="og:image"\s*content="([^"]+)"/);
  if (match) return match[1];
  const fallback = html.match(/https:\/\/www\.seikowatches\.com[^"]*Product--Image[^"]*\.png/);
  if (fallback) return fallback[0];
  throw new Error('No image in page');
}

function getOrientImageUrl(watch) {
  const ref = watch.reference;
  let model, basePath;
  if (ref.startsWith('RE-')) {
    model = ref.slice(0, -3);
    basePath = '/en/orientstar/search/product_en_file/file/';
  } else if (ref.startsWith('RA-')) {
    model = ref.slice(0, -3);
    basePath = '/en/orient/search/product_en_file/file/';
  } else if (ref.startsWith('F')) {
    model = ref.slice(1, -1);
    basePath = '/en/orient/search/product_en_file/file/';
  } else {
    model = ref;
    basePath = '/en/orient/search/product_en_file/file/';
  }
  return `https://orient-watch.com${basePath}${model}_main.webp`;
}

function getCitizenImageUrl(watch) {
  const caUrl = watch.referenceUrl.replace('/us/en/', '/ca/en/');
  const html = curlFetch(caUrl);
  const match = html.match(/citizenwatch\.widen\.net\/content\/[a-z0-9]+\/webp\/[^"?&]+/);
  if (match) {
    return 'https://' + match[0] + '?w=800&h=800&quality=80';
  }
  throw new Error('No image in page');
}

const resolvers = {
  Hamilton: getHamiltonImageUrl,
  Tissot: getTissotImageUrl,
  Seiko: getSeikoImageUrl,
  Orient: getOrientImageUrl,
  Citizen: getCitizenImageUrl,
};

function processWatch(watch) {
  const brand = watch.brand.toLowerCase();
  const ref = watch.reference;
  const filename = `${brand}-${ref}`;

  // Check cached
  const existing = ['.png', '.webp', '.jpg'].find(ext =>
    fs.existsSync(path.join(PUBLIC_DIR, filename + ext))
  );
  if (existing) return { watch, file: filename + existing, status: 'cached' };

  try {
    const imageUrl = resolvers[watch.brand](watch);

    let ext = '.png';
    if (imageUrl.includes('.webp')) ext = '.webp';
    else if (imageUrl.includes('.jpg') || imageUrl.includes('.jpeg')) ext = '.jpg';

    const destFile = filename + ext;
    const destPath = path.join(PUBLIC_DIR, destFile);

    const size = curlDownload(imageUrl, destPath);
    return { watch, file: destFile, status: 'ok', size };
  } catch (err) {
    return { watch, file: null, status: 'error', error: err.message || String(err) };
  }
}

function main() {
  console.log(`Downloading images for ${watchesData.length} watches to ${PUBLIC_DIR}\n`);

  const brands = ['Hamilton', 'Tissot', 'Seiko', 'Orient', 'Citizen'];
  const allResults = [];

  for (const brand of brands) {
    const watches = watchesData.filter(w => w.brand === brand);
    console.log(`\n=== ${brand} (${watches.length}) ===`);
    let ok = 0, fail = 0;

    for (let i = 0; i < watches.length; i++) {
      const r = processWatch(watches[i]);
      allResults.push(r);

      const icon = r.status === 'ok' ? '✓' : r.status === 'cached' ? '⚡' : '✗';
      const info = r.status === 'error' ? r.error : r.size ? `${Math.round(r.size/1024)}KB` : 'cached';
      console.log(`  ${icon} [${i+1}/${watches.length}] ${r.watch.reference} - ${info}`);

      if (r.status === 'error') fail++; else ok++;
    }
    console.log(`  → ${brand}: ${ok} ok, ${fail} failed`);
  }

  // Summary
  const success = allResults.filter(r => r.status !== 'error');
  const failed = allResults.filter(r => r.status === 'error');
  console.log(`\n=== SUMMARY: ${success.length}/${allResults.length} ok, ${failed.length} failed ===`);
  if (failed.length > 0) {
    console.log('\nFailed:');
    failed.forEach(f => console.log(`  ${f.watch.brand} ${f.watch.reference}: ${f.error}`));
  }

  // Write mapping
  const mapping = {};
  allResults.forEach(r => {
    if (r.file) mapping[r.watch.id] = `/images/${r.file}`;
  });
  fs.writeFileSync('/tmp/image_mapping.json', JSON.stringify(mapping, null, 2));
  console.log('\nMapping → /tmp/image_mapping.json');
}

main();
