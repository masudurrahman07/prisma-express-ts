import { motion } from "framer-motion";
import { Product } from "../types";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { ShoppingCart, Eye, Minus, Plus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

interface ProductCardProps {
  product: Product;
}


function getHue(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffff;
  return h % 360;
}

const CATEGORY_ICONS: Record<string, string> = {
  electronics:      "💻",
  computers:        "💻",
  mobile:           "📱",
  phones:           "📱",
  clothing:         "👕",
  apparel:          "👕",
  fashion:          "👗",
  shoes:            "👟",
  books:            "📚",
  "home & kitchen": "🏠",
  home:             "🏠",
  kitchen:          "🍳",
  sports:           "⚽",
  fitness:          "🏋️",
  beauty:           "💄",
  toys:             "🧸",
  food:             "🍎",
  garden:           "🌿",
  automotive:       "🚗",
  music:            "🎵",
  gaming:           "🎮",
  health:           "💊",
  tools:            "🔧",
  office:           "📎",
  travel:           "✈️",
};

function getCategoryIcon(name?: string | null): string {
  if (!name) return "🛍️";
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "🛍️";
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, removeItem, updateQuantity, items } = useCart();

  const cartItem = items.find((i) => i.productId === product.id);
  const inCart   = !!cartItem;

  const hue        = getHue(product.id);
  const hueB       = (hue + 45) % 360;
  const catIcon    = getCategoryIcon(product.category?.name);
  const currency   = product.currency ?? "$";

  const handleAdd = () => {
    addItem({
      productId:    product.id,
      title:        product.title,
      price:        product.price,
      quantity:     1,
      imageUrl:     product.imageUrl,
      categoryName: product.category?.name ?? null,
    });
    Swal.fire({
      icon: "success",
      title: "Added to cart",
      text: `${product.title} is in your bag.`,
      timer: 1100,
      showConfirmButton: false,
    });
  };

  const handleRemove = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Remove item?",
      text: `Remove "${product.title}" from your cart?`,
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Keep it",
      confirmButtonColor: "#dc2626",
    });
    if (result.isConfirmed) removeItem(product.id);
  };

  return (
    <motion.article
      layout
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="pc">
    
      <div className="pc-image">
        {product.imageUrl ? (
          <>
            <img src={product.imageUrl} alt={product.title} loading="lazy" />
            {/* subtle overlay for hover quick-view */}
            <div className="pc-overlay" aria-hidden="true">
              <Link to={`/products/${product.id}`} className="pc-quick-btn" tabIndex={-1}>
                <Eye size={16} strokeWidth={2} />
                <span>Quick view</span>
              </Link>
            </div>
          </>
        ) : (
         
          <div
            className="pc-placeholder"
            style={{
              background: `linear-gradient(145deg,
                hsl(${hue},60%,91%) 0%,
                hsl(${hueB},50%,95%) 60%,
                hsl(${(hue + 20) % 360},55%,93%) 100%)`,
            }}
            aria-hidden="true">
       
            <div
              className="pc-ph-circle pc-ph-circle--lg"
              style={{ background: `hsl(${hue},55%,84%)` }} />
            <div
              className="pc-ph-circle pc-ph-circle--sm"
              style={{ background: `hsl(${hueB},50%,88%)` }} />
            
            <div className="pc-ph-inner">
              <span className="pc-ph-icon" role="img" aria-label={product.category?.name ?? "product"}>
                {catIcon}
              </span>
              {product.category?.name && (
                <span className="pc-ph-label">{product.category.name}</span>
              )}
            </div>
           
            <div className="pc-overlay" aria-hidden="true">
              <Link to={`/products/${product.id}`} className="pc-quick-btn" tabIndex={-1}>
                <Eye size={16} strokeWidth={2} />
                <span>Quick view</span>
              </Link>
            </div>
          </div>
        )}

       
        {inCart && (
          <span className="pc-in-cart-badge" aria-label="In cart">
            ✓ In cart
          </span>
        )}
      </div>

    
      <div className="pc-body">
       
        <span className="pc-category">
          {product.category?.name ?? "Uncategorized"}
        </span>

       
        <h3 className="pc-title">{product.title}</h3>

      
        <p className="pc-desc">
          {product.description ?? "A quality product worth exploring."}
        </p>


        <div className="pc-footer">
          <div className="pc-price-block">
            <span className="pc-price-label">Price</span>
            <span className="pc-price">{currency}{product.price.toFixed(2)}</span>
          </div>

          <div className="pc-actions">
            <Link
              to={`/products/${product.id}`}
              className="btn btn--outline btn--sm"
              aria-label={`View details for ${product.title}`}>
              <Eye size={13} strokeWidth={2} />
              Details
            </Link>

            {inCart ? (
              <div className="pc-cart-controls" role="group" aria-label="Cart quantity">
                <button
                  type="button"
                  className="pc-stepper-btn"
                  onClick={() =>
                    cartItem.quantity > 1
                      ? updateQuantity(product.id, cartItem.quantity - 1)
                      : handleRemove()
                  }
                  aria-label="Decrease quantity">
                  <Minus size={12} strokeWidth={2.5} />
                </button>
                <span className="pc-cart-qty" aria-live="polite">{cartItem.quantity}</span>
                <button
                  type="button"
                  className="pc-stepper-btn"
                  onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                  aria-label="Increase quantity">
                  <Plus size={12} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  className="pc-remove-btn"
                  onClick={handleRemove}
                  aria-label="Remove from cart">
                  <Trash2 size={13} strokeWidth={2} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={handleAdd}
                aria-label={`Add ${product.title} to cart`}>
                <ShoppingCart size={13} strokeWidth={2} />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
