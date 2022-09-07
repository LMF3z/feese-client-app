import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const salt = bcrypt.genSaltSync(10);

const encripPassword = (pass) => {
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
};

const comparePassword = (password, hash) => {
  const isValidPasword = bcrypt.compareSync(password, hash);
  return isValidPasword;
};

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
};

const validatePassword = { encripPassword, comparePassword, signToken };

export default validatePassword;
