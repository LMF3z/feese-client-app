import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './constants';
import Layout from './components/Layouts/Layout';
// public
import Home from './pages/public/Home';
import Register from './pages/public/Register';
import Login from './pages/public/Login';
import PublicComponents from './components/PublicComponents';
import PrivateComponents from './components/PrivateComponents.jsx';
// private
import MainApp from './pages/private/MainApp';
import Employees from './pages/private/Employees';
import Services from './pages/private/Services';
import NotFoundPage from './pages/NotFoundPage';
import OrderReceipt from './pages/private/OrderReceipt';
import Orders from './pages/private/Orders';
import ProfileCompany from './pages/private/ProfileCompany';
import Expenditure from './pages/private/Expenditure';
import PaymentsWorkers from './pages/private/PaymentsWorkers';
import PaymentsWorkersHistories from './pages/private/PaymentsWorkersHistories';
import DetailsEmployeePayment from './pages/private/DetailsEmployeePayment';
import UsersCompany from './pages/private/UsersCompany';
import SubscriptionCompany from './pages/private/SubscriptionCompany';

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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
