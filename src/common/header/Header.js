import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div>
                <div className="HeaderBar">
                    <div className="AppLogo" >
                        Image Viewer
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Header;