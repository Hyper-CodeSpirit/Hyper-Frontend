import { useState } from "react";

const EditInvoice = ({ invoice, onSave }) => {
  const [formData, setFormData] = useState(
    invoice || {
      client: "",
      vehicle: "",
      date: "",
      due_date: "",
      status: "",
      amount: "",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update Invoice", formData);
    onSave(formData);
  };

  return (
    <form>
      <label>Client Name:</label>
      <input
        type="text"
        name="client"
        value={formData.client}
        onChange={handleChange}
      />

      <label>Vehicle:</label>
      <input
        type="text"
        name="vehicle"
        value={formData.vehicle}
        onChange={handleChange}
      />

      <label>Date:</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <label>Date:</label>
      <input
        type="date"
        name="due_date"
        value={formData.due_date}
        onChange={handleChange}
      />

      <div>Status:</div>
      <select
        className="status-input"
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

      <label>Amount:</label>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
      />

      <button type="submit" onChange={handleSubmit}>
        Update Invoice
      </button>
    </form>
  );
};
export default EditInvoice;
