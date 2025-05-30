import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: number;
  name: string;
  price: string;
  image: string;
  isVeg: boolean;
  isAvailable: boolean;
}

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    isVeg: true,
    isAvailable: true,
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('/api/admin/menu-items');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      alert('Failed to fetch menu items');
    }
  };

  const handleEditItem = (item: MenuItem) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      image: item.image,
      isVeg: item.isVeg,
      isAvailable: item.isAvailable,
    });
    setIsEditModalOpen(true);
  };

  const handleAddItem = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      isVeg: true,
      isAvailable: true,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedItem) return;
    try {
      await axios.put(`/api/admin/menu-items/${selectedItem.id}`, formData);
      setIsEditModalOpen(false);
      fetchMenuItems();
    } catch (error) {
      console.error('Error updating menu item:', error);
      alert('Failed to update menu item');
    }
  };

  const handleAddNewItem = async () => {
    try {
      await axios.post('/api/admin/menu-items', formData);
      setIsAddModalOpen(false);
      fetchMenuItems();
    } catch (error) {
      console.error('Error adding menu item:', error);
      alert('Failed to add menu item');
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`/api/admin/menu-items/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Failed to delete menu item');
    }
  };

  const handleToggleAvailability = async (id: number, currentStatus: boolean) => {
    try {
      await axios.patch(`/api/admin/menu-items/${id}/availability`, {
        isAvailable: !currentStatus,
      });
      fetchMenuItems();
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Failed to update item availability');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Panel */}
      <div className="w-64 bg-[#4d869c] text-white p-4">
        <div className="flex items-center mb-8">
          <img src="/companyLogo.png" alt="Company Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav>
          <button
            onClick={() => navigate('/admin/orders')}
            className="w-full text-left py-2 px-4 hover:bg-[#3a6172] rounded"
          >
            Orders
          </button>
          <button
            onClick={() => {}} // Currently active
            className="w-full text-left py-2 px-4 bg-[#3a6172] rounded mt-2"
          >
            Menu Management
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Menu Items</h2>
          <button
            onClick={handleAddItem}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add New Item
          </button>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className="text-[#4d869c] font-bold">{item.price}</span>
              </div>
              <div className="flex items-center mb-4">
                <img
                  src={item.isVeg ? '/veg.svg' : '/nonVeg.svg'}
                  alt={item.isVeg ? 'Veg' : 'Non-Veg'}
                  className="w-6 h-6 mr-2"
                />
                <span className={`text-sm ${item.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditItem(item)}
                  className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggleAvailability(item.id, item.isAvailable)}
                  className={`flex-1 px-3 py-1 rounded text-white ${
                    item.isAvailable ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isVeg}
                  onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Vegetarian</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Available</label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Menu Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isVeg}
                  onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Vegetarian</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Available</label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewItem}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 