import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import textAreaField from './fields/textAreaField';
import textInputField from './fields/textInputField';
import { Link } from 'react-router-dom';


class UpdateForm extends Component{
  componentWillMount(){
    window.scrollTo(0, 0);
   }

  componentDidMount(){
    let { params } = this.props.match;
    this.props.selectPlace(params);
   }


  renderFields(){
    return(
      <div>
        <Field type="text" name="name" label="name" placeholder="Banff National Park" component={textInputField} />
        <Field type="text" name="type" label="type" component={textInputField} />
        <Field type="text" name="detail" label="place" component={textInputField} />
        <Field type="text" name="image" label="image" component={textInputField} />
        <Field type="text" name="activity" label="activity" component={textInputField} />
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
    const history = this.props.history;
    return(
      <div>
      <h1 className="edit-form-header">{this.props.active.name}</h1>
        <form className="edit-form" onSubmit={this.props.handleSubmit((active) => this.props.updatePlace(active, history))}>
          {this.renderFields()}
          <button type="submit" onClick={()=>this.disabled = true}>
            Update
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
    initialValues: state.activePlace,
    auth: state.auth
  }
}



export default connect(mapStateToProps, actions)(reduxForm({
  form: 'Update Form',
  enableReinitialize: true // a unique identifier for this form
})(withRouter(UpdateForm)))
