import axioInstance from "../utilities/http";

export const getProductCategories = async () => {
  return await axioInstance.get("/products/category-list");
};



export const getAllProductsByCat = async (categoryName) => {
  return await axioInstance.get(`/products/category/${categoryName}`);
};

export const getSingleProduct = async (productId) => {
  return await axioInstance.get(`/products/${productId}`);
};

export const login = async (formData) => {
  return await axioInstance.post("/auth/signin", formData);
};

export const registerUser = async (formData) => {
  return await axioInstance.post("/auth/signup", formData);
};
export const getAuthenticatedUser = async (token) => {
  return await axioInstance.get("/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateUser = async (formData, token) => {
  return await axioInstance.patch("/auth/updateuser", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logoutUser = async () => {
  return await axioInstance.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
};
// products
export const createProduct = async (formData, token) => {
  return await axioInstance.post("/products/create", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getProductsByCategory = async (categoryName) => {
  return axioInstance.get(`/products/${categoryName}`);
};
export const getASingleProduct = async (productTitle) => {
  return axioInstance.get(`/products/single/${productTitle}`);
};
export const searchProducts = async (searchQuery) => {
  return await axioInstance.get(`/products/get/search?q=${searchQuery}`);
};

export const getAllproducts = async () => {
  return await axioInstance.get("/products");
};

export const updateProducts = async(productId, formData,token)=>{
  return await axioInstance.patch(`/products/update/${productId}`, formData,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const deleteProducts = async(productId,token)=>{
  return await axioInstance.delete(`/products/delete/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}