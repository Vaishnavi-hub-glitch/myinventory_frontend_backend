import './App.css';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (

    
    <div>
      
      <Router>
             {/* <Dashboard/> */}
            <div className="app">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
            </Router>
    </div>
  );
}

export default App;