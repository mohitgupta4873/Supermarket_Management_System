import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/Inventory.css';

function Inventory() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ i1: '', i2: '', i3: '', i4: '' });
  const [updateMode, setUpdateMode] = useState(false);

  const fetchItems = async () => {
    const res = await api.get('/api/inventory');
    setItems(res.data.details);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.i1 || !form.i2 || !form.i3 || !form.i4) return;
    await api.post('/api/add', form);
    setForm({ i1: '', i2: '', i3: '', i4: '' });
    fetchItems();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await api.post('/api/updateItems', form);
    setForm({ i1: '', i2: '', i3: '', i4: '' });
    setUpdateMode(false);
    fetchItems();
  };

  const selectItem = (item) => {
    setForm({
      i1: item.item_code,
      i2: item.description,
      i3: item.unit_price,
      i4: item.quantity
    });
    setUpdateMode(true);
  };

  return (
    <div className="inventory-container">
      <h2 className="inventory-title">Inventory</h2>

      {/* Manager form to add new items */}
      {user.user_type === 'Manager' && (
        <form className="inventory-form" onSubmit={handleAdd}>
          <h4 className="form-title">Add New Item</h4>
          <input
            className="input-field"
            placeholder="Name"
            value={form.i1}
            onChange={(e) => setForm({ ...form, i1: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Description"
            value={form.i2}
            onChange={(e) => setForm({ ...form, i2: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Price"
            value={form.i3}
            onChange={(e) => setForm({ ...form, i3: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Qty"
            value={form.i4}
            onChange={(e) => setForm({ ...form, i4: e.target.value })}
          />
          <button className="btn" type="submit">Add</button>
        </form>
      )}

      {/* Form to update items */}
      {updateMode && (
        <form className="inventory-form" onSubmit={handleUpdate}>
          <h4 className="form-title">Update Item: {form.i2}</h4>
          

          {user.user_type === 'Manager' && (
            <>
              <label className="input-label">Change Item Price</label>
              <input
                className="input-field"
                placeholder="New Price"
                value={form.i3}
                onChange={(e) => setForm({ ...form, i3: e.target.value })}
              />
              <label className="input-label">Change Quantity</label>
              <input
                className="input-field"
                placeholder="New Quantity"
                value={form.i4}
                onChange={(e) => setForm({ ...form, i4: e.target.value })}
              />
            </>
          )}

          {user.user_type === 'Staff' && (
            <>
              <label className="input-label">Change Quantity</label>
              <input
                className="input-field"
                placeholder="New Quantity"
                value={form.i4}
                onChange={(e) => setForm({ ...form, i4: e.target.value })}
              />
            </>
          )}

          <button className="btn" type="submit">Update</button>
        </form>
      )}


      <hr />

      <ul className="item-list">
        {items.map((item) => (
          <li className="item-entry" key={item.item_code}>
            <span className="item-info">
              {item.item_name} | ₹{item.unit_price} | Qty: {item.quantity}
            </span>
            {(user.user_type === 'Manager' || user.user_type === 'Staff') && (
              <button className="update-btn" onClick={() => selectItem(item)}>Update</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;
