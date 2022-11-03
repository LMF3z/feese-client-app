export const routes = {
  root: '/',
  login: '/login',
  register: '/register',
  app: '/private/app',
  profileCompany: '/private/profile-company',
  subscriptionCompany: '/private/subscription-company',
  usersCompany: '/private/users-company',
  assignments: '/private/assignments',
  receipt: '/private/receipt',
  orders: '/private/orders',
  services: '/private/services',
  branches: '/private/branches',
  employees: '/private/employees',
  paymentsWorkers: '/private/payments-workers',
  paymentsWorkersHistories: '/private/payments-workers-histories',
  detailsPaymentWorker: '/private/details-payment-worker',
  expenditures: '/private/expenditure',
  reports: '/private/reports',
};

export const MAX_SIZE_IMAGE = 33554432;

export const roles = {
  admin: 'admin',
  cashier: 'cashier',
};

export const colors = {
  gray_base: '#949396',
  white: '#fff',
  violet: '#6a5df8',
  custom_bg: '#1d1d42',

  // final colors
  primaryColor: '#1d1c1f',
  secondaryColor: '#292928',
  grayItemList: '#343537',
  buttonSuccessColor: '#34c658',
  buttonErrorColor: '#db1b2a',
  placeholderColor: '#222f58',
  borderBaseColor: '#2f3552',
  textWhite: '#f0eef2',
  SelectColor: '#0e162c',
  smoothTextColor: '#b5bcc9',
};

export const limitResultRequest = 10;

const days = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const locale = {
  localize: {
    day: (n) => days[n],
    month: (n) => months[n],
  },
  formatLong: {
    date: () => 'mm/dd/yyyy',
  },
};
