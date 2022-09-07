import * as yup from 'yup';

const FormCompanySchema = yup.object().shape({
  name_company: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingresa un nombre valido.')
    .required(),
  address_company: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingresa una dirección valida.')
    .required('Dirección es requerida.'),
  type_document_company: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü]+$/, 'Ingresa un tipo de documento valido.')
    .required('Tipo de documento es requerido.'),
  document_company: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü0-9]+$/, 'Ingresa un documento valido.')
    .required('Documento es requerido.'),
  email_company: yup
    .string()
    .email('Ingresa un correo valido.')
    .required('Correo es requerido.'),
  phone: yup.string().matches(/^[+0-9]+$/, 'Ingresa un teléfono valido.'),
});

const validations = { FormCompanySchema };

export default validations;
