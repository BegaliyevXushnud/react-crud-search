import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateItem from '../createItem/createItem';
import EditItem from '../EditItem/EditItem';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/items');
        setItems(response.data);
      } catch (error) {
        console.error('Ma`lumotlarni olishda xato:', error);
      }
    };

    fetchData();
  }, []);

  // Yangi elementni ro'yxatga qo'shish
  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  // O'chirish funksiyasi
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
      console.log('Element o\'chirildi:', id);
    } catch (error) {
      console.error('Elementni o\'chirishda xato:', error);
    }
  };

  // Qidiruv funksiyasi
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (itemId) => {
    setEditingItemId(itemId);
  };

  const handleSave = (updatedItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditingItemId(null);
  };

  const handleCancel = () => {
    setEditingItemId(null);
  };

  return (
    <div className="container mt-5">
      <CreateItem addItem={addItem} />

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Qidiruv"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredItems.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(item.id)}>O'chirish</button>
                <button className="btn btn-warning" onClick={() => handleEdit(item.id)}>Tahrirlash</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingItemId && (
        <EditItem
          itemId={editingItemId}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ItemList;
