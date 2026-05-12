import { BlurFade } from "@/components/ui/blur-fade";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@/components/ui/custom/Button";
import InputField from "@/components/input/InputField";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockIcon,
  Mail,
  ShoppingBag,
  User2,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { images } from "@/assets/assets";

const step1Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const step2Schema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions",
  ),
});

const steps = [
  { label: "Your Info", desc: "Name & Email" },
  { label: "Security", desc: "Set password" },
];

const Signup = () => {
  const [step, setStep] = useState(1);
  const { signUpUser, users, updateLogin, updateName, updateRole } =
    useAuthStore();
  const navigate = useNavigate();

  const step1 = useFormik({
    initialValues: { name: "", email: "" },
    validationSchema: step1Schema,
    onSubmit: () => setStep(2),
  });

  const step2 = useFormik({
    initialValues: { password: "", confirmPassword: "", terms: false },
    validationSchema: step2Schema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const email = step1.values.email.toLowerCase().trim();

      const emailExists = users.some((u) => u.email.toLowerCase() === email);
      if (emailExists) {
        toast.error("An account with this email already exists.");
        setSubmitting(false);
        return;
      }

      const newUser = {
        name: step1.values.name.trim(),
        email,
        password: values.password,
        role: "customer",
      };

      signUpUser(newUser);
      updateLogin({ email, password: values.password });
      updateName({ name: newUser.name });
      updateRole("customer");

      toast.success(`Welcome, ${newUser.name}! 🎉`);
      navigate("/");
      setSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-blue-700 to-blue-500">
      {/* Left panel */}
      <section className="relative overflow-hidden h-44 md:min-h-screen md:flex-[0_0_42%]">
        <img
          src={images.img1}
          className="absolute inset-0 w-full h-full object-cover opacity-30 md:opacity-100"
        />
        <div className="absolute inset-0  bg-gradient-to-t from-primary/90 via-orange-700/20 to-transparent md:flex hidden flex-col justify-end p-10">
          <div className="text-white mb-8">
            <Link to={"/"} className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-400 w-6 h-6 rounded-full p-2"></div>
              <span className="font-Montserrat font-bold text-xl text-white">
                CampusVendor
              </span>
            </Link>
            <h2 className="text-3xl font-bold font-Montserrat leading-tight mb-3">
              Shop smart,
              <br />
              shop campus.
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Discover products and services from vendors right on your campus.
              Fast, easy, and made for students.
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
      <section className="bg-white flex-1 md:h-screen overflow-auto rounded-t-3xl md:rounded-none">
        <BlurFade direction="top" blur="0" delay={0.3} duration={0.8}>
          <div className="min-h-screen flex items-center justify-center p-6 py-10">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold font-Montserrat">
                  <span className="bg-gradient-to-tr from-primary to-orange-400 bg-clip-text text-transparent">
                    Create
                  </span>{" "}
                  <span className="text-orange-500">Account</span>
                </h1>
                <p className="text-gray-500 text-sm mt-2">
                  {step === 1
                    ? "Tell us a bit about yourself"
                    : "Secure your account with a password"}
                </p>
              </div>

              {/* Step indicators */}
              <div className="flex items-center justify-center gap-0 mb-10">
                {steps.map((s, i) => {
                  const num = i + 1;
                  const isActive = step === num;
                  const isDone = step > num;
                  return (
                    <React.Fragment key={num}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                            isDone
                              ? "bg-green-500 text-white"
                              : isActive
                                ? "bg-orange-900 text-white shadow-lg shadow-orange-200"
                                : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : num}
                        </div>
                        <div className="mt-1.5 text-center">
                          <p
                            className={`text-xs font-semibold font-Montserrat ${
                              isActive
                                ? "text-orange-600"
                                : isDone
                                  ? "text-green-600"
                                  : "text-gray-400"
                            }`}
                          >
                            {s.label}
                          </p>
                          <p className="text-xs text-gray-400">{s.desc}</p>
                        </div>
                      </div>
                      {i < steps.length - 1 && (
                        <div
                          className={`h-0.5 w-16 mx-2 mb-7 transition-all duration-500 ${
                            step > num ? "bg-green-400" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <form onSubmit={step1.handleSubmit} className="space-y-5">
                  <div className=" space-y-5">
                    <InputField
                      label="Full Name"
                      name="name"
                      type="text"
                      formik={step1}
                      isRequired
                      placeholder="e.g. Abigail Mensah"
                      Icon={User2}
                    />
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      formik={step1}
                      isRequired
                      placeholder="e.g. yourname@ug.edu.gh"
                      Icon={Mail}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    iconType="icon-right"
                    Icon={ArrowRight}
                    iconSize={16}
                    className="w-full !rounded-xl !py-3 justify-center"
                  >
                    Continue
                  </Button>
                </form>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <form onSubmit={step2.handleSubmit} className="space-y-5">
                  <div className=" space-y-5">
                    <div className="px-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center rounded-full shadow-md gap-3 p-3 bg-orange-50/80 border border-gray-200">
                        <div className="bg-white rounded-full p-2">
                          <User2 className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">
                            Registering as
                          </p>
                          <p className="text-sm font-semibold text-gray-700">
                            {step1.values.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {step1.values.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <InputField
                      label="Password"
                      name="password"
                      type="password"
                      formik={step2}
                      isRequired
                      placeholder="At least 8 characters"
                      Icon={LockIcon}
                    />
                    <InputField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      formik={step2}
                      isRequired
                      placeholder="Re-enter your password"
                      Icon={LockIcon}
                    />

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={step2.values.terms}
                        onChange={(e) =>
                          step2.setFieldValue("terms", e.target.checked)
                        }
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-600 leading-relaxed">
                        I agree to the{" "}
                        <span className="text-primary hover:underline cursor-pointer">
                          Terms and Conditions
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline cursor-pointer">
                          Privacy Policy
                        </span>
                      </span>
                    </label>
                    {step2.touched.terms && step2.errors.terms && (
                      <p className="text-red-500 text-xs -mt-3">
                        {step2.errors.terms}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={step2.isSubmitting}
                      disabled={step2.isSubmitting}
                      className="flex-1 !rounded-xl !py-3 justify-center"
                    >
                      {step2.isSubmitting ? "" : "Create Account"}
                    </Button>
                  </div>
                </form>
              )}

              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <NavLink
                  to="/auth/login"
                  className="text-accent font-semibold hover:underline"
                >
                  Log in
                </NavLink>
              </p>
            </div>
          </div>
        </BlurFade>
      </section>
    </div>
  );
};

export default Signup;
