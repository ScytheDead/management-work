import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends Component {
  onChangeStatus = (id) => {
    this.props.onChangeStatus(id);
  }

  onDeleteTask = (id) => {
    this.props.onDeleteTask(id);
    this.props.onCloseForm();
  }

  onEditTask = () => {
    this.props.onOpenForm();
    this.props.onEditTask(this.props.task);
  }

  render() {
    let { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <button className={task.status ? 'btn btn-outline-success' : 'btn btn-outline-danger'} onClick={() => { this.onChangeStatus(task.id) }}>{task.status ? 'Kích hoạt' : 'Ẩn'}</button>
        </td>
        <td className="text-center">
          <button className="btn btn-warning" onClick={this.onEditTask}><span className="fa fa-pencil mr-1"></span>Sửa</button> &nbsp;
          <button className="btn btn-danger" onClick={() => { this.onDeleteTask(task.id) }}><span className="fa fa-trash mr-1"></span>Xóa</button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeStatus: id => {
      dispatch(actions.changeStatusTask(id));
    },
    onDeleteTask: id => {
      dispatch(actions.deleteTask(id));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
    onEditTask: task => {
      dispatch(actions.setTaskEditing(task));
    }
  }
}

export default connect(null, mapDispatchToProps)(TaskItem);
