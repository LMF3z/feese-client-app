import { useState } from 'react';
import toast from 'react-hot-toast';
import images from '../assets/images';
import { MAX_SIZE_IMAGE } from '../constants';

const SelectImage = ({ handleImage, image }) => {
  const [imageSelect, setImageSelect] = useState(images.userEmpty);

  const handleSelectedImage = async (e) => {
    const file = e.target.files[0];

    if (file.size > MAX_SIZE_IMAGE) {
      return toast.error('Imagen demasiado grande.');
    }

    const render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () => {
      setImageSelect(render.result);
    };
    handleImage(file);
  };

  return (
    <div className='w-full min-h-16 my-10 relative'>
      <img
        src={typeof image === 'string' ? image : imageSelect}
        alt='company'
        className='w-32 h-32 rounded-lg mx-auto'
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = '/not-image.jpg';
        }}
      />
      <input
        type='file'
        name='images'
        accept='image/png, image/jpeg, image/jpg'
        className='w-32 h-full absolute top-0 left-[30%] opacity-0'
        onChange={handleSelectedImage}
      />
    </div>
  );
};

export default SelectImage;
