import './App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainDash from './components/MainDash/MainDash';
import Sidebar from './components/Sidebar';
import Cards from './components/Cards/Cards';
import Login from './components/Login/Login';

function App() {
  const [selected, setSelected] = useState(0);

  const renderComponent = () => {
    switch (selected) {
      case 0:
        return <>
        <MainDash />
        </>;
      case 1:
        return <Cards />;
      default:
        return <></>;
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <div className="AppGlass">
                <Sidebar selected={selected} setSelected={setSelected} />
                {renderComponent()}
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
