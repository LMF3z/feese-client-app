import React from 'react';

const UsersCompanyListItem = ({ user }) => {
  return (
    <article className='w-full bg-secondaryColor flex flex-col justify-center items-start md:flex-row md:justify-evenly py-5 pl-5 md:p-5 drop-shadow-2xl'>
      <section>
        <span className='capitalize'>Alias:</span>{' '}
        <label>{user?.alias_user_company}</label>
      </section>
      <section>
        <span className='capitalize'>Email:</span>{' '}
        <label>{user?.email_user_company}</label>
      </section>
      <section className='capitalize'>
        <span>Rol:</span>{' '}
        <label>
          {user?.role_user_company === 'cashier'
            ? 'cajero'
            : user?.role_user_company}
        </label>
      </section>
    </article>
  );
};

export default UsersCompanyListItem;
