import React, { useContext, useEffect } from "react";
import Header from "../../component/header/Header";
import Product from "../../component/product";
import { ProductContext } from "../../context/ProductContext";
import "./home.scss";

function Home() {
    const { getProduct, productState } = useContext(ProductContext);
    // eslint-disable-next-line
    useEffect(() => getProduct(), []);
    const products = productState.products;

    return (
        <>
            <Header title="Product" subTitle="nothing" isButton={true} />
            <div class="container">
                {products.map((product) => (
                    <Product product={product} />
                ))}
            </div>
        </>
    );
}

export default Home;
