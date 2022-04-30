import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import i18next from 'i18next';
import './App.scss';
import { I18n } from './helpers';
const AdministrationPage = React.lazy(() => import('./pages/administration/Administration.Page'));

const App = (): ReactElement => {
  I18n();
  return (
    <div className="App" key={i18next.language}>
        <Routes>
          <Route path="/" element={<AdministrationPage />}></Route>
        </Routes>
    </div>
  );
};

export default App;
