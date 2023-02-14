import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPanels, selectAll } from "./productsSectionSlice";
import { createSelector } from "@reduxjs/toolkit";
import type { AppDispatch } from "../../store";

import ProductItem from "../productItem/ProductItem";

import "./ProductsSection.sass";

function ProductsSection() {

    const dispatch = useDispatch<AppDispatch>();
    const { panelLoadingStatus } = useSelector((state: any) => state.panels);

    const newSelector = createSelector(selectAll, (panels) => {
        return { panels };
    });

    const panelsItems = useSelector(newSelector);

    useEffect(() => {
        dispatch(fetchPanels());

    }, []);

   


    const renderPanelsList = (arr: any) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">We are running out of panels</h5>;
        }

        return arr.map((item: any) => (
            <ProductItem
                id = {item.id}
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
            />
        ));
    };


    if (panelLoadingStatus === "loading") {
        return <h5 className="waiting">Please wait...</h5>;
    } else if (panelLoadingStatus === "error") {
        return <h5 className="error">Data fetching error</h5>
    }


    const elem = renderPanelsList(panelsItems.panels);
    return (
        <div className="product-section">
            <div className="container">
                <ul className="product-section__wrapper">{elem}</ul>
            </div>
        </div>
    );
}

export default ProductsSection;
