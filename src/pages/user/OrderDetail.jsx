import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useOrderStore from "@/store/useOrderStore";
import usePageTitle from "@/hooks/usePageTitle";
import { StatusBadge, formatDate } from "./UserOrders";
import {
  ArrowLeft,
  ClipboardCheck,
  Settings2,
  Truck,
  Home,
  XCircle,
  MapPin,
  CreditCard,
  ImageOff,
  PackageOpen,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import Button from "@/components/ui/custom/Button";

/* ── Tracking stages ── */
const STAGES = [
  {
    key: "placed",
    label: "Order Placed",
    description: "Your order has been received and confirmed.",
    Icon: ClipboardCheck,
    color: "blue",
  },
  {
    key: "processing",
    label: "Processing",
    description: "The vendor is preparing your items.",
    Icon: Settings2,
    color: "amber",
  },
  {
    key: "shipped",
    label: "On the Way",
    description: "Your order is out for delivery.",
    Icon: Truck,
    color: "violet",
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Your order arrived successfully.",
    Icon: Home,
    color: "emerald",
  },
];

const CANCELLED_STAGE = {
  key: "cancelled",
  label: "Order Cancelled",
  description: "This order has been cancelled.",
  Icon: XCircle,
  color: "red",
};

const STATUS_TO_STEP = {
  pending: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
  cancelled: -1,
};

const COLOR_MAP = {
  blue: {
    ring: "ring-blue-400",
    bg: "bg-blue-500",
    light: "bg-blue-50",
    text: "text-blue-600",
    icon: "text-blue-600",
    line: "bg-blue-400",
  },
  amber: {
    ring: "ring-amber-400",
    bg: "bg-amber-500",
    light: "bg-amber-50",
    text: "text-amber-600",
    icon: "text-amber-600",
    line: "bg-amber-400",
  },
  violet: {
    ring: "ring-violet-400",
    bg: "bg-violet-500",
    light: "bg-violet-50",
    text: "text-violet-600",
    icon: "text-violet-600",
    line: "bg-violet-400",
  },
  emerald: {
    ring: "ring-emerald-400",
    bg: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-600",
    icon: "text-emerald-600",
    line: "bg-emerald-400",
  },
  red: {
    ring: "ring-red-400",
    bg: "bg-red-500",
    light: "bg-red-50",
    text: "text-red-600",
    icon: "text-red-500",
    line: "bg-red-400",
  },
  gray: {
    ring: "ring-gray-200",
    bg: "bg-gray-200",
    light: "bg-gray-50",
    text: "text-gray-400",
    icon: "text-gray-400",
    line: "bg-gray-200",
  },
};

const TrackingTimeline = ({ status }) => {
  const isCancelled = status === "cancelled";
  const currentStep = STATUS_TO_STEP[status] ?? 0;
  const stages = isCancelled ? [STAGES[0], CANCELLED_STAGE] : STAGES;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm font-bold text-gray-800 mb-6">Order Tracking</h3>
      <div className="relative">
        {stages.map((stage, idx) => {
          const isActive = isCancelled
            ? idx === stages.length - 1
            : idx === currentStep;
          const isDone = isCancelled
            ? idx === 0
            : idx < currentStep;
          const isPending = !isActive && !isDone;

          const colorKey = isDone || isActive ? stage.color : "gray";
          const c = COLOR_MAP[colorKey];
          const Icon = stage.Icon;
          const isLast = idx === stages.length - 1;

          return (
            <div key={stage.key} className="flex gap-4">
              {/* Icon column */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500
                    ${isActive ? `${c.light} ring-2 ${c.ring} shadow-sm` : isDone ? `${c.bg}` : "bg-gray-100"}`}
                >
                  <Icon
                    size={18}
                    className={
                      isDone
                        ? "text-white"
                        : isActive
                        ? c.icon
                        : "text-gray-300"
                    }
                  />
                </div>
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 my-1 min-h-[28px] rounded-full transition-colors duration-500 ${
                      isDone ? c.line : "bg-gray-100"
                    }`}
                  />
                )}
              </div>

              {/* Text column */}
              <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                <p
                  className={`text-sm font-bold leading-tight transition-colors duration-300 ${
                    isActive ? c.text : isDone ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {stage.label}
                </p>
                <p
                  className={`text-xs mt-0.5 transition-colors duration-300 ${
                    isActive || isDone ? "text-gray-400" : "text-gray-200"
                  }`}
                >
                  {stage.description}
                </p>
                {isActive && (
                  <span
                    className={`inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.light} ${c.text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${c.bg} animate-pulse`} />
                    Current status
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════ */
const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrderStore();
  usePageTitle({ title: "Order Detail" });

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-Montserrat gap-4 px-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <PackageOpen size={36} className="text-gray-300" />
        </div>
        <p className="text-gray-500 font-semibold">Order not found</p>
        <Button variant="outline" onClick={() => navigate("/orders")}>
          Back to Orders
        </Button>
      </div>
    );
  }

  const payLabel =
    order.payment?.method === "cash"
      ? "Cash on Delivery"
      : `Mobile Money · ${
          order.payment?.network === "mtn" ? "MTN MoMo" : "Telecel Cash"
        }`;

  return (
    <div className="min-h-screen bg-gray-50/70 py-10 px-4 sm:px-6 lg:px-8 font-Montserrat">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary mb-8 transition-colors cursor-pointer group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          My Orders
        </button>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-8">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{order.id}</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Placed on {formatDate(order.orderedAt)}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="space-y-4">

          {/* ── Tracking timeline ── */}
          <TrackingTimeline status={order.status} />

          {/* ── Items ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4">
              Items Ordered
              <span className="ml-2 text-xs font-normal text-gray-400">
                ({order.items?.length})
              </span>
            </h3>
            <div className="space-y-3">
              {order.items?.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/60 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageOff size={16} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 leading-tight truncate">
                      {item.title}
                    </p>
                    {item.category && (
                      <p className="text-xs text-gray-400 mt-0.5 capitalize">
                        {item.category}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-0.5">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-800 flex-shrink-0">
                    GH₵{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 pt-4 border-t border-dashed border-gray-200 space-y-2">
              {[
                { label: "Subtotal", value: `GH₵${order.subtotal?.toFixed(2)}` },
                {
                  label: "Shipping",
                  value: order.shipping === 0 ? "Free" : `GH₵${order.shipping?.toFixed(2)}`,
                  green: order.shipping === 0,
                },
                { label: "Tax (10%)", value: `GH₵${order.tax?.toFixed(2)}` },
              ].map(({ label, value, green }) => (
                <div key={label} className="flex justify-between text-xs text-gray-500">
                  <span>{label}</span>
                  <span className={`font-medium ${green ? "text-emerald-600" : "text-gray-700"}`}>
                    {value}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  GH₵{order.total?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* ── Delivery + Payment grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Delivery */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-4">
                <MapPin size={12} className="text-primary" /> Delivery Details
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={12} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Name</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {order.delivery?.fullName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={12} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Phone</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {order.delivery?.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={12} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Email</p>
                    <p className="text-sm font-semibold text-gray-800 break-all">
                      {order.delivery?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={12} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Address</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {order.delivery?.address}
                      {order.delivery?.landmark && (
                        <span className="text-gray-400 font-normal">
                          {" "}
                          · {order.delivery.landmark}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                {order.delivery?.notes && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare size={12} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400">Note</p>
                      <p className="text-sm text-gray-500 italic">
                        "{order.delivery.notes}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-4">
                <CreditCard size={12} className="text-primary" /> Payment
              </h3>
              <div
                className={`rounded-xl p-4 flex items-center gap-3 ${
                  order.payment?.method === "cash"
                    ? "bg-emerald-50 border border-emerald-100"
                    : order.payment?.network === "mtn"
                    ? "bg-yellow-50 border border-yellow-100"
                    : "bg-red-50 border border-red-100"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm
                    ${
                      order.payment?.method === "cash"
                        ? "bg-emerald-500 text-white"
                        : order.payment?.network === "mtn"
                        ? "bg-yellow-400 text-yellow-900"
                        : "bg-red-500 text-white"
                    }`}
                >
                  {order.payment?.method === "cash"
                    ? "₵"
                    : order.payment?.network === "mtn"
                    ? "M"
                    : "T"}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{payLabel}</p>
                  {order.payment?.number && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.payment.number}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out both; }
      `}</style>
    </div>
  );
};

export default OrderDetail;
