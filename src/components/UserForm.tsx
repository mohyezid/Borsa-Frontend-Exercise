import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import "../styles/form.css";
import {
  AddressForm,
  UserFormData,
  UserFormErrors,
  userFormKeys,
} from "../type/interfaces";
import {
  INITIAL_ADDRESS,
  INITIAL_DATA,
  INITIAL_ERRORS,
  PASSWORD_LENGTH,
} from "../constants/user-form";

interface UserFormProps {
  title: string;
  initial_data?: UserFormData; // contains user data if it is on profile edit page
  isEdit?: boolean; // if the form is used for edit profile page
  isLoading: boolean;
  apiError?: string;
  onSubmit: (data: UserFormData) => void;
}

export default function UserForm({
  title,
  isEdit = false,
  initial_data,
  isLoading,
  apiError,
  onSubmit,
}: UserFormProps) {
  const [originalFormData, setOriginalFormData] = useState<UserFormData>();
  const [form, setForm] = useState<UserFormData>(INITIAL_DATA);
  const [address, setAddress] = useState<AddressForm>(INITIAL_ADDRESS);
  const [errors, setErrors] = useState<UserFormErrors>(INITIAL_ERRORS);

  useEffect(() => {
    // set initial form data
    if (initial_data) {
      const processed: any = {};

      // remove the unecessary data that comes from the object on the redux store
      Object.entries(initial_data).forEach(([key, value]): any => {
        if (userFormKeys[key]) processed[key] = value;
      });

      const data: UserFormData = {
        ...INITIAL_DATA,
        ...processed,
      };

      setOriginalFormData(data);
      setForm(data);

      const address = data.address?.split(", ");
      setAddress({ city: address[0] ?? "", country: address[1] ?? "" });
    } else {
      setOriginalFormData(INITIAL_DATA);
      setForm(INITIAL_DATA);
    }
  }, [initial_data]);

  useEffect(() => {
    // update address data whenever city and country value changes
    if (address.city || address.country) {
      setForm((form) => ({
        ...form,
        address: `${address.city}, ${address.country}`,
      }));
    }
  }, [address]);

  const handleFormChange = (name: string, value: any) => {
    setForm((form) => ({ ...form, [name]: value }));
  };

  const handleAddressChange = (name: string, value: string) => {
    setAddress((address) => ({ ...address, [name]: value }));
  };

  const handleFormClear = () => {
    setForm(originalFormData || INITIAL_DATA);
    setAddress(INITIAL_ADDRESS);
    setErrors(INITIAL_ERRORS);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (validatePassword()) onSubmit(form);
  };

  const validatePassword = (): boolean => {
    const errors_copy: UserFormErrors = { ...INITIAL_ERRORS };
    let valid = true;

    // first name validation
    if (!form.firstName) {
      errors_copy.firstName = "first name is required";
      valid = false;
    }

    // last name validation
    if (!form.lastName) {
      errors_copy.lastName = "last name is required";
      valid = false;
    }

    // email validation
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!form.email) {
      errors_copy.email = "email is required";
      valid = false;
    } else if (!emailRegex.test(form.email)) {
      errors_copy.email = "invalid email pattern";
      valid = false;
    }

    // username validation
    if (!form.userName) {
      errors_copy.userName = "username is required";
      valid = false;
    }

    if (!isEdit) {
      // password validation
      if (!form.password) {
        errors_copy.password = "password is required";
        valid = false;
      } else if (form.password.length < PASSWORD_LENGTH) {
        errors_copy.password = `password length must be atleast ${PASSWORD_LENGTH}`;
        valid = false;
      }

      // confirm password validation
      if (!form.confirmPassword) {
        errors_copy.confirmPassword = "password is required";
        valid = false;
      } else if (form.confirmPassword !== form.password) {
        errors_copy.confirmPassword = "passwords don't match";
        valid = false;
      }
    }

    // address validation
    if (!address.city) {
      errors_copy.city = "city is required";
      valid = false;
    }

    if (!address.country) {
      errors_copy.country = "country is required";
      valid = false;
    }

    setErrors(errors_copy);
    return valid;
  };

  return (
    <section className="min-h-[100vh] w-full flex flex-col items-center justify-center py-4">
      <div className="row justify-center">
        <div className=" !max-w-[80vw] flex flex-col items-center justify-center border border-gray-300 rounded-lg px-6 py-6 shadow-xl">
          <div className="pt-4 pb-2 w-full">
            <h5 className="text-center pb-0 text-3xl font-semibold mb-1 tracking-wider">
              {title}
            </h5>
            {apiError && (
              <p className="text-center text-red-700 font-bold text-xs bg-red-200 py-3 mt-2">
                {apiError}
              </p>
            )}
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-4 mt-3 w-full"
          >
            <div className="flex gap-10 flex-col md:flex-row">
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex gap-3 flex-col sm:flex-row md:flex-col">
                  <FormInput
                    label="First Name"
                    value={form.firstName}
                    error={errors.firstName}
                    onChange={(e) =>
                      handleFormChange("firstName", e.target.value)
                    }
                  />

                  <FormInput
                    label="Last Name"
                    value={form.lastName}
                    error={errors.lastName}
                    onChange={(e) =>
                      handleFormChange("lastName", e.target.value)
                    }
                  />
                </div>

                <FormInput
                  label="Username"
                  value={form.userName}
                  error={errors.userName}
                  onChange={(e) => handleFormChange("userName", e.target.value)}
                />

                <FormInput
                  label="Email"
                  value={form.email}
                  error={errors.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                />

                <div className="flex gap-3 sm:flex-row flex-col">
                  <FormInput
                    label="City"
                    value={address.city}
                    error={errors.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                  />

                  <FormInput
                    label="Country"
                    value={address.country}
                    error={errors.country}
                    onChange={(e) =>
                      handleAddressChange("country", e.target.value)
                    }
                  />
                </div>

                <div className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    name="isBuyer"
                    id="isBuyer"
                    checked={form.isBuyer}
                    onChange={(e) =>
                      handleFormChange("isBuyer", e.target.checked)
                    }
                  />
                  <label htmlFor="isBuyer" className="">
                    Is Buyer
                  </label>
                </div>
              </div>

              <hr className="border-gray-400 block md:hidden" />

              <div className="flex flex-col gap-4 flex-1">
                {!isEdit && (
                  <>
                    <FormInput
                      label="Password"
                      value={form.password}
                      error={errors.password}
                      onChange={(e) =>
                        handleFormChange("password", e.target.value)
                      }
                      isPassword={true}
                    />

                    <FormInput
                      label="Confirm Password"
                      value={form.confirmPassword}
                      error={errors.confirmPassword}
                      onChange={(e) =>
                        handleFormChange("confirmPassword", e.target.value)
                      }
                      isPassword={true}
                    />
                  </>
                )}

                <hr className="border-gray-400 block md:hidden mt-3" />

                <div>
                  <FormInput
                    label="Profile Picture (optional)"
                    value={form.profilePicture ?? ""}
                    onChange={(e) =>
                      handleFormChange("profilePicture", e.target.value)
                    }
                  />
                  {form.profilePicture && (
                    <div className="flex justify-center items-center py-3 border-2 mt-2 border-dashed border-gray-500">
                      <img
                        src={form.profilePicture}
                        alt="Picture Not Found"
                        className="max-h-[160px]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2">
              <button
                className="bg-blue-600 text-white text-sm py-3 rounded w-full disabled:bg-blue-400 flex justify-center items-center"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="!border-t-transparent" />
                ) : (
                  "Submit"
                )}
              </button>
              <button
                className="bg-gray-600 text-white text-sm py-3 rounded w-full disabled:bg-gray-400 flex justify-center items-center mt-2"
                type="button"
                onClick={handleFormClear}
              >
                Clear
              </button>
              {!isEdit && (
                <div className="mt-2 text-sm">
                  <span>Have an account?</span>
                  &nbsp;
                  <Link to={"/login"} className="text-blue-600 underline">
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
