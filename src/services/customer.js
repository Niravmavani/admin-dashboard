import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// create customer
const createCustomerData = (token, payload) => {
  return axios({
    url: `${BASE_URL}/customers`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
};

// get all customer
const customerData = (token, currentPage, itemsPerPage) => {
  return axios({
    url: `${BASE_URL}/customers?page=${currentPage + 1}&limit=${itemsPerPage}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// get customer by id
const customerDataById = (token, id) => {
  return axios({
    url: `${BASE_URL}/customers/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// customer delete
const customerDelete = (token, customerToDelete) => {
  return axios({
    url: `${BASE_URL}/customers/${customerToDelete}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

//edit customer
const editCustomer = (token, customerId, payload) => {
  return axios({
    url: `${BASE_URL}/customers/${customerId}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
};

export {
  customerData,
  createCustomerData,
  customerDataById,
  editCustomer,
  customerDelete,
};
