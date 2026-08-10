import { useEffect, useState, useMemo } from "react";
import { productsApi } from "../api";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import { Search, X, ChevronDown, SlidersHorizontal, PackageSearch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SortKey = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const SORT_LABELS: Record<SortKey, string> = {
  "default":    "Default",
  "price-asc":  "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc":   "Name: A → Z",
  "name-desc":  "Name: Z → A",
};

function ProductSkeleton() {
  return (
    <div className="pc-skeleton" aria-hidden="true">
      <div className="pc-skeleton-img" />
      <div className="pc-skeleton-body">
        <div className="pc-skeleton-line pc-skeleton-line--short" />
        <div className="pc-skeleton-line" />
        <div className="pc-skeleton-line pc-skeleton-line--med" />
        <div className="pc-skeleton-line pc-skeleton-line--short" />
      </div>
    </div>
  );
}

export default function Products() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [search, setSearch]           = useState("");
  const [category, setCategory]       = useState("all");
  const [sort, setSort]               = useState<SortKey>("default");
  const [sortOpen, setSortOpen]       = useState(false);

  useEffect(() => {
    productsApi
      .list()
      .then((res) => setAllProducts(res.data))
      .catch((err) => setError(err.message || "Failed to load products"))
      .finally(() => setLoading(false));
  }, []);


  const categories = useMemo(() => {
    const seen = new Set<string>();
    const cats: string[] = [];
    for (const p of allProducts) {
      const name = p.category?.name;
      if (name && !seen.has(name)) {
        seen.add(name);
        cats.push(name);
      }
    }
    return cats.sort();
  }, [allProducts]);

 
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let list = allProducts.filter((p) => {
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.category?.name ?? "").toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q);
      const matchCat =
        category === "all" || p.category?.name === category;
      return matchSearch && matchCat;
    });

    if (sort === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name-asc")   list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "name-desc")  list = [...list].sort((a, b) => b.title.localeCompare(a.title));

    return list;
  }, [allProducts, search, category, sort]);

  const hasFilters = search !== "" || category !== "all" || sort !== "default";

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
  };

  return (
    <section className="products-page">

    
      <div className="products-header">
        <div className="products-header-copy">
          <span className="eyebrow">Catalog</span>
          <h1 className="products-title">Explore Products</h1>
          <p className="products-subtitle">
            Browse our full catalog, filter by category, and add items directly to your cart.
          </p>
        </div>
        {!loading && (
          <span className="products-count">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="products-toolbar">
     
        <div className="products-search-wrap">
          <Search size={16} strokeWidth={2} className="products-search-icon" />
          <input
            type="text"
            className="products-search-input"
            placeholder="Search by name, category, or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products" />
          {search && (
            <button
              type="button"
              className="products-search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search">
              <X size={15} strokeWidth={2.5} />
            </button>
          )}
        </div>

        <div className="products-cats" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`products-cat-pill${category === "all" ? " products-cat-pill--active" : ""}`}
            onClick={() => setCategory("all")}>
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`products-cat-pill${category === cat ? " products-cat-pill--active" : ""}`}
              onClick={() => setCategory(cat)}  >
              {cat}
            </button>
          ))}
        </div>

    
        <div className="products-sort-wrap">
          <button
            type="button"
            className="products-sort-btn"
            onClick={() => setSortOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={sortOpen} >
            <SlidersHorizontal size={15} strokeWidth={2} />
            {SORT_LABELS[sort]}
            <ChevronDown size={14} strokeWidth={2.5} className={sortOpen ? "sort-chevron-open" : ""} />
          </button>
          {sortOpen && (
            <div className="products-sort-dropdown" role="listbox">
              {(Object.entries(SORT_LABELS) as [SortKey, string][]).map(([key, label]) => (
                <button
                  key={key}
                  role="option"
                  aria-selected={sort === key}
                  type="button"
                  className={`products-sort-option${sort === key ? " products-sort-option--active" : ""}`}
                  onClick={() => { setSort(key); setSortOpen(false); }}  >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

  
      {error && (
        <div className="products-error">
          <p className="error">{error}</p>
        </div>
      )}

     
      {loading ? (
        <div className="products-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="products-empty">
          <PackageSearch size={48} strokeWidth={1.2} className="products-empty-icon" />
          <h3>No products found</h3>
          <p>
            {hasFilters
              ? "Try adjusting your search or filters to find what you're looking for."
              : "No products are available yet. Check back soon."}
          </p>
          {hasFilters && (
            <button type="button" className="btn btn--outline btn--md" onClick={clearFilters}>
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            className="products-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
