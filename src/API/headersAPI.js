import axios from 'axios';
import storage from '../utils/handleLocal';

export const base_url = process.env.REACT_APP_API_URL;

export const headers = (ContentType = 'application/json') => {
  const { token } = storage.getDataCompany();

  if (token) {
    return {
      'Content-Type': ContentType,
      authorization: `bearer ${token}`,
    };
  }

  return null;
};

export const verify_token_expired = async () =>
  await axios.post(
    `${base_url}/auth/is-token-valid`,
    {},
    { headers: headers() }
  );
