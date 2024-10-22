import { Component } from "react";
import Header from "../header";
import './index.css'

class Home extends Component{
    render(){
        return(
            <div className='main-container'>
                <Header />
            </div>
        )
    }
}

export default Home