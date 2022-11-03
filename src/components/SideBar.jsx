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
    <div className='container_menu z-50' onClick={toggleSidebar} id='side'>
      <nav
        ref={side}
        className={`w-60 min-h-screen p-2 flex flex-col justify-start items-center space-y-1 bg-secondaryColor nav_inactive`}
      >
        {isAuth?.token && (
          <>
            {isAuth.isCompany && (
              <>
                <ItemSideBar
                  label='Perfil'
                  icon={
                    <ProfileUserIcon
                      classes='w-5 h-5'
                      color={
                        matchProfileCompany?.pathname === routes.profileCompany
                          ? colors.white
                          : colors.gray_base
                      }
                    />
                  }
                  isPathMatch={
                    matchProfileCompany?.pathname === routes.profileCompany
                  }
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.profileCompany);
                  }}
                />

                <ItemSideBar
                  label='Suscripción'
                  icon={
                    <ProfileUserIcon
                      classes='w-5 h-5'
                      color={
                        matchSubscriptionCompany?.pathname ===
                        routes.subscriptionCompany
                          ? colors.white
                          : colors.gray_base
                      }
                    />
                  }
                  isPathMatch={
                    matchSubscriptionCompany?.pathname ===
                    routes.subscriptionCompany
                  }
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.subscriptionCompany);
                  }}
                />

                <ItemSideBar
                  label='Usuarios'
                  icon={
                    <UsersCompanyIcon
                      classes='w-5 h-5'
                      color={
                        matchUsersCompany?.pathname === routes.usersCompany
                          ? colors.white
                          : colors.gray_base
                      }
                    />
                  }
                  isPathMatch={
                    matchUsersCompany?.pathname === routes.usersCompany
                  }
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.usersCompany);
                  }}
                />
              </>
            )}

            <ItemSideBar
              label='Asignaciones'
              icon={
                <ApproveIcon
                  classes='w-5 h-5'
                  color={
                    matchAssignments?.pathname === routes.app
                      ? colors.white
                      : colors.gray_base
                  }
                />
              }
              isPathMatch={matchAssignments?.pathname === routes.app}
              handleClick={(e) => {
                toggleSidebar(e, true);
                navigate(routes.app);
              }}
            />

            {(isAuth?.role === roles.admin || isAuth?.isCompany) && (
              <>
                <ItemSideBar
                  label='Ordenes'
                  icon={
                    <OrdersIcon
                      classes='w-5 h-5'
                      color={
                        matchOrders?.pathname === routes.orders
                          ? colors.white
                          : colors.gray_base
                      }
                    />
                  }
                  isPathMatch={matchOrders?.pathname === routes.orders}
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.orders);
                  }}
                />

                <ItemSideBar
                  label='Servicios'
                  icon={
                    <ServicesIcon
                      classes='w-5 h-5'
                      color={
                        matchServices?.pathname === routes.services
                          ? colors.white
                          : colors.gray_base
                      }
                    />
                  }
                  isPathMatch={matchServices?.pathname === routes.services}
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.services);
                  }}
                />

                <ItemSideBar
                  label='Empleados'
                  icon={
                    <EmployeesIcon
                      classes='w-5 h-5'
                      color={
                        matchEmployees?.pathname === routes.employees
                          ? colors.white
                          : colors.gray_base
                      }
                    />
                  }
                  isPathMatch={matchEmployees?.pathname === routes.employees}
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.employees);
                  }}
                />

                <ItemSideBar
                  label='Historial de Pagos'
                  icon={
                    <PaymentsIcon
                      classes='w-5 h-5'
                      color={
                        matchPaymentsWorkersHistories?.pathname ===
                        routes.paymentsWorkersHistories
                          ? colors.white
                          : colors.gray_base
                      }
                    />
                  }
                  isPathMatch={
                    matchPaymentsWorkersHistories?.pathname ===
                    routes.paymentsWorkersHistories
                  }
                  handleClick={(e) => {
                    toggleSidebar(e, true);
                    navigate(routes.paymentsWorkersHistories);
                  }}
                />
              </>
            )}

            <ItemSideBar
              label='Gastos'
              icon={
                <ExpenditureBagIcon
                  classes='w-5 h-5'
                  color={
                    matchExpenditures?.pathname === routes.expenditures
                      ? colors.white
                      : colors.gray_base
                  }
                />
              }
              isPathMatch={matchExpenditures?.pathname === routes.expenditures}
              handleClick={(e) => {
                toggleSidebar(e, true);
                navigate(routes.expenditures);
              }}
              classes={
                matchExpenditures?.pathname === routes.expenditures
                  ? 'bg-buttonSuccessColor text-black'
                  : ''
              }
            />

            <ItemSideBar
              label='Salir'
              icon={<LogOutIcon classes='w-5 h-5' color={colors.gray_base} />}
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
              label='Ingresar'
              icon={
                <LogInIcon
                  color={
                    matchLogin?.pathname === routes.login
                      ? colors.white
                      : colors.gray_base
                  }
                />
              }
              isPathMatch={matchLogin?.pathname === routes.login}
              handleClick={(e) => {
                navigate(routes.login);
                toggleSidebar(e, true);
              }}
            />
            <ItemSideBar
              label='Registrar'
              icon={
                <SignInIcon
                  classes='w-5 h-5'
                  color={
                    matchRegister?.pathname === routes.register
                      ? colors.white
                      : colors.gray_base
                  }
                />
              }
              isPathMatch={matchRegister?.pathname === routes.register}
              handleClick={(e) => {
                navigate(routes.register);
                toggleSidebar(e, true);
              }}
            />
          </>
        )}
      </nav>
    </div>
  );
};

export default SideBar;
