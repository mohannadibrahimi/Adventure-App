import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import add from '../assets/icons/plus.png';
import home from '../assets/icons/home.png';
import place from '../assets/icons/place.png';


class Header extends Component {
  
  renderContent(){
    switch(this.props.auth){
      case null:
        return ;
      case false:
        return <ul><li><a href="/auth/google">Login with Google</a></li></ul>;
      default:
        return (
            <div className="header-controls">
              <Link to="/new" className="new-sticky">
                <li>
                  <img src={add} alt="Add New Place"/>
                </li>
              </Link>
              <li>
                <a href="/api/logout">
                  Logout
                </a>
              </li> 
              <Link to={`/dashboard/${this.props.auth.userName}`}>
                <li>
                  <img src={this.props.auth.userDp} alt="Profile"/>
                </li>
              </Link>
            </div>              
        );
    }
  }

  render(){
    return(
        <div className="header-container">
          <h3>ADVENTURE.</h3>
          <ul className="full-nav">
            <Link to="/"><li>Home</li></Link>
            <Link to="/places/all"><li>Places</li></Link>
            {this.renderContent()}
          </ul>
          <div className="mobile-toggle">
            <ul>{this.renderContent()}</ul>
          </div>
          <div className="mobile-nav">
            <Link to="/">
              <img src={home} alt="Home"/>
            </Link>
            <Link to="/places/all">
              <img src={place} alt="Places"/>
            </Link>
          </div>
        </div> 
    )
  }
  
}

function mapStateToProps({ auth }){
  return {auth}
}

export default connect(mapStateToProps)(Header);