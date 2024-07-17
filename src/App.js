import './App.css'
import './index.css'
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainDash from './components/MainDash/MainDash';
import Sidebar from './components/Sidebar';
import Cards from './components/Cards/Cards';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import RefrshHandler from './RefrshHandler';
import TokenCreation from './components/TokenListing/TokenCreation';
import Assets from './components/AssetsPage/Assets';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  <RefrshHandler setIsAuthenticated={setIsAuthenticated} />;
  const [selected, setSelected] = useState(0);

  const renderComponent = () => {
    switch (selected) {
      case 0:
        return <>
        <MainDash />
        </>;
      case 1:
        return <TokenCreation />;
      default:
        return <></>;
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/assets" element={<Assets />} />
          <Route
            path="/home"
            element={
              <div className="AppGlass">
                <Sidebar selected={selected} setSelected={setSelected} />
                {renderComponent()}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
