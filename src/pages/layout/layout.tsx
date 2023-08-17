import { FC } from "react";
import { Outlet } from "react-router-dom";
import logo from 'images/videogame_asset_FILL0_wght400_GRAD0_opsz48.svg';

const TabItem: FC<{
  pageName: string,
  href: `${string}`,
}> = ({pageName, href}) => {
  return (
    <li className="mr-2">
      <a href={href}
        className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
      >
        {pageName}
      </a>
    </li>
  )
};

export const Layout: FC = () => {
  return (
    <div className="bg-white" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <header className="border-b mb-2" style={{position: 'sticky', top: 0}}>
        <div className="max-w-screen-2xl flex justify-between items-center px-4 md:px-8 mx-auto">
          <a href="#" className="inline-flex items-center text-black-800 text-2xl md:text-3xl gap-2.5" aria-label="logo">
            <span className="inline-flex items-baseline">
              <img className="self-center w-8 h-8 rounded-full mx-1" src={logo} alt="dice" />
            </span>
            Wiz5o ReRoller
          </a>
        </div>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <TabItem pageName="ReRoll" href="/"></TabItem>
          <TabItem pageName="Config" href="/config"></TabItem>
        </ul>
      </header>
      <section className="p-6" style={{flexGrow: 1}}>
        <Outlet />
      </section>
    </div>
  );
};
