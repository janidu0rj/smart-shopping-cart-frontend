import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Checkout.module.css";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartIdFromState = location.state?.cartId ?? "";
  const itemsFromState = location.state?.items ?? [];

  const [cartId, setCartId] = useState(cartIdFromState);
  const [cartItems, setCartItems] = useState<CartItem[]>(itemsFromState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "creditcard">("cash");
  const [showReleasedPopup, setShowReleasedPopup] = useState(false);

  useEffect(() => {
    if (!cartId) {
      setCartItems([]);
      return;
    }

    const fetchCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/cart/${cartId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        const data = await response.json();

        const items: CartItem[] = data.items.map((item: any, idx: number) => ({
          id: item.id || idx,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }));

        setCartItems(items);
      } catch (err) {
        setCartItems([]);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [cartId]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const releaseCart = () => {
    setShowReleasedPopup(true);
  };

  const handleNewCart = () => {
    setShowReleasedPopup(false);
    setCartId("");
    setCartItems([]);
    navigate("/cart-entry");
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.checkoutPage}>
      {/* Left Section: Image + Payment */}
      <div className={styles.checkoutLeft}>
        <div className={styles.paymentOptions}>
          <h3>Payment Method</h3>
          <label>
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            Cash
          </label>
          <label>
            <input
              type="radio"
              value="creditcard"
              checked={paymentMethod === "creditcard"}
              onChange={() => setPaymentMethod("creditcard")}
            />
            Credit Card
          </label>
          <button className={styles.releaseBtn} onClick={releaseCart}>
            Release Cart
          </button>
        </div>
      </div>

      {/* Right Section: Full Original Cart UI */}
      <div className={styles.checkoutRight}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>SMART SHOPPING</div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="Logo"
            className={styles.logoImg}
          />
          <div className={styles.headerButtons}>
            <button className={styles.cartButton}>
              🛒
              {cartItems.length > 0 && <span className={styles.cartBadge}>{cartItems.length}</span>}
            </button>
            <button className={styles.logoutButton}>Logout</button>
          </div>
        </header>

        {/* Cart Section */}
        <div className={styles.cartSection}>
          <h2>Shopping Cart</h2>

          <input
            className={styles.cartIdInput}
            type="text"
            placeholder="Enter Cart ID"
            value={cartId}
            onChange={(e) => setCartId(e.target.value.trim())}
          />

          {loading ? (
            <div className={styles.loading}>Loading cart items...</div>
          ) : error ? (
            <div className={styles.errorMessage}>Error: {error}</div>
          ) : cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
                alt="Empty Cart"
                className={styles.emptyCartImg}
              />
              <p className={styles.emptyCartText}>Your cart is empty. Add some items!</p>
            </div>
          ) : (
            <ul className={styles.cartItems}>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <div className={styles.itemInfo}>
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)} each</p>
                  </div>
                  <div className={styles.itemControls}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className={styles.itemTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          {cartItems.length > 0 && (
            <div className={styles.subtotal}>
              <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
            </div>
          )}
        </div>
      </div>

      {/* Released popup */}
      {showReleasedPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Cart Released Successfully!</h3>
            <p>Your shopping cart has been successfully released.</p>
            <button onClick={handleNewCart} className={styles.newCartBtn}>
              Start New Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
