import axios from 'axios';
import { toast } from "react-toastify";
const API_URL = 'http://localhost:8080/invoice'; // Spring Boot backend URL

export const createInvoice = async (invoiceData) => {
  try {
    console.log("Sending invoice data to backend:", invoiceData);
    // const response = await axios.post(`${API_URL}/add`, invoiceData);
    const response = await axios.post(
      "http://localhost:8080/invoice/add",
      invoiceData
    );
    console.log("response",response.data)
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

export const getAllInvoices = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    toast.error("Invoices loading error!");
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const getInvoiceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Invoice loading error!");
    console.error('Error fetching invoice:', error);
    throw error;
  }
};

export const deleteInvoice = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Invoice deleting error!");
    console.error('Error deleting invoice:', error);
    throw error;
  }
};

export const editInvoice = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/edit/${id}`, updatedData);
    return response.data;
  } catch (error) {
    toast.error("Invoice editing error!");
    console.error('Error editing invoice:', error);
    throw error;
  }
};
