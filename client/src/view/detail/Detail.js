import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { ReactComponent as CartIcon } from "../../image/cart.svg";
import { ProductContext } from "../../context/ProductContext";
import Header from "../../component/header/Header";
import "./Detail.scss";

function Detail() {
    const { getProductById, productState } = useContext(ProductContext);
    const { idParams } = useParams();

    // eslint-disable-next-line
    useEffect(() => getProductById(idParams), []);
    const { product } = productState;
    const {
        name,
        thumbnail,
        description,
        id,
        manufacturer,
        category,
        amount,
        price,
    } = product;

    return (
        <div>
            <Header title="Product" />
            <div class="detail-container">
                <img src={thumbnail} alt="Not found" />
                <div class="information">
                    <div class="title">{name}</div>
                    <br />
                    <div class="description">{description}</div>
                    <br />
                    <p>
                        <span class="attribute">Item Code :</span>
                        <span class="fill">{id}</span>
                    </p>
                    <br />
                    <p>
                        <span class="attribute">Manufacturer :</span>
                        <span>{manufacturer}</span>
                    </p>
                    <br />
                    <p>
                        <span class="attribute">category :</span>
                        <span style={{ color: "#487FCD" }}>{category}</span>
                    </p>
                    <br />
                    <p>
                        <span class="attribute">
                            Available units in stock :
                        </span>
                        <span>{amount}</span>
                    </p>
                    <br />
                    <p class="price">{price}USD</p>
                    <br />
                    <div class="button-group">
                        <Link to="/">
                            <button class="back">
                                <svg viewBox="0 0 473.654 473.654">
                                    <circle
                                        cx="236.827"
                                        cy="236.827"
                                        r="236.827"
                                    />
                                    <path
                                        style={{ fill: "#00C960" }}
                                        d="M338.465,207.969c-43.487,0-86.975,0-130.459,0c11.08-11.08,22.161-22.161,33.241-33.245  c25.56-25.56-14.259-65.084-39.883-39.456c-27.011,27.011-54.018,54.022-81.029,81.033c-10.841,10.841-10.549,28.907,0.213,39.669  c27.011,27.007,54.018,54.018,81.029,81.025c25.56,25.56,65.084-14.259,39.456-39.883c-11.013-11.013-22.026-22.026-33.039-33.035  c43.357,0,86.713,0,130.066,0C374.283,264.077,374.604,207.969,338.465,207.969z"
                                    />
                                </svg>
                                Back
                            </button>
                        </Link>
                        <button class="order" onclick="order()">
                            <CartIcon />
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
