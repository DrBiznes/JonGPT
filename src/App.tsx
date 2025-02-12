import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { initializeResponses } from '@/lib/responses/init';

// Initialize response system
initializeResponses();

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;