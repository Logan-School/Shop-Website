// Shop Project - React application
// Edit PRODUCTS to change the items shown in the shop.
const { useState } = React;

// Product details are kept here so they are easy to update.
const PRODUCTS = [
  { id: 1, name: "Heating Desk Lamp", category: "Lighting", price: 29.99, description: "A lamp for a desk or bedside table." },
  { id: 2, name: "Custom Mug", category: "Homeware", price: 14.50, description: "A customizable mug for your favorite drink." },
  { id: 3, name: "Sketch Notebook", category: "Stationery", price: 9.99, description: "A notebook for sketches, notes, lists, and ideas." },
  { id: 4, name: "Water Bottle", category: "Everyday", price: 22.00, description: "A reusable bottle to take with you." },
  { id: 5, name: "Headphones", category: "Technology", price: 49.99, description: "Headphones for music, calls, and focus." }
];

// Display all prices in US dollars.
const money = (amount) => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD"
}).format(amount);

// Reusable quantity selector used on product cards and in the cart.
function QuantityControl({ value, decrease, increase, label, compact = false }) {
  return (
    <div className={compact ? "cart-quantity" : "quantity-control"} aria-label={label}>
      <button type="button" onClick={decrease} aria-label={`Decrease ${label}`}>−</button>
      <span>{value}</span>
      <button type="button" onClick={increase} aria-label={`Increase ${label}`}>+</button>
    </div>
  );
}

function ProductCard({ product, quantity, changeQuantity, add }) {
  return (
    <article className="product-card">
      <p className="product-category">{product.category}</p>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">{money(product.price)}</p>
      <div className="product-actions">
        <QuantityControl
          value={quantity}
          label={`${product.name} quantity`}
          decrease={() => changeQuantity(product.id, -1)}
          increase={() => changeQuantity(product.id, 1)}
        />
        <button className="add-button" type="button" onClick={() => add(product)}>Add to cart</button>
      </div>
    </article>
  );
}

