import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import StyleInput from "../component/Items/StyleInput";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy email")
    .required("Email jest wymagany"),
  password: Yup.string()
    .min(6, "Minimum 6 znaków")
    .required("Hasło jest wymagane"),
});

const LoginPage: React.FC = () => {
  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Logowanie:", values);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#2F4F4F] mb-6 text-center">
        Zaloguj się
      </h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnChange
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-5">
            <Field
              name="email"
              as={StyleInput}
              label="Email"
              type="email"
              icon={<Mail />}
              error={touched.email && errors.email ? errors.email : ""}
              success={touched.email && !errors.email}
              className="bg-white"
            />

            <Field
              name="password"
              as={StyleInput}
              label="Hasło"
              type="password"
              icon={<Lock />}
              error={touched.password && errors.password ? errors.password : ""}
              success={touched.password && !errors.password}
              className="bg-white"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#339FB8] text-white py-3 rounded-lg shadow-md hover:bg-[#2b8fa6] transition-all duration-200 font-medium"
            >
              {isSubmitting ? "Logowanie..." : "Zaloguj się"}
            </button>

            <p className="text-center text-sm mt-2">
              Nie masz konta?{" "}
              <Link
                to="/register"
                className="text-[#339FB8] font-medium hover:underline"
              >
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
