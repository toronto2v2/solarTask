
import './Header.sass';
import logo from '../../assets/logo.png';
import Basket from '../basket/Basket';

function Header () {





    return (
        <header className='header'>
            <div className="header__logo">
                <a className='header__logo-link' href="google.com">
                    <img className='header__logo-img' src={logo} alt="logo" />
                </a>
                <div className="header__logo-title">The power of the sun</div>
            </div>

            <Basket/>

        </header>
    )

}

export default Header;