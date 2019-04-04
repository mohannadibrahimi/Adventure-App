// Component helps to connect with reducers and actions
import React, { Component } from 'react';
// connect helps in the connection with reducers and actions
import { connect } from 'react-redux';
// import all actions
import * as actions from '../actions';
// React Router Dom for navigation and linking
import { BrowserRouter, Route } from 'react-router-dom';
// import styles
import '../styles.css';
// import components
import Places from './Places';
import SinglePlace from './SinglePlace';
import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Dashboard from './dash/Dashboard';
import CreateNewForm from './form/createNewForm';
import UpdateForm from './form/updateForm';
import Created from './dash/Created';
import SavedPlaces from './dash/Saved';


class App extends Component{
  componentWillMount(){
    window.scrollTo(0, 0);
   }

  componentDidMount(){
    this.props.fetchUser();
  }

  render(){
    return(
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard/:user" component={Dashboard} />
            <Route exact path="/places/:term" component={Places} /> 
            <Route exact path="/place/:id" component={SinglePlace} /> 
            <Route exact path="/new" component={CreateNewForm} /> 
            <Route exact path="/place/:id/edit" component={UpdateForm} /> 
            <Route exact path="/dashboard/:user/created" component={Created} /> 
            <Route exact path="/dashboard/:user/savedplaces" component={SavedPlaces} /> 
            <Footer />
          </div>
        </BrowserRouter> 
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { 
    places : state.places, 
    active: state.activePlace,
    auth: state.auth
  } 
}

// Es6 syntax for above
// function mapStateToProps({ place }){
//   return { place }
// }

export default connect(mapStateToProps, actions)(App);