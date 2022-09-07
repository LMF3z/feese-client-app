import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../components/Button';
import ShowErrorForm from '../../components/ShowErrorForm';
import formsSesions from '../../validations/forms.sesions.schema';
import useLoading from '../../components/hooks/useLoading';
import Loading from '../../assets/Icons/Loading';
import toast from 'react-hot-toast';
import storage from '../../utils/handleLocal';
import {
  deleteUserCompany,
  getAllUsersCompany,
  registerUserCompany,
} from '../../API/employees/employees.api';
import {
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import TrashIcon from '../../assets/Icons/TrashIcon';
import { colors, roles } from '../../constants';
import ContainerModalContext from '../../components/ContainerModalContext';
import ModalAuthorization from '../../components/ModalAuthorization';
import useAuth from '../../components/hooks/auth/useAuth';
import SelectWithLabel from '../../components/SelectWithLabel';
import InputWithLabel from '../../components/InputWithLabel';

const UsersCompany = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formsSesions.FormUsersCompany),
  });

  const { buildSuccessResponse } = useAuth();

  const { isLoading, toggleLoading } = useLoading();
  const [alertModal, setAlertModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getAllUsersForCompany();
  }, []);

  const getAllUsersForCompany = async () => {
    try {
      toggleLoading(true);

      const data_company_or_sucursal = await storage.getDataCompany();

      const response = await getAllUsersCompany(
        data_company_or_sucursal?.id_company
      );

      const resData = buildSuccessResponse(response);

      !resData.success && toast.error(resData.msg, { duration: 5000 });
      resData.success && setUsersList(resData.data);

      toggleLoading(false);
    } catch (error) {
      toggleLoading(false);
      toast.error('Error al obtener usuarios.', { duration: 5000 });
    }
  };

  const registerUserForCompany = async (data) => {
    try {
      toggleLoading(true);

      const data_company_or_sucursal = await storage.getDataCompany();

      data.id_company = data_company_or_sucursal?.id_company
        ? data_company_or_sucursal?.id_company
        : null;
      data.id_branches = data_company_or_sucursal?.id_branches
        ? data_company_or_sucursal?.id_branches
        : null;

      const response = await registerUserCompany(data);

      const registerData = buildSuccessResponse(response);

      registerData.success
        ? toast.success(registerData.msg, { duration: 5000 })
        : toast.error(registerData.msg, { duration: 5000 });

      registerData.success && reset();
      registerData.success && getAllUsersForCompany();

      toggleLoading(false);
    } catch (error) {
      toggleLoading(false);
      toast.error('Error al registrar empleado.', { duration: 5000 });
    }
  };

  const deleteUserForCompany = async () => {
    try {
      toggleLoading(true);

      const response = await deleteUserCompany(userToDelete);

      const registerData = buildSuccessResponse(response);

      registerData.success
        ? toast.success(registerData.msg, { duration: 5000 })
        : toast.error(registerData.msg, { duration: 5000 });

      registerData.success && setAlertModal(false);
      registerData.success && getAllUsersForCompany();

      toggleLoading(false);
    } catch (error) {
      toggleLoading(false);
      toast.error('Error al eliminar empleado.', { duration: 5000 });
    }
  };

  return (
    <>
      {alertModal && (
        <ContainerModalContext
          classes="md:w-1/2 lg:w-1/3 bg-custom_bg"
          onCloseModal={() => setAlertModal(false)}
        >
          <ModalAuthorization
            handleAccept={deleteUserForCompany}
            handleCancel={() => setAlertModal(false)}
            message="¿Seguro que desea anular este usuario?"
          />
        </ContainerModalContext>
      )}

      <div className="container_section">
        <h1>Usuarios</h1>
        <form
          onSubmit={handleSubmit(registerUserForCompany)}
          className="form_container min-h-10vh pt-3 mb-5 z-20"
        >
          <div className="container_square_form md:grid md:grid-cols-2 md:grid-rows-3 md:gap-3">
            <div className="w-full">
              <InputWithLabel
                label="Alias"
                type="text"
                placeholder="Alias del usuario"
                name="alias_user_company"
                register={register}
              />
              {errors?.alias_user_company?.message && (
                <ShowErrorForm label={errors?.alias_user_company?.message} />
              )}
            </div>
            <div className="w-full mt-3 md:mt-0 text-base">
              <InputWithLabel
                label="Correo electrónico"
                type="email"
                placeholder="Correo electrónico"
                name="email_user_company"
                register={register}
              />
              {errors?.email_user_company?.message && (
                <ShowErrorForm label={errors?.email_user_company?.message} />
              )}
            </div>

            <div className="w-full mt-3 md:mt-0 text-base">
              <SelectWithLabel
                defaultValue={roles.admin}
                label="Rol del usuario"
                name="role_user_company"
                register={register}
              >
                <option value={roles.admin}>Administrador</option>
                <option value={roles.cashier}>Cajero</option>
              </SelectWithLabel>
              {errors?.role_user_company?.message && (
                <ShowErrorForm label={errors?.role_user_company?.message} />
              )}
            </div>

            <div className="w-full mt-3 md:mt-0 text-base">
              <InputWithLabel
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                name="password_user_company"
                register={register}
              />
              {errors?.password_user_company?.message && (
                <ShowErrorForm label={errors?.password_user_company?.message} />
              )}
            </div>

            <div className="w-full mt-3 md:mt-0 text-base">
              <InputWithLabel
                label="Confirmar Contraseña"
                type="password"
                placeholder="Confirmar Contraseña"
                name="password_user_company_two"
                register={register}
              />
              {errors?.password_user_company_two?.message && (
                <ShowErrorForm
                  label={errors?.password_user_company_two?.message}
                />
              )}
            </div>
          </div>

          <div className="w-full h-10 mt-3 flex justify-end items-center space-x-3">
            <Button label="Guardar" />
          </div>
        </form>

        {isLoading && <Loading />}

        {usersList.length === 0 ? (
          <div className="w-full mt-5 p-10 flex justify-center items-center">
            <label>Sin resultados.</label>
          </div>
        ) : (
          <div className="w-full max-h-50vh mt-5 drop-shadow-2xl overflow-x-visible sm:overflow-x-hidden overflow-y-scroll z-10">
            <SwipeableList>
              {usersList.map((user) => (
                <SwipeableListItem
                  key={user.id}
                  swipeLeft={{
                    content: (
                      <div className="w-full h-full pr-5 bg-red-600 flex justify-end items-center">
                        <TrashIcon color="#fff" classes="lg:w-8 lg:h-8" />
                      </div>
                    ),
                    action: () => {
                      setAlertModal(true);
                      setUserToDelete(user.id);
                    },
                  }}
                  swipeRight={{
                    content: (
                      <div className="w-full h-full pl-5 bg-red-600 flex justify-start items-center">
                        <TrashIcon color="#fff" classes="lg:w-8 lg:h-8" />
                      </div>
                    ),
                    action: () => {
                      setAlertModal(true);
                      setUserToDelete(user.id);
                    },
                  }}
                >
                  <article className="w-full bg-SelectColor flex flex-col justify-center items-start md:flex-row md:justify-evenly py-5 pl-5 md:p-5 drop-shadow-2xl">
                    <section className="">
                      <span className="font-bold text-white capitalize">
                        Alias:
                      </span>{' '}
                      <label>{user.alias_user_company}</label>
                    </section>
                    <section className="">
                      <span className="font-bold text-white capitalize">
                        Email:
                      </span>{' '}
                      <label>{user.email_user_company}</label>
                    </section>
                    <section className="capitalize">
                      <span className="font-bold text-white">Rol:</span>{' '}
                      <label>
                        {user.role_user_company === 'cashier'
                          ? 'cajero'
                          : user.role_user_company}
                      </label>
                    </section>
                  </article>
                </SwipeableListItem>
              ))}
            </SwipeableList>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersCompany;
