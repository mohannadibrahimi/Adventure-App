import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';



class SaveUserPlace extends Component{

  render(){
    let user = this.props.auth;
    return(
      
      <div>
        <form onSubmit={this.props.handleSubmit((active) => this.props.savePlaceToUser(active, user))}>
          {/* {this.renderFields()} */}
          <button className="save-button-main" type="submit">
            Save Place
          </button>
        </form>
      </div>
      
    )
  }
}


function mapStateToProps (state) {
  return {
    active: state.activePlace,
    initialValues: state.activePlace,
    auth: state.auth
  }
}



export default connect(mapStateToProps, actions)(reduxForm({
  form: 'Save place to user',
  enableReinitialize: true // a unique identifier for this form
})(withRouter(SaveUserPlace)))
