import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1
    }
  }

  onChange = event => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus
    );
  }

  render() {
    let { tasks } = this.props;
    let elementTask = tasks.map((task, index) => {
        return <TaskItem 
                  key={task.id} 
                  task={task} 
                  index={index} 
                  onChangeStatus={this.props.onChangeStatus} 
                  onDeleteTask={this.props.onDeleteTask} 
                  onEditTask={this.props.onEditTask}/>
    });
    return (
        <table className="table">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng thái</th>
            <th className="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input type="text" className="form-control" name="filterName" onChange={this.onChange}/>
            </td>
            <td>
              <select className="form-control" name="filterStatus" onChange={this.onChange}>
                <option value={-1}>Tất cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>
          {elementTask}
        </tbody>
      </table>
    );
  }
}

export default TaskList;
