import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import StyleInput from "../component/Items/StyleInput";
import { Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("Imię jest wymagane"),
  lastName: Yup.string().required("Nazwisko jest wymagane"),
  email: Yup.string()
    .email("Nieprawidłowy email")
    .required("Email jest wymagany"),
  password: Yup.string()
    .min(6, "Minimum 6 znaków")
    .required("Hasło jest wymagane"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Hasła muszą się zgadzać")
    .required("Potwierdź hasło"),
  agreement: Yup.boolean().oneOf([true], "Musisz zaakceptować zgodę"),
});

const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post("/auth/register", userData);
  return response.data;
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    mutate: doRegister,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation(registerUser, {
    onSuccess: () => {
      toast.success("Rejestracja przebiegła pomyślnie!");
      navigate("/login-email");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          "Wystąpił błąd podczas rejestracji. Spróbuj ponownie."
      );
    },
  });

  const handleSubmit = (values: any) => {
    doRegister({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#2F4F4F] mb-6 text-center">
        Zarejestruj się
      </h2>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreement: false,
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnChange
      >
        {({ errors, touched }) => (
          <Form className="space-y-5">
            <Field
              name="firstName"
              as={StyleInput}
              label="Imię"
              type="text"
              icon={<User />}
              error={
                touched.firstName && errors.firstName ? errors.firstName : ""
              }
              success={touched.firstName && !errors.firstName}
              className="bg-white"
            />

            <Field
              name="lastName"
              as={StyleInput}
              label="Nazwisko"
              type="text"
              icon={<User />}
              error={touched.lastName && errors.lastName ? errors.lastName : ""}
              success={touched.lastName && !errors.lastName}
              className="bg-white"
            />

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

            <Field
              name="confirmPassword"
              as={StyleInput}
              label="Potwierdź hasło"
              type="password"
              icon={<Lock />}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : ""
              }
              success={touched.confirmPassword && !errors.confirmPassword}
              className="bg-white"
            />

            <div className="flex items-start space-x-2">
              <Field type="checkbox" name="agreement" className="mt-1" />
              <label className="text-sm text-gray-700">
                Akceptuję{" "}
                <a href="/regulamin" className="text-[#339FB8] underline">
                  regulamin
                </a>{" "}
                oraz politykę prywatności.
              </label>
            </div>
            {touched.agreement && errors.agreement && (
              <p className="text-red-500 text-sm">{errors.agreement}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#339FB8] text-white py-3 rounded-lg shadow-md hover:bg-[#2b8fa6] transition-all duration-200 font-medium disabled:opacity-60"
            >
              {isLoading ? "Rejestrowanie..." : "Zarejestruj się"}
            </button>

            <p className="text-center text-sm mt-2">
              Masz już konto?{" "}
              <Link
                to="/login"
                className="text-[#339FB8] font-medium hover:underline"
              >
                Zaloguj się
              </Link>
            </p>

            {isError || isSuccess ? (
              <button
                type="button"
                onClick={() => reset()}
                className="mt-4 w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition duration-150"
              >
                Resetuj status
              </button>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
