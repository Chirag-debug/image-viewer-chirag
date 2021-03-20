import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import profileImg from "../../assets/images/upgrad.svg";



class Home extends Component {
    constructor() {
        super();
        this.state={
            profileImage: profileImg,
            endpoint1: [],
            postList: [],
            postListForSearch: [],
        }
    }
    
    componentDidMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        let accessToken = windows.sessionStorage.getItem("access-token");
        xhr.addEventListner("readystatechange", function() {
            if (this.readyState === 4) {
                that.setState({ endpoint1: JSON.parse(this.responseText).data, });
            }
            that.state.endpoint1 && that.state.endpoint1.map( (info) => {
                return that.getImages(Info);
            }
            )
        }
        );

        xhr.open(
            "GET",
            this.props.baseUrl +
              "me/media?fields=id,caption&access_token=" +
              accessToken
          );
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(data);

    }

    getImages(info) {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        let accessToken = window.sessionStorage.getItem("access-token");
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            let parsedData = JSON.parse(this.responseText);
            let newStateArray;
            let post = {};
            post.id = parsedData.id;
            post.caption = info.caption || "This is default caption";
            post.media_url = parsedData.media_url;
            post.profileImage = that.state.profileImage;
            post.username = parsedData.username;
            post.likeIcon = "dispBlock";
            post.likedIcon = "dispNone";
            post.likesCount = Math.floor(Math.random() * 10);
            post.clear = "";
            post.tags = post.caption.match(/#\S+/g);
            post.commentContent = [];
            post.timestamp = new Date(parsedData.timestamp);
            newStateArray = that.state.postList.slice();
            newStateArray.push(post);
            that.setState({
              postList: newStateArray,
              postListForSearch: newStateArray,
            });
          }
        });
        xhr.open(
            "GET",
            this.props.baseUrl +
              info.id +
              "?fields=id,media_type,media_url,username,timestamp&access_token=" +
              accessToken
          );
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(data);
        }
      


        // function for displaying the filtered post
        filteredPostHandler = (filteredPost) => {
          this.setState({ postList: filteredPost });
        };
    

    filteredPostHandler = (filteredPost) => {
        this.setState({ postList: filteredPost });
    }
    render() {
        return(
            <div>
                <Header home="true" 
                profileImage={this.state.profileImage} 
                baseUrl={this.props.baseUrl} 
                list={this.state.postListSearch} 
                callbackHome={this.filteredPostHandler} 
                history={this.props.history}
                />

            <div>

            </div>
            </div>
        );
    }
}
export default Home;