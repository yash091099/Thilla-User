import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SplashScreen from "./pages/SplashScreen";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Root from "./pages/Root";
import SearchResult from "./pages/SearchResult";
import Store from "./pages/Store";
import Wishlist from "./pages/Wishlist";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import { useContext } from 'react';
import Context from "./context/AppContext";
import { Toaster } from 'react-hot-toast';
import Settings from './pages/Settings';
import ContactUs from './pages/ContactUs';
import TermsAndCondition from './pages/TermsAndCondition';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HowItWorks from './pages/HowItWorks';

function App() {
  const { authToken } = useContext(Context);

  const AuthGuard = ({ children }) => {
    return authToken ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<AuthGuard><Home /></AuthGuard>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termcondition" element={<TermsAndCondition />} />
        <Route path="/contact" element={<AuthGuard><ContactUs /></AuthGuard>} />
        <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
        <Route path="/root/*" element={<AuthGuard><Root /></AuthGuard>}>
          <Route index element={<SearchResult />} />
          <Route path="store" element={<Store />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="product" element={<Product />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

