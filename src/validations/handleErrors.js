const handleErrorDb = (error) => {
  switch (error.code) {
    case 11000:
      if (error.keyPattern) {
        return 'Algunos datos ya están en uso.';
      }
      break;

    default:
      return true;
  }
};

const handleErrors = { handleErrorDb };

export default handleErrors;
