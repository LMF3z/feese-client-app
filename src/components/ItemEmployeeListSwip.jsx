import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { routes } from '../constants';

const ItemEmployeeListSwip = ({ employeeItem }) => {
  let navigate = useNavigate();

  return (
    <article className="w-full bg-SelectColor flex flex-col justify-center items-start space-y-5 p-5 drop-shadow-2xl">
      <section className="text-base text-smoothTextColor capitalize">
        <div>
          <label>Nombre:</label> <span>{employeeItem.name_employee}</span>
        </div>
        <div>
          <label>Apellido:</label>{' '}
          <span>{employeeItem.last_name_employee}</span>
        </div>
        <div>
          <label>identificación:</label>{' '}
          <span>{employeeItem.identification_employee}</span>
        </div>
        <div>
          <label>Teléfono: </label>
          <span>{employeeItem.phone_employee}</span>
        </div>
        <div>
          <label>Tipo de pago:</label>{' '}
          <span>
            {employeeItem.payment_type === 'fixed_payment'
              ? 'Pago fijo'
              : 'Pago porcentaje'}
          </span>
        </div>
        <div className="">
          <label>Pago:</label>{' '}
          <span>
            {employeeItem.payment_type === 'fixed_payment' ? '$' : '%'}
            {employeeItem.payment_amount}
          </span>
        </div>
      </section>
      <Button
        label="Ver pagos"
        classes="h-8 w-2/5 md:w-1/4"
        type="button"
        handleClick={() =>
          navigate(`${routes.paymentsWorkers}/${employeeItem.id}`, {
            replace: true,
          })
        }
      />
    </article>
  );
};

export default ItemEmployeeListSwip;
