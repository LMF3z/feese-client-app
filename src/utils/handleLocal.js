const getItemStorage = (name = '') =>
  JSON.parse(window.localStorage.getItem(name));

const setItemStorage = (name = '', data) =>
  window.localStorage.setItem(name, JSON.stringify(data));

const removeItemStorage = (name = '') => window.localStorage.removeItem(name);

// especific
const getDataCompany = (name = 'user_ES') => getItemStorage(name);

const storage = {
  getItemStorage,
  setItemStorage,
  removeItemStorage,
  getDataCompany,
};

export default storage;
