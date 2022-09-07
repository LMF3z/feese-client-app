import { useRef, useEffect, useContext } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import useAuth from './hooks/auth/useAuth';
import EmployeesIcon from '../assets/Icons/EmployeesIcon';
import { colors, roles, routes } from '../constants';
import ItemSideBar from './ItemSideBar';
import LogOutIcon from '../assets/Icons/LogOutIcon';
import LogInIcon from '../assets/Icons/LogInIcon';
import SignInIcon from '../assets/Icons/SignInIcon';
import ApproveIcon from '../assets/Icons/ApproveIcon';
import ServicesIcon from '../assets/Icons/ServicesIcon.jsx';
import { ContextApp } from '../Store/ContextApp.jsx';
import types from '../Store/contextTypes.js';
import OrdersIcon from '../assets/Icons/OrdersIcon.jsx';
import ProfileUserIcon from '../assets/Icons/ProfileUserIcon.jsx';
import ExpenditureBagIcon from '../assets/Icons/ExpenditureBagIcon';
import PaymentsIcon from '../assets/Icons/PaymentsIcon';
import UsersCompanyIcon from '../assets/Icons/UsersCompanyIcon';

const SideBar = () => {
  const { state, dispatch } = useContext(ContextApp);

  const navigate = useNavigate();
  const { isAuth, handleLogged } = useAuth();

  const matchLogin = useMatch(routes.login);
  const matchRegister = useMatch(routes.register);
  const matchProfileCompany = useMatch(routes.profileCompany);
  const matchSubscriptionCompany = useMatch(routes.subscriptionCompany);
  const matchUsersCompany = useMatch(routes.usersCompany);
  const matchAssignments = useMatch(routes.app);
  const matchServices = useMatch(routes.services);
  const matchEmployees = useMatch(routes.employees);
  const matchExpenditures = useMatch(routes.expenditures);
  const matchPaymentsWorkersHistories = useMatch(
    routes.paymentsWorkersHistories
  );
  const matchBranches = useMatch(routes.branches);
  const matchOrders = useMatch(routes.orders);

  const side = useRef(null);

  useEffect(() => {
    if (state.openSideBar === true) {
      closeSideBar();
    }
  }, [state.openSideBar]);

  const closeSideBar = () => {
    side.current.parentNode.classList.toggle('container_menu_active');
    side.current.classList.toggle('nav_active');
    dispatch({ type: types.TOGGLE_SIDE_BAR, payload: false });
  };

  const toggleSidebar = (e, option) => {
    if (e?.target?.id || option) {
      closeSideBar();
    }
  };

  return (
    <div className="container_menu z-50" onClick={toggleSidebar} id="side">
      <nav
        ref={side}
        className={`w-60 min-h-screen p-2 flex flex-col justify-start items-center space-y-1 bg-secondaryColor text-text_base_color nav_inactive`}
      >
        {isAuth?.token && (
          <>
            {isAuth.isCompany && (
              <>
                <ItemSideBar
                  label="Perfil"
                  icon={
                    <ProfileUserIcon classes="w-5 h-5" color={colors.white} />
                  }
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.profileCompany);
                  }}
                  classes={
                    matchProfileCompany?.pathname === routes.profileCompany
                      ? 'bg-SelectColor text-white'
                      : ''
                  }
                />

                <ItemSideBar
                  label="Suscripción"
                  icon={
                    <ProfileUserIcon classes="w-5 h-5" color={colors.white} />
                  }
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.subscriptionCompany);
                  }}
                  classes={
                    matchSubscriptionCompany?.pathname ===
                    routes.subscriptionCompany
                      ? 'bg-SelectColor text-white'
                      : ''
                  }
                />

                <ItemSideBar
                  label="Usuarios"
                  icon={
                    <UsersCompanyIcon classes="w-5 h-5" color={colors.white} />
                  }
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.usersCompany);
                  }}
                  classes={
                    matchUsersCompany?.pathname === routes.usersCompany
                      ? 'bg-SelectColor text-white'
                      : ''
                  }
                />

                {/* <ItemSideBar
                  label="Sucursales"
                  icon={
                    <BranchesIcons
                      classes="w-5 h-5"
                      color={colors.white}
                    />
                  }
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.branches);
                  }}
                  classes={
                    matchBranches?.pathname === routes.branches
                      ? 'bg-SelectColor text-white'
                      : ''
                  }
                /> */}
              </>
            )}

            <ItemSideBar
              label="Asignaciones"
              icon={<ApproveIcon classes="w-5 h-5" color={colors.white} />}
              handleClick={(e) => {
                toggleSidebar(e, true);
                navigate(routes.app);
              }}
              classes={
                matchAssignments?.pathname === routes.app
                  ? 'bg-SelectColor text-white'
                  : ''
              }
            />

            {(isAuth?.role === roles.admin || isAuth?.isCompany) && (
              <>
                <ItemSideBar
                  label="Ordenes"
                  icon={<OrdersIcon classes="w-5 h-5" color={colors.white} />}
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.orders);
                  }}
                  classes={
                    matchOrders?.pathname === routes.orders
                      ? 'bg-SelectColor text-white'
                      : ''
                  }
                />

                <ItemSideBar
                  label="Servicios"
                  icon={<ServicesIcon classes="w-5 h-5" color={colors.white} />}
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.services);
                  }}
                  classes={
                    matchServices?.pathname === routes.services
                      ? 'bg-SelectColor text-white'
                      : ''
                  }
                />

                <ItemSideBar
                  label="Empleados"
                  icon={
                    <EmployeesIcon classes="w-5 h-5" color={colors.white} />
                  }
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.employees);
                  }}
                  classes={
                    matchEmployees?.pathname === routes.employees
                      ? 'bg-SelectColor text-white'
                      : ''
                  }
                />

                <ItemSideBar
                  label="Historial de Pagos"
                  icon={<PaymentsIcon classes="w-5 h-5" color={colors.white} />}
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.paymentsWorkersHistories);
                  }}
                  classes={
                    matchPaymentsWorkersHistories?.pathname ===
                    routes.paymentsWorkersHistories
                      ? 'bg-SelectColor text-white'
                      : ''
                  }
                />
              </>
            )}

            <ItemSideBar
              label="Gastos"
              icon={
                <ExpenditureBagIcon classes="w-5 h-5" color={colors.white} />
              }
              handleClick={(e) => {
                toggleSidebar(e, true);
                navigate(routes.expenditures);
              }}
              classes={
                matchExpenditures?.pathname === routes.expenditures
                  ? 'bg-SelectColor text-white'
                  : ''
              }
            />

            {/* <ItemSideBar
              label="Reportes"
              icon={
                <ReportsIcon
                  classes="w-5 h-5"
                  color={colors.white}
                />
              }
              handleClick={(e) => {
                toggleSidebar(e, true);
                navigate(routes.reports);
              }}
              classes={
                matchReports?.pathname === routes.reports
                  ? 'bg-SelectColor text-white'
                  : ''
              }
            /> */}

            <ItemSideBar
              label="Salir"
              icon={<LogOutIcon classes="w-5 h-5" color={colors.white} />}
              handleClick={(e) => {
                toggleSidebar(e, true);
                handleLogged(false);
              }}
            />
          </>
        )}

        {!isAuth && (
          <>
            <ItemSideBar
              label="Ingresar"
              icon={<LogInIcon color={colors.white} />}
              handleClick={(e) => {
                navigate(routes.login);
                toggleSidebar(e, true);
              }}
              classes={
                matchLogin?.pathname === routes.login ? 'bg-SelectColor' : ''
              }
            />
            <ItemSideBar
              label="Registrar"
              icon={<SignInIcon classes="w-5 h-5" color={colors.white} />}
              handleClick={(e) => {
                navigate(routes.register);
                toggleSidebar(e, true);
              }}
              classes={
                matchRegister?.pathname === routes.register
                  ? 'bg-SelectColor'
                  : ''
              }
            />
          </>
        )}
      </nav>
    </div>
  );
};

export default SideBar;
