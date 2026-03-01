import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Marketplace from './pages/Marketplace';
import ArtisanDashboard from './pages/ArtisanDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import ProductDetail from './pages/ProductDetail';
import AnalystDashboard from './pages/AnalystDashboard';
import CheckoutPage from './pages/CheckoutPage';
import OrderTracking from './pages/OrderTracking';
import HeritageAssistant from './components/HeritageAssistant';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/dashboard" element={<ArtisanDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/order-tracking/:id" element={<OrderTracking />} />
          <Route path="/analytics" element={<AnalystDashboard />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <HeritageAssistant />
      </Router>
    </CartProvider>
  );
}
