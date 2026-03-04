"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { watches } from "@/data/watches";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const links = [
    { href: "/watches", label: "Browse" },
    { href: "/compare", label: "Compare" },
    { href: "/brands", label: "Brands" },
  ];

  const searchResults = searchQuery.length >= 2
    ? watches
        .filter(
          (w) =>
            w.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            w.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            w.reference.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <span className="font-bold text-text-primary text-lg tracking-tight">
                WatchCompare
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith(link.href)
                      ? "bg-brand-50 text-brand-700"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-sunken"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                {searchOpen ? (
                  <div className="flex items-center">
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }
                        if (e.key === "Enter" && searchQuery) {
                          router.push(`/watches?q=${encodeURIComponent(searchQuery)}`);
                          setSearchOpen(false);
                          setSearchQuery("");
                        }
                      }}
                      placeholder="Search watches..."
                      className="w-48 sm:w-64 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
                    />
                    <button
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="ml-1 p-1.5 text-text-tertiary hover:text-text-primary"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Search dropdown */}
                    {searchResults.length > 0 && (
                      <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-50">
                        {searchResults.map((w) => (
                          <Link
                            key={w.id}
                            href={`/watch/${w.id}`}
                            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-surface-sunken transition-colors border-b border-border-light last:border-0"
                          >
                            <div className="w-10 h-10 rounded-lg bg-surface-sunken flex items-center justify-center shrink-0">
                              <svg className="w-5 h-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-text-primary truncate">{w.model}</p>
                              <p className="text-xs text-text-tertiary">{w.brand} &middot; {w.reference}</p>
                            </div>
                          </Link>
                        ))}
                        <Link
                          href={`/watches?q=${encodeURIComponent(searchQuery)}`}
                          onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                          className="block px-4 py-2.5 text-center text-sm text-brand-600 hover:bg-brand-50 font-medium"
                        >
                          View all results
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-sunken transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-sunken transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-white animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith(link.href)
                      ? "bg-brand-50 text-brand-700"
                      : "text-text-secondary hover:bg-surface-sunken"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Click-away overlay for search */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
        />
      )}
    </>
  );
}
