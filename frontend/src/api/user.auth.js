import axios from "axios";

const registerUser = async function (data) {
  try {
    const res = await axios.post(`/api/user/register`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res)
    return {
      status: res.status,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: null,
      error: error.response?.data || "something went wrong",
    };
  }
};

const loginUser = async function (data) {
  try {
    const res = await axios.post(`/api/user/login`, data, {
      // using axios here and not api since have to use vite's proxy here, else the cookie is not being set in the browser
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return {
      status: res.status,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: null,
      error: error.response?.data || "something went wrong",
    };
  }
};

const searchForVendors = async function () {
  try {
    const res = await axios.get(`/api/user/searchVendors`, {
      withCredentials: true, // required for cookie auth
    });

    return {
      status: res.status,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: null,
      error: error.response?.data || "something went wrong",
    };
  }
};

export { registerUser, loginUser,searchForVendors };
