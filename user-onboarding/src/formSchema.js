import * as yup from 'yup';

const formSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Username is required silly goose!")
    .min(3, "Username has to be 3 characters long ya chump!"),
  email: yup
    .string()
    .email("You gotta be kidding me, enter a valid email or else!")
    .required("Enter an email ya filthy animal!"),
  password: yup
    .string()
    .oneOf(['password', 'qwerty'], "Select an option ya fool!"),
  role: yup
    .string()
    .oneOf(['junior', 'senior', 'master'], "Role is required!"),
  coding: yup.boolean(),
  reading: yup.boolean(),
  hiking: yup.boolean()
})

export default formSchema;