import React from "react";
import "./header.scss";
import { ReactComponent as CartIcon } from "../../image/cart.svg";

function Header({ title, subTitle, isButton }) {
    return (
        <header>
            <div class="title">
                <span>{title}</span>
                <p>{subTitle}</p>
            </div>
            {isButton && (
                <button>
                    <CartIcon />
                    <span>view cart</span>&ensp;
                    <b>
                        <span id="order-count"></span>
                    </b>
                </button>
            )}
        </header>
    );
}

export default Header;
