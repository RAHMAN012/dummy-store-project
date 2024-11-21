import axioInstance from "../utilities/http";

export const getProductCategories = async()=>{
    return await axioInstance.get("/products/category-list")
}

export const getAllproducts = async() =>{
    return await axioInstance.get("/products")
}

export const getAllProductsByCat = async(categoryName) =>{
    return await axioInstance.get(`/products/category/${categoryName}`)
}

export const getSingleProduct = async(productId) =>{
    return await axioInstance.get(`/products/${productId}`)
}
export const searchProducts = async(searchQuery) =>{
    return await axioInstance.get (`/products/search?q=${searchQuery}`)
}
export const login = async(formData)=>{
    return await axioInstance.post("/auth/login", formData)
}
export const getAuthenticatedUser = async(token)=>{
    return await axioInstance.get("/auth/me",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}