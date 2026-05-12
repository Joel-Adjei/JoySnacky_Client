import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useOrderStore from "@/store/useOrderStore";
import usePageTitle from "@/hooks/usePageTitle";
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ArrowLeft,
  ChevronRight,
  ImageOff,
} from "lucide-react";
import Button from "@/components/ui/custom/Button";

export const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    icon: Clock,
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
    dot: "bg-amber-400",
  },
  processing: {
    label: "Processing",
    icon: Package,
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-200",
    dot: "bg-violet-500",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-500",
    border: "border-red-200",
    dot: "bg-red-400",
  },
};

export const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      <Icon size={11} />
      {cfg.label}
    </span>
  );
};

const ProductThumb = ({ item, size = "md" }) => {
  const dim = size === "lg" ? "w-14 h-14" : "w-10 h-10";
  return (
    <div
      className={`${dim} rounded-xl bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0`}
    >
      {item?.thumbnail ? (
        <img
          src={item.thumbnail}
          alt={item?.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <ImageOff size={size === "lg" ? 18 : 13} className="text-gray-300" />
        </div>
      )}
    </div>
  );
};

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const items = order.items ?? [];
  const firstItem = items[0];
  const extraCount = items.length - 1;
  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
  const StatusIcon = cfg.icon;

  return (
    <button
      type="button"
      onClick={() => navigate(`/orders/${order.id}`)}
      className="w-full text-left bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden group"
    >
      <div className="p-4 sm:p-5">
        {/* Top row: image stack + name + status */}
        <div className="flex items-center gap-4">
          {/* Hero image */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden border border-gray-200 shadow-sm">
              {firstItem?.thumbnail ? (
                <img
                  src={firstItem.thumbnail}
                  alt={firstItem.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageOff size={20} className="text-gray-300" />
                </div>
              )}
            </div>
            {/* extra stacked images */}
            {items[1] && (
              <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-xl bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
                {items[1].thumbnail ? (
                  <img
                    src={items[1].thumbnail}
                    alt={items[1].title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOff size={10} className="text-gray-300" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Main info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate leading-tight">
              {firstItem?.title ?? "Order"}
              {extraCount > 0 && (
                <span className="font-normal text-gray-400">
                  {" "}
                  +{extraCount} more
                </span>
              )}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {formatDate(order.orderedAt)}
            </p>
            <div className="mt-2">
              <StatusBadge status={order.status} />
            </div>
          </div>

          {/* Right: total + chevron */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-base font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GH₵{order.total?.toFixed(2)}
            </span>
            <ChevronRight
              size={15}
              className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200"
            />
          </div>
        </div>

        {/* Bottom row: item count + order ID */}
        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-dashed border-gray-100">
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center ${cfg.bg}`}
            >
              <StatusIcon size={12} className={cfg.text} />
            </div>
            <span className="text-xs text-gray-400">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </span>
          </div>
          <span className="text-[10px] font-mono text-gray-300 tracking-wide">
            {order.id}
          </span>
        </div>
      </div>
    </button>
  );
};

/* ══════════════════════════════════════════════════════════ */
const UserOrders = () => {
  usePageTitle({ title: "My Orders" });
  const navigate = useNavigate();
  const { orders } = useOrderStore();
  const [filter, setFilter] = useState("all");

  const statuses = [
    "all",
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen bg-gray-50/70 py-10 px-4 sm:px-6 lg:px-8 font-Montserrat">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary mb-8 transition-colors cursor-pointer group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          Go Back
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
            <p className="text-xs text-gray-400">
              {orders.length} order{orders.length !== 1 ? "s" : ""} placed
            </p>
          </div>
        </div>

        {/* Filter pills */}
        {orders.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6">
            {statuses.map((s) => {
              const count =
                s === "all"
                  ? orders.length
                  : orders.filter((o) => o.status === s).length;
              if (s !== "all" && count === 0) return null;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilter(s)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer
                    ${
                      filter === s
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                    }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                  <span
                    className={`ml-1.5 text-[10px] font-bold ${
                      filter === s ? "text-white/70" : "text-gray-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag size={36} className="text-gray-300" />
            </div>
            <p className="text-gray-500 font-semibold">No orders yet</p>
            <p className="text-gray-400 text-sm text-center max-w-xs">
              When you place an order it will appear here so you can track its
              status.
            </p>
            <Button variant="primary" onClick={() => navigate("/products")}>
              Browse Products
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Package size={40} className="text-gray-300" />
            <p className="text-gray-400 text-sm">No {filter} orders</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
