import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '/companyLogo.png'; // Adjust the path as necessary

function Checkout() {
  const [formData, setFormData] = useState({
    userName: '',
    phoneNo: '',
    roomNo: '',
    tableNo: '',
  });
  const [orderId, setOrderId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const addedItems: { name: string; price: string; image: string; isVeg: boolean; quantity: number }[] = location.state?.addedItems || [];
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    const uniqueId = uuidv4();
    setOrderId(uniqueId);
    setShowModal(true);
    console.log('Added Items:', addedItems); // Debugging to ensure addedItems is populated
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 bg-white shadow-md z-10 flex items-center justify-between p-4">
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
            />
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
