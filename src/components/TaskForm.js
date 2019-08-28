import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';


class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    }
  }
  UNSAFE_componentWillMount(){
    if(this.props.taskEditing){
      this.setState({
        id: this.props.taskEditing.id,
        name: this.props.taskEditing.name,
        status: this.props.taskEditing.status
      });
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.taskEditing) {
      this.setState({
        id: nextProps.taskEditing.id,
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status
      });
    } else {
      this.setState({
        id: '',
        name: '',
        status: false
      });
    }
  }
  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value
    if(name === 'status') value = target.value === 'true' ? true : false
    this.setState({
      [name]: value
    });
  }
  save = (event) => {
    event.preventDefault();
    this.props.saveTask(this.state);
    this.cancel();
  }
  cancel = () => {
    this.props.cancel();
    this.props.setTaskEditing(null);
  }

  render() {
    let { name, status, id } = this.state;
    if(!this.props.isDisplayForm) return '';
    return (
        <div className="card">
        <div className="card-header bg-warning">
          {id === '' ? 'Thêm Công Việc' : 'Cập Nhật Công Việc'}
          <span className="fa fa-times-circle float-right text-danger" style={{cursor: 'pointer'}} onClick={this.cancel}> </span>
        </div>
        <form onSubmit={this.save}>
          <div className="card-body">
            <div className="form-group">
              <label className="card-title font-weight-bold">Tên: </label>
              <input type="text" className="form-control" name="name" value={name} onChange={this.onChange}/>
            </div>

            <div className="form-group">
              <label className="card-text font-weight-bold">Trạng thái: </label>
              <select className="form-control" name="status" value={status} onChange={this.onChange}>
                <option value={true}>Kích hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
              </div>
            </div>
      
            <div className="form-group text-center">
              <button type="submit" className="btn btn-warning"><span className="fa fa-plus mr-1"></span>Lưu lại</button> &nbsp;
              <button className="btn btn-danger" onClick={this.cancel}><span className="fa fa-close mr-1"></span>Hủy bỏ</button>
            </div>
          </form>
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
    saveTask: task => {
      dispatch(actions.saveTask(task));
    },
    cancel: () => {
      dispatch(actions.closeForm());
    },
    setTaskEditing: task => {
      dispatch(actions.setTaskEditing(task));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
