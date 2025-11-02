import React, { useEffect, useState } from "react";
import "./invoices.scss";
import { IoIosAddCircle } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Chart from "chart.js/auto";


const InvoicesPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const invoicePerPage = 5;

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

  
  const filteredInvoices =
    statusFilter === "All"
      ? invoiceList
      : invoiceList.filter(
        (invoice) => invoice.status.toLowerCase() === statusFilter.toLowerCase()
      );

  const sortedInvoices = filteredInvoices.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; 
  });

  const indexOfLastInvoice = currentPage * invoicePerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicePerPage;
  const currentInvoices = sortedInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  const totalPages = Math.ceil(filteredInvoices.length / invoicePerPage)

  const handlePageChange = (pageNum) =>{
    if (pageNum<1 || pageNum>totalPages) return; //invalid
    setCurrentPage(pageNum);
  }

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

//Invoice Report - filtered
const invoiceReportGenerate = async () => {
  if (!filteredInvoices || filteredInvoices.length === 0) {
    alert("No invoice data available to generate the report.");
    return;
  }

  const doc = new jsPDF("p", "mm", "a4");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("INVOICE REPORT", 70, 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  //summary
  const totalInvoices = invoiceList.length;
  const totalRevenue = invoiceList.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
  const paidCount = invoiceList.filter(i => i.status === "Paid").length;
  const pendingCount = invoiceList.filter(i => i.status === "Pending").length;
  const overdueCount = invoiceList.filter(i => i.status === "Overdue").length;

  doc.setFontSize(12);
  doc.text(`Total Invoices: ${totalInvoices}`, 14, 40);
  doc.text(`Total Revenue: $${totalRevenue}`, 14, 47);
  doc.text(`Paid: ${paidCount} | Pending: ${pendingCount} | Overdue: ${overdueCount}`, 14, 54);

  // Status Distribution - Pie Chart
  const pieCanvas = document.createElement("canvas");
  pieCanvas.width = 400;
  pieCanvas.height = 400;
  pieCanvas.style.display = "none";
  document.body.appendChild(pieCanvas);


  const pieCtx = pieCanvas.getContext("2d");
  new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["Paid", "Pending", "Overdue"],
      datasets: [
        {
          label: "Status Distribution",
          data: [paidCount, pendingCount, overdueCount],
          backgroundColor: ["#13b40dff", "#ffc107", "#7f0e1aff"],
        },
      ],
    },
    options: {
      animation: false, 
    },
  });

  await new Promise(resolve => setTimeout(resolve, 500));

  const pieImage = pieCanvas.toDataURL("image/png"); 
  doc.setFont("helvetica", "bold")
  doc.text("Status Distribution", 80, 63);
  doc.addImage(pieImage, "PNG", 65, 68, 60, 60);
  document.body.removeChild(pieCanvas); 
  
  // Monthly Revenue - Bar Chart
  const monthlyTotals = {};
  invoiceList.forEach(inv => {
    const month = new Date(inv.date).toLocaleString("default", {
      month: "short",
    });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(inv.amount || 0);
  });

  const barCanvas = document.createElement("canvas");
  barCanvas.width = 500;
  barCanvas.height = 400;
  barCanvas.style.display = "none";
  document.body.appendChild(barCanvas);

  const barCtx = barCanvas.getContext("2d");
  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: Object.keys(monthlyTotals),
      datasets: [
        {
          label: "Revenue ($)",
          data: Object.values(monthlyTotals),
          backgroundColor: "#051364ff",
        },
      ],
    },
    options: {
      animation: false, 
      scales: { y: { beginAtZero: true } },
    },
  });

  await new Promise(resolve => setTimeout(resolve, 500));
  const barImage = barCanvas.toDataURL("image/png");
  doc.setFont("helvetica", "bold")
  doc.text("Monthly Revenue", 80, 135);
  doc.addImage(barImage, "PNG", 25, 140, 140, 70);
  document.body.removeChild(barCanvas); 

  // INVOICE TABLE
  let yPos = 215;
  doc.setFontSize(13);
  doc.text("Invoice Details (Recent 10):", 14, yPos);
  yPos += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text("Client", 14, yPos);
  doc.text("Vehicle", 50, yPos);
  doc.text("Amount", 90, yPos);
  doc.text("Status", 120, yPos);
  doc.text("Date", 150, yPos);
  yPos += 6;
  doc.line(14, yPos, 190, yPos);
  yPos += 6;

  sortedInvoices.slice(0, 10).forEach(inv => {
    doc.text(inv.client || "-", 14, yPos);
    doc.text(inv.vehicle || "-", 50, yPos);
    doc.text(`${inv.amount || 0}`, 90, yPos);
    doc.text(inv.status || "-", 120, yPos);
    doc.text(inv.date || "-", 150, yPos);
    yPos += 6;
  });



  doc.save("Invoice_Report.pdf");

}
  return (
    <div className="invoice-container">
      <div className="header">
        <div className="title">INVOICE</div>
      </div>
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
              <b className="filter-status">
                {statusFilter === "All" ? "Filter By Status" : `Status: ${statusFilter}`}
              </b>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setStatusFilter("All")}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter("Paid")}>Paid</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter("Pending")}>Pending</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter("Overdue")}>Overdue</Dropdown.Item>
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
              {currentInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.client}</td>
                  <td>{invoice.vehicle}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.dueDate}</td>
                  <td>{invoice.amount}</td>
                  <td><span
                    className={`status-badge ${invoice.status === "Paid"
                        ? "paid"
                        : invoice.status === "Pending"
                          ? "pending"
                          : "overdue"
                      }`}
                  >
                    {invoice.status}
                  </span>
                  </td>
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

          <div className="pagination mt-3 d-flex justify-content-center">
            <button onClick={() => handlePageChange(currentPage-1)} disabled={currentPage===1}>
              Prev
            </button>
            { totalPages <= 5 ? Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            ))
             :
              <>
                {currentPage > 2 && (
                  <>
                    <button onClick={() => handlePageChange(1)}>1</button>
                    {currentPage > 3 && <span className="dots">...</span>}
                  </>
                )}
                {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                  .filter((page) => page > 0 && page <= totalPages)
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={currentPage === page ? "active" : ""}
                    >
                      {page}
                    </button>
                  ))}
                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && <span className="dots">...</span>}
                    <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                  </>
                )}
              </>
            }
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>

        </div>
      </div>
      <button type="button" onClick={invoiceReportGenerate} className="invoice-download-btn btn btn-outline-info">
        <FaFileDownload size={20}/>
        <b className="report-btn">Generate Report PDF</b>
      </button>

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
