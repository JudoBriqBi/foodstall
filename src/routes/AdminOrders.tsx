import { useEffect, useState } from 'react';
import axios from 'axios';

type OrderedItem = {
  name: string;
  image: string;
  quantity: number;
};

type Order = {
  id: string | number;
  order_id: string | number;
  user_name: string;
  ordered_items: OrderedItem[];
  room_no: string | number;
  table_no: string | number;
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/admin/orders');
        setOrders(response.data);
        console.log('Fetched orders:', response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  console.log('Orders state:', orders);

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 bg-[#4d869c] p-4 shadow-md">
        <img src="/companyLogo.png" alt="Company Logo" className="w-12 h-12 mr-2" />
        <h1 className="text-2xl font-bold text-white">Orders</h1>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Order ID</th>
            <th className="border border-gray-300 p-2">Customer Name</th>
            <th className="border border-gray-300 p-2">Items</th>
            <th className="border border-gray-300 p-2">Room No</th>
            <th className="border border-gray-300 p-2">Table No</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 p-2">{order.order_id}</td>
              <td className="border border-gray-300 p-2">{order.user_name}</td>
              <td className="border border-gray-300 p-2">
                {order.ordered_items && order.ordered_items.length > 0 ? (
                  order.ordered_items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-8 h-8 mr-2" />
                      <span>{item.name} ({item.quantity})</span>
                    </div>
                  ))
                ) : (
                  <span>No items</span>
                )}
              </td>
              <td className="border border-gray-300 p-2">{order.room_no}</td>
              <td className="border border-gray-300 p-2">{order.table_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
