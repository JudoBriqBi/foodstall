import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/companyLogo.png'; // Adjust the path as necessary

function Menu() {
  const menuItems = [
    { name: 'Masala Dosa', price: '₹120', image: '/food1.png', isVeg: true },
    { name: 'Burger', price: '₹499', image: '/food1.png', isVeg: false },
    { name: 'Pizza', price: '₹899', image: '/food1.png', isVeg: false },
    { name: 'Pasta', price: '₹799', image: '/food1.png', isVeg: true },
    { name: 'Salad', price: '₹499', image: '/food1.png', isVeg: true },
    { name: 'Soda', price: '₹199', image: '/food1.png', isVeg: true },
  ];

  const [quantities, setQuantities] = useState(Array(menuItems.length).fill(0));
  const [addedItems, setAddedItems] = useState<{ name: string; price: string; image: string; isVeg: boolean; quantity: number }[]>([]);
  const navigate = useNavigate();

  const incrementQuantity = (index: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] += 1;
      updateAddedItems(index, newQuantities[index]);
      return newQuantities;
    });
  };

  const decrementQuantity = (index: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      if (newQuantities[index] > 0) {
        newQuantities[index] -= 1;
        updateAddedItems(index, newQuantities[index]);
      }
      return newQuantities;
    });
  };

  const updateAddedItems = (index: number, quantity: number) => {
    setAddedItems((prev) => {
      const updatedItems = [...prev];
      const item = menuItems[index];
      const existingItemIndex = updatedItems.findIndex((i) => i.name === item.name);

      if (quantity > 0) {
        if (existingItemIndex > -1) {
          updatedItems[existingItemIndex].quantity = quantity;
        } else {
          updatedItems.push({ ...item, quantity });
        }
      } else if (existingItemIndex > -1) {
        updatedItems.splice(existingItemIndex, 1);
      }

      return updatedItems;
    });
  };

  const goToYourCart = () => {
    navigate('/YourCart', { state: { addedItems } });
  };

  return (
    <div className="bg-gray-100 h-full">
      <header className="sticky top-0 bg-white shadow-md z-10 flex items-center justify-between p-4">
        <img src={logo} alt="Company Logo" className="w-12 h-12" />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={goToYourCart}
        >
          View Cart
        </button>
      </header>
      <h1 className="text-center text-4xl font-bold mb-6">MENU</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded mb-4" />
            <div className="flex items-center mb-2">
              <img
                src={item.isVeg ? '/veg.svg' : '/nonVeg.svg'}
                alt={item.isVeg ? 'Veg Icon' : 'Non-Veg Icon'}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-lg font-semibold text-black">{item.name}</span>
            </div>
            <span className="text-gray-600 mb-4">{item.price}</span>
            <div className="flex w-4/5 justify-between">
              <button
                className="!bg-blue-500 text-white px-2 py-1 !text-3xl rounded min-w-[40px]"
                onClick={() => decrementQuantity(index)}
              >
                -
              </button>
              <span className="text-2xl font-semibold text-black text-center">{quantities[index]}</span>
              <button
                className="!bg-blue-500 text-white px-2 py-1 !text-2xl rounded min-w-[40px]"
                onClick={() => incrementQuantity(index)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
