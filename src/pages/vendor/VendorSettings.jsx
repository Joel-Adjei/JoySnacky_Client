import React, { useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import Button from "@/components/ui/custom/Button";
import {
  Settings,
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  Bell,
  Save,
  Store,
  Facebook,
  Twitter,
  Instagram,
  CheckCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";

const TABS = [
  { id: "profile", label: "Business Profile", Icon: User },
  { id: "contact", label: "Contact Info", Icon: Phone },
  { id: "hours", label: "Store Hours", Icon: Clock },
  { id: "notifications", label: "Notifications", Icon: Bell },
];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultHours = DAYS.reduce(
  (acc, day) => ({
    ...acc,
    [day]: { open: "08:00", close: "18:00", isOpen: day !== "Sunday" },
  }),
  {}
);

const InputField = ({ label, icon: Icon, type = "text", ...props }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-foreground">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      )}
      <input
        type={type}
        className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white ${
          Icon ? "pl-10" : ""
        }`}
        {...props}
      />
    </div>
  </div>
);

const TextareaField = ({ label, ...props }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-foreground">{label}</label>
    <textarea
      rows={4}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white resize-none"
      {...props}
    />
  </div>
);

const Toggle = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3 border-b border-muted last:border-0">
    <div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      {description && (
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      )}
    </div>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
        checked ? "bg-primary" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

const VendorSettings = () => {
  const { businessName, description, phoneNumber, location, email } =
    useAuthStore();

  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    businessName: businessName || "",
    description: description || "",
    category: "Food & Snacks",
    storeTag: "@joysnacky",
  });

  const [contact, setContact] = useState({
    phone: phoneNumber || "",
    email: email || "",
    location: location || "",
    website: "",
    facebook: "",
    twitter: "",
    instagram: "",
  });

  const [hours, setHours] = useState(defaultHours);

  const [notifications, setNotifications] = useState({
    newOrder: true,
    orderStatus: true,
    newMessage: true,
    lowStock: true,
    promotions: false,
    weeklyReport: false,
  });

  const handleSave = () => {
    setSaved(true);
    toast.success("Settings saved successfully!");
    setTimeout(() => setSaved(false), 3000);
  };

  const updateHour = (day, field, value) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  return (
    <div className="p-6 bg-muted min-h-screen space-y-6">
      {/* Page Header */}
      <BlurFade direction="bottom" blur="0" delay={0.1}>
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Store Settings</h1>
              <p className="text-white/70 text-sm mt-0.5">
                Manage your store profile, contact information, and preferences.
              </p>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Settings Layout */}
      <BlurFade direction="bottom" blur="0" delay={0.2}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:w-56 shrink-0">
            <div className="bg-white rounded-2xl p-2 border border-accent/20 space-y-1">
              {TABS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === id
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 bg-white rounded-2xl border border-accent/20 p-6">
            {/* ── Business Profile ── */}
            {activeTab === "profile" && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-6">
                  <Store className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Business Profile
                  </h2>
                </div>

                {/* Logo */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-foreground">
                    Store Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-dashed border-primary/30">
                      <Store className="w-7 h-7 text-primary/50" />
                    </div>
                    <label className="cursor-pointer px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-foreground hover:bg-muted transition">
                      Upload Logo
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  </div>
                </div>

                <InputField
                  label="Business Name"
                  icon={Store}
                  value={profile.businessName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, businessName: e.target.value }))
                  }
                  placeholder="e.g. Joy Snacky"
                />

                <TextareaField
                  label="Business Description"
                  value={profile.description}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Tell customers what you sell and what makes your store unique..."
                />

                <InputField
                  label="Store Category"
                  icon={null}
                  value={profile.category}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, category: e.target.value }))
                  }
                  placeholder="e.g. Food & Snacks, Electronics, Clothing..."
                />

                <InputField
                  label="Store Tag / Handle"
                  value={profile.storeTag}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, storeTag: e.target.value }))
                  }
                  placeholder="@yourstorename"
                />
              </div>
            )}

            {/* ── Contact Information ── */}
            {activeTab === "contact" && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-6">
                  <Phone className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Contact Information
                  </h2>
                </div>

                <InputField
                  label="Phone Number"
                  icon={Phone}
                  type="tel"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, phone: e.target.value }))
                  }
                  placeholder="+233 XX XXX XXXX"
                />

                <InputField
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, email: e.target.value }))
                  }
                  placeholder="store@example.com"
                />

                <InputField
                  label="Store Location / Address"
                  icon={MapPin}
                  value={contact.location}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, location: e.target.value }))
                  }
                  placeholder="e.g. Commonwealth Hall, UG Campus"
                />

                <InputField
                  label="Website URL"
                  icon={Globe}
                  type="url"
                  value={contact.website}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, website: e.target.value }))
                  }
                  placeholder="https://yourstore.com"
                />

                <hr className="border-muted" />

                <p className="text-sm font-semibold text-foreground">
                  Social Media
                </p>

                <InputField
                  label="Facebook"
                  icon={Facebook}
                  value={contact.facebook}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, facebook: e.target.value }))
                  }
                  placeholder="facebook.com/yourpage"
                />

                <InputField
                  label="Twitter / X"
                  icon={Twitter}
                  value={contact.twitter}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, twitter: e.target.value }))
                  }
                  placeholder="@yourhandle"
                />

                <InputField
                  label="Instagram"
                  icon={Instagram}
                  value={contact.instagram}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, instagram: e.target.value }))
                  }
                  placeholder="@yourhandle"
                />
              </div>
            )}

            {/* ── Store Hours ── */}
            {activeTab === "hours" && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Store Hours
                  </h2>
                </div>

                <p className="text-sm text-muted-foreground -mt-3">
                  Set your operating hours so customers know when you're open.
                </p>

                <div className="space-y-3">
                  {DAYS.map((day) => (
                    <div
                      key={day}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition ${
                        hours[day].isOpen
                          ? "border-primary/20 bg-primary/5"
                          : "border-gray-100 bg-gray-50"
                      }`}
                    >
                      {/* Toggle */}
                      <button
                        type="button"
                        onClick={() =>
                          updateHour(day, "isOpen", !hours[day].isOpen)
                        }
                        className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${
                          hours[day].isOpen ? "bg-primary" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            hours[day].isOpen ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>

                      <span
                        className={`w-24 text-sm font-medium shrink-0 ${
                          hours[day].isOpen
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {day.slice(0, 3)}
                      </span>

                      {hours[day].isOpen ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="time"
                            value={hours[day].open}
                            onChange={(e) =>
                              updateHour(day, "open", e.target.value)
                            }
                            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                          />
                          <span className="text-muted-foreground text-sm">
                            to
                          </span>
                          <input
                            type="time"
                            value={hours[day].close}
                            onChange={(e) =>
                              updateHour(day, "close", e.target.value)
                            }
                            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                          />
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">
                          Closed
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Notifications ── */}
            {activeTab === "notifications" && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-6">
                  <Bell className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Notification Preferences
                  </h2>
                </div>

                <p className="text-sm text-muted-foreground -mt-3 mb-4">
                  Choose which notifications you'd like to receive.
                </p>

                <div className="space-y-1">
                  {[
                    {
                      key: "newOrder",
                      label: "New Orders",
                      description: "Get notified when you receive a new order",
                    },
                    {
                      key: "orderStatus",
                      label: "Order Status Updates",
                      description:
                        "Alerts when an order status changes",
                    },
                    {
                      key: "newMessage",
                      label: "New Messages",
                      description:
                        "Get notified when a customer sends a message",
                    },
                    {
                      key: "lowStock",
                      label: "Low Stock Alerts",
                      description:
                        "Alert when a product stock falls below 5 units",
                    },
                    {
                      key: "promotions",
                      label: "Platform Promotions",
                      description:
                        "Receive tips and promotional campaign updates",
                    },
                    {
                      key: "weeklyReport",
                      label: "Weekly Summary Report",
                      description:
                        "A weekly digest of your store performance",
                    },
                  ].map(({ key, label, description }) => (
                    <Toggle
                      key={key}
                      label={label}
                      description={description}
                      checked={notifications[key]}
                      onChange={(val) =>
                        setNotifications((n) => ({ ...n, [key]: val }))
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-muted flex justify-end">
              <Button
                variant="primary"
                onClick={handleSave}
                className="min-w-36"
              >
                {saved ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  );
};

export default VendorSettings;
