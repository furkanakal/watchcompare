import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BRANDS } from "@/lib/constants";
import { watches } from "@/data/watches";
import { formatPrice } from "@/lib/watches";

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-surface-sunken flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">
              Watch Brands
            </h1>
            <p className="text-text-secondary mt-2">
              Explore our curated collection of respected mechanical watch brands.
            </p>
          </div>

          <div className="space-y-4">
            {Object.values(BRANDS).map((brand) => {
              const brandWatches = watches.filter((w) => w.brand === brand.name);
              const prices = brandWatches.filter((w) => w.price != null).map((w) => w.price!);
              const minPrice = prices.length > 0 ? Math.min(...prices) : null;
              const maxPrice = prices.length > 0 ? Math.max(...prices) : null;
              const collections = [...new Set(brandWatches.map((w) => w.collection))];

              return (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="group block bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all"
                >
                  <div className="sm:flex">
                    {/* Logo area */}
                    <div className="sm:w-48 bg-surface-sunken flex items-center justify-center p-8 sm:p-10 group-hover:bg-brand-50 transition-colors">
                      <div className="text-center">
                        <span className="text-3xl font-bold text-text-primary group-hover:text-brand-700 transition-colors">
                          {brand.name}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-bold text-text-primary group-hover:text-brand-700 transition-colors">
                            {brand.name}
                          </h2>
                          <p className="text-sm text-text-tertiary mt-0.5">
                            {brand.country} &middot; Est. {brand.founded} &middot; {brand.parent}
                          </p>
                        </div>
                        <span className="shrink-0 bg-brand-50 text-brand-700 text-sm font-semibold px-3 py-1 rounded-full">
                          {brandWatches.length} watches
                        </span>
                      </div>

                      <p className="text-sm text-text-secondary mt-3 line-clamp-2 leading-relaxed">
                        {brand.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border-light">
                        <div>
                          <p className="text-xs text-text-tertiary">Price Range</p>
                          <p className="text-sm font-semibold text-text-primary">
                            {minPrice != null && maxPrice != null
                              ? `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-text-tertiary">Collections</p>
                          <p className="text-sm font-medium text-text-primary">
                            {collections.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
