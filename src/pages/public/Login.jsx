import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import useAuth from '../../components/hooks/auth/useAuth';
import companyServices from '../../API/companies/companies.api';
import formsSesions from '../../validations/forms.sesions.schema';
import ShowErrorForm from '../../components/ShowErrorForm';
import Button from '../../components/Button';
import images from '../../assets/images';
import { buildSuccessResponse } from '../../utils/handleRequest';
import { routes } from '../../constants';
import Loading from '../../assets/Icons/Loading';
import InputWithLabel from '../../components/InputWithLabel';

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formsSesions.FormLoginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const { handleLogged } = useAuth();

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const res = await companyServices.login(data);
      const response = buildSuccessResponse(res);

      response.success
        ? toast.success(response.msg, { duration: 5000 })
        : toast.error(response.msg, { duration: 5000 });

      if (response.success) {
        reset();
        handleLogged(true, response.data);
        navigate(routes.app);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al iniciar sesión', { duration: 5000 });
    }
  };

  return (
    <div className="w-full lg:w-2/4 layout_containers min-h-screen mx-auto overflow-auto">
      <h1>Feese Services</h1>
      <div className="my-5">
        {/* <img src={images.saving} alt="saving-icon" className="w-48 h-48" /> */}
        <img
          src={images.logoWhite}
          alt="saving-icon"
          className="w-48 h-48 rounded-lg"
        />
      </div>
      
      {isLoading && <Loading />}

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="form_container grid-rows-3 gap-5 px-5 mt-5"
      >
        <div className="w-full h-full">
          <InputWithLabel
            name="email"
            label="Correo electrónico"
            type="email"
            placeholder="Correo electrónico *"
            register={register}
          />
          {errors?.email?.message && (
            <ShowErrorForm label={errors?.email?.message} />
          )}
        </div>
        <div className="w-full h-full">
          <InputWithLabel
            name="password"
            label="Contraseña"
            type="password"
            placeholder="Contraseña *"
            register={register}
          />
          {errors?.password?.message && (
            <ShowErrorForm label={errors?.password?.message} />
          )}
        </div>
        <div className="w-full h-full">
          <Button label="Ingresar" />
        </div>
      </form>
      <div className="w-full mt-2 text-lg text-white">
        <span>
          <Link to={routes.register}>
            ¿No tienes una cuenta aún? Registrate
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
