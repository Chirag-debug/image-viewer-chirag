import React, {Component} from 'react';
import './Header.css';



logoHandler = () => {
    this.props.history.push("/home");
  };

class Header extends Component {
    render() {
        const {classes} =this.props;
        return (
            <div>
                <header className="HeaderBar">
                    <span 
                    className="AppLogo"
                    style={this.props.profile === "true" ? { cursor: "pointer"} : null }
                    onClick={this.props.profile === "true" ? this.logoHandler : null}
                    >
                        Image Viewer
                    </span>
                </header>
            </div>
            
        );
    }
}

export default Header;