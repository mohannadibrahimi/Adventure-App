import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import textAreaField from './fields/textAreaField';
import textInputField from './fields/textInputField';
import { Link } from 'react-router-dom';
// import selectField from './fields/selectField';


class CreateNewForm extends Component{
  componentWillMount(){
    window.scrollTo(0, 0);
   }


  renderFields(){
    return(
      <div className="new">
        <Field type="text" name="name" label="name" placeholder="Banff National Park" component={textInputField} />
        <Field type="text" name="type" label="type" placeholder="Forest" component={textInputField} />
        <Field type="text" name="image" label="image" placeholder="Image Link" component={textInputField} />
        <Field type="text" name="activity" label="activity" placeholder="Hiking, Camping, Canoeing" component={textInputField} />
        <Field type="text" name="about" label="about" component={textAreaField} />
      </div>
    )
  }

  renderError(){
    setTimeout(()=>{
      return(
        <div className="wrong-back">
          <h1>Something's wrong.</h1>
          <Link to={`/dashboard/${this.props.auth.userName}`}>Go Back</Link>
        </div>
      )
    }, 1000)
  }

  renderContent(){
    const user = this.props.auth;
    const history = this.props.history;
    const pristine = this.props.pristine;
    const submitting = this.props.submitting;

    return(
      <div>
        <form className="new-form" onSubmit={this.props.handleSubmit((active) => this.props.createPlace(active, user, history))}>
        {/* <form onSubmit={this.props.handleSubmit((active) => console.log(active))}> */}
          {this.renderFields()}
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
        </form>
      </div>
    )
  }


  

  renderLogic(){
    if(this.props.auth){
      return this.renderContent()
    } else {
      return this.renderError()
    }
  }



  render(){
    return(
      <div>{this.renderLogic()}</div>
    )
  }
}


function mapStateToProps (state) {
  return {
    active: state.activePlace,
    auth: state.auth
    // initialValues: state.activePlace
  }
}



export default connect(mapStateToProps, actions)(reduxForm({
  form: 'Create New Form',
  enableReinitialize: true // a unique identifier for this form
})(withRouter(CreateNewForm)))
