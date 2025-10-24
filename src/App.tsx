import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
// We will create these pages next
// import BookmarksPage from './pages/BookmarksPage'; 
// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Example of a protected route we will build later */}
        {/* <Route path="/bookmarks" element={
          <ProtectedRoute>
            <BookmarksPage />
          </ProtectedRoute>
        } /> */}

      </Routes>
    </Router>
  );
}

export default App;
