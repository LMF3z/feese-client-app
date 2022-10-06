import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { routes } from '../../constants';
import ShowErrorForm from '../../components/ShowErrorForm';
import formsSesions from '../../validations/forms.sesions.schema';
import companiesApi from '../../API/companies/companies.api';
import { buildSuccessResponse } from '../../utils/handleRequest';
import Button from '../../components/Button';
import InputWithLabel from '../../components/InputWithLabel';
import Loading from '../../assets/Icons/Loading';

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formsSesions.FormRegisterSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const registerCompany = async (data) => {
    setIsLoading(true);

    try {
      const register = await companiesApi.registerCompany(data);
      const response = buildSuccessResponse(register);

      response.success
        ? toast.success(`${response.msg} Espere...`, {
            duration: 5000,
          })
        : toast.error(response.msg, { duration: 5000 });

      response.success && reset();

      setIsLoading(false);

      response.success &&
        setTimeout(() => {
          navigate(routes.login);
        }, 5000);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al registrar empresa', { duration: 5000 });
    }
  };

  return (
    <div className="w-full lg:w-2/4 layout_containers min-h-screen mx-auto overflow-auto">
      <h1>registrar empresa</h1>

      {isLoading && <Loading />}

      <form
        onSubmit={handleSubmit(registerCompany)}
        className="form_container grid-rows-6 gap-5 px-5 mt-5"
      >
        <div className="w-full h-full">
          <InputWithLabel
            name="name_company"
            label="Nombre de la empresa"
            type="text"
            placeholder="Nombre de empresa *"
            register={register}
          />
          {errors.name_company?.message ? (
            <ShowErrorForm label={errors?.name_company?.message} />
          ) : null}
        </div>

        <div className="w-full h-full">
          <InputWithLabel
            name="address_company"
            label="Dirección de la empresa"
            type="text"
            placeholder="Dirección *"
            register={register}
          />
          {errors?.address_company?.message && (
            <ShowErrorForm label={errors?.address_company?.message} />
          )}
        </div>

        <div className="w-full h-full">
          <InputWithLabel
            name="email_company"
            label="Correo electrónico"
            type="email"
            placeholder="Correo electrónico *"
            register={register}
          />
          {errors?.email_company?.message && (
            <ShowErrorForm label={errors?.email_company?.message} />
          )}
        </div>

        <div className="w-full h-full flex flex-col justify-center items-start">
          <label className="text-xs">Tipo de empresa</label>
          <div className="flex">
            <input type="radio" placeholder="Prestación de servicios" />
            <input type="radio" placeholder="Venta de productos" />
          </div>
          {errors?.email_company?.message && (
            <ShowErrorForm label={errors?.email_company?.message} />
          )}
        </div>

        <div className="w-full h-full">
          <InputWithLabel
            name="password_company"
            label="Contraseña"
            type="password"
            placeholder="Contraseña *"
            register={register}
          />
          {errors?.password_company?.message && (
            <ShowErrorForm label={errors?.password_company?.message} />
          )}
        </div>

        <div className="w-full h-full">
          <InputWithLabel
            name="password_company_two"
            label="Confirmar contraseña"
            type="password"
            placeholder="Confirmar contraseña *"
            register={register}
          />
          {errors?.password_company_two?.message && (
            <ShowErrorForm label={errors?.password_company_two?.message} />
          )}
        </div>

        <div className="w-full h-full">
          <Button label="Registrar" classes="lg:p-2" />
        </div>
      </form>

      <div className="w-full mt-2 text-lg text-white">
        <span>
          <Link to={routes.login}>¿Ya tienes una cuenta? Inicia sesión</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
