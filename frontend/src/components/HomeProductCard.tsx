import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../CartContext";
import { Product } from "../types";
import Swal from "sweetalert2";

interface Props {
  product: Product;
}


function getPlaceholderStyle(id: string): React.CSSProperties {
  const hue = (id.charCodeAt(0) * 37 + id.charCodeAt(id.length - 1) * 13) % 360;
  return {
    background: `linear-gradient(135deg, hsl(${hue},60%,92%) 0%, hsl(${(hue + 40) % 360},50%,96%) 100%)`,
  };
}

export default function HomeProductCard({ product }: Props) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      categoryName: product.category?.name ?? null,
    });
    await Swal.fire({
      icon: "success",
      title: "Added to cart",
      text: `${product.title} is ready in your bag.`,
      timer: 1200,
      showConfirmButton: false,
    });
    setAdding(false);
  };

  return (
    <motion.article
      className="hpc"
      whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(15,23,42,0.13)" }}
      transition={{ duration: 0.22 }}
    >
      {/* Image area */}
      <div className="hpc-image" style={!product.imageUrl ? getPlaceholderStyle(product.id) : undefined}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.title} loading="lazy" />
        ) : (
          <div className="hpc-placeholder" aria-hidden="true">
            <span className="hpc-placeholder-icon">📦</span>
          </div>
        )}
        
        <div className="hpc-overlay" aria-hidden="true">
          <Link
            to={`/products/${product.id}`}
            className="hpc-quick-btn"
            tabIndex={-1}>
            <Eye size={16} strokeWidth={2} />
          </Link>
          <button
            type="button"
            className="hpc-quick-btn"
            onClick={handleAdd}
            disabled={adding}
            tabIndex={-1}>
            <ShoppingCart size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      
      <div className="hpc-body">
        <div className="hpc-meta">
          <span className="hpc-category">
            {product.category?.name ?? "Uncategorized"}
          </span>
        </div>

        <h3 className="hpc-title">{product.title}</h3>

        <p className="hpc-desc">
          {product.description ?? "A great product worth exploring."}
        </p>

        <div className="hpc-footer">
          <span className="hpc-price">
            {product.currency ?? "$"}{product.price.toFixed(2)}
          </span>

          <div className="hpc-actions">
            <Link
              to={`/products/${product.id}`}
              className="btn btn--outline btn--sm">
              <Eye size={14} strokeWidth={2} />
              Details
            </Link>
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={handleAdd}
              disabled={adding}>
              <ShoppingCart size={14} strokeWidth={2} />
              {adding ? "Adding…" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
