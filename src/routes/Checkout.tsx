import { useState, useEffect } from 'react';
import axios from 'axios';
// Logo import might be optional if the modal doesn't have its own header, or can be passed as prop
// import logo from '/companyLogo.png';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  addedItems: { name: string; price: string; image: string; isVeg: boolean; quantity: number }[];
}

function CheckoutModal({ isOpen, onClose, addedItems }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    userName: '',
    phoneNo: '',
    roomNo: '',
    tableNo: '',
    orderType: '',
  });
  const [orderId, setOrderId] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        userName: '',
        phoneNo: '',
        roomNo: '',
        tableNo: '',
        orderType: '',
      });
      setOrderId('');
      setShowSuccessModal(false);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = async () => {
    const { userName, phoneNo, roomNo, tableNo, orderType } = formData;
    if (!userName || !phoneNo || !roomNo || !tableNo || !orderType) {
      alert('Please fill in all required fields.');
      return;
    }
    if (addedItems.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }

    const orderData = {
      userName,
      phoneNo,
      roomNo,
      tableNo,
      orderType,
      orderedItems: addedItems,
    };

    try {
      const response = await axios.post('/api/users/orders', orderData);
      console.log('Order saved successfully:', response.data);
      
      if (response.data && response.data.id) {
        setOrderId(response.data.id.toString());
      } else if (response.data && response.data.order_id) {
        setOrderId(response.data.order_id.toString());
      } else {
        console.warn('Backend did not return a recognizable order ID. Displaying a generic message or timestamp ID.');
        setOrderId(`TEMP-${Date.now()}`);
      }
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save order. Please try again.');
    }
  };

  const closeSuccessModalAndCheckout = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const handleDownloadReceipt = () => {
    const totalPrice = addedItems.reduce((sum, item) => sum + item.quantity * parseInt(item.price.replace('₹', '')), 0);
    let receiptContent = `Order Receipt\n`;
    receiptContent += `------------------------------------\n`;
    receiptContent += `Order ID: ${orderId}\n`;
    receiptContent += `User Name: ${formData.userName}\n`;
    receiptContent += `Phone No: ${formData.phoneNo}\n`;
    receiptContent += `Room No: ${formData.roomNo}\n`;
    receiptContent += `Table No: ${formData.tableNo}\n`;
    receiptContent += `Order Type: ${formData.orderType}\n`;
    receiptContent += `Date: ${new Date().toLocaleString()}\n`;
    receiptContent += `------------------------------------\n`;
    receiptContent += `Ordered Items:\n`;
    addedItems.forEach(item => {
      receiptContent += `  - ${item.name} (x${item.quantity}): ${item.price} each\n`;
    });
    receiptContent += `------------------------------------\n`;
    receiptContent += `Total Price: ₹${totalPrice}\n`;
    receiptContent += `------------------------------------\n`;
    receiptContent += `Thank you for your order!\n`;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Order_Receipt_${orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[#00000091] flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
            aria-label="Close checkout"
          >
            &times;
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-[#4d869c] focus:border-[#4d869c]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone No</label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-[#4d869c] focus:border-[#4d869c]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Room No</label>
            <input
              type="text"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-[#4d869c] focus:border-[#4d869c]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Table No</label>
            <input
              type="text"
              name="tableNo"
              value={formData.tableNo}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-[#4d869c] focus:border-[#4d869c]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Order Type</label>
            <select
              name="orderType"
              value={formData.orderType}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-[#4d869c] focus:border-[#4d869c]"
              required
            >
              <option value="">Select Order Type</option>
              <option value="delivery">Delivery</option>
              <option value="takeaway">Take Away</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmOrder}
            className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-150 ease-in-out disabled:opacity-50"
            disabled={addedItems.length === 0}
          >
            Confirm Order (₹{addedItems.reduce((sum, item) => sum + item.quantity * parseInt(item.price.replace('₹', '')), 0)})
          </button>
        </div>

        {/* Inner Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-center">
              <h2 className="text-xl font-bold mb-4 text-green-600">Order Confirmed!</h2>
              <p className="mb-2">
                Order ID: <span className="font-mono text-[#4d869c]">{orderId}</span>
              </p>
              <p className="mb-1">User Name: {formData.userName}</p>
              <p className="mb-1">Phone No: {formData.phoneNo}</p>
              <p className="mb-1">Room No: {formData.roomNo}</p>
              <p className="mb-1">Table No: {formData.tableNo}</p>
              <p className="mb-3">Order Type: {formData.orderType}</p>
              <div className="mt-4 pt-2 border-t">
                <h3 className="text-lg font-semibold mb-2">Ordered Items:</h3>
                <ul className="list-disc list-inside text-left max-h-32 overflow-y-auto text-sm text-gray-600">
                  {addedItems.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity} x {item.price}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownloadReceipt}
                  className="flex-1 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
                >
                  Download Receipt
                </button>
                <button
                  onClick={closeSuccessModalAndCheckout}
                  className="flex-1 bg-[#4d869c] text-white px-6 py-2 rounded-md hover:bg-[#357086] transition duration-150 ease-in-out"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;
