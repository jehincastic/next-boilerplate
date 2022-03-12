import InputAdornment from "@mui/material/InputAdornment";

import { FieldType } from "@interfaces/index";

const signupForm: FieldType[] = [
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    customValue: (_, value, isSubmitting) => ({
      required: true,
      disabled: isSubmitting,
      value,
    }),
    xs: 12,
    sm: 6,
    md: 6,
  }, {
    label: "Last Name",
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    customValue: (_, value, isSubmitting) => ({
      required: true,
      disabled: isSubmitting,
      value,
    }),
    xs: 12,
    sm: 6,
    md: 6,
  }, {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Email",
    customValue: (_, value, isSubmitting) => ({
      required: true,
      disabled: isSubmitting,
      value,
    }),
    xs: 12,
    sm: 12,
    md: 12,
  }, {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password",
    customValue: (_, value, isSubmitting) => ({
      required: true,
      disabled: isSubmitting,
      value,
    }),
    xs: 12,
    sm: 12,
    md: 12,
  }, {
    label: "Phone Number",
    name: "phone",
    type: "number",
    placeholder: "Phone Number",
    customValue: (_, value, isSubmitting) => ({
      required: false,
      disabled: isSubmitting,
      value,
    }),
    xs: 12,
    sm: 12,
    md: 12,
    customChange: (e, handleChange) => {
      const phone = Number(e.target.value);
      if (phone <= (9999999999 || 0)) {
        handleChange(e);
      }
    },
    inputProps: {
      startAdornment: <InputAdornment position="start">+91</InputAdornment>,
      inputProps: {
        max: 9999999999,
        min: 6000000000,
      }
    },
  }, {
    label: "I agree to terms and conditions.",
    name: "agreeToTerms",
    type: "checkbox",
    customValue: (_, value, isSubmitting) => ({
      required: true,
      disabled: isSubmitting,
      value,
    }),
    xs: 12,
    sm: 12,
    md: 12,
  }
];

export default signupForm;
