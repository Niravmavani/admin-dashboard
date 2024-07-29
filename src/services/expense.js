import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// create customer
const createExpenseData = (token, payload) => {
  return axios({
    url: `${BASE_URL}/expense-masters`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
};

// get all customer
const expenseData = (token, currentPage, itemsPerPage, searchResult) => {
  let url = `${BASE_URL}/expense-masters?page=${
    currentPage + 1
  }&limit=${itemsPerPage}`;
  if (searchResult !== "") {
    url += `&search=${searchResult}`;
  }
  return axios({
    url: url,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// get customer by id
const expenseDataById = (token, id) => {
  return axios({
    url: `${BASE_URL}/expense-masters/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// customer delete
const expenseDelete = (token, expenseToDelete) => {
  return axios({
    url: `${BASE_URL}/expense-masters/${expenseToDelete}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

//edit customer
const editExpense = (token, expenseId, payload) => {
  return axios({
    url: `${BASE_URL}/expense-masters/${expenseId}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
};

export {
  expenseData,
  createExpenseData,
  expenseDataById,
  editExpense,
  expenseDelete,
};
