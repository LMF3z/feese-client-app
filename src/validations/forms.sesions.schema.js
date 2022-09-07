import * as yup from 'yup';

const FormRegisterSchema = yup.object().shape({
  name_company: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingresa un nombre valido.')
    .required(),
  address_company: yup.string().required('Dirección es requerida.'),
  // rif_company: yup.string().required().matches(),
  email_company: yup
    .string()
    .email('Ingresa un correo valido.')
    .required('Correo es requerido.'),
  password_company: yup
    .string()
    .required('Contraseña es requerida.')
    .min(8, 'Debe contener, al menos, 8 caracteres.'),
  password_company_two: yup
    .string()
    .required('Confime contraseña.')
    .min(8, 'Debe contener, al menos, 8 caracteres.')
    .oneOf([yup.ref('password_company')], 'Contraseñas no coinciden'),
});

const FormLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Ingresa un correo valido.')
    .required('Correo es requerido.'),
  password: yup
    .string()
    .required('Contraseña es requerida.')
    .min(8, 'Debe contener, al menos, 8 caracteres.'),
});

const FormUsersCompany = yup.object().shape({
  alias_user_company: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingresa un alias valido.')
    .required(),
  email_user_company: yup
    .string()
    .email('Ingresa un correo valido.')
    .required('Correo es requerido.'),
  role_user_company: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingresa un alias valido.')
    .required(),
  password_user_company: yup
    .string()
    .required('Contraseña es requerida.')
    .min(8, 'Debe contener, al menos, 8 caracteres.'),
  password_user_company_two: yup
    .string()
    .required('Confime contraseña.')
    .min(8, 'Debe contener, al menos, 8 caracteres.')
    .oneOf([yup.ref('password_user_company')], 'Contraseñas no coinciden'),
});

const formsSesions = { FormRegisterSchema, FormLoginSchema, FormUsersCompany };

export default formsSesions;
