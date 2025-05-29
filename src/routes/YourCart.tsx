import { useLocation, useNavigate } from 'react-router-dom';
import logo from '/companyLogo.png'; 

function YourCart() {
  const location = useLocation();
  const navigate = useNavigate();
  const addedItems: { name: string; price: string; image: string; isVeg: boolean; quantity: number }[] = location.state?.addedItems || [];

  const handleProceedToCheckout = () => {
    console.log('Added Items:', addedItems); // Debugging to ensure addedItems is passed correctly
    navigate('/checkout', { state: { addedItems } });
  };

  const handleBack = () => {
    navigate('/');
  };

  const incrementQuantity = (index: number) => {
    const updatedItems = [...addedItems];
    updatedItems[index].quantity += 1;
    navigate('/YourCart', { state: { addedItems: updatedItems } });
  };

  const decrementQuantity = (index: number) => {
    const updatedItems = [...addedItems];
    if (updatedItems[index].quantity > 0) {
      updatedItems[index].quantity -= 1;
      navigate('/YourCart', { state: { addedItems: updatedItems } });
    }
  };

  const totalPrice = addedItems.reduce((sum, item) => sum + item.quantity * parseInt(item.price.replace('₹', '')), 0);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 bg-white shadow-md z-10 flex items-center justify-between p-4">
        <img src={logo} alt="Company Logo" className="w-12 h-12" />
      </header>
      <div className="flex-grow p-4">
        <h1 className="text-center text-2xl font-bold">Your Cart</h1>
        {addedItems.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {addedItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between border rounded-lg p-4 shadow-md">
                <div>
                  <span className="font-semibold text-lg block">{item.name}</span>
                  <span className="text-gray-600">{item.price} x {item.quantity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => decrementQuantity(index)}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => incrementQuantity(index)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center mt-4">Your cart is empty.</p>
        )}
      </div>
      <footer className="sticky bottom-0 bg-white shadow-md z-10 flex flex-col items-center p-4">
        <span className="text-lg font-semibold mb-2">Total Price: ₹{totalPrice}</span>
        <div className="flex items-center justify-between w-full">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded ${addedItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleProceedToCheckout}
            disabled={addedItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </footer>
    </div>
  );
}

export default YourCart;
