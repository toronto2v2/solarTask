import { Link } from 'react-router-dom';
import { selectAll as courtData } from '../../components/basket/BasketSlice';
import { useDispatch,useSelector } from 'react-redux';
import { createSelector } from "@reduxjs/toolkit";

import './CourtPage.sass';

const CourtPage = () => {

    const dispatch = useDispatch();
    const courtSelector: any = createSelector(
        courtData,
        (getAllCourtData) => {
            return {getAllCourtData}
        }
    )
    const getCourtsArr: any = useSelector(courtSelector);


    const totalItems = getCourtsArr.getAllCourtData.reduce((acc:any, next:any)=>{
        return acc + next.orderQuantity
    },0)

    const totalPrice = getCourtsArr.getAllCourtData.reduce((acc:any, next:any)=>{
        return acc + next.totalCost
    },0)

    
    return (
        <div className="court">
            <h2 className="court__title">
                Welcome to Your court
            </h2>
            <ol className="court__list">
                {getCourtsArr.getAllCourtData.map((item:any) => {
                    return(
                    <li className="court__item" key={item.id}>
                        <div className="court__name">{`Name: ${item.orderName}`}</div>
                        <div className="court__quant">{`Quantity: ${item.orderQuantity}pcs`}</div>
                        <div className="court__totalPrice">Price: <span>{`${item.totalCost}$`}</span></div>
                    </li>
                    )
                })}
            </ol>

            <div className="counter">
                <div className="counter__price">{`Total: ${totalPrice}$`}</div>
                    
                <div className="counter__quant">
                    <div className="counter__quant-num">{`Total items: ${totalItems} pcs`}</div>
                </div>
            </div>

            <Link to="/" className='back-home'>Back home</Link>
        </div>
    )
}

export default CourtPage;