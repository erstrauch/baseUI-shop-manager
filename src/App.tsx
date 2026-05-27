import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './Pages/Home/home';
import Item from './Pages/Item/item';
import Product from './Pages/Product/product';

import './App.css';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<Item />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
