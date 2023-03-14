import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.png';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button type="button" onClick={customFunc} className="relative text-xl rounded-full p-3 gover:bg-light-grey">
      <span className="absolute inline-flex rounded-full h-7 w-7 right-2 top-2" />
        {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
  //const { activeMenu, setActiveMenu } = useStateContext(); 
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mx-6 relative">
      <NavButton  title="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
      color="black" icon={<AiOutlineMenu />} />
      <div className="flex">
      <NavButton  
       title="Notifications" 
      customFunc={() => handleClick('notification')}
      color="black" icon={<RiNotification3Line />} />
      <TooltipComponent
      content="Profile" position="BottomCener">
        <div className="flex item-center gap-2 cursor-pointer p-1 hover:bg-light-grey rounded-lg"
        onClick={() => handleClick('userProfile')}>
          <img className="rounded-full w-8 h-8"src={avatar} />
          <p>
            <span className="text-grey-400 text-14">Hi, </span> {' '}
            <span className="text-grey-400 text-14">User</span>
          </p>
          <MdKeyboardArrowDown className='text-grey-400 text-14' />
        </div>
      </TooltipComponent>
      </div>
    </div>
  )
}

export default Navbar