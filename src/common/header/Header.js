import React, {Component} from 'react';
import './Header.css';
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";



class Header extends Component {
    constructor () {
        super();
        this.state = {
            type: "",
        };
    }

    //functionto filter the posts according to their caption for the state change of search box
    inputChangeHandler = (e) => {
        let newList = this.props.list.filter((post) => {
            return String(post.caption).toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0;
        });
        this.props.callbackFromHome(newList);
    };
    
    //open drop-down menu function
    openHandler = (e) => {
        this.setState({ type: e.currentTarget });
    };
    
    //close drop-down menu function
    closeHandler = () => {
        this.setState({ type: null });
    };
    
    myAccountHandler = () => {
        this.props.history.push("/profile");
    };
    
    logoHandler = () => {
        this.props.history.push("/home");
    };
    
    //function to clear the session storage and redirect to the login page
    logoutHandler = () => {
        sessionStorage.removeItem("access-token");
        this.props.history.push("/");
    };

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

                    <div>
                        {this.props.home === "true" || this.props.profile === "true" ? (
                            <div className="pro-pic">
                            <IconButton className="icon" onClick={this.openHandler}>
                            <img
                                src={this.props.profileImage}
                                alt="pic"
                                className="profile-image"
                            ></img>
                            </IconButton>
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={this.state.type}
                                keepMounted
                                open={Boolean(this.state.type)}
                                onClose={this.closeHandler}
                            >
                            {this.props.home === "true" ? (
                            <div>
                            <StyledMenuItem>
                            <ListItemText
                                primary={
                                    <Typography
                                    type="body2"
                                    style={{ fontWeight: "bold" }}
                                    >
                                        My Account
                                    </Typography>
                                    }
                                onClick={this.myAccountHandler}
                            />
                            </StyledMenuItem>
                            <hr style={{ marginLeft: 15, marginRight: 15 }} />
                            </div>
                            ) : (
                                ""
                            )}
                            <StyledMenuItem>
                            <ListItemText
                                primary={
                                    <Typography type="body2" style={{ fontWeight: "bold" }}>
                                        Logout
                                    </Typography>
                                }
                                onClick={this.logoutHandler}
                            />
                            </StyledMenuItem>
                            </StyledMenu>
                            </div>
                            ) : (
                            ""
                            )}
                            </div>
                    <div>
                        {this.props.home === "true" ? (
                            <div className={classes.search}>
                            <div className={classes.searchIcon}>
                            <SearchIcon />
                            </div>
                            <Input
                            disableUnderline={true}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ "aria-label": "search" }}
                            onChange={this.inputChangeHandler}
                            />
                    </div>
                    ) : (
                    ""
                    )}
                    </div>
                </header>
            </div>
            
        );
    }
}

export default Header;