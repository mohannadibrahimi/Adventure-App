import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class Places extends Component{

  componentWillMount(){
    window.scrollTo(0, 0);
   }

  componentDidMount(){
    this.props.fetchPlace(this.props.match.params)
    console.log(this.props.match.params)
  } 

  componentWillUpdate(){
    // this.props.fetchPlace(this.props.match.params)
  }

  componentWillUnmount(){
    console.log('unmount')
  }
  
  renderPlaces(){
    return this.props.places.map(place => {
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
          </div>
          <button className="primary">{place.name}</button> 
        </div>
        </Link>
      )
    })
  }

  render(){
    return(
      <div>
        <div className="top-left-img"></div>
        <div className="center-h1 places-background">
            <h1>Explore Places</h1>
            <h6>Showing {this.props.match.params.term} Locations</h6>
        </div>
        <div className="thumb-container">
          {this.renderPlaces()}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    places: state.places
  }
}

export default connect(mapStateToProps, actions)(Places);