import * as yup from 'yup';

const FormServicesSchema = yup.object().shape({
  name_service: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingresa un nombre valido.')
    .required(),
  price_service: yup
    .number()
    .positive()
    .typeError('El precio/valor es requerido.'),
});

const validations = { FormServicesSchema };

export default validations;
