import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/PrintBill.css';

function PrintBill() {
  const location = useLocation();
  const bill = location.state?.bill;

  if (!bill) return <p className="no-bill">No bill data available.</p>;

  const formattedDate = bill.date
    ? new Date(bill.date).toLocaleDateString()
    : 'N/A';

  return (
    <div className="printbill-container">
      <h2 className="printbill-title">Bill ID - {bill.id}</h2>
      <p className="printbill-date">Date: {formattedDate}</p>

      <ul className="printbill-list">
        {(bill.bill_items || []).map((item, i) => (
          <li key={i} className="printbill-item">
            {item.name} — {item.quantity} × ₹{item.unit_price} = ₹
            {(item.quantity * item.unit_price).toFixed(2)}
          </li>
        ))}
      </ul>

      <h3 className="printbill-total">Total: ₹{Number(bill.total_cost).toFixed(2)}</h3>

      {/* Print Button */}
      <button className="printbill-button" onClick={() => window.print()}>
        Print Bill
      </button>
    </div>
  );
}

export default PrintBill;
