import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class SavedPlaces extends Component{
  componentWillMount(){
    window.scrollTo(0, 0);
   }

  renderLogic(){
    if(this.props.savedPlaces && this.props.savedPlaces.length === 0){
      return this.renderError()
    } else {
      return this.renderContent()
    }
  }

  renderError(){
    setTimeout(()=>{
      return(
        <div>
          <h1>Something's wrong.</h1>
          <Link to={`/dashboard/${this.props.auth.userName}`}>Go Back</Link>
        </div>
      )
    }, 5000)
  }

  renderContent(){
    return(
      this.props.savedPlaces.map(savedPlace=>{

        return(
          <Link to={`/place/${savedPlace._id}`} 
                key={savedPlace._id}
                style={{ textDecoration: 'none' }}    
          >
          <div 
            className="thumb"
            style={{backgroundImage:'url('+savedPlace.image+')'}}
            onClick={()=>this.props.selectPlace(savedPlace)}
          > 
            <div className="thumb-author">
              <img src={savedPlace.author.userDp} alt=""/>
            </div>
            <button className="primary">{savedPlace.name}</button> 
          </div>
          </Link>
        )
      })
    )
  }


  render(){
    return(
      <div className="dash-page-container">
        <h1>Saved <span className="red-h1">Places</span></h1>
        <div className="thumb-container">
          {this.renderLogic()}
          </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    auth: state.auth,
    savedPlaces: state.savedPlaces
  }
}

export default connect (mapStateToProps, actions)(SavedPlaces);