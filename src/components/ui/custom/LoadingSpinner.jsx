import React from "react";
import { ShoppingCart, Package, DollarSign } from "lucide-react";
import { images } from "@/assets/assets";

/**
 * Custom Loading Spinner component for e-commerce, featuring an orbiting
 * Buy/Sell icon animation and customizable colors.
 *
 * @param {string} message - The fixed message displayed below the spinner (no internal cycling).
 * @param {string} themeColor - The primary Tailwind color for the spinner (e.g., 'green', 'indigo', 'yellow').
 */
const LoadingSpinner = ({ message = "Loading..." }) => {
  // Custom CSS for the exchange animation.
  const animationStyles = `
    @keyframes orbit {
      0% { transform: rotate(0deg) translateX(70px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
    }

    .icon-package {
      animation: orbit 3s linear infinite;
    }

    .icon-cart {
      animation: orbit 3s linear infinite reverse;
    }

    @keyframes pulse-center {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }

    .icon-center {
      animation: pulse-center 2s ease-in-out infinite;
    }
  `;
  const gradientbg = "bg-gradient-to-r from-blue-700 to-blue-500";

  return (
    // Inject the custom CSS animation styles
    <>
      <style>{animationStyles}</style>

      {/* Full screen dark overlay */}
      <div className=" flex items-center justify-center p-4 font-['Inter']">
        {/* Loading Card/Container */}
        <div className={` text-center max-w-sm w-full `}>
          {/* Icon Animation Area */}
          <div className="relative flex items-center justify-center mb-8">
            <div className={`absolute icon-center `}>
              <img
                src={images.logo}
                alt="Logo"
                className="h-15 w-15 object-contain"
              />
            </div>
          </div>

          {/* Loading Indicator and Text */}
          <div className="space-y-4">
            {/* Display the fixed message prop */}
            <p className="text-sm font-medium text-gray-400 h-6 transition-opacity duration-500">
              {message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
