import { useDispatch,useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createSelector } from "@reduxjs/toolkit";

import {toggleModal,panelData,} from "./OrderModalSlice";
import { addNewPurchase, selectAll as selectAllCourtItems } from "../basket/BasketSlice";
import {quantityUpdated,selectAll,} from "../productsSection/productsSectionSlice";
import { useHttp } from "../../hooks/http.hook";
import "./OrderModal.sass";






function OrderModal() {

    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();
    const {request} = useHttp();

    const panelSelector: any = createSelector(
        selectAll,
        selectAllCourtItems, 
        (panelsArr, courtItems) => {
            return { panelsArr, courtItems };
    });
    const getPanelsArr: any = useSelector(panelSelector);
    const panelState = useSelector(((state:any) => state.modal));

    const { toggleModal: modalState, orderName, orderQuantity, totalCost, available, id, price } = panelState;


    useEffect(() => {
        setInputValue(orderQuantity);
    }, [orderQuantity]);


    const onSubmitClick = (id: number | string) => {
        const requiredPanel = getPanelsArr.panelsArr
            .find((item: any) => item.id === id);

        const panelFromCourt = getPanelsArr.courtItems
            .find((item:any) => item.id === id);

        dispatch(quantityUpdated({ 
            id, quantity: requiredPanel.quantity - +inputValue,
            })
        );

        const quantity = panelFromCourt ? panelFromCourt.orderQuantity + orderQuantity : orderQuantity
        const cost = panelFromCourt ? panelFromCourt.totalCost + totalCost : totalCost
        
        dispatch(addNewPurchase({
            id,
            orderName,
            orderQuantity: quantity,
            totalCost: cost
        }))
        dispatch(toggleModal())

        request(`http://localhost:3001/panels/${id}`, 
                'PATCH', 
                JSON.stringify({quantity:available}))
    };

    const onInputChange = (e: any) => {
        if(e.target.value === 0){
            return
        }
        const leftQuantity = available - e.target.value + orderQuantity;
        const totalMoney = price * +e.target.value
        
        dispatch(panelData({
            ...panelState, 
            orderQuantity: +e.target.value, 
            available: leftQuantity, 
            totalCost: totalMoney 
        }));

    };

    return (
        <div
            style={modalState ? { display: "block" } : { display: "none" }}
            className="modal"
        >
            <div className="modal__wrapper">
                <h3 className="modal__title">Your order is:</h3>
                <div className="modal__name">{orderName}</div>
                <div className="modal__input-wrapper">
                    <div className="modal__input-title">Quantity:</div>
                    <input
                        onChange={(e) => onInputChange(e)}
                        type="number"
                        value={inputValue}
                        min='0'
                        max={`${available + orderQuantity}`}
                        className="modal__quant"
                    />
                </div>
                <div className="modal__total-cost">{`Total: ${totalCost}$`}</div>
                <div className="modal__available">{`Left: ${available}pcs`}</div>
                <button
                    onClick={() => onSubmitClick(id)}
                    className="modal__btn"
                >
                    Confirm
                </button>
            </div>
            <div
                onClick={() => dispatch(toggleModal())}
                className="modal__close"
            >
                ×
            </div>
        </div>
    );
}
export default OrderModal;
