import { BlurFade } from "@/components/ui/blur-fade";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/input/InputField";
import {
  ChevronDown,
  ChevronUp,
  LockIcon,
  Mail,
  ShoppingBag,
} from "lucide-react";
import Button from "@/components/ui/custom/Button";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { images } from "@/assets/assets";
import { defaultVendor } from "@/lib/data";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showHint, setShowHint] = useState(false);
  const {
    updateLogin,
    updateVendor,
    admins,
    updateName,
    updateRole,
    vendors,
    users,
  } = useAuthStore();

  const handleLogIn = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const email = values.email.toLowerCase().trim();
    const { password } = values;

    const vendor = vendors.find(
      (v) => v.email.toLowerCase() === email && v.password === password,
    );
    if (vendor) {
      updateLogin({ email, password });
      updateVendor(vendor);
      toast.success(`Welcome back, ${vendor.name || vendor.businessName}!`);
      navigate("/vendor/", { replace: true });
      setSubmitting(false);
      return;
    }

    const user = users.find(
      (u) => u.email.toLowerCase() === email && u.password === password,
    );
    if (user) {
      updateLogin({ email, password });
      updateName({ name: user.name });
      updateRole("customer");
      toast.success(`Welcome back, ${user.name}!`);
      navigate("/", { replace: true });
      setSubmitting(false);
      return;
    }

    const admin = admins.find(
      (a) => a.email.toLowerCase() === email && a.password === password,
    );
    if (admin) {
      updateLogin({ email, password });
      updateName({ name: admin.name });
      updateRole("admin");
      navigate("/admin/", { replace: true });
      resetForm();
      setSubmitting(false);
      return;
    }

    toast.error("Incorrect email or password. Please try again.");
    setSubmitting(false);
  };

  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: handleLogIn,
  });

  const fillVendorCredentials = () => {
    loginFormik.setValues({
      email: defaultVendor.email,
      password: defaultVendor.password,
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-blue-700 to-blue-500">
      {/* Left panel */}
      <section className="relative overflow-hidden h-44 md:min-h-screen md:flex-[0_0_42%]">
        <img
          src={images.img2}
          className="absolute inset-0 w-full h-full object-cover opacity-50 md:opacity-100"
        />
        <div className="absolute inset-0  bg-gradient-to-t from-primary/90 via-orange-700/20 to-transparent md:flex hidden flex-col justify-end p-10">
          <div className="text-white mb-8">
            <Link to={"/"} className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-400 w-6 h-6 rounded-full p-2"></div>
              <span className="font-Montserrat font-bold text-xl text-white">
                CampusVendor
              </span>
            </Link>
            <h2 className="text-3xl font-Montserrat leading-tight mb-3">
              Good to see
              <br />
              you again.
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Sign in to browse products, track your orders, and connect with
              campus vendors.
            </p>
          </div>
        </div>

        {/* Mobile logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden flex items-center gap-2">
          <div className="bg-yellow-400 rounded-full p-2">
            <ShoppingBag className="w-5 h-5 text-blue-900" />
          </div>
          <span className="font-Montserrat font-bold text-lg text-white">
            CampusVendor
          </span>
        </div>
      </section>

      {/* Right panel */}
      <section className="bg-gray-50 flex-1 md:h-screen overflow-auto rounded-t-3xl md:rounded-none">
        <BlurFade
          direction="top"
          blur="0"
          delay={0.3}
          duration={0.8}
          className="flex justify-center md:min-h-screen items-center px-6 py-10"
        >
          <div className="w-full max-w-md font-Montserrat">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold font-Montserrat">
                <span className="bg-gradient-to-tr from-primary to-orange-400 bg-clip-text text-transparent">
                  Welcome
                </span>{" "}
                <span className="text-orange-500">Back</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Sign in to your CampusVendor account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={loginFormik.handleSubmit} className="space-y-5">
              <div className=" space-y-5">
                <InputField
                  formik={loginFormik}
                  label="Email Address"
                  name="email"
                  type="email"
                  Icon={Mail}
                  placeholder="e.g. email@ug.edu.gh"
                />
                <InputField
                  formik={loginFormik}
                  label="Password"
                  Icon={LockIcon}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <Button
                type="submit"
                disabled={loginFormik.isSubmitting || !loginFormik.isValid}
                isLoading={loginFormik.isSubmitting}
                className="w-fit !rounded-full !py-3 mx-auto justify-center"
              >
                {loginFormik.isSubmitting ? "" : "Sign In"}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowHint((p) => !p)}
                className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-semibold text-blue-700">
                    Demo credentials
                  </span>
                </div>
                {showHint ? (
                  <ChevronUp className="w-4 h-4 text-blue-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-blue-500" />
                )}
              </button>

              {showHint && (
                <div className="px-4 pb-4 space-y-3">
                  {/* Vendor */}
                  <div className="bg-white rounded-xl p-3 border border-blue-100">
                    <p className="text-xs font-bold text-blue-800 mb-2 uppercase tracking-wide">
                      Vendor account
                    </p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email</span>
                        <span className="font-medium">
                          {defaultVendor.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Password</span>
                        <span className="font-medium">
                          {defaultVendor.password}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={fillVendorCredentials}
                      className="mt-2 w-full text-xs text-blue-600 font-semibold bg-blue-50 hover:bg-blue-100 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Use these credentials
                    </button>
                  </div>

                  {/* Customer */}
                  <div className="bg-white rounded-xl p-3 border border-gray-100">
                    <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">
                      Customer account
                    </p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email</span>
                        <span className="font-medium">user@email.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Password</span>
                        <span className="font-medium">12345678</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        loginFormik.setValues({
                          email: "user@email.com",
                          password: "12345678",
                        })
                      }
                      className="mt-2 w-full text-xs text-gray-600 font-semibold bg-gray-50 hover:bg-gray-100 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Use these credentials
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <NavLink
                to="/auth/signup"
                className="text-accent font-semibold hover:underline"
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </BlurFade>
      </section>
    </div>
  );
};

export default Login;
