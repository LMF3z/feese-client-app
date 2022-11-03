import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactSwitch from 'react-switch';
import toast from 'react-hot-toast';
import { colors, routes } from '../../constants';
import ShowErrorForm from '../../components/ShowErrorForm';
import formsSesions from '../../validations/forms.sesions.schema';
import companiesApi from '../../API/companies/companies.api';
import Button from '../../components/Button';
import InputWithLabel from '../../components/InputWithLabel';
import Loading from '../../assets/Icons/Loading';

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formsSesions.FormRegisterSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [switchState, setSwitchState] = useState({
    services: true,
    products: false,
  });

  const handleChangeSwitch = ({ name, value }) => {
    if (name === 'services') {
      setSwitchState({
        ...switchState,
        services: value,
        products: !value,
      });
    }
    if (name === 'products') {
      setSwitchState({
        ...switchState,
        products: value,
        services: !value,
      });
    }
  };

  const registerCompany = async (data) => {
    setIsLoading(true);

    data.type_company = switchState.products
      ? 'products'
      : switchState.services;

    const response = await companiesApi.registerCompany(data);

    if (!response.success) {
      setIsLoading(false);
      return toast.error(response.msg);
    }

    setTimeout(() => {
      navigate(routes.login);
    }, 5000);
  };

  return (
    <div className='w-full lg:w-2/4 layout_containers min-h-screen mx-auto overflow-auto'>
      <h1>registrar empresa</h1>

      {isLoading && <Loading />}

      <form
        onSubmit={handleSubmit(registerCompany)}
        className='form_container grid grid-flow-row auto-rows-max gap-3 px-5 mt-5'
      >
        <div className='w-full h-full'>
          <InputWithLabel
            name='name_company'
            label='Nombre de la empresa *'
            type='text'
            register={register}
          />
          {errors.name_company?.message ? (
            <ShowErrorForm label={errors?.name_company?.message} />
          ) : null}
        </div>

        <div className='w-full h-full'>
          <InputWithLabel
            name='address_company'
            label='Dirección de la empresa *'
            type='text'
            register={register}
          />
          {errors?.address_company?.message && (
            <ShowErrorForm label={errors?.address_company?.message} />
          )}
        </div>

        <div className='w-full h-full'>
          <InputWithLabel
            name='email_company'
            label='Correo electrónico *'
            type='email'
            register={register}
          />
          {errors?.email_company?.message && (
            <ShowErrorForm label={errors?.email_company?.message} />
          )}
        </div>

        <div className='w-full h-full flex flex-col justify-center items-start'>
          <label className='text-xs'>Tipo de empresa *</label>
          <div className='flex justify-evenly md:space-x-5 mt-3'>
            <div className='flex justify-center items-center space-x-1'>
              <ReactSwitch
                uncheckedIcon={false}
                checkedIcon={false}
                onColor={colors.buttonSuccessColor}
                id='services'
                checked={switchState.services}
                onChange={(e) =>
                  handleChangeSwitch({ name: 'services', value: e })
                }
              />
              <label htmlFor='services' title='Prestación de servicios'>
                De servicios
              </label>
            </div>
            <div className='pl-3 flex justify-end items-center space-x-1'>
              <ReactSwitch
                uncheckedIcon={false}
                checkedIcon={false}
                onColor={colors.buttonSuccessColor}
                id='products'
                checked={switchState.products}
                onChange={(e) =>
                  handleChangeSwitch({ name: 'products', value: e })
                }
              />
              <label htmlFor='products' title='Venta de productos'>
                De productos
              </label>
            </div>
          </div>
          <p className='text-buttonSuccessColor my-2'>
            ¡Atención! No podrás cambiar esta opción luego
          </p>
          {errors?.email_company?.message && (
            <ShowErrorForm label={errors?.email_company?.message} />
          )}
        </div>

        <div className='w-full h-full'>
          <InputWithLabel
            name='password_company'
            label='Contraseña *'
            type='password'
            register={register}
          />
          {errors?.password_company?.message && (
            <ShowErrorForm label={errors?.password_company?.message} />
          )}
        </div>

        <div className='w-full h-full'>
          <InputWithLabel
            name='password_company_two'
            label='Confirmar contraseña *'
            type='password'
            register={register}
          />
          {errors?.password_company_two?.message && (
            <ShowErrorForm label={errors?.password_company_two?.message} />
          )}
        </div>

        <div className='w-full h-full'>
          <Button label='Registrar' classes='lg:p-2' />
        </div>
      </form>

      <div className='w-full mt-2 text-lg text-white'>
        <Link to={routes.login}>¿Ya tienes una cuenta? Inicia sesión</Link>
      </div>
    </div>
  );
};

export default Register;
