import { useState } from 'react';
import axios from 'axios';

const CreateItem = ({ addItem }) => {
  const [item, setItem] = useState({ name: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/items', item);
      console.log('Yangi element yaratildi:', response.data);
      addItem(response.data);
      setItem({ name: '', description: '' });
    } catch (error) {
      console.error('Element yaratishda xato:', error);
    }
  };

  return (
    <div className="mb-4">
      <h4 className="mb-3">Yangi Element Yaratish</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            placeholder="Nomi"
            required
          />
        </div>
        <div className="col-md-6">
          <textarea
            className="form-control"
            value={item.description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            placeholder="Tavsifi"
            rows="3"
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Yaratish</button>
        </div>
      </form>
    </div>
  );
};

export default CreateItem;
