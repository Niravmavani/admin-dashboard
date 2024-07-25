import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// create customer
const createFarmerData = (token, payload) => {
  return axios({
    url: `${BASE_URL}/farmers`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
};

// get all customer
const farmerData = (token, currentPage, itemsPerPage) => {
  return axios({
    url: `${BASE_URL}/farmers?page=${currentPage + 1}&limit=${itemsPerPage}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// get customer by id
const farmerDataById = (token, id) => {
  return axios({
    url: `${BASE_URL}/farmers/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// customer delete
const farmerDelete = (token, farmerToDelete) => {
  return axios({
    url: `${BASE_URL}/farmers/${farmerToDelete}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

//edit customer
const editFarmer = (token, farmerId, payload) => {
  return axios({
    url: `${BASE_URL}/farmers/${farmerId}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
};

export {
  farmerData,
  createFarmerData,
  farmerDataById,
  editFarmer,
  farmerDelete,
};
