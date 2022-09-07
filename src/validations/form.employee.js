import * as yup from 'yup';

const FormEmployeeSchema = yup.object().shape({
  name_employee: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingresa un nombre valido.')
    .required('Nombre es requerido'),
  last_name_employee: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingresa un apellido valido.')
    .required('Apellido es requerido'),
  identification_employee: yup
    .number('Identificación debe ser númerica')
    .required('Identificación es requerida')
    .typeError('Ingrese una identificación valida.'),
  phone_employee: yup
    .string()
    .matches(/^[+0-9]+$/, 'Ingresa un teléfono valido.'),
  // payment_type: yup
  //   .string()
  //   .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingresa un tipo de pago valido.')
  //   .required('Tipo de pago es requerido'),
  payment_amount: yup
    .number()
    .positive()
    .typeError('El la cantidad/porcentaje de pago es requerido.')
    .typeError('Debe ingresar una cantidad valida.'),
});

const validations = { FormEmployeeSchema };

export default validations;
