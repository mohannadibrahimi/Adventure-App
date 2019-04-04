import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

import semi from '../assets/1.jpeg';
import world from '../assets/map.jpeg';

class Landing extends Component{
  componentWillMount(){
    window.scrollTo(0, 0);
   }

  componentDidMount(){
    this.props.fetchPlace({term: "all"});
  } 

  countries(){
    let uniqueCountires = [...new Set(this.props.places.map(place => place.country))];
    return uniqueCountires.map((country, i)=>{
      return(
          <Link to={`/places/${country}`} key={i} className="country-tag-link">
            <span className="country-tag">
              {country}
            </span>
          </Link>
      )
    })
  }

  renderPlaces(){
    return this.props.places.slice(0, 8).map(place => {
      return(
        <Link to={`/place/${place._id}`} 
              key={place._id}
              style={{ textDecoration: 'none' }}    
        >
        <div 
          className="thumb"
          style={{backgroundImage:'url('+place.image+')'}}
          onClick={()=>this.props.selectPlace(place)}
        > 
          <div className="thumb-author">
            <img src={place.author.userDp} alt=""/>
            {/* <h4>{place.author.userName}</h4> */}
          </div>
          <button className="primary">{place.name}</button> 
        </div>
        </Link>
      )
    })
  }

  render(){
    return(
      <div className="main"> 
        <div className="hero-container">
          <div className="hero-text">
            <h3>Experience amazing</h3>
            <h1>Adventures</h1>
          </div>
        </div>
        <div className="landing">
          <div className="exotic">
            <div className="exotic-container">
              <div className="exotic-text">
                <h1>Exotic <br/> Places</h1>
                <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </h6>
              </div>
              <div className="exotic-image">
                <img src={semi} alt="right-img"></img>
              </div>
            </div>
          </div>
          <div className="world-container">
            <div className="center-h1">
              <h1>Explore <span className="red-h1">Destinations</span></h1>
            </div>
            <h6>If you’re twenty-two, physically fit, hungry to learn and be better, I urge you to travel – as far and as widely as possible. Sleep on floors if you have to. Find out how other people live and eat and cook. Learn from them – wherever you go. – Anthony Bourdain</h6>
            <div className="world-img">
              <img src={world} alt=""/>
            </div>
            <div className="country-tag-container">
              {this.countries()}
            </div>
          </div>
          <div className="center-h1">
            <h1>Featured <span className="red-h1">Places</span></h1>
          </div>
          <div className="thumb-container">
           {this.renderPlaces()}
          </div>
          <div className="expand-container">
            <Link to="/places/all">
              <button className="expand">Explore All Places</button>
            </Link>
          </div>
        </div>
        
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { 
    places : state.places, 
    active: state.activePlace
  } 
}

export default connect(mapStateToProps, actions)(Landing);