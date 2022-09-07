import axios from 'axios';
import { headers } from '../../../utils/handleRequest';

const createBranch = async (data) =>
  await axios.post('/api/branches/branches', data, { headers: headers() });

const getBranches = async (id_company) =>
  await axios.get(`/api/branches/branches?id_company=${id_company}`, {
    headers: headers(),
  });

const branchesApi = { createBranch, getBranches };

export default branchesApi;
