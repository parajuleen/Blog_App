import React, { useState ,useRef} from "react";
import { registerUser,resetSignup } from "../store/features/signupslice";
import { Navigate,Link } from "react-router-dom";
import Error from "../Components/Error";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";

const initialValues = {
  name: "",
  email: "",
  password: "",
  profileImage: null,
};

const validationSchema = new yup.ObjectSchema({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter the valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be minimum of 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Must contain a special charcater,a number and a uppercase"
    ),
  profileImage: yup.mixed().required("Profile is required"),
});

const Signup = () => {

  const fileInputRef=useRef( null)
  const [password, setPassword] = useState("password");
  const {loading,isSuccess,error}= useSelector((state) => state.signup);
  console.log(error)


  const handleChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("profileImage", file);
  };

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    try {
      const formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("email", values.email);
      formdata.append("password", values.password);
      formdata.append("profileImage", values.profileImage);
      dispatch(registerUser(formdata));
    } catch (error) {
      console.log("user registration failed",error);
    }
  };

  return (
    <>
        

      <div className="flex items-center justify-center flex-col min-h-screen">
        {loading && (
          <div className="border-gray-300 h-20 w-20  animate-spin rounded-full border-8 border-t-blue-600 relative top-64" />
        )}
        {isSuccess && <Navigate to="/login" />}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Account
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, setTouched,values }) => (
              <Form encType="multipart/form-data">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                  <Error name="name" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                  <Error name="email" />
                </div>
                <div className="mb-4 ">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <Field
                    type={password}
                    id="password"
                    name="password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                  <Error name="password" />
                  <input
                    type="checkbox"
                    onClick={(e) => {
                      if (e.target.checked) {
                        setPassword("text");
                      } else {
                        setPassword("password");
                      }
                    }}
                  />{" "}
                  Show Password
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className="block text-gray-700">
                    Upload Image
                  </label>
                  <input
                
                    type="file"
                    id="image"
                    name="profileImage"
                    accept="image/*"
                    className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    ref={fileInputRef}
                    onChange={(event) => {
                      handleChange(event, setFieldValue);
                    }}
                    onBlur={() => {
                      setTouched({
                        profileImage: true,
                      });
                    }}
                  />
                  <Error name="profileImage" />


                  {
  values.profileImage ? (
    <span
      id="badge-dismiss-default"
      className="inline-flex items-center px-2 py-1 mt-2 text-sm font-medium text-blue-800 bg-red-100 rounded dark:bg-blue-900 dark:text-blue-300"
    >
      {values.profileImage.name}
      <button
        type="button"
        className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
        data-dismiss-target="#badge-dismiss-default"
        aria-label="Remove"
        onClick={() => {
          setFieldValue("profileImage", null);
          if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }
        }}
      >
        <svg
          className="w-2 h-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </span>
  ) : (
    ""
  )
}






















                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Signup;
