import * as yup from 'yup';

export const FormMembershipCompanySchema = yup.object().shape({
  reference_transfer: yup
    .number('La referencia debe ser númerica.')
    .integer('Número de referencia debe ser un número entero/positivo.')
    .typeError('Introduzca una referencia válida')
    .required('Número de referencia es requerido.'),
  amount_payment_membership: yup
    .number('Cantidad cancelada debe ser un número valido.')
    .required('Cantidad cancelada es requerida.')
    .typeError('Ingrese una cantidad valida'),
});
