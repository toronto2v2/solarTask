import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleModal, panelData } from "../orderModal/OrderModalSlice";

import "./ProductItem.sass";
import panel from "../../assets/panel.png";

const ProductItem = ({id, name, quantity, price}: {
    id: string | number;
    name: string;
    quantity: number;
    price: number;
}) => {


    const [quantityInp, setQuantityInp]: any[] = useState("");
    const dispatch = useDispatch();

    const onInputChange = (e: any) => {
        setQuantityInp(+e.target.value);
    };

    const onAddToCartClick = (
        id: string | number,
        orderName: string,
        orderQuantity: number,
        totalCost: number,
        available: number
    ) => {
        dispatch(toggleModal());
        dispatch(panelData({
                id,
                orderName,
                orderQuantity,
                totalCost,
                available,
                price
            })
        );
        setQuantityInp("");

    };

    const disableBtn = +quantityInp <= 0 || +quantityInp > quantity;
    const outlineInput = quantityInp === 0 || quantityInp > quantity ? true : false
    return (
        <li className="product-item">
            <div className="product-item__wrapper">
                <img src={panel} alt={name} className="product-item__img" />
                <h4 className="product-item__title">{name}</h4>
                <div className="product-item__available">
                    {`Available ${quantity}pcs`}
                </div>
                <div className="product-item__price">{`${price}$`}</div>
                <div className="product-item__buy">
                    <input
                        style={disableBtn && outlineInput ? {outline:'solid red 1px'} : {}}
                        className="product-item__input"
                        type="number"
                        placeholder="Quantity"
                        onChange={(e) => onInputChange(e)}
                        value={quantityInp}
                        min="0"
                        max={`${quantity}`}
                    />
                    <button
                        onClick={() =>
                            onAddToCartClick(
                                id,
                                name,
                                quantityInp,
                                price * quantityInp,
                                quantity - quantityInp
                            )
                        }
                        disabled={disableBtn}
                        className="product-item__btn"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </li>
    );
}

export default ProductItem;
