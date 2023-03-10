import { Routes, Route } from 'react-router-dom';

import MainPage from '../../pages/MainPage';
import CourtPage from '../../pages/courtPage/CourtPage';

import '../../fonts/fonts.sass'
import './App.sass';

import OrderModal from '../orderModal/OrderModal';

const App = () => {
  return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/court" element={<CourtPage/>}/>
            </Routes>
            <OrderModal/>
        </div>
  );
}

export default App;
