import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import Button from "@/components/ui/custom/Button";
import {
  ShoppingBag,
  BarChart3,
  Package,
  TrendingUp,
  Users,
  ArrowRight,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { images } from "@/assets/assets";

const weeklyData = [
  { day: "Mon", sales: 45 },
  { day: "Tue", sales: 72 },
  { day: "Wed", sales: 58 },
  { day: "Thu", sales: 90 },
  { day: "Fri", sales: 120 },
  { day: "Sat", sales: 95 },
  { day: "Sun", sales: 65 },
];

const recentMessages = [
  {
    id: 1,
    customer: "Sarah Johnson",
    message: "Hi, is this product still available?",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    customer: "Mike Chen",
    message: "Thank you for the quick delivery!",
    time: "15 min ago",
    unread: false,
  },
  {
    id: 3,
    customer: "Emma Davis",
    message: "Can I get a bulk discount?",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 4,
    customer: "Alex Wilson",
    message: "Product quality is excellent!",
    time: "2 hours ago",
    unread: false,
  },
];

const recentOrders = [
  {
    id: "#ORD-024",
    customer: "John Mensah",
    amount: 85.0,
    status: "pending",
    time: "5 min ago",
  },
  {
    id: "#ORD-023",
    customer: "Ama Boateng",
    amount: 42.5,
    status: "processing",
    time: "30 min ago",
  },
  {
    id: "#ORD-022",
    customer: "Kwame Asante",
    amount: 120.0,
    status: "completed",
    time: "2 hours ago",
  },
  {
    id: "#ORD-021",
    customer: "Akosua Frimpong",
    amount: 67.0,
    status: "completed",
    time: "3 hours ago",
  },
];

const maxSales = Math.max(...weeklyData.map((d) => d.sales));

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-accent/10 text-accent",
    Icon: Clock,
  },
  processing: {
    label: "Processing",
    className: "bg-secondary/10 text-secondary",
    Icon: Package,
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-700",
    Icon: CheckCircle,
  },
};

const VendorHome = () => {
  const navigate = useNavigate();
  const { businessName, name } = useAuthStore();
  const displayName = businessName || name || "Joel";

  return (
    <div className="p-6 bg-muted min-h-screen space-y-6">
      {/* Welcome Banner */}
      <BlurFade direction="bottom" blur="0" delay={0.1}>
        <div className="relative h-45 bg-gradient-to-br flex items-center from-primary to-secondary w-full rounded-3xl p-6 overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold mb-1">
                Welcome, <span className="text-accent">{displayName}</span>
              </h1>
              <p className="text-white/70 text-sm">
                Here's what's happening with your store today.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-20 -right-15 h-50 w-100 bg-white opacity-30 rounded-[200%] pointer-events-none hidden sm:block" />

          <div className="absolute bottom-0 right-7 hidden sm:block">
            <img
              src={images.vendorIllustration}
              alt="E-commerce illustration"
              className="w-60 h-50 object-contain"
            />
          </div>
        </div>
      </BlurFade>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Revenue",
            value: "GH₵ 4,320",
            Icon: DollarSign,
            color: "text-green-600",
            bg: "bg-green-100",
            border: "border-green-500",
            delay: 0.15,
          },
          {
            label: "Total Orders",
            value: "192",
            Icon: ShoppingBag,
            color: "text-primary",
            bg: "bg-primary/10",
            border: "border-primary",
            delay: 0.2,
          },
          {
            label: "Products Listed",
            value: "34",
            Icon: Package,
            color: "text-secondary",
            bg: "bg-secondary/10",
            border: "border-secondary",
            delay: 0.25,
          },
          {
            label: "Avg. Rating",
            value: "4.8 ★",
            Icon: Star,
            color: "text-accent",
            bg: "bg-accent/10",
            border: "border-accent",
            delay: 0.3,
          },
        ].map(({ label, value, Icon, color, bg, border, delay }) => (
          <BlurFade key={label} direction="bottom" blur="0" delay={delay}>
            <div
              className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${border} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs font-medium mb-1">
                    {label}
                  </p>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                </div>
                <div className={`p-3 ${bg} rounded-full`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Orders + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Card */}
        <BlurFade direction="bottom" blur="0" delay={0.35}>
          <div className="bg-primary rounded-3xl p-6 text-white h-72 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Orders</h2>
              </div>
              <div className="space-y-3">
                {[
                  { label: "New Orders", value: 24 },
                  { label: "Processing", value: 12 },
                  { label: "Completed", value: 156 },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-white/70">{label}</span>
                    <span className="font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary w-full"
              onClick={() => navigate("/vendor/orders")}
            >
              View All Orders
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </BlurFade>

        {/* Weekly Sales Chart */}
        <BlurFade direction="bottom" blur="0" delay={0.4} className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-6 border border-accent/20 h-72">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-secondary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Weekly Sales
                </h2>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>+18% this week</span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between h-36 gap-2 px-2">
              {weeklyData.map(({ day, sales }) => {
                const heightPct = Math.round((sales / maxSales) * 100);
                return (
                  <div
                    key={day}
                    className="flex flex-col items-center gap-1 flex-1"
                  >
                    <span className="text-xs text-muted-foreground font-medium">
                      {sales}
                    </span>
                    <div className="w-full relative flex items-end" style={{ height: "96px" }}>
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-primary to-secondary transition-all duration-700"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Recent Orders + Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <BlurFade direction="bottom" blur="0" delay={0.45}>
          <div className="bg-white rounded-3xl p-6 border border-accent/20">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Orders
              </h2>
              <button
                onClick={() => navigate("/vendor/orders")}
                className="text-sm text-secondary hover:underline flex items-center gap-1"
              >
                See all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => {
                const cfg = statusConfig[order.status];
                const StatusIcon = cfg.Icon;
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3 border-b border-muted last:border-0"
                  >
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {order.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.id} · {order.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-sm text-green-600">
                        GH₵{order.amount.toFixed(2)}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${cfg.className}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </BlurFade>

        {/* Recent Messages */}
        <BlurFade direction="bottom" blur="0" delay={0.5}>
          <div className="bg-white rounded-3xl p-6 border border-accent/20">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Messages
              </h2>
              <span className="text-xs bg-primary text-white rounded-full px-2 py-0.5 font-medium">
                2 new
              </span>
            </div>
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 py-3 border-b border-muted last:border-0"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="font-medium text-sm text-foreground">
                        {msg.customer}
                      </p>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {msg.message}
                    </p>
                  </div>
                  {msg.unread && (
                    <div className="w-2 h-2 bg-secondary rounded-full shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
};

export default VendorHome;
