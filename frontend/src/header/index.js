import {Component} from 'react'
import { Link } from 'react-router-dom'
import './index.css'

class Header extends Component {
    state = {tab:'home'}

    handlingTabClicked = (id) => {
        this.setState({tab:id})
        console.log(id)
    }

    render(){
        const {tab} = this.state
        return (
            <div className='header-container'>
                <h1>Hii</h1>
                <div className='features-container'>
                    <Link to="/" className={`feature ${tab === 'home' ? 'feature-selected' : ''}`} onClick={() => this.handlingTabClicked('home')}>
                        Home
                    </Link>
                    <Link to='/' className={`feature ${tab === 'about' ? 'feature-selected' : ''}`} onClick={() => this.handlingTabClicked('about')}>
                        About
                    </Link>
                    <Link to='/' className={`feature ${tab === 'contact' ? 'feature-selected' : ''}`} onClick={() => this.handlingTabClicked('contact')}>
                        Contact
                    </Link>
                    <Link to="/login" className={`feature ${tab === 'login' ? 'feature-selected' : ''}`} onClick={() => this.handlingTabClicked('login')}>
                        Login
                    </Link>
                </div>
            </div>
        )
    }
}

export default Header;