function App() {
  // cart maps each product ID to the quantity currently in the cart.
  const [cart, setCart] = useState({});
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState("shop");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [payment, setPayment] = useState({ name: "", number: "", expiry: "", cvv: "", zip: "" });

  // Build cart details from the product list and the quantities in cart.
  const cartItems = PRODUCTS.filter((item) => cart[item.id] > 0)
    .map((item) => ({ ...item, quantity: cart[item.id] }));
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal ? 4.95 : 0;
  const total = subtotal + shipping;

  // Product-page quantities are limited to 1-20.
  function changeSelected(id, amount) {
    setSelected((current) => ({ ...current, [id]: Math.max(1, Math.min(20, (current[id] || 1) + amount)) }));
  }

  // Add the selected amount to the cart and show a short confirmation.
  function addToCart(product) {
    const amount = selected[product.id] || 1;
    setCart((current) => ({ ...current, [product.id]: Math.min(20, (current[product.id] || 0) + amount) }));
    setNotice(`${product.name} added to your cart.`);
    window.setTimeout(() => setNotice(""), 2200);
  }

  // Set a cart quantity, or remove the product when the quantity reaches zero.
  function updateCart(id, quantity) {
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[id];
      else next[id] = Math.min(20, quantity);
      return next;
    });
  }

  // Keep payment inputs to the characters and lengths expected by each field.
  function updatePayment(event) {
    const { name, value } = event.target;
    const rules = {
      number: (text) => text.replace(/\D/g, "").slice(0, 19),
      expiry: (text) => text.replace(/[^0-9/]/g, "").slice(0, 5),
      cvv: (text) => text.replace(/\D/g, "").slice(0, 4),
      zip: (text) => text.replace(/[^0-9-]/g, "").slice(0, 10)
    };
    setPayment((current) => ({ ...current, [name]: rules[name] ? rules[name](value) : value }));
    setError("");
  }

  // This checks the format to see if it could be valid payment information.
  function submitPayment(event) {
    event.preventDefault();
    const digits = payment.number.replace(/\D/g, "");
    const [month, year] = payment.expiry.split("/").map(Number);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    const validExpiry = /^\d{2}\/\d{2}$/.test(payment.expiry) && month >= 1 && month <= 12
      && (year > currentYear || (year === currentYear && month >= currentMonth));

    if (!cartItems.length) setError("Your cart is empty. Add an item before checking out.");
    else if (payment.name.trim().length < 2) setError("Enter the name shown on the payment card.");
    else if (digits.length < 13 || digits.length > 19) setError("Enter a card number containing 13 to 19 digits.");
    else if (!validExpiry) setError("Enter a valid, unexpired date in MM/YY format.");
    else if (!/^\d{3,4}$/.test(payment.cvv)) setError("Enter a 3- or 4-digit security code.");
    else if (!/^\d{5}(?:-\d{4})?$/.test(payment.zip)) setError("Enter a valid 5-digit ZIP code or ZIP+4.");
    else setPage("success"); // Show a sample confirmation.
  }

  function openCart() { setError(""); setPage("checkout"); }
  function startNewOrder() {
    setCart({});
    setSelected({});
    setPayment({ name: "", number: "", expiry: "", cvv: "", zip: "" });
    setError("");
    setPage("shop");
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="site-title title-button" type="button" onClick={() => setPage("shop")}>Shop Project</button>
        <button className="cart-button" type="button" onClick={openCart}>Cart <span className="cart-count">{itemCount}</span></button>
      </header>

      {page === "shop" && (
        <main>
          <section className="intro">
            <h1>Welcome to Shop Project</h1>
            <p>Browse the five items below, choose a quantity, and add your selections to the cart.</p>
          </section>
          <section className="products-section" aria-labelledby="products-title">
            <div className="section-heading">
              <h2 id="products-title">Available products</h2>
              <span className="section-count">5 products</span>
            </div>
            <div className="product-grid">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} quantity={selected[product.id] || 1}
                  changeQuantity={changeSelected} add={addToCart} />
              ))}
            </div>
          </section>
        </main>
      )}

      {page === "checkout" && (
        <main className="checkout-page">
          <button className="back-button" type="button" onClick={() => setPage("shop")}>← Back to shop</button>
          <div className="checkout-heading">
            <h1>Your cart</h1>
            <p>Review your items and enter sample payment details to finish.</p>
          </div>

          {!cartItems.length? (
            <section className="empty-state">
              <h2>Your cart is empty</h2>
              <p>Return to the shop to add products to your cart.</p>
              <button className="primary-button" type="button" onClick={() => setPage("shop")}>Browse products</button>
            </section>
          ) : (
            <div className="checkout-layout">
              <section className="panel" aria-labelledby="summary-title">
                <div className="panel-heading">
                  <h2 id="summary-title">Order summary</h2>
                  <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
                </div>
                <div className="cart-list">
                  {cartItems.map((item) => (
                    <div className="cart-row" key={item.id}>
                      <div>
                        <h3 className="cart-product-name">{item.name}</h3>
                        <span className="cart-product-price">{money(item.price)} each</span><br />
                        <button className="remove-button" type="button" onClick={() => updateCart(item.id, 0)}>Remove</button>
                      </div>
                      <QuantityControl compact value={item.quantity} label={`${item.name} in cart`}
                        decrease={() => updateCart(item.id, item.quantity - 1)}
                        increase={() => updateCart(item.id, item.quantity + 1)} />
                      <strong className="line-total">{money(item.price * item.quantity)}</strong>
                    </div>
                  ))}
                </div>
                <div className="totals">
                  <div className="total-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                  <div className="total-row"><span>Shipping</span><strong>{money(shipping)}</strong></div>
                  <div className="total-row grand-total"><span>Total</span><strong>{money(total)}</strong></div>
                </div>
                <p className="shipping-note">Shipping is a flat $4.95.</p>
              </section>

              <section className="panel" aria-labelledby="payment-title">
                <div className="panel-heading"><h2 id="payment-title">Payment information</h2></div>
                <p className="payment-note">This checkout only checks the format of the information you enter. It does not process a payment. Use fictional details only, and never enter a real payment card.</p>
                <form className="payment-form" onSubmit={submitPayment} noValidate>
                  <label htmlFor="payment-name">Name on card</label>
                  <input id="payment-name" name="name" placeholder="Alex Example" value={payment.name} onChange={updatePayment} autoComplete="off" />
                  <label htmlFor="payment-number">Card number</label>
                  <input id="payment-number" name="number" inputMode="numeric" placeholder="1234567890123456" value={payment.number} onChange={updatePayment} autoComplete="off" />
                  <div className="form-two-column">
                    <div>
                      <label htmlFor="payment-expiry">Expiry date</label>
                      <input id="payment-expiry" name="expiry" placeholder="MM/YY" value={payment.expiry} onChange={updatePayment} autoComplete="off" />
                    </div>
                    <div>
                      <label htmlFor="payment-cvv">Security code</label>
                      <input id="payment-cvv" name="cvv" inputMode="numeric" placeholder="123" value={payment.cvv} onChange={updatePayment} autoComplete="off" />
                    </div>
                  </div>
                  <label htmlFor="payment-zip">Billing ZIP code</label>
                  <input id="payment-zip" name="zip" inputMode="numeric" placeholder="83440" value={payment.zip} onChange={updatePayment} autoComplete="off" />
                  {error && <p className="form-error" role="alert">{error}</p>}
                  <button className="primary-button pay-button" type="submit">Complete order</button>
                </form>
              </section>
            </div>
          )}
        </main>
      )}

      {page === "success" && (
        <main className="checkout-page">
          <section className="success-card">
            <h1>Order accepted</h1>
            <p>Your sample order was accepted. No payment was processed, and your payment information was not sent or saved.</p>
            <div className="success-total"><span>Order total</span><strong>{money(total)}</strong></div>
            <button className="primary-button" type="button" onClick={startNewOrder}>Return to shop</button>
          </section>
        </main>
      )}

      <footer className="footer">Shop Project</footer>
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}

// Render the React app in the root element from index.html.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
