import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
  onToggleForm = () => {
    this.props.setTaskEditing(null);
    if(this.props.isDisplayForm === false || this.props.taskEditing === null){
      this.props.onToggleForm();
    }
  }

  render() {
    let { isDisplayForm } = this.props;

    
      
    return (
      <div className="container mt-4">
        <div className="text-center">
          <h1>QUẢN LÝ CÔNG VIỆC</h1>
        </div>

        <hr/>

        <div className="row">
          <div className={isDisplayForm ? 'col-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {/* Form */}
            <TaskForm />
          </div>
  
          <div className={isDisplayForm ? 'col-8 col-sm-8 col-md-8 col-lg-8' : 'col-12 col-sm-12 col-md-12 col-lg-12'}>
            <button className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-1"></span> Thêm Công Việc
            </button>
            {/* Search - Sort */}
            <Control />
            {/* List */}
            <div className="row mt-3">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    isDisplayForm: store.isDisplayForm,
    taskEditing: store.taskEditing
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    setTaskEditing: task => {
      dispatch(actions.setTaskEditing(task));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
