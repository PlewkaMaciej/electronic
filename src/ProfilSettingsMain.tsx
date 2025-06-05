import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ButtonStyle from "../component/Items/ButtonStyle";
import { Upload, Globe, User, Lock, Package, Shield } from "lucide-react";

const ProfileSettingsMain = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="mt-6 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Ustawienia</h2>

      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-6">
        {[
          { icon: User, label: "Profil" },
          { icon: Lock, label: "Konto i bezpieczeństwo" },
          { icon: Package, label: "Wysyłka" },
          { icon: Shield, label: "Prywatność" },
          { icon: Globe, label: "Sprzedawanie" },
        ].map(({ icon: Icon, label }, index) => (
          <ButtonStyle
            key={index}
            className="flex items-center gap-2 w-full md:w-auto"
          >
            <Icon className="w-5 h-5" /> {label}
          </ButtonStyle>
        ))}
      </div>

      <div className="border p-6 rounded-xl bg-gray-100 flex flex-col items-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center mb-4">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500" />
          )}
        </div>
        <label className="cursor-pointer flex items-center space-x-2 text-blue-600 hover:underline">
          <Upload className="w-5 h-5" />
          <span>Zmień zdjęcie profilowe</span>
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <p className="text-xs text-gray-500 mt-2">
          JPG, GIF lub PNG. Maksymalny rozmiar pliku: 800 KB.
        </p>
      </div>

      <Formik
        initialValues={{ aboutMe: "", country: "", city: "" }}
        validationSchema={Yup.object({
          aboutMe: Yup.string().max(500, "Maksymalnie 500 znaków"),
          country: Yup.string().required("Wybierz kraj"),
          city: Yup.string().required("Podaj miasto"),
        })}
        onSubmit={(values) => console.log(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="border p-6 rounded-xl bg-gray-100 mt-6">
              <h3 className="text-lg font-semibold mb-2">O mnie</h3>
              <Field
                as="textarea"
                name="aboutMe"
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Napisz kilka słów o sobie..."
              />
              <ErrorMessage
                name="aboutMe"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="border p-6 rounded-xl bg-gray-100 mt-6">
              <h3 className="text-lg font-semibold mb-2">Lokalizacja</h3>
              <label className="block text-sm font-medium text-gray-700">
                Kraj
              </label>
              <Field
                as="select"
                name="country"
                className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              >
                <option value="">Wybierz kraj</option>
                <option value="Polska">Polska</option>
                <option value="Niemcy">Niemcy</option>
                <option value="Francja">Francja</option>
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Miasto
              </label>
              <Field
                type="text"
                name="city"
                className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                placeholder="Wpisz miasto"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex justify-end mt-6">
              <ButtonStyle
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2"
              >
                Zapisz zmiany
              </ButtonStyle>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileSettingsMain;
