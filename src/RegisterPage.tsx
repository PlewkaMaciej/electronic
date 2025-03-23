import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import StyleInput from "../component/Items/StyleInput";
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";

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

const RegisterPage: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log("Rejestracja:", values);
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
        {({ errors, touched, isSubmitting }) => (
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
              disabled={isSubmitting}
              className="w-full bg-[#339FB8] text-white py-3 rounded-lg shadow-md hover:bg-[#2b8fa6] transition-all duration-200 font-medium"
            >
              {isSubmitting ? "Rejestrowanie..." : "Zarejestruj się"}
            </button>

            <p className="text-center text-sm mt-2">
              Masz już konto?{" "}
              <Link
                to="/login-email"
                className="text-[#339FB8] font-medium hover:underline"
              >
                Zaloguj się
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
