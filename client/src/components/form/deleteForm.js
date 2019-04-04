import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
// import formField from './formFields';


class DeleteForm extends Component{

  render(){

    const history = this.props.history;

    return(
      
      <div>
        <form onSubmit={this.props.handleSubmit((active) => this.props.deletePlace(active, history))}>
          {/* {this.renderFields()} */}
          <button type="submit" className="delete-button-main">
            Delete
          </button>
        </form>
      </div>
      
    )
  }
}


function mapStateToProps (state) {
  return {
    active: state.activePlace,
    initialValues: state.activePlace
  }
}



export default connect(mapStateToProps, actions)(reduxForm({
  form: 'Delete Form',
  enableReinitialize: true // a unique identifier for this form
})(withRouter(DeleteForm)))
