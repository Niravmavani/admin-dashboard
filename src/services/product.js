import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// create product
const createProductData = (token, payload) => {
  return axios({
    url: `${BASE_URL}/products`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
};

// get all product
const productData = (token, currentPage, itemsPerPage, searchResult) => {
  let url = `${BASE_URL}/products?page=${
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

// get product by id
const productDataById = (token, id) => {
  return axios({
    url: `${BASE_URL}/products/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// product delete
const productDelete = (token, productToDelete) => {
  return axios({
    url: `${BASE_URL}/products/${productToDelete}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

//edit product
const editProduct = (payload, token, productId) => {
  let url = `${BASE_URL}/products/${productId}`;

  return axios({
    url: url,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
};

//search product bt filter
// const searchProductByFilter = (token, value) => {
//   return axios({
//     url: `${BASE_URL}/products?search=${value}`,
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export {
  productData,
  createProductData,
  productDataById,
  editProduct,
  productDelete,
  // searchProductByFilter,
};
