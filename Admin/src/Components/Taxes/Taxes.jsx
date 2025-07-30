import React, { useEffect, useState } from 'react';
import './Taxes.css';

const Taxes = () => {
  const [taxes, setTaxes] = useState([]);
  const [newTax, setNewTax] = useState({ name: '', type: 'percentage', value: '' });
  const [editingTax, setEditingTax] = useState(null);

  useEffect(() => {
    fetchTaxes();
  }, []);

  const fetchTaxes = async () => {
    try {
      const res = await fetch('http://localhost:5000/taxes');
      const data = await res.json();
      if (data.success) {
        setTaxes(data.taxes);
      }
    } catch (error) {
      console.error('❌ Failed to fetch taxes:', error);
    }
  };

  const handleAddTax = async () => {
    const body =
      newTax.type === 'percentage'
        ? { name: newTax.name, type: newTax.type, percentage: parseFloat(newTax.value) }
        : { name: newTax.name, type: newTax.type, value: parseFloat(newTax.value) };

    try {
      const res = await fetch('http://localhost:5000/taxes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setNewTax({ name: '', type: 'percentage', value: '' });
        fetchTaxes();
      } else {
        alert(data.message || 'Failed to add tax');
      }
    } catch (err) {
      console.error('❌ Add tax error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tax?')) return;
    try {
      const res = await fetch(`http://localhost:5000/taxes/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchTaxes();
    } catch (err) {
      console.error('❌ Delete tax error:', err);
    }
  };

  const handleEditSave = async (id) => {
    const body = {
      name: editingTax.name,
      type: editingTax.type,
      value: parseFloat(editingTax.value),
    };
    try {
      const res = await fetch(`http://localhost:5000/taxes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setEditingTax(null);
        fetchTaxes();
      }
    } catch (err) {
      console.error('❌ Edit tax error:', err);
    }
  };

  return (
    <div className="taxes-container">
      <h2>Manage Taxes</h2>

      <div className="add-tax-form">
        <input
          type="text"
          placeholder="Tax Name"
          value={newTax.name}
          onChange={(e) => setNewTax({ ...newTax, name: e.target.value })}
        />
        <select
          value={newTax.type}
          onChange={(e) => setNewTax({ ...newTax, type: e.target.value })}
        >
          <option value="percentage">Percentage (%)</option>
          <option value="fixed">Fixed (₹)</option>
        </select>
        <input
          type="number"
          placeholder="Value"
          value={newTax.value}
          onChange={(e) => setNewTax({ ...newTax, value: e.target.value })}
        />
        <button onClick={handleAddTax}>Add Tax</button>
      </div>

      <table className="tax-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((tax) => (
            <tr key={tax._id}>
              <td>
                {editingTax?._id === tax._id ? (
                  <input
                    value={editingTax.name}
                    onChange={(e) => setEditingTax({ ...editingTax, name: e.target.value })}
                  />
                ) : (
                  tax.name
                )}
              </td>
              <td>
                {editingTax?._id === tax._id ? (
                  <select
                    value={editingTax.type}
                    onChange={(e) => setEditingTax({ ...editingTax, type: e.target.value })}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed</option>
                  </select>
                ) : (
                  tax.type
                )}
              </td>
              <td>
                {editingTax?._id === tax._id ? (
                  <input
                    type="number"
                    value={editingTax.value}
                    onChange={(e) => setEditingTax({ ...editingTax, value: e.target.value })}
                  />
                ) : (
                  tax.type === 'percentage'
                    ? `${tax.percentage || tax.value}%`
                    : `₹${tax.value}`
                )}
              </td>
              <td>
                {editingTax?._id === tax._id ? (
                  <>
                    <button onClick={() => handleEditSave(tax._id)}>Save</button>
                    <button onClick={() => setEditingTax(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() =>
                      setEditingTax({
                        _id: tax._id,
                        name: tax.name,
                        type: tax.type,
                        value: tax.percentage ?? tax.value,
                      })
                    }>Edit</button>
                    <button onClick={() => handleDelete(tax._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Taxes;
