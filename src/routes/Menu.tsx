import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/companyLogo.png'; // Adjust the path as necessary

function Menu() {
  const menuItems = [
    { name: 'Lays magic masala', price: '₹50', image: '/lays.jpg', isVeg: true, isAvailable: true },
    { name: 'Lays cream & onion', price: '₹50', image: '/lays_green.jpg', isVeg: true, isAvailable: true },
    { name: 'Bingo Mad Angles', price: '₹50', image: '/mad.jpg', isVeg: true, isAvailable: true },
    { name: 'Bingo Tedhe Medhe', price: '₹20', image: '/tedhe.jpg', isVeg: true, isAvailable: true },
    { name: 'Kurkure Masala Munch', price: '₹30', image: '/kurkure.webp', isVeg: true, isAvailable: true },
    { name: 'Sunfeast Caker Swiss Roll', price: '10', image: '/swiss.webp', isVeg: true, isAvailable: true },
    { name: 'Sunfeast Caker Trinity', price: '10', image: '/trin.webp', isVeg: true, isAvailable: true },
    { name: 'Waffy(single roll)', price: '03', image: '/waffy.webp', isVeg: true, isAvailable: true },
    { name: 'Coffee', price: '₹12', image: '/coffee.jpg', isVeg: true, isAvailable: false },
    { name: 'Tea', price: '₹12', image: '/chai.jpg', isVeg: true, isAvailable: false },
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
    <div className="bg-gray-100 min-h-screen">
      <header className="sticky top-0 bg-gradient-to-r from-[#4d869c] to-[#6eb5c0] shadow-md z-10 flex items-center justify-between px-6 py-3 border-b border-[#3a6172]">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Company Logo" className="w-12 h-12" />
          <span className="text-2xl font-bold text-white tracking-wide drop-shadow">Snacks</span>
        </div>
        <button
          onClick={goToYourCart}
          className="relative p-2 rounded-md hover:bg-[#3a6172]/70 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
          aria-label="View Cart"
        >
          <svg version="1.1" id="shopping_x5F_carts_1_" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" xmlSpace="preserve" className="w-8 h-8" fill="white">
            <g id="_x33__1_">
              <path d="M51.5 97.4c-5.4 0-9.7 4.4-9.7 9.7 0 5.4 4.4 9.7 9.7 9.7s9.7-4.4 9.7-9.7c0-5.3-4.3-9.7-9.7-9.7zm0 13.9c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2c2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2zM19.7 13.4c-.3-1.3-1.4-2.2-2.7-2.2H2.8C1.3 11.2 0 12.4 0 14c0 1.5 1.2 2.8 2.8 2.8h11.9L41 92.4c.3 1.3 1.4 2.2 2.7 2.2h73.1V89H46L19.7 13.4zm84.6 84c-5.4 0-9.7 4.4-9.7 9.7 0 5.4 4.4 9.7 9.7 9.7 5.4 0 9.7-4.4 9.7-9.7.1-5.3-4.3-9.7-9.7-9.7zm0 13.9c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.8 4.2-4.2 4.2zM33.4 33.4l2.8 5.6h85s-.5 3.4-2.5 8.3H38.3l.7 2.8h78.5c-.9 2-2.1 4.2-3.5 6.5-.4.6-.9 1.2-1.4 1.8H41.1l.7 2.8h67.8c-7 5.6-18.5 8.3-25.6 8.3H44.5h.2-.2l2.8 5.6h33.4c16 0 29.1-4.9 36.2-13.9C126.4 49 128 33.4 128 33.4H33.4zm76.3 27.8 2.7-2.6c-.8.9-1.7 1.8-2.7 2.6z" id="icon_12_"/>
            </g>
          </svg>
          {addedItems.length > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 border-2 border-white rounded-full shadow group-hover:scale-110 transition-transform">
              {addedItems.length}
            </span>
          )}
          <span className="absolute left-1/2 -bottom-6 -translate-x-1/2 text-xs text-gray-700 bg-white px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">View Cart</span>
        </button>
      </header>
      <main className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 p-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl border border-gray-100 relative group"
            >
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg mb-3 object-cover border-2 border-gray-200 group-hover:border-[#4d869c] transition" />
              <div className="flex items-center mb-2">
                <img
                  src={item.isVeg ? '/veg.svg' : '/nonVeg.svg'}
                  alt={item.isVeg ? 'Veg Icon' : 'Non-Veg Icon'}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-lg font-semibold text-gray-900">{item.name}</span>
              </div>
              <span className="text-[#4d869c] font-bold mb-2 text-lg">{item.price}</span>
              <div className="flex w-full justify-center items-center gap-2 mt-2">
                {item.isAvailable ? (
                  <>
                    <button
                      className="bg-gray-200 text-[#4d869c] px-3 py-1 text-2xl rounded-l hover:bg-[#e0f2f7] focus:outline-none focus:ring-2 focus:ring-[#4d869c] min-w-[40px]"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => decrementQuantity(index)}
                    >
                      -
                    </button>
                    <span className="text-2xl font-semibold text-gray-900 text-center w-8">
                      {quantities[index]}
                    </span>
                    <button
                      className="bg-[#4d869c] text-white px-3 py-1 text-2xl rounded-r hover:bg-[#357086] focus:outline-none focus:ring-2 focus:ring-[#4d869c] min-w-[40px]"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => incrementQuantity(index)}
                    >
                      +
                    </button>
                  </>
                ) : (
                  <span className="text-red-500 font-medium">Currently Unavailable</span>
                )}
              </div>
              {!item.isAvailable && (
                <span className="absolute top-2 right-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">Out of Stock</span>
              )}
              {/* Optional: Add a best seller badge for certain items */}
              {/* {index === 0 && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full shadow">Best Seller</span>
              )} */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Menu;
