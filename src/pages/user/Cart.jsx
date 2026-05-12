import React from "react";
import useCartStore from "@/store/cartstore";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Truck,
  Shield,
  CheckCircle,
  ShoppingBag,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/custom/Button";
import Title from "@/components/ui/custom/Title";
import usePageTitle from "@/hooks/usePageTitle";

const Cart = () => {
  const { cartItems, removeItem, clearCart, updateQuantity } = useCartStore();
  const navigate = useNavigate();
  usePageTitle({ title: `Cart (${cartItems?.length})` });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const shippingCost = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const handleContinueShopping = () => navigate("/products");

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 px-4 sm:px-6 lg:px-8 font-Montserrat">
      <div className="max-w-6xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 transition-colors duration-200 cursor-pointer group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Continue Shopping
        </button>

        {cartItems.length === 0 ? (
          /* ── Empty State ── */
          <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
            <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <ShoppingCart size={52} className="text-primary/60" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-8 text-center max-w-xs">
              Looks like you haven't added any items yet. Let's change that!
            </p>
            <Button
              onClick={handleContinueShopping}
              variant="secondary"
              iconSize={15}
              iconType="icon-right"
              Icon={ShoppingBag}
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          /* ── Cart Contents ── */
          <>
            {/* Title */}
            <div className="flex items-center justify-center mb-8 animate-fade-in">
              <Title title="Shopping Cart" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* ── Left: Item List ── */}
              <div className="lg:col-span-2 space-y-3 animate-slide-in">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300"
                    style={{ animationDelay: `${index * 0.07}s` }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingCart size={28} className="text-gray-300" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 truncate">
                          {item.title || "Product"}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <Tag size={11} />
                          {item.vendor || "Vendor"}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold text-secondary">
                            ${(item.price || 0).toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-300 line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity + Remove */}
                      <div className="flex flex-col items-end gap-3">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>

                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-gray-500 cursor-pointer"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-gray-800 select-none">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-gray-500 cursor-pointer"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-2 text-xs text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 hover:bg-red-50 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
                  >
                    <Trash2 size={13} />
                    Clear Cart
                  </button>
                  <p className="text-xs text-gray-400">
                    {cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0)} item(s)
                  </p>
                </div>
              </div>

              {/* ── Right: Order Summary ── */}
              <div className="lg:col-span-1 animate-slide-in-right">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                  {/* Header stripe */}
                  <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary mb-5" />
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

                  {/* Line items */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-700">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Shipping</span>
                      {shippingCost === 0 ? (
                        <span className="font-semibold text-green-500 flex items-center gap-1">
                          <CheckCircle size={13} /> Free
                        </span>
                      ) : (
                        <span className="font-semibold text-gray-700">${shippingCost.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Tax (10%)</span>
                      <span className="font-semibold text-gray-700">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dashed border-gray-200 mb-6" />

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {/* Free shipping nudge */}
                  {shippingCost > 0 && (
                    <div className="bg-secondary/10 rounded-xl p-3 mb-5 text-xs text-secondary font-semibold flex items-center gap-2">
                      <Truck size={14} />
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping
                    </div>
                  )}

                  {/* Checkout */}
                  <Button variant="primary" className="w-full py-3 justify-center" onClick={() => navigate("/checkout")}>
                    <ShoppingCart size={16} />
                    Proceed to Checkout
                  </Button>

                  {/* Trust badges */}
                  <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
                    {[
                      { Icon: Shield, label: "Secure" },
                      { Icon: Truck, label: "Tracked" },
                      { Icon: CheckCircle, label: "Protected" },
                    ].map(({ Icon, label }) => (
                      <div key={label} className="flex flex-col items-center gap-1 text-gray-400">
                        <Icon size={16} className="text-secondary" />
                        <span className="text-[10px]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in       { animation: fadeIn 0.5s ease-out both; }
        .animate-slide-in      { animation: slideIn 0.5s ease-out both; }
        .animate-slide-in-right { animation: slideInRight 0.5s ease-out both; }
      `}</style>
    </div>
  );
};

export default Cart;
