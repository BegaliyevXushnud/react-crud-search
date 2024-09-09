import { useState, useEffect } from 'react';
import axios from 'axios';

const EditItem = ({ itemId, onSave, onCancel }) => {
  const [item, setItem] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${itemId}`);
        setItem(response.data);
      } catch (error) {
        console.error('Elementni olishda xato:', error);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/items/${itemId}`, item);
      console.log('Element tahrirlandi:', response.data);
      onSave(response.data);
    } catch (error) {
      console.error('Elementni tahrirlashda xato:', error);
    }
  };

  return (
    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Elementni Tahrirlash</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={item.name}
                  onChange={(e) => setItem({ ...item, name: e.target.value })}
                  placeholder="Nomi"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  value={item.description}
                  onChange={(e) => setItem({ ...item, description: e.target.value })}
                  placeholder="Tavsifi"
                  rows="3"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Saqlash</button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>Bekor qilish</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
