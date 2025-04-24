import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'; // Create this component if it doesn't exist
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ChoosePlan from './components/ChoosePlan';
import EnterStats from './components/EnterStats';
import DietPage from './components/DietPage';
import GymPage from './components/GymPage';
import GraphsPage from './components/GraphsPage';

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
        <Route path="/diet" element={<DietPage />} />
        <Route path="/gym" element={<GymPage />} />
        <Route path="/graphs" element={<GraphsPage />} />
      </Routes>
    </div>
  );
}

export default App;
