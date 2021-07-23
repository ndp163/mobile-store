import React, { createContext, useState } from "react";
import axios from "axios";
import { STORAGE_NAME, API_URL } from "../constant";

export const ProductContext = createContext();

function ProductContextProvider({ children }) {
    const [productState, setProductState] = useState({
        product: {},
        products: [],
        isLoading: true,
    });

    const getProduct = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/product`);
            setProductState({
                ...productState,
                products: res.data.product,
                isLoading: false,
            });
        } catch (error) {
            console.log(error);
            setProductState({
                ...productState,
                products: [],
                isLoading: false,
            });
        }
    };

    const getProductById = async (id) => {
        try {
            const res = await axios.get(`${API_URL}/api/product/${id}`);
            setProductState({
                ...productState,
                product: res.data.product[0],
                isLoading: false,
            });
        } catch (error) {
            console.log(error);
            setProductState({
                ...productState,
                product: {},
                isLoading: false,
            });
        }
    };

    const createProduct = async (productForm) => {
        try {
            const formData = new FormData();
            for (let key in productForm) formData.append(key, productForm[key]);
            let token = localStorage.getItem(STORAGE_NAME);
            const res = await fetch(`${API_URL}/api/product`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
            if (error.response) return error.response.data;
            return {
                success: false,
            };
        }
    };

    const productContextData = {
        getProduct,
        getProductById,
        createProduct,
        productState,
    };

    return (
        <ProductContext.Provider value={productContextData}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContextProvider;
