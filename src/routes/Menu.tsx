import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/companyLogo.png'; // Adjust the path as necessary

function Menu() {
  const menuItems = [
    { name: 'Lays magic masala', price: '₹50', image: '/lays.jpg', isVeg: true },
    { name: 'Lays cream & onion', price: '₹50', image: '/lays_green.jpg', isVeg: true },
    { name: 'Bingo Mand angles', price: '₹50', image: '/mad.jpg', isVeg: true },
    { name: 'Too Yumm Bhoot Chips', price: '₹50', image: '/bhoot.jpg', isVeg: true },
    { name: 'Bingo Tedhe Medhe', price: '₹50', image: '/tedhe.jpg', isVeg: true },
    { name: 'Coffee', price: '₹12', image: '/coffee.jpg', isVeg: true },
    { name: 'Tea', price: '₹12', image: '/chai.jpg', isVeg: true },
    
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
      <header className="sticky top-0 bg-[#4d869c] shadow-md z-10 flex items-center justify-between p-3">
        <img src={logo} alt="Company Logo" className="w-12 h-12" />
        <button
          onClick={goToYourCart}
          className="relative p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-label="View Cart"
        >
          <svg version="1.1" id="shopping_x5F_carts_1_" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" xmlSpace="preserve" className="w-8 h-8" fill="white">
            <g id="_x33__1_">
              <path d="M51.5 97.4c-5.4 0-9.7 4.4-9.7 9.7 0 5.4 4.4 9.7 9.7 9.7s9.7-4.4 9.7-9.7c0-5.3-4.3-9.7-9.7-9.7zm0 13.9c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2c2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2zM19.7 13.4c-.3-1.3-1.4-2.2-2.7-2.2H2.8C1.3 11.2 0 12.4 0 14c0 1.5 1.2 2.8 2.8 2.8h11.9L41 92.4c.3 1.3 1.4 2.2 2.7 2.2h73.1V89H46L19.7 13.4zm84.6 84c-5.4 0-9.7 4.4-9.7 9.7 0 5.4 4.4 9.7 9.7 9.7 5.4 0 9.7-4.4 9.7-9.7.1-5.3-4.3-9.7-9.7-9.7zm0 13.9c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.8 4.2-4.2 4.2zM33.4 33.4l2.8 5.6h85s-.5 3.4-2.5 8.3H38.3l.7 2.8h78.5c-.9 2-2.1 4.2-3.5 6.5-.4.6-.9 1.2-1.4 1.8H41.1l.7 2.8h67.8c-7 5.6-18.5 8.3-25.6 8.3H44.5h.2-.2l2.8 5.6h33.4c16 0 29.1-4.9 36.2-13.9C126.4 49 128 33.4 128 33.4H33.4zm76.3 27.8 2.7-2.6c-.8.9-1.7 1.8-2.7 2.6z" id="icon_12_"/>
            </g>
          </svg>
          {addedItems.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
              {addedItems.length}
            </span>
          )}
        </button>
      </header>
      {/* <h1 className="text-center text-4xl font-bold mb-6">MENU</h1> */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] p-1">
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
