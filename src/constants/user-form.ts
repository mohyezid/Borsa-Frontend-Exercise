import { AddressForm, UserFormData, UserFormErrors } from "../type/interfaces";

export const INITIAL_DATA: UserFormData = {
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  address: "",
  isBuyer: false,
  password: "",
  confirmPassword: "",
};

export const INITIAL_ERRORS: UserFormErrors = {
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  password: "",
  confirmPassword: "",
  city: "",
  country: "",
};

export const INITIAL_ADDRESS: AddressForm = {
  city: "",
  country: "",
};

export const PASSWORD_LENGTH = 4;
