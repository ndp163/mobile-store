import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";
import "./Add.scss";

function Add() {
    const { logoutUser, authState } = useContext(AuthContext);
    const { createProduct } = useContext(ProductContext);
    const history = useHistory();
    const [productForm, setProductForm] = useState({
        name: "",
        price: null,
        stock: null,
        manufacturer: "",
        category: "",
        description: "",
        condition: null,
        image: null,
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        const res = await createProduct(productForm);
        if (res.success) history.push("/");
    };

    const onChangeForm = (event) => {
        setProductForm({
            ...productForm,
            [event.target.name]: event.target.value,
        });
    };

    const uploadImage = (event) => {
        setProductForm({
            ...productForm,
            [event.target.name]: event.target.files[0],
        });
    };

    if (!authState) return <Redirect to="/login" />;
    else
        return (
            <>
                <header class="add-header">
                    <div class="title">
                        <span>Product</span>
                        <p>Add product</p>
                    </div>

                    <button onClick={logoutUser}>logout</button>
                </header>
                <div class="add-container">
                    <div class="title">Add new product</div>
                    <form method="post" onSubmit={onSubmit}>
                        <label for="name">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={onChangeForm}
                            required
                        />
                        <label for="price">Unit Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            min="1"
                            onChange={onChangeForm}
                            required
                        />
                        <label for="stock">Units In Stock</label>
                        <input
                            type="number"
                            name="stock"
                            id="stock"
                            min="0"
                            onChange={onChangeForm}
                            required
                        />
                        <label for="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                        ></textarea>
                        <label for="manufacturer">Manufacturer</label>
                        <input
                            type="text"
                            name="manufacturer"
                            id="manufacturer"
                            onChange={onChangeForm}
                            required
                        />
                        <label for="category">Category</label>
                        <input
                            type="text"
                            name="category"
                            id="category"
                            onChange={onChangeForm}
                            required
                        />
                        <label for="condition">Condition</label>
                        <div class="condition-input">
                            <input
                                type="radio"
                                name="condition"
                                id="new"
                                value="New"
                                onChange={onChangeForm}
                            />
                            <label for="new">New</label>
                            <input
                                type="radio"
                                name="condition"
                                id="old"
                                value="Old"
                                onChange={onChangeForm}
                            />
                            <label for="old">Old</label>
                            <input
                                type="radio"
                                name="condition"
                                id="refurbished"
                                value="Refurbished"
                                onChange={onChangeForm}
                            />
                            <label for="refurbished">Refurbished</label>
                        </div>
                        <label for="">Product Image File</label>
                        <div class="image-input">
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={uploadImage}
                                required
                            />
                        </div>
                        <button type="submit">Add Product</button>
                    </form>
                </div>
            </>
        );
}

export default Add;
