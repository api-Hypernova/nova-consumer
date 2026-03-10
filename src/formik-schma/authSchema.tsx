import * as Yup from 'yup';

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

const contactDetailsSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .min(10, 'Phone number must be at least 10 digits long'),
});

const createPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*]/,
      'Password must contain at least one special character',
    )
    .required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});


// Define a schema for business name validation
const businessNameSchema = Yup.object().shape({
  business_name: Yup.string()
    .required('Business name is required') // Ensures the field is not empty
    .min(3, 'Business name must be at least 3 characters long') // Minimum length for business name
    .max(50, 'Business name cannot exceed 50 characters') // Maximum length for business name
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      'Business name can only contain letters, numbers, and spaces' // Restrict to letters, numbers, and spaces
    ),
});


const businessDetailsSchema = Yup.object().shape({
  business_type: Yup.string().required('Service Type is required'),
  open_at: Yup.string()
    .matches(
      /^([1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
      'Open At must be a valid time in the format HH:MM AM/PM',
    )
    .required('Open At time is required'),
  close_at: Yup.string()
    .matches(
      /^([1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
      'Close At must be a valid time in the format HH:MM AM/PM',
    )
    .required('Close At time is required'),
  offered_service: Yup.string().required('Offered Service is required'),
});

const businessAddressSchema = Yup.object().shape({
  business_location: Yup.string()
    .required('Business Location is required')
    .min(3, 'Business Location must be at least 3 characters long'),
  select_city: Yup.string().required('City selection is required'),
  offered_service: Yup.string().required('Offered Service is required'),
});

const addServiceSchema = Yup.object().shape({
  service_name: Yup.string()
    .required('Service Name is required')
    .min(3, 'Service Name must be at least 3 characters long'),
  email: Yup.string()
    .required('Service Description is required')
    .min(10, 'Service Description must be at least 10 characters long'),
  phone: Yup.string()
    .required('Upload Media is required')
    .matches(/^[0-9]+$/, 'Upload Media must contain only numbers'),
  address: Yup.string()
    .required('Add Pricing is required')
    .min(1, 'Add Pricing cannot be empty'),
  duration: Yup.string().required('Duration selection is required'),
});

const addStaffSchema = Yup.object().shape({
  staff_name: Yup.string()
    .required('Staff Name is required')
    .min(3, 'Staff Name must be at least 3 characters long'),
  staff_email: Yup.string()
    .required('Staff Email is required')
    .email('Enter a valid email address'),
});

export default {
  signInSchema,
  contactDetailsSchema,
  createPasswordSchema,
  businessNameSchema,
  businessDetailsSchema,
  businessAddressSchema,
  addServiceSchema,
  addStaffSchema,
};
