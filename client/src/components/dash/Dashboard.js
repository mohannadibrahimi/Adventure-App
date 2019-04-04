import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import saved from '../../assets/icons/heart.png';
import created from '../../assets/icons/create.png';

import * as actions from '../../actions';


class Dashboard extends Component{

  componentWillMount(){
    window.scrollTo(0, 0);
   }

  render(){
    console.log(this.props.auth);
    return(
      <div className="dash-page-container">


        <div className="a50">
          <div className="left">
            <h4>Welcome</h4>
            <h1>{this.props.auth.userName}</h1>
          </div>
          <div className="right">
            <Link to={`/dashboard/${this.props.auth.userName}/created`}>
              <div className="d-thumb-container">
                <img src={created} alt=""/>
                <h6>Created</h6>
              </div>
            </Link>

            <Link to={`/dashboard/${this.props.auth.userName}/savedplaces`}>
              <div className="d-thumb-container" onClick={()=>this.props.fetchSavedPlaces(this.props.auth)}>
                <img src={saved} alt=""/>
                <h6>Created</h6>
              </div>
            </Link>

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    auth: state.auth,
    places: state.places
  }
}

export default connect(mapStateToProps, actions)(Dashboard)
