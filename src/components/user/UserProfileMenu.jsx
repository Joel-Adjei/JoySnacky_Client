import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import useOrderStore from "@/store/useOrderStore";
import { Mail, LogOut, Package, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";

const UserProfileMenu = () => {
  const navigate = useNavigate();
  const { email, user, updateLogout } = useAuthStore();
  const { orders } = useOrderStore();

  const pendingCount = orders.filter(
    (o) => o.status === "pending" || o.status === "processing",
  ).length;

  const initials = user?.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "U";

  const handleLogout = () => {
    updateLogout();
    toast.success("Logged out successfully!");
  };

  return (
    <div className="w-64 font-Montserrat">
      <DropdownMenuItem className="p-0 focus:bg-transparent cursor-default">
        <div className="w-full px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-orange-600 to-orange-400 rounded-full flex items-center justify-center shadow-md shadow-blue-200 flex-shrink-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-sm font-bold">{initials}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-400 truncate flex items-center gap-1 mt-0.5">
                <Mail size={10} className="flex-shrink-0" />
                {email || "user@email.com"}
              </p>
            </div>
          </div>
        </div>
      </DropdownMenuItem>

      <DropdownMenuSeparator className="mx-3 my-0" />

      {/* My Orders */}
      <DropdownMenuItem
        className="mx-2 my-1.5 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-orange-50 focus:bg-orange-50 transition-colors group"
        onClick={() => navigate("/orders")}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Package size={15} className="text-orange-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-700 transition-colors">
              My Orders
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {pendingCount > 0 && (
              <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
                {pendingCount}
              </span>
            )}
            <ChevronRight
              size={14}
              className="text-gray-300 group-hover:text-orange-400 transition-colors"
            />
          </div>
        </div>
      </DropdownMenuItem>

      <DropdownMenuSeparator className="mx-3 my-0" />

      {/* Logout */}
      <DropdownMenuItem
        className="mx-2 my-1.5 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-red-50 focus:bg-red-50 transition-colors group"
        onClick={handleLogout}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
            <LogOut size={15} className="text-red-500" />
          </div>
          <span className="text-sm font-semibold text-gray-600 group-hover:text-red-600 transition-colors">
            Log Out
          </span>
        </div>
      </DropdownMenuItem>
    </div>
  );
};

export default UserProfileMenu;
