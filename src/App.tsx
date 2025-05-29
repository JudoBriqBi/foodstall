import './index.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './routes/Menu';
import YourCart from './routes/YourCart';
import Checkout from './routes/Checkout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/YourCart" element={<YourCart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
