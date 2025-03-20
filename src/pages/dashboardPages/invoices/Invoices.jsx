import React, { useEffect, useState } from "react";
import "./invoices.scss";
import { IoIosAddCircle } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { SlOptionsVertical } from "react-icons/sl";
import {
  getAllInvoices,
  createInvoice,
  editInvoice,
  deleteInvoice
} from "../../../api/invoice/invoice.api";

import { Modal, Button } from "react-bootstrap";
import AddInvoices from "./AddInvoices";
import EditInvoice from "./EditInvoice";

const InvoicesPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const addToggleModal = () => {
    setAddModal(!addModal);
  };
  const deleteToggleModal = (invoice) => {
    setSelectedInvoice(invoice);
    setDeleteModal(!deleteModal);
  };

  const editToggleModal = (invoice) => {
    setSelectedInvoice(invoice);
    setEditModal(!editModal);
  };

  // Fetch all invoices on component mount
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const invoices = await getAllInvoices();
      setInvoiceList(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  // Add Invoice
  const handleAddInvoice = async (invoice) => {
    try { 
      const newInvoice = await createInvoice(invoice);  
      setInvoiceList((prevList) => [...prevList, newInvoice]); // Update state properly
      setAddModal(false);
    } catch (error) {
      console.error("Error adding invoice:", error);
    }
  };

  // Edit Invoice
  const handleEditInvoice = async (updatedInvoice) => {
    try {
      await editInvoice(updatedInvoice.id, updatedInvoice);
      setInvoiceList(
        invoiceList.map((invoice) =>
          invoice.id === updatedInvoice.id ? updatedInvoice : invoice
        )
      );
      setEditModal(false);
    } catch (error) {
      console.error("Error editing invoice:", error);
    }
  };

  // Delete Invoice
  const handleDeleteInvoice = async () => {
    if (!selectedInvoice) return;
    try {
      await deleteInvoice(selectedInvoice.id);
      setInvoiceList(
        invoiceList.filter((inv) => inv.id !== selectedInvoice.id)
      );
      setDeleteModal(false);
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };


  return (
    <div className="invoice-container">
      <h1>Invoice</h1>
      <div className="row header-btns d-flex justify-content-end">
        <div className="head-btn-add col">
          <button
            type="button"
            className="add-invoice-btn btn btn-outline-info"
            onClick={addToggleModal}
          >
            <IoIosAddCircle size={20} />
            <b className="add-btn">Add Invoices</b>
          </button>
        </div>
        <div className="menu-status-action col head-btn-status">
          <Dropdown>
            <Dropdown.Toggle
              id="menu-dropdown"
              className="menu-status-dropdown"
            >
              <FaFilter />
              <b className="filter-status">Filter By Status</b>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#paid">Paid</Dropdown.Item>
              <Dropdown.Item href="#pending">Pending</Dropdown.Item>
              <Dropdown.Item href="#draft">Draft</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="card invoice-details">
        <div className="table-responsive">
          <div className="table-caption">Invoices List</div>
          <hr />
          <table className="table table-borderless invoice-table">
            <thead>
              <tr>
                <th scope="col">Client Name</th>
                <th>Vehicle</th>
                <th scope="col">Invoice Date</th>
                <th scope="col">Due Date</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoiceList.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.client}</td>
                  <td>{invoice.vehicle}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.dueDate}</td>
                  <td>{invoice.amount}</td>
                  <td>{invoice.status}</td>
                  <td>
                    <div className="menu-invoice-action">
                      <Dropdown>
                        <Dropdown.Toggle
                          id="menu-dropdown"
                          className="menu-invoice-dropdown"
                        >
                          <SlOptionsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            href="#edit"
                            onClick={() => editToggleModal(invoice)}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#delete"
                            onClick={() => deleteToggleModal(invoice)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        className="add-modal"
        show={addModal}
        onHide={addToggleModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>CREATE INVOICE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddInvoices onAddInvoice={handleAddInvoice} />
        </Modal.Body>
      </Modal>

      <Modal
        className="delete-modal"
        show={deleteModal}
        onHide={() => deleteToggleModal()}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>DELETE INVOICE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this invoice?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => deleteToggleModal()}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteInvoice}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={editModal}
        onHide={() => setEditModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>EDIT INVOICE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           {selectedInvoice && (
            <EditInvoice 
            invoice={selectedInvoice} 
            onSave={handleEditInvoice} 
            />
           )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default InvoicesPage;
