import React, { Component } from 'react';

class TaskItem extends Component {
  onChangeStatus = (id) =>{
    this.props.onChangeStatus(id);
  }

  onDeleteTask = (id) => {
    this.props.onDeleteTask(id);
  }

  onEditTask = (id) => {
    this.props.onEditTask(id);
  }

  render() {
    let { task, index } = this.props;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td className="text-center">
              <button className={task.status ? 'btn btn-outline-success' : 'btn btn-outline-danger'} onClick={() => {this.onChangeStatus(task.id)}}>{task.status ? 'Kích hoạt' : 'Ẩn'}</button>
            </td>
            <td className="text-center">
              <button className="btn btn-warning" onClick={() => {this.onEditTask(task.id)}}><span className="fa fa-pencil mr-1"></span>Sửa</button> &nbsp;
              <button className="btn btn-danger" onClick={() => {this.onDeleteTask(task.id)}}><span className="fa fa-trash mr-1"></span>Xóa</button>
            </td>
          </tr>
    );
  }
}

export default TaskItem;
