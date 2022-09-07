import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormClientSchema from '../validations/form.client';
import Button from './Button';
import ShowErrorForm from './ShowErrorForm';
import Loading from '../assets/Icons/Loading';
import { createClient } from '../API/clients/clients.api';
import { buildSuccessResponse } from '../utils/handleRequest';
import storage from '../utils/handleLocal';
import InputWithLabel from './InputWithLabel';

const ModalCreateClient = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormClientSchema.FormClientSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const createNewClient = async (data) => {
    setIsLoading(true);
    try {
      const data_company_or_sucursal = await storage.getDataCompany();

      const id_company =
        data_company_or_sucursal.isCompany ||
        data_company_or_sucursal?.id_company
          ? data_company_or_sucursal.id_company
          : null;

      const id_branches = data_company_or_sucursal?.id_branches
        ? data_company_or_sucursal?.id_branches
        : null;

      data.id_company = id_company;
      data.id_branches = id_branches;

      const response = await createClient(data);
      const clientRes = buildSuccessResponse(response);

      clientRes.success
        ? toast.success('Cliente guardado exitosamente.')
        : toast.error(clientRes.msg);
      clientRes.success && reset();
      clientRes.success && setTimeout(() => closeModal(), 1000);

      setIsLoading(false);
    } catch (error) {
      toast.error('Error al crear cliente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full bg-primaryColor">
      <div className="w-full text-center">{isLoading && <Loading />}</div>
      <form onSubmit={handleSubmit(createNewClient)}>
        <div className="container_square_form grid grid-cols-1 gap-3">
          <div className="w-full">
            <InputWithLabel
              label="Nombre"
              type="text"
              placeholder="Nombre"
              name="name_client"
              register={register}
            />
            {errors?.name_client?.message && (
              <ShowErrorForm label={errors?.name_client?.message} />
            )}
          </div>
          <div className="w-full">
            <InputWithLabel
              label="Apellido"
              type="text"
              placeholder="Apellido"
              name="last_name_client"
              register={register}
            />
            {errors?.last_name_client?.message && (
              <ShowErrorForm label={errors?.last_name_client?.message} />
            )}
          </div>

          <div className="w-full">
            <InputWithLabel
              label="Identificación"
              type="text"
              placeholder="Identificación"
              name="identification_client"
              register={register}
            />
            {errors?.identification_client?.message && (
              <ShowErrorForm label={errors?.identification_client?.message} />
            )}
          </div>
          <div className="w-full">
            <InputWithLabel
              label="Teléfono"
              type="text"
              placeholder="Teléfono"
              name="phone_client"
              register={register}
            />
            {errors?.phone_client?.message && (
              <ShowErrorForm label={errors?.phone_client?.message} />
            )}
          </div>
        </div>

        <Button label="Guardar" classes="my-3" />
      </form>
    </div>
  );
};

export default ModalCreateClient;
