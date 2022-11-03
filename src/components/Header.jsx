import { useState, useEffect, useContext } from 'react';
import MenuIcon from '../assets/Icons/MenuIcon';
import { ContextApp } from '../Store/ContextApp';
import types from '../Store/contextTypes';
import Button from './Button';

const Header = () => {
  const { dispatch } = useContext(ContextApp);

  const toggleCloseSideBar = () => {
    dispatch({
      type: types.TOGGLE_SIDE_BAR,
      payload: true,
    });
  };

  const [isReadyForInstall, setIsReadyForInstall] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log('👍', 'beforeinstallprompt', event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  const downloadApp = async () => {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log('oops, no prompt event guardado en window');
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  };

  return (
    <header className='w-full height_header px-1 md:px-5 bg-primaryColor sticky top-0 text-white z-50'>
      <nav className='height_header flex justify-between items-center px-2'>
        <div className='w-1/4 height_header flex justify-start items-center space-x-5'>
          <MenuIcon
            classes='cursor-pointer'
            color='#fff'
            handleClick={toggleCloseSideBar}
          />
        </div>
        {isReadyForInstall && (
          <div className='w-full md:w-2/5 lg:w-1/4 height_header py-2 flex justify-end items-center'>
            <Button
              label='Descargar app'
              type='button'
              classes='bg-red-600 w-3/5 h-full'
              handleClick={downloadApp}
            />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
