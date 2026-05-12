import React, { useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  MapPin,
  Clock,
  Badge,
  Package,
  User,
  DollarSign,
  Plus,
} from "lucide-react";
import Button from "./custom/Button";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/utils";
import { getRatingStars } from "@/lib/minComp";

const ProductCard = ({
  product = {},
  price,
  image,
  title,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  rating,
  type = "new",
  reviewsCount,
  className = "",
  variant = "default",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/products/${product.id}`);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "featured":
        return "bg-gradient-to-br from-primary/5 via-secondary/5 to-white border-2 border-primary/20";
      case "sale":
        return "bg-gradient-to-br from-red-50 via-orange-50 to-white border-2 border-red-100";
      default:
        return "bg-white border border-gray-100 shadow-sm";
    }
  };

  return (
    <div
      className={`
        ${getVariantStyles()}
        font-Montserrat h-full
        rounded-lg shadow-lg hover:shadow-2xl 
        transition-all duration-500 ease-out 
        transform hover:-translate-y-2
        cursor-pointer group relative overflow-hidden
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      {/* Product Image Wrapper */}
      <div className="relative h-56 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
            <Package className="w-10 h-10 text-slate-300" />
          </div>
        )}

        <img
          src={image || "/api/placeholder/300/300"}
          alt={title}
          className={`
            w-full h-full object-cover transition-transform duration-1000
            ${isHovered ? "scale-110" : "scale-100"}
            ${imageLoaded ? "opacity-100" : "opacity-0"}
          `}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Badge Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold text-white bg-primary/90 backdrop-blur-sm shadow-lg uppercase tracking-widest">
            {product.category || "New"}
          </span>
        </div>

        {/* Action Overlay */}
        <div
          className={`
          absolute inset-0 bg-primary/20 backdrop-blur-[2px]
          flex items-center justify-center gap-4
          transition-all duration-500
          ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        >
          <div className="p-3 bg-white text-primary rounded-full shadow-xl hover:bg-primary hover:text-white transition-colors duration-300">
            <Eye size={20} />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-2">
        <div className="space-y-1">
          <h3 className="font-bold text-primary text- line-clamp-1 group-hover:text-secondary transition-colors duration-300">
            {title || "Product Name"}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex text-secondary text-xs">
              {getRatingStars(rating || 5)}
            </div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              {reviewsCount || 0} Reviews
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-md font-medium text-primary">
              {formatPrice(price)}
            </span>
          </div>

          <button className="p-2 bg-secondary/10 text-secondary rounded-xl group-hover:bg-secondary group-hover:text-white transition-all duration-300">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Decorative gradient border on hover */}
      <div
        className={`
        absolute inset-0 border-2 border-secondary/0 rounded-lg
        transition-all duration-500
        ${isHovered ? "border-secondary/40" : ""}
      `}
      />
    </div>
  );
};

export default ProductCard;
