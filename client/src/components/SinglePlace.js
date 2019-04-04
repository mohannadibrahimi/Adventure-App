import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import DeleteForm from './form/deleteForm';
import PlaceMap from './Map';
import SaveUserPlace from './form/saveUserPlaceForm';
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class SinglePlace extends Component{

  componentWillMount(){
    let { params } = this.props.match;
    this.props.selectPlace(params);
    console.log(this.props.active);
    window.scrollTo(0, 0);
   }

   componentDidUpdate(){
     console.log(this.props.active)
   }
  
  componentWillUnmount(){
    this.props.resetPlace();  
  }

  renderMainLogic(){
    if(this.props.active.length === 0){
      return(
        <div className="clip-container">
          <ClipLoader
            className={override}
            sizeUnit={"px"}
            size={50}
            color={'#E74C3C'}
            loading={true}
          />
        </div>
      ) 
    } else {
      return this.renderMain()
    }
  }

  renderIcon(){
    switch(this.props.active.type){
      case "Beach":
      case "Sea":
      case "Ocean":
        return("https://i.imgur.com/js9CJmQ.png");
      case "Forest":
      case "National Forest":
        return("https://i.imgur.com/0VuEJy9.png");
      case "Desert":
        return("https://i.imgur.com/61ECNqA.png");
      case "Lake":
      case "River":
      case "Spring":
      case "Waterfalls":
       return("https://i.imgur.com/cUU5Xdq.png");
      case "Mountain":
      case "Volcano":
      case "Canyon":
        return("https://i.imgur.com/9uIu3ye.png")
      default:
        return("Place type not found")
    }
  }

  renderActivity(){
    switch(this.props.active.type){
      case "Beach":
      case "Sea":
      case "Ocean":
        return("https://i.imgur.com/zyPof01.jpg");
      case "Forest":
      case "National Forest":
        return("https://i.imgur.com/qryxtR5.jpg");
      case "Desert":
        return("assets/activities/desert.jpg");
      case "Lake":
      case "River":
      case "Spring":
      case "Waterfalls":
       return("https://i.imgur.com/zyPof01.jpg");
      case "Mountain":
      case "Volcano":
        return("https://i.imgur.com/XoqbWZv.jpg")
      default:
        return("Place type not found")
    }
  }


  renderControls(){
    console.log(this.props.active.author.id);
    if(this.props.active.author.id === this.props.auth._id){
      return (
        <div>
          <Link className="edit-button-main"to={`/place/${this.props.active._id}/edit`}>Edit</Link>
          <DeleteForm className="delete-button-main"/>
        </div>
      )
    } else {
      let userName = this.props.active.author.userName
      return (
        <h6>Submitted by {userName}</h6>
      )
    }
  }

  checkLoggedin(){
    if(!this.props.auth._id){
      return('Login to save this place')
    } else {
      return(
        <SaveUserPlace/>
      )
    }
  }



  renderMain(){
    this.renderIcon()
    return (
      <div className="place">
        <div className="main-img" style={{backgroundImage:'url('+this.props.active.image+')'}}></div>


          <div className="sudo-start">
            <img src="/assets/forest.jpeg" alt=""/>
            <h1>{this.props.active.name}</h1>
            <p>
              <img src="https://image.flaticon.com/icons/png/512/69/69433.png" alt=""/>
               {this.props.active.detail}
            </p>
            {this.checkLoggedin()}
          </div>


          <div className="push-right">
            <div className="main-content">
              <img className="type-icon" src={this.renderIcon()} alt=""/>
              {/* <img src={this.props.active.image} alt={this.props.active.name}/> */}
              <div className="line-numbers">01</div>
              <h2>About</h2>
              <p>{this.props.active.about}</p>

              <div className="line-numbers">02</div>
              <h2>Activites</h2>
              <img src={this.renderActivity()} className="activity-img" alt=""/>
              <p>{this.props.active.activity}</p>

              <div className="line-numbers">03</div>
              <h2>Location</h2>
              <PlaceMap />
              <div className="lat-lng"> <p>{this.props.active.detail}</p> </div>
              <div className="controls">
                {this.renderControls()}
              </div>
              
            </div>
          </div>
      </div>
    )
  }

  render(){
    return(
      this.renderMainLogic()
    )
  }
}

function mapStateToProps (state) {
  return { 
    active: state.activePlace,
    auth: state.auth
  } 
}

export default connect(mapStateToProps, actions)(SinglePlace);