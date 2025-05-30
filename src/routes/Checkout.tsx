import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '/companyLogo.png'; // Adjust the path as necessary

function Checkout() {
  const [formData, setFormData] = useState({
    userName: '',
    phoneNo: '',
    roomNo: '',
    tableNo: '',
    orderType: '', // Added orderType to formData
  });
  const [orderId, setOrderId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const addedItems: { name: string; price: string; image: string; isVeg: boolean; quantity: number }[] = location.state?.addedItems || [];
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateUniqueId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9);
  };

  const handleConfirmOrder = async () => {
    // Validate required fields
    const { userName, phoneNo, roomNo, tableNo, orderType } = formData;
    if (!userName || !phoneNo || !roomNo || !tableNo || !orderType) {
      alert('Please fill in all required fields.');
      return;
    }

    const uniqueId = generateUniqueId();
    setOrderId(uniqueId);

    const orderData = {
      userName,
      phoneNo,
      roomNo,
      tableNo,
      orderType: formData.orderType, // Added orderType
      orderId: uniqueId,
      orderedItems: addedItems,
    };

    try {
      const response = await axios.post('/api/users/orders', orderData);
      console.log('Order saved successfully:', response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save order. Please try again.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 bg-[#4d869c] shadow-md z-10 flex items-center justify-between p-4">
        <img src={logo} alt="Company Logo" className="w-12 h-12" />
      </header>
      <div className="flex-grow p-4">
        <h1 className="text-center text-2xl font-bold mb-6">Checkout</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone No</label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Room No</label>
            <input
              type="text"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Table No</label>
            <input
              type="text"
              name="tableNo"
              value={formData.tableNo}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Order Type</label>
            <select
              name="orderType"
              value={formData.orderType}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Order Type</option>
              <option value="delivery">Delivery</option>
              <option value="takeaway">Take Away</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleConfirmOrder}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Confirm Order
          </button>
        </form>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Order Confirmed</h2>
              <p className="mb-2">
                Order ID:{' '}
                <span className="font-mono text-blue-500">{orderId}</span>
              </p>
              <p className="mb-2">User Name: {formData.userName}</p>
              <p className="mb-2">Phone No: {formData.phoneNo}</p>
              <p className="mb-2">Room No: {formData.roomNo}</p>
              <p className="mb-2">Table No: {formData.tableNo}</p>
              <p className="mb-2">Order Type: {formData.orderType}</p>
              <div className="mt-4">
                <h2 className="text-lg font-bold">Ordered Items:</h2>
                <ul className="list-disc pl-5">
                  {addedItems.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity} x {item.price}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <footer className="sticky bottom-0 bg-white shadow-md z-10 flex items-center justify-between p-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleBack}
        >
          Back
        </button>
      </footer>
    </div>
  );
}

export default Checkout;
