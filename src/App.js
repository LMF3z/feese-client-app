import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './constants';
import Layout from './components/Layouts/Layout';
// public
import Home from './pages/public/Home';
import Register from './pages/public/Register';
import Login from './pages/public/Login';
import PublicComponents from './components/PublicComponents';
import PrivateComponents from './components/PrivateComponents';
// private
import DetailsEmployeePayment from './pages/private/EmployeesScreen/DetailsEmployeePayment';
import Employees from './pages/private/EmployeesScreen/Employees';
import Expenditure from './pages/private/ExpenditureScreen/Expenditure';
import MainApp from './pages/private/MainAppScreen/MainApp';
import NotFoundPage from './pages/NotFoundPage';
import OrderReceipt from './pages/private/MainAppScreen/OrderReceipt';
import Orders from './pages/private/OrdersScreen/Orders';
import PaymentsWorkers from './pages/private/EmployeesScreen/PaymentsWorkers';
import PaymentsWorkersHistories from './pages/private/PaymentWorkersHistoryScreen/PaymentsWorkersHistories';
import ProfileCompany from './pages/private/ProfileCompany';
import Services from './pages/private/ServicesScreen/Services';
import SubscriptionCompany from './pages/private/SubscriptionCompany';
import UsersCompany from './pages/private/UsersCompanyScreen/UsersCompany';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route element={<PublicComponents />}>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
          </Route>
          <Route element={<PrivateComponents />}>
            <Route path={routes.profileCompany} element={<ProfileCompany />} />
            <Route
              path={routes.subscriptionCompany}
              element={<SubscriptionCompany />}
            />
            <Route path={routes.usersCompany} element={<UsersCompany />} />
            <Route path={routes.app} element={<MainApp />} />
            <Route path={routes.orders} element={<Orders />} />
            <Route
              path={`${routes.receipt}/:id/:s`}
              element={<OrderReceipt />}
            />
            <Route path={routes.services} element={<Services />} />
            <Route path={routes.employees} element={<Employees />} />
            <Route
              path={`${routes.paymentsWorkers}/:id`}
              element={<PaymentsWorkers />}
            />
            <Route
              path={routes.paymentsWorkersHistories}
              element={<PaymentsWorkersHistories />}
            />
            <Route
              path={`${routes.detailsPaymentWorker}/:id`}
              element={<DetailsEmployeePayment />}
            />
            <Route path={routes.expenditures} element={<Expenditure />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
