import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import { BRANDS } from "@/lib/constants";
import { watches } from "@/data/watches";
import { formatPrice } from "@/lib/watches";

export function generateStaticParams() {
  return Object.values(BRANDS).map((b) => ({ slug: b.slug }));
}

export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = Object.values(BRANDS).find((b) => b.slug === slug);
  if (!brand) notFound();

  const brandWatches = watches.filter((w) => w.brand === brand.name);
  const collections = [...new Set(brandWatches.map((w) => w.collection))];
  const prices = brandWatches.filter((w) => w.price != null).map((w) => w.price!);
  const minPrice = prices.length > 0 ? Math.min(...prices) : null;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : null;
  const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : null;

  return (
    <div className="min-h-screen bg-surface-sunken flex flex-col">
      <Navbar />
      <div className="flex-1">
        {/* Hero */}
        <div className="bg-white border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <nav className="flex items-center gap-1.5 text-sm text-text-tertiary mb-6">
              <Link href="/brands" className="hover:text-brand-600 transition-colors">Brands</Link>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              <span className="text-text-primary font-medium">{brand.name}</span>
            </nav>

            <div className="sm:flex sm:items-start sm:justify-between gap-6">
              <div>
                {brand.logo && (
                  <Image src={brand.logo} alt={`${brand.name} logo`} width={180} height={50} className="object-contain max-h-10 w-auto mb-3" />
                )}
                <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">{brand.name}</h1>
                <p className="text-text-secondary mt-1">
                  {brand.country} &middot; Founded {brand.founded} &middot; {brand.parent}
                </p>
                <p className="text-text-secondary mt-4 max-w-2xl leading-relaxed">
                  {brand.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <StatCard label="Models" value={brandWatches.length.toString()} />
              <StatCard label="Collections" value={collections.length.toString()} />
              <StatCard label="Price Range" value={minPrice != null && maxPrice != null ? `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}` : "N/A"} />
              <StatCard label="Avg. Price" value={avgPrice != null ? formatPrice(avgPrice) : "N/A"} />
            </div>
          </div>
        </div>

        {/* Collections */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {collections.map((collection) => {
            const collectionWatches = brandWatches.filter((w) => w.collection === collection);
            return (
              <div key={collection} className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-text-primary">{collection}</h2>
                  <span className="text-sm text-text-tertiary">{collectionWatches.length} models</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {collectionWatches.map((w) => (
                    <WatchCard key={w.id} watch={w} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-sunken rounded-xl p-4">
      <p className="text-xs text-text-tertiary font-medium">{label}</p>
      <p className="text-lg font-bold text-text-primary mt-0.5">{value}</p>
    </div>
  );
}
