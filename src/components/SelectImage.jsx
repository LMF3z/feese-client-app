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

  // <div className="w-3/5 h-full mx-auto relative border border-red-600"></div>

  return (
    <div className="w-full min-h-16 mt-3 relative">
      <img
        src={typeof image === 'string' ? image : imageSelect}
        alt=""
        className="w-36 h-32 mx-auto circular_images"
      />
      <input
        type="file"
        name="images"
        accept="image/png, image/jpeg, image/jpg"
        className="w-full h-full absolute top-0 left-0 opacity-0"
        onChange={handleSelectedImage}
      />
    </div>
  );
};

export default SelectImage;
