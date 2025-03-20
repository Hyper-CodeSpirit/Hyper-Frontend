import React, { useState } from "react";
import "./addInvoice.scss";

const AddInvoices = ({onAddInvoice}) => {
  const [formData, setFormData] = useState({
    client: "",
    date: "",
    dueDate: "",
    vehicle: "",
    status: "",
    amount: "",
    service: "",
  });

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Invoice Submitted", formData);
    onAddInvoice(formData)
    console.log(formData)
    setFormData({
      // Reset form fields after successful addition
      client: "",
      date: "",
      dueDate: "",
      vehicle: "",
      status: "",
      amount: "",
      service: "",
    });
  };
  return (
    <div className="add-invoice-container">
      <div>
        <form onSubmit={handleSubmit} className="invoice-form">
          <div className="form-row">
            <div className="form-field ">
              <div>Client Name</div>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChanges}
                required
              />
            </div>
            <div className="form-field ">
              <div>Vehicle</div>
              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChanges}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field ">
              <div>Invoice Date</div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChanges}
                required
              />
            </div>
            <div className="form-field ">
              <div>Due Date</div>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChanges}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field ">
              <div>Status:</div>
              <select
                className="status-input"
                name="status"
                value={formData.status}
                onChange={handleChanges}
                required
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div className="form-field ">
              <div>Amount:</div>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChanges}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field ">
              <div>Service Provided</div>
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChanges}
                required
              />
            </div>
          </div>

          <button className="submit-invoice" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddInvoices;
