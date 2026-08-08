import { motion } from "framer-motion";
import { Product } from "../types";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { FiShoppingBag } from "react-icons/fi";
import Swal from "sweetalert2";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      categoryName: product.category?.name ?? null,
    });
    Swal.fire({ icon: "success", title: "Added to cart", text: `${product.title} is ready in your bag.`, timer: 1200, showConfirmButton: false });
  };

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="product-card"
    >
      <div className="product-image">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.title} />
        ) : (
          <div className="placeholder">No image available</div>
        )}
      </div>
      <div className="product-body">
        <div>
          <p className="category-chip subtle">{product.category?.name ?? "Uncategorized"}</p>
          <h3>{product.title}</h3>
          <p className="product-detail-description">{product.description ?? "A great product worth exploring."}</p>
        </div>
        <div className="product-card-footer">
          <span className="price">{product.currency ?? "$"}{product.price.toFixed(2)}</span>
          <div className="product-card-actions">
            <Link to={`/products/${product.id}`} className="button small secondary">
              View Details
            </Link>
            <button type="button" className="button small" onClick={handleAdd}>
              <FiShoppingBag size={16} /> Add
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
