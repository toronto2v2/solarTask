import Header from '../header/Header';
import ProductsSection from '../productsSection/ProductsSection';

import './MainSection.sass'



const MainSection = () => {



    return (
        <div className='main-section'>
            <Header/>
            <h3 className='main-section__title'>Please select your panel</h3>
            <ProductsSection/>
        </div>                 
    )

}

export default MainSection;