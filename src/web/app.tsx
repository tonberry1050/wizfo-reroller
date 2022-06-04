import { createRoot } from 'react-dom/client';
import CharacterForm from './pages/characterForm/characterForm';

import logo from './images/videogame_asset_FILL0_wght400_GRAD0_opsz48.svg';

import './styles.css';

const App = () => {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <header className="border-b mb-2">
        <div className="max-w-screen-2xl flex justify-between items-center px-4 md:px-8 mx-auto">
          <a href="#" className="inline-flex items-center text-black-800 text-2xl md:text-3xl gap-2.5" aria-label="logo">
            <span className="inline-flex items-baseline">
              <img className="self-center w-8 h-8 rounded-full mx-1" src={logo} alt="dice" />
            </span>
            Wiz5o ReRoller
          </a>
        </div>
      </header>
      <section className='p-2'>
        <CharacterForm></CharacterForm>
      </section>
    </div>
  );
};

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
