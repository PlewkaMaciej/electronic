import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import StyleInput from "../component/Items/StyleInput";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";

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

const loginUser = async (userData: LoginValues) => {
  const response = await axios.post("/auth/login", userData);
  return response.data;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    mutate: doLogin,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation(loginUser, {
    onSuccess: (data) => {
      const { token } = data;

      localStorage.setItem("accessToken", token);

      navigate("/");
    },
    onError: (err: any) => {
      console.error("Błąd logowania:", err);
    },
  });

  const handleSubmit = (values: LoginValues) => {
    doLogin({
      email: values.email,
      password: values.password,
    });
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

            {isError && (
              <p className="text-red-500 text-center text-sm">
                {(error as any)?.response?.data?.error ||
                  "Nieprawidłowy email lub hasło"}
              </p>
            )}

            {isSuccess && (
              <p className="text-green-500 text-center text-sm">
                Logowanie zakończone sukcesem. Przekierowuję…
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#339FB8] text-white py-3 rounded-lg shadow-md hover:bg-[#2b8fa6] transition-all duration-200 font-medium disabled:opacity-60"
            >
              {isLoading ? "Logowanie..." : "Zaloguj się"}
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

            {(isError || isSuccess) && (
              <button
                type="button"
                onClick={() => reset()}
                className="mt-4 w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition duration-150"
              >
                Resetuj status
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
