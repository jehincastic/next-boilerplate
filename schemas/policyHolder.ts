import * as yup from "yup";

import { emailSchema } from "@schemas/email";
import { phoneSchema } from "@schemas/phone";

export const addPolicyHolder = emailSchema.concat(
  phoneSchema.concat(
    yup.object().shape({
      fullName: yup
        .string()
        .required("Name is Required"),
      gender: yup
        .string()
        .required("Gender is Required."),
      dob: yup
        .string()
        .required("DOB is Required."),
      placeOfBirth: yup
        .string()
        .required("Place Of Birth is Required.")
    })
  ),
);
