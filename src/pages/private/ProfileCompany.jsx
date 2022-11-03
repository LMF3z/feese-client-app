import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import useAuth from '../../components/hooks/auth/useAuth';
import FormProfileCompany from '../../validations/form.profileCompany';
import ShowErrorForm from '../../components/ShowErrorForm';
import Button from '../../components/Button';
import Loading from '../../assets/Icons/Loading';
import { uploadImage } from '../../utils/handleRequest';
import {
  getDataCompanyByID,
  updateDataCompanyById,
} from '../../API/companies/companies.api';
import SelectImage from '../../components/SelectImage';
import InputWithLabel from '../../components/InputWithLabel';
import SelectWithLabel from '../../components/SelectWithLabel';

const ProfileCompany = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormProfileCompany.FormCompanySchema),
  });

  const { isAuth, buildSuccessResponse } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [logoCompany, setLogoCompany] = useState('');

  useEffect(() => {
    getDataCompany();
  }, []);

  const getDataCompany = async () => {
    setIsLoading(true);
    try {
      const response = await getDataCompanyByID(isAuth.id_company);
      const data = buildSuccessResponse(response);

      if (data.success === false) {
        return toast.error(data.msg);
      }

      setLogoCompany(data?.data?.logo_company);
      setValue('id', data?.data?.id);
      setValue('name_company', data?.data?.name_company);
      setValue('address_company', data?.data?.address_company);
      setValue('type_document_company', data?.data?.type_document_company);
      setValue('document_company', data?.data?.document_company);
      setValue('email_company', data?.data?.email_company);
      setValue('phone', data?.data?.phone);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al buscar datos de la empresa');
    }
  };

  const getImageProfile = (file) => setLogoCompany(file);

  const updateDataCompany = async (data) => {
    setIsLoading(true);
    try {
      if (typeof logoCompany === 'object') {
        const uploadedFile = await uploadImage(logoCompany);
        data.logo_company = uploadedFile.data.link;
      }

      const response = await updateDataCompanyById(data);
      const compRes = buildSuccessResponse(response);

      compRes.success && toast.success(compRes.msg);
      compRes.success && (await getDataCompany());

      if (compRes.success === false) {
        return toast.error(compRes.msg);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al actualizar datos de la empresa');
    }
  };

  return (
    <div className='container_section'>
      <h1>Perfil de la empresa</h1>

      {isLoading && <Loading />}
      {!isLoading && (
        <SelectImage handleImage={getImageProfile} image={logoCompany} />
      )}

      <form
        onSubmit={handleSubmit(updateDataCompany)}
        className='form_container'
        autoComplete='off'
      >
        <input type='hidden' {...register('id')} />

        <div className='container_square_form md:flex md:justify-evenly md:items-center md:space-x-3'>
          <div className='w-full md:w-1/2'>
            <InputWithLabel
              label='Nombre'
              type='text'
              name='name_company'
              register={register}
            />
            {errors?.name_company?.message && (
              <ShowErrorForm label={errors?.name_company?.message} />
            )}
          </div>
          <div className='w-full md:w-1/2'>
            <InputWithLabel
              label='Dirección'
              type='text'
              name='address_company'
              register={register}
            />
            {errors?.address_company?.message && (
              <ShowErrorForm label={errors?.address_company?.message} />
            )}
          </div>
        </div>

        <div className='container_square_form md:flex md:justify-evenly md:items-center md:space-x-3 mt-3'>
          <div className='w-full md:w-1/2'>
            <SelectWithLabel
              label='Tipo de documento'
              name='type_document_company'
              register={register}
            >
              <option value='none'>Tipo de documento</option>
              <option value='J'>J</option>
              <option value='V'>V</option>
              <option value='E'>E</option>
            </SelectWithLabel>
            {errors?.type_document_company?.message && (
              <ShowErrorForm label={errors?.type_document_company?.message} />
            )}
          </div>

          <div className='w-full md:w-1/2 mt-3 md:mt-0'>
            <InputWithLabel
              label='Documento'
              type='text'
              name='document_company'
              register={register}
            />
            {errors?.document_company?.message && (
              <ShowErrorForm label={errors?.document_company?.message} />
            )}
          </div>
        </div>

        <div className='container_square_form md:flex md:justify-evenly md:items-center md:space-x-3 mt-3'>
          <div className='w-full md:w-1/2'>
            <InputWithLabel
              label='Correo electrónico'
              type='email'
              name='email_company'
              register={register}
            />
            {errors?.email_company?.message && (
              <ShowErrorForm label={errors?.email_company?.message} />
            )}
          </div>
          <div className='w-full md:w-1/2 mt-3 md:mt-0'>
            <InputWithLabel
              label='Teléfono'
              type='text'
              name='phone'
              register={register}
            />
            {errors?.phone?.message && (
              <ShowErrorForm label={errors?.phone?.message} />
            )}
          </div>
        </div>

        <Button label='Actualizar' classes='my-3' />
      </form>
    </div>
  );
};

export default ProfileCompany;
