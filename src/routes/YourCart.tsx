import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '/companyLogo.png';
import CheckoutModal from './Checkout';

function YourCart() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentAddedItems, setCurrentAddedItems] = useState<
    { name: string; price: string; image: string; isVeg: boolean; quantity: number }[]
  >(location.state?.addedItems || []);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleProceedToCheckout = () => {
    if (currentAddedItems.length === 0) {
      alert("Your cart is empty. Please add items from the menu first.");
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const handleCloseCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  };

  const handleBackToMenu = () => {
    navigate('/');
  };

  const updateCartItems = (updatedItems: typeof currentAddedItems) => {
    setCurrentAddedItems(updatedItems);
    navigate('.', { state: { addedItems: updatedItems }, replace: true });
  };

  const incrementQuantity = (index: number) => {
    const updatedItems = [...currentAddedItems];
    updatedItems[index].quantity += 1;
    updateCartItems(updatedItems);
  };

  const decrementQuantity = (index: number) => {
    const updatedItems = [...currentAddedItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    } else {
      updatedItems.splice(index, 1);
    }
    updateCartItems(updatedItems);
  };
  
  const removeItem = (index: number) => {
    const updatedItems = [...currentAddedItems];
    updatedItems.splice(index, 1);
    updateCartItems(updatedItems);
  };

  const totalPrice = currentAddedItems.reduce((sum, item) => sum + item.quantity * parseInt(item.price.replace('₹', '')), 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-[#4d869c] shadow-md z-20 flex items-center justify-between p-4">
        <img src={logo} alt="Company Logo" className="w-12 h-12" />
        <h1 className="text-xl font-bold text-white">Your Cart</h1>
        <button 
          onClick={handleBackToMenu}
          className="text-white hover:bg-[#3a6172]/70 p-2 rounded-md text-sm"
        >
          Back to Menu
        </button>
      </header>
      <main className="flex-grow p-4 md:p-6">
        {currentAddedItems.length > 0 ? (
          <ul className="space-y-4">
            {currentAddedItems.map((item, index) => (
              <li key={index} className="flex flex-col sm:flex-row items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3 sm:mb-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4"/>
                  <div>
                    <span className="font-semibold text-lg text-gray-800 block">{item.name}</span>
                    <span className="text-gray-600 text-sm">Price: {item.price}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition text-lg disabled:opacity-50"
                    onClick={() => decrementQuantity(index)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold text-gray-800 w-8 text-center">{item.quantity}</span>
                  <button
                    className="bg-[#4d869c] text-white px-3 py-1 rounded-md hover:bg-[#357086] transition text-lg"
                    onClick={() => incrementQuantity(index)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition ml-2 p-1 rounded-md hover:bg-red-100"
                    onClick={() => removeItem(index)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-4 text-xl text-gray-600">Your cart is empty.</p>
            <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <button 
              onClick={handleBackToMenu} 
              className="mt-6 bg-[#4d869c] text-white px-6 py-2 rounded-md hover:bg-[#357086] transition duration-150 ease-in-out"
            >
                Start Shopping
            </button>
          </div>
        )}
      </main>
      {currentAddedItems.length > 0 && (
        <footer className="sticky bottom-0 bg-white border-t border-gray-200 shadow-md z-10 p-4 md:p-6">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xl md:text-2xl font-semibold text-gray-800">
              Total Price: <span className="text-[#4d869c]">₹{totalPrice}</span>
            </span>
            <button
              className={`w-full sm:w-auto bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition duration-150 ease-in-out text-lg font-medium shadow-sm ${currentAddedItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleProceedToCheckout}
              disabled={currentAddedItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </footer>
      )}
      <CheckoutModal 
        isOpen={isCheckoutModalOpen} 
        onClose={handleCloseCheckoutModal} 
        addedItems={currentAddedItems} 
      />
    </div>
  );
}

export default YourCart;
