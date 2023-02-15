import { Link } from 'react-router-dom';
import { selectAll } from '../basket/BasketSlice';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


import './Basket.sass';
import basket from '../../assets/basket.svg'


function Basket () {


    const headerSelector: any = createSelector(selectAll, (courtArr) => {
        return { courtArr };
    });
    const getPanelsArr: any = useSelector(headerSelector);



    const quantity = getPanelsArr.courtArr.reduce((acc:number, next: any) => {
        return acc + next.orderQuantity
    },0)

    const totalPrice = getPanelsArr.courtArr.reduce((acc:number, next: any) => {
        return acc + next.totalCost
    },0)


    return (
        <div className="basket">
            <Link to="/court">
                <div className="basket__wrapper">
                    <div className="basket__price">
                        {`${totalPrice} $`}
                    </div>
                    
                    <div className="basket__quant">
                        <img className='basket__quant-img' src={basket} alt="basket" />
                        <div className="basket__quant-num">{quantity}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Basket;