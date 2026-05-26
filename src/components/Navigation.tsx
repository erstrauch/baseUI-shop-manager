import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <>
      <div> home </div>
      <Link to="/">Home</Link>
      <Link to="/item">Item</Link>
      <Link to="/product">Product</Link>
    </>
  );
}

export default Navigation;
