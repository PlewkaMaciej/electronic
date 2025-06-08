import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import StyleInput from "../../component/Items/StyleInput";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
interface UpdateValues {
  email: string;
  currentPassword: string;
  newPassword: string;
}

const UpdateSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy email")
    .required("Email jest wymagany"),
  currentPassword: Yup.string().required("Aktualne hasło jest wymagane"),
  newPassword: Yup.string()
    .min(6, "Minimum 6 znaków")
    .required("Nowe hasło jest wymagane"),
});

const fetchCurrentUser = async () => {
  const token = localStorage.getItem("accessToken");
  const { data } = await axios.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.user;
};

const updateAccount = async (values: UpdateValues) => {
  const token = localStorage.getItem("accessToken");
  const { data } = await axios.put(
    "/auth/update-password", // ✅ Poprawiona ścieżka
    {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

const UpdateAccount: React.FC = () => {
  const navigate=useNavigate()
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: isFetching,
    isError: fetchError,
  } = useQuery("currentUser", fetchCurrentUser);

  const {
    mutate: doUpdate,
    isLoading: isUpdating,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation(updateAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentUser");
      navigate("/")
    },
  });

  if (isFetching) {
    return <p className="text-center mt-10">Ładowanie danych użytkownika…</p>;
  }

  if (fetchError || !user) {
    return (
      <p className="text-red-500 text-center mt-10">
        Nie udało się pobrać danych użytkownika.
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#2F4F4F] mb-6 text-center">
        Aktualizuj konto
      </h2>

      <Formik
        enableReinitialize
        initialValues={{
          email: user.email,
          currentPassword: "",
          newPassword: "",
        }}
        validationSchema={UpdateSchema}
        onSubmit={(values) => {
          doUpdate(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-5">
            <Field
              name="email"
              as={StyleInput}
              label="Email"
              type="email"
              icon={<Mail />}
              disabled // Email nie jest aktualizowany w backendzie
              error={touched.email && errors.email ? errors.email : ""}
              success={touched.email && !errors.email}
              className="bg-white"
            />

            <Field
              name="currentPassword"
              as={StyleInput}
              label="Aktualne hasło"
              type="password"
              icon={<Lock />}
              error={
                touched.currentPassword && errors.currentPassword
                  ? errors.currentPassword
                  : ""
              }
              success={touched.currentPassword && !errors.currentPassword}
              className="bg-white"
            />

            <Field
              name="newPassword"
              as={StyleInput}
              label="Nowe hasło"
              type="password"
              icon={<Lock />}
              error={
                touched.newPassword && errors.newPassword
                  ? errors.newPassword
                  : ""
              }
              success={touched.newPassword && !errors.newPassword}
              className="bg-white"
            />

            {isError && (
              <p className="text-red-500 text-center text-sm">
                {(error as any)?.response?.data?.error ||
                  "Wystąpił błąd podczas aktualizacji."}
              </p>
            )}

            {isSuccess && (
              <p className="text-green-500 text-center text-sm">
                Hasło zostało zaktualizowane pomyślnie.
              </p>
            )}

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-[#339FB8] text-white py-3 rounded-lg shadow-md hover:bg-[#2b8fa6] transition-all duration-200 font-medium disabled:opacity-60"
            >
              {isUpdating ? "Aktualizowanie..." : "Zapisz zmiany"}
            </button>

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

export default UpdateAccount;
