import { useState } from "react";
import "./editInvoice.scss"
const EditInvoice = ({ invoice, onSave }) => {
  const [formData, setFormData] = useState(
    invoice || {
      client: "",
      vehicle: "",
      date: "",
      dueDate: "",
      status: "",
      amount: "",
      service:""
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update Invoice", formData);
    onSave(formData);
  };

  return (
    <div className="edit-invoice-container">
      <form onSubmit={handleSubmit} className="edit-invoice-form">
        <h2 className="edit-invoice-header">Edit Invoice</h2>

        <div className="form-row">
          <div className="form-field">
            <label>Client Name</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Vehicle</label>
            <input
              type="text"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Invoice Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <div className="form-field">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Service Provided</label>
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="update-invoice-btn">
          Update Invoice
        </button>
      </form>
    </div>
  );
};

export default EditInvoice;