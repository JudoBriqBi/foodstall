import './index.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './routes/Menu';
import YourCart from './routes/YourCart';
import Checkout from './routes/Checkout';
import Admin from './routes/Admin';
import AdminOrders from './routes/AdminOrders';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/YourCart" element={<YourCart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
    </Routes>
  );
}

export default App;
