import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import StyleInput from "../component/Items/StyleInput";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { loginUser } from "./store/slices/authSlice";
import { toast } from "react-toastify";

interface LoginValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy email")
    .required("Email jest wymagany"),
  password: Yup.string()
    .min(6, "Minimum 6 znaków")
    .required("Hasło jest wymagane"),
});

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (values: LoginValues) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      toast.success("Zalogowano pomyślnie!");
      navigate("/");
    } catch (err: any) {
      toast.error(err || "Nieprawidłowe dane logowania.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-50 border p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Zaloguj się</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-5">
            <Field
              name="email"
              as={StyleInput}
              label="Email"
              type="email"
              icon={<Mail />}
              error={touched.email && errors.email ? errors.email : ""}
              success={touched.email && !errors.email}
            />
            <Field
              name="password"
              as={StyleInput}
              label="Hasło"
              type="password"
              icon={<Lock />}
              error={touched.password && errors.password ? errors.password : ""}
              success={touched.password && !errors.password}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full  text-white py-3 rounded-lg   hover:bg-[#00597A] bg-[#006F91] transition disabled:opacity-60"
            >
              {isLoading ? "Logowanie..." : "Zaloguj się"}
            </button>
            <p className="text-center text-sm mt-2">
              Nie masz konta?{" "}
              <Link to="/register" className="text-[#006F91] hover:underline">
                Zarejestruj się
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
