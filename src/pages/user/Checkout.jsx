import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "@/store/cartstore";
import { useAuthStore } from "@/store/authStore";
import usePageTitle from "@/hooks/usePageTitle";
import Button from "@/components/ui/custom/Button";
import {
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Mail,
  MessageSquare,
  Banknote,
  Smartphone,
  CreditCard,
  CheckCircle,
  ShoppingBag,
  ChevronRight,
  Package,
  Shield,
  Truck,
  Tag,
} from "lucide-react";

/* ─── tiny reusable input ─── */
const Field = ({ label, icon: Icon, error, ...props }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 mb-1.5 pl-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      )}
      <input
        {...props}
        className={`w-full ${Icon ? "pl-9" : "pl-4"} pr-4 py-2.5 text-sm rounded-xl border bg-gray-50 text-gray-900 outline-none
          focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200
          ${error ? "border-red-400 ring-2 ring-red-100" : "border-gray-200"}`}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1 pl-1">{error}</p>}
  </div>
);

/* ─── step pill ─── */
const StepPill = ({ number, label, active, done }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
        ${done ? "bg-green-500 text-white" : active ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-gray-200 text-gray-400"}`}
    >
      {done ? <CheckCircle size={14} /> : number}
    </div>
    <span
      className={`text-xs font-semibold hidden sm:block transition-colors duration-300
        ${active ? "text-primary" : done ? "text-green-500" : "text-gray-400"}`}
    >
      {label}
    </span>
  </div>
);

/* ─── payment option card ─── */
const PayOption = ({ id, icon: Icon, title, subtitle, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(id)}
    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer
      ${selected ? "border-primary bg-primary/5 shadow-sm" : "border-gray-200 hover:border-gray-300 bg-white"}`}
  >
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200
        ${selected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}
    >
      <Icon size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-bold ${selected ? "text-primary" : "text-gray-800"}`}>{title}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
    <div
      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
        ${selected ? "border-primary" : "border-gray-300"}`}
    >
      {selected && <div className="w-2 h-2 rounded-full bg-primary" />}
    </div>
  </button>
);

/* ══════════════════════════════════════════════════════════ */
const Checkout = () => {
  usePageTitle({ title: "Checkout" });
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartStore();
  const { name: authName, email: authEmail, phoneNumber: authPhone } = useAuthStore();

  const [step, setStep] = useState(1); // 1: Delivery  2: Payment  3: Confirm
  const [payMethod, setPayMethod] = useState("cash");
  const [placed, setPlaced] = useState(false);

  const [form, setForm] = useState({
    fullName: authName || "",
    email: authEmail || "",
    phone: authPhone || "",
    address: "",
    landmark: "",
    notes: "",
    momoNetwork: "",
    momoNumber: "",
  });
  const [errors, setErrors] = useState({});

  /* totals */
  const subtotal = cartItems.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  /* redirect to products if cart empty (and not just placed) */
  if (!placed && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-Montserrat gap-4">
        <ShoppingBag size={52} className="text-gray-300" />
        <p className="text-gray-500 font-semibold">Your cart is empty.</p>
        <Button variant="secondary" onClick={() => navigate("/products")}>
          Browse Products
        </Button>
      </div>
    );
  }

  /* validation */
  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.address.trim()) e.address = "Delivery address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handleNext = () => {
    if (step === 1 && !validate()) return;
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = () => {
    clearCart();
    setPlaced(true);
  };

  /* ─── Order Placed screen ─── */
  if (placed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-Montserrat px-4 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
          <p className="text-gray-400 text-sm mb-1">
            Thank you, <span className="font-semibold text-primary">{form.fullName}</span>.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            We'll send a confirmation to{" "}
            <span className="font-semibold text-gray-600">{form.email}</span>.
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order total</span>
              <span className="font-bold text-primary">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment</span>
              <span className="font-semibold text-gray-700">
                {payMethod === "cash" && "Cash on Delivery"}
                {payMethod === "momo" && `Mobile Money${form.momoNetwork ? ` · ${form.momoNetwork === "mtn" ? "MTN MoMo" : "Telecel Cash"}` : ""}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Deliver to</span>
              <span className="font-semibold text-gray-700 text-right max-w-[180px] truncate">{form.address}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="primary" className="w-full justify-center" onClick={() => navigate("/")}>
              Back to Home
            </Button>
            <Button variant="outline" className="w-full justify-center" onClick={() => navigate("/products")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/70 py-10 px-4 sm:px-6 lg:px-8 font-Montserrat">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => (step > 1 ? setStep((s) => s - 1) : navigate("/cart"))}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary mb-8 transition-colors cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          {step > 1 ? "Back" : "Back to Cart"}
        </button>

        {/* Stepper */}
        <div className="flex items-center gap-3 mb-10 animate-fade-in">
          <StepPill number={1} label="Delivery" active={step === 1} done={step > 1} />
          <div className={`flex-1 h-0.5 rounded-full transition-colors duration-500 ${step > 1 ? "bg-primary" : "bg-gray-200"}`} />
          <StepPill number={2} label="Payment" active={step === 2} done={step > 2} />
          <div className={`flex-1 h-0.5 rounded-full transition-colors duration-500 ${step > 2 ? "bg-primary" : "bg-gray-200"}`} />
          <StepPill number={3} label="Review" active={step === 3} done={false} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Main Form Column ── */}
          <div className="lg:col-span-2 space-y-4 animate-slide-in">

            {/* STEP 1: Delivery */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Delivery Information</h2>
                    <p className="text-xs text-gray-400">Tell us where to deliver your order</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Full Name"
                    name="fullName"
                    icon={User}
                    placeholder="e.g. Kofi Mensah"
                    value={form.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                  />
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    icon={Mail}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <Field
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    icon={Phone}
                    placeholder="+233 XX XXX XXXX"
                    value={form.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />
                  <Field
                    label="Hall / Hostel / Address"
                    name="address"
                    icon={MapPin}
                    placeholder="e.g. Legon Hall, Room 204"
                    value={form.address}
                    onChange={handleChange}
                    error={errors.address}
                  />
                  <Field
                    label="Landmark (optional)"
                    name="landmark"
                    placeholder="e.g. Near the main gate"
                    value={form.landmark}
                    onChange={handleChange}
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 pl-1 flex items-center gap-1.5">
                    <MessageSquare size={13} />
                    Order Notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Any special instructions for your order..."
                    value={form.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none
                      focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200 resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <CreditCard size={18} className="text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Payment Method</h2>
                    <p className="text-xs text-gray-400">Choose how you'd like to pay</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <PayOption
                    id="cash"
                    icon={Banknote}
                    title="Cash on Delivery"
                    subtitle="Pay when your order arrives"
                    selected={payMethod === "cash"}
                    onSelect={setPayMethod}
                  />
                  <PayOption
                    id="momo"
                    icon={Smartphone}
                    title="Mobile Money"
                    subtitle="MTN MoMo · Telecel Cash"
                    selected={payMethod === "momo"}
                    onSelect={setPayMethod}
                  />
                </div>

                {/* MoMo details */}
                {payMethod === "momo" && (
                  <div className="space-y-4 animate-fade-in">
                    {/* Network selector */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 pl-1">
                        Select Network
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: "mtn", label: "MTN MoMo", color: "bg-yellow-400", ring: "ring-yellow-400", text: "text-yellow-800" },
                          { id: "telecel", label: "Telecel Cash", color: "bg-red-500", ring: "ring-red-500", text: "text-white" },
                        ].map((net) => (
                          <button
                            key={net.id}
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, momoNetwork: net.id }))}
                            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all duration-200 cursor-pointer
                              ${form.momoNetwork === net.id
                                ? `border-transparent ring-2 ${net.ring} ${net.color} ${net.text}`
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}
                          >
                            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${net.color}`} />
                            {net.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Field
                      label="Mobile Money Number"
                      name="momoNumber"
                      type="tel"
                      icon={Smartphone}
                      placeholder={form.momoNetwork === "mtn" ? "e.g. 024 / 054 / 055 XXX XXXX" : "e.g. 020 / 050 XXX XXXX"}
                      value={form.momoNumber || ""}
                      onChange={handleChange}
                    />

                    <p className="text-xs text-gray-400 pl-1">
                      A payment prompt will be sent to this number at checkout.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Review */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                {/* Delivery review */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <MapPin size={15} className="text-primary" /> Delivery Details
                    </h3>
                    <button onClick={() => setStep(1)} className="text-xs text-secondary hover:underline cursor-pointer font-semibold">
                      Edit
                    </button>
                  </div>
                  <div className="space-y-1.5 text-sm text-gray-600">
                    <p><span className="text-gray-400 text-xs">Name: </span>{form.fullName}</p>
                    <p><span className="text-gray-400 text-xs">Phone: </span>{form.phone}</p>
                    <p><span className="text-gray-400 text-xs">Email: </span>{form.email}</p>
                    <p><span className="text-gray-400 text-xs">Address: </span>{form.address}{form.landmark ? ` · ${form.landmark}` : ""}</p>
                    {form.notes && <p><span className="text-gray-400 text-xs">Notes: </span>{form.notes}</p>}
                  </div>
                </div>

                {/* Payment review */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <CreditCard size={15} className="text-primary" /> Payment Method
                    </h3>
                    <button onClick={() => setStep(2)} className="text-xs text-secondary hover:underline cursor-pointer font-semibold">
                      Edit
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 font-semibold">
                    {payMethod === "cash" && "Cash on Delivery"}
                    {payMethod === "momo" && (
                      <span>
                        Mobile Money
                        {form.momoNetwork && (
                          <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full ${form.momoNetwork === "mtn" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-600"}`}>
                            {form.momoNetwork === "mtn" ? "MTN MoMo" : "Telecel Cash"}
                          </span>
                        )}
                        {form.momoNumber && <span className="ml-2 text-gray-400 font-normal text-xs">· {form.momoNumber}</span>}
                      </span>
                    )}
                  </p>
                </div>

                {/* Items review */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <Package size={15} className="text-primary" /> Order Items ({cartItems.length})
                  </h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Tag size={16} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity || 1}</p>
                        </div>
                        <p className="text-sm font-bold text-secondary flex-shrink-0">
                          ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft size={15} /> Back
                </button>
              ) : <div />}

              {step < 3 ? (
                <Button variant="primary" onClick={handleNext} iconType="icon-right" Icon={ChevronRight} iconSize={16}>
                  {step === 1 ? "Continue to Payment" : "Review Order"}
                </Button>
              ) : (
                <Button variant="secondary" onClick={handlePlaceOrder} iconType="icon-right" Icon={CheckCircle} iconSize={16}>
                  Place Order
                </Button>
              )}
            </div>
          </div>

          {/* ── Order Summary Sidebar ── */}
          <div className="lg:col-span-1 animate-slide-in-right">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-6">
              <div className="h-1 w-14 rounded-full bg-gradient-to-r from-primary to-secondary mb-4" />
              <h2 className="text-base font-bold text-gray-900 mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-2.5 mb-4 max-h-52 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Tag size={12} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    <p className="flex-1 text-xs text-gray-600 truncate">{item.title}</p>
                    <p className="text-xs font-bold text-gray-700 flex-shrink-0">
                      ×{item.quantity || 1}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4 space-y-2.5 mb-4">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-700">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-green-500 flex items-center gap-1">
                      <CheckCircle size={11} /> Free
                    </span>
                  ) : (
                    <span className="font-semibold text-gray-700">${shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Tax (10%)</span>
                  <span className="font-semibold text-gray-700">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-center mb-5">
                <span className="font-bold text-sm text-gray-900">Total</span>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-1 text-center">
                {[
                  { Icon: Shield, label: "Secure" },
                  { Icon: Truck, label: "Tracked" },
                  { Icon: CheckCircle, label: "Protected" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 text-gray-400 py-2 bg-gray-50 rounded-xl">
                    <Icon size={14} className="text-secondary" />
                    <span className="text-[10px] font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
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
        .animate-fade-in        { animation: fadeIn 0.45s ease-out both; }
        .animate-slide-in       { animation: slideIn 0.45s ease-out both; }
        .animate-slide-in-right { animation: slideInRight 0.45s ease-out both; }
      `}</style>
    </div>
  );
};

export default Checkout;
