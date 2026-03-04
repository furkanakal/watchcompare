import Link from "next/link";
import { BRANDS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight">
                WatchCompare
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The unified mechanical watch comparison platform. Normalized specs across every brand.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Browse
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/watches" className="text-sm text-gray-300 hover:text-white transition-colors">
                  All Watches
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Compare Tool
                </Link>
              </li>
              <li>
                <Link href="/watches?movement=automatic" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Automatic
                </Link>
              </li>
              <li>
                <Link href="/watches?movement=manual" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Manual Wind
                </Link>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Brands
            </h4>
            <ul className="space-y-2.5">
              {Object.values(BRANDS).map((brand) => (
                <li key={brand.slug}>
                  <Link href={`/brands/${brand.slug}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {brand.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/brands" className="text-sm text-gray-300 hover:text-white transition-colors">
                  View All Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Features
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/watches" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Advanced Filters
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Side-by-Side Compare
                </Link>
              </li>
              <li>
                <span className="text-sm text-gray-500">Price Tracking (Soon)</span>
              </li>
              <li>
                <span className="text-sm text-gray-500">User Reviews (Soon)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            WatchCompare is an independent platform. Not affiliated with any watch brand.
          </p>
          <p className="text-xs text-gray-500">
            Prices shown are MSRP and may vary by region.
          </p>
        </div>
      </div>
    </footer>
  );
}
