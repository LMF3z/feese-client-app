import * as yup from 'yup';

const FormEmployeePaymentSchema = yup.object().shape({
  payment_type: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü]+$/, 'Ingresa un tipo de pago.')
    .required('Un tipo de pago es requerido'),
  payment_amount: yup
    .number('Ingresa una cantidad valida.')
    .required('Cantidad es requerida')
    .typeError('Ingrese una cantidad valida.'),
});

const validations = { FormEmployeePaymentSchema };

export default validations;
