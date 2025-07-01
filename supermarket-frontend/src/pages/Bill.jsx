import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Bill.css'; // 💡 Link to the CSS file

function Bill() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [qtys, setQtys] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    api.get('/api/bill').then(res => setItems(res.data.items));
  }, []);

  const handleAdd = (item) => {
    const qty = qtys[item.item_code] || 1;
    setSelected([...selected, { ...item, quantity: qty }]);
  };

  const handleQtyChange = (e, code) => {
    setQtys({ ...qtys, [code]: parseInt(e.target.value) });
  };

  const handleSubmit = async () => {
    const payload = {
      code: selected.map(s => s.item_code),
      qty: selected.map(s => s.quantity),
      price: selected.map(s => s.unit_price),
      sub_total: selected.reduce((sum, s) => sum + s.quantity * s.unit_price, 0)
    };
    const res = await api.post('/api/bill', payload);
    navigate('/print', { state: { bill: res.data.bill } });
  };

  if (!user || user.user_type !== 'Clerk') return <p>Unauthorized</p>;

  return (
    <div className="bill-container">
      <h2 className="bill-title">Create Bill</h2>

      <div className="items-list">
        {items.map(item => (
          <div className="item-row" key={item.item_code}>
            <span className="item-name">{item.item_name}</span>
            <span className="item-price">₹{item.unit_price}</span>
            <input
              type="number"
              min="1"
              value={qtys[item.item_code] || ''}
              onChange={(e) => handleQtyChange(e, item.item_code)}
              className="qty-input"
              placeholder="Qty"
            />
            <button className="add-btn" onClick={() => handleAdd(item)}>Add</button>
          </div>
        ))}
      </div>

      <hr />

      <h3 className="selected-title">Selected Items</h3>
      <div className="selected-items">
        {selected.map((s, i) => (
          <div className="selected-row" key={i}>
            {s.name} ×{s.quantity} = ₹{s.quantity * s.unit_price}
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <button className="submit-btn" onClick={handleSubmit}>Submit Bill</button>
      )}
    </div>
  );
}

export default Bill;
