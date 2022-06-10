import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import CharacterForm from './pages/characterForm/characterForm';
import logo from './images/videogame_asset_FILL0_wght400_GRAD0_opsz48.svg';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <div className="bg-white pb-3 sm:pb-4 lg:pb-6">
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
      <section className="p-6">
        <CharacterForm />
      </section>
    </div>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
