import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'; // Create this component if it doesn't exist
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ChoosePlan from './components/ChoosePlan';
import EnterStats from './components/EnterStats';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chooseplan" element={<ChoosePlan />} />
        <Route path="/enterstats" element={<EnterStats />} />
      </Routes>
    </div>
  );
}

export default App;
