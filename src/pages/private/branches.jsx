import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import branchesServices from '../../services/branches/branches.services';
import FormBranches from '../../validations/form.branches';
import Loading from '../../assets/Icons/Loading';
import Layout from '../../components/Layouts/Layout';
import Button from '../../components/Button';
import ShowErrorForm from '../../components/ShowErrorForm';
import storage from '../../utils/handleLocal';
import branchesApi from '../../services/API/branches/branches.api';
import { buildSuccessResponse } from '../../utils/handleRequest';

const Branches = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormBranches.FormBranchesSchema),
  });

  const [isEditMode, setisEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [branchesData, setBbranchesData] = useState([]);

  useEffect(() => {}, []);

  const getListBranches = async () => {
    const { id_company } = storage.getDataCompany();
    const listBranches = await branchesApi.getBranches(id_company);
  };

  const submitFormSucursales = async (data) => {
    const { id_company } = storage.getDataCompany();
    data.company_id = id_company;

    const response = await branchesApi.createBranch(data);
    const resData = buildSuccessResponse(response);

    resData.success
      ? toast.success(resData.msg, { duration: 5000 })
      : toast.error(resData.msg, { duration: 5000 });

    setBbranchesData(resData.data);

    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="container_section">
        <h1 className="text-2xl">Sucursales</h1>
        {isLoading && <Loading />}
        <form
          onSubmit={handleSubmit(submitFormSucursales)}
          className="form_container min-h-10vh"
        >
          <div className="w-full md:flex md:justify-evenly md:items-center md:space-x-3">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                className="input w-full text-base"
                placeholder="Nombre sucursal"
                {...register('name_branch')}
              />
              {errors?.name_branch?.message && (
                <ShowErrorForm label={errors?.name_branch?.message} />
              )}
            </div>
            <div className="w-full md:w-1/2 mt-3 md:mt-0 text-base">
              <input
                type="text"
                className="input w-full"
                placeholder="Dirección"
                {...register('address_branch')}
              />
              {errors?.address_branch?.message && (
                <ShowErrorForm label={errors?.address_branch?.message} />
              )}
            </div>
          </div>
          <div className="w-full md:flex md:justify-start md:items-center md:space-x-3 md:mt-3">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                className="input w-full text-base"
                placeholder="Teléfono"
                {...register('phone_branch')}
              />
              {errors?.phone_branch?.message && (
                <ShowErrorForm label={errors?.phone_branch?.message} />
              )}
            </div>
          </div>
          <div className="w-full h-10 mt-3 flex justify-end items-center space-x-3">
            <div className="w-3/5 md:w-1/2 h-full flex justify-end items-center space-x-3">
              {isEditMode && (
                <Button
                  label="Cancelar"
                  type="button"
                  classes="w-1/2 text-base"
                />
              )}
              <Button label="Guardar" classes="text-base w-1/2" />
            </div>
          </div>
        </form>
        <div className="w-full lg:mt-5 md:w-3/4 rounded-lg">
          {/* <TableComponent
            fields={[
              'Nombre',
              'Apellido',
              'Identificación',
              'Teléfono',
              'editar',
              'eliminar',
            ]}
            fieldsToShow={['name', 'last_name', 'identification', 'phone']}
            data={dataTable}
            actions={true}
            actionEdit={() => {}}
            actionDelete={() => {}}
          /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Branches;
