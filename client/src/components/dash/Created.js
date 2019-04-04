import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';


class Created extends Component {

  componentWillMount(){
    window.scrollTo(0, 0);
   }

  componentDidMount(){
    this.props.fetchPlace({term: "all"});
  }

  filterPlacesbyUser(){
    let userPlaces = this.props.places.filter(place => {
      return place.author.id === this.props.auth._id
    })
    return (
      userPlaces.map(userPlace => {
      //   return(
      //     <div key={userPlace._id} onClick={()=>this.props.selectPlace(userPlace)}>
      //       <Link to={`/place/${userPlace._id}`} >
      //         <h4>{userPlace.name}</h4>
      //       </Link>
      //     </div>
      //   )
      // })
        return(
          <Link to={`/place/${userPlace._id}`} 
                key={userPlace._id}
                style={{ textDecoration: 'none' }}    
          >
          <div 
            className="thumb"
            style={{backgroundImage:'url('+userPlace.image+')'}}
            onClick={()=>this.props.selectPlace(userPlace)}
          > 
            <div className="thumb-author">
              <img src={userPlace.author.userDp} alt=""/>
            </div>
            <button className="primary">{userPlace.name}</button> 
          </div>
          </Link>
        )
      })
    )
  }

  render(){
    return(
      <div className="dash-page-container">
        <h1>Created <span className="red-h1">Places</span></h1>
        <div className="thumb-container">
         {this.filterPlacesbyUser()}
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

export default connect (mapStateToProps, actions)(Created); 