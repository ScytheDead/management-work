import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

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
    this.props.filterTask({
      name: name === 'filterName' ? value : this.state.filterName,
      status: name === 'filterStatus' ? value : this.state.filterStatus
    });
  }

  render() {
    let { tasks, filter, keyword, sort } = this.props;

    if(filter){
      if(filter.name){
        tasks = tasks.filter(task => task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1)
      }

      tasks = tasks.filter(task => {
        if(filter.status === -1 || filter.status === '-1'){
          return task;
        }else{
          return !!+task.status === !!+filter.status;
        }
      });
    }

    tasks = tasks.filter(task => task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);

    if(sort.by === 'name' && sort.value === 1){
      tasks.sort((a, b) => a.name.localeCompare(b.name));
    } else if(sort.by === 'name' && sort.value === -1){
      tasks.sort((a, b) => b.name.localeCompare(a.name));
    } else if(sort.by === 'status' && sort.value === 1){
      tasks.sort((a, b) => b.status - a.status);
    } else if(sort.by === 'status' && sort.value === -1){
      tasks.sort((a, b) => a.status - b.status);
    }

    let elementTask = tasks.map((task, index) => {
        return <TaskItem key={task.id} task={task} index={index} />
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
              <input type="text" className="form-control" name="filterName" onChange={this.onChange} />
            </td>
            <td>
              <select className="form-control" name="filterStatus" onChange={this.onChange} >
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

const mapStateToProps = (store) => {
  return {
    tasks: store.tasks,
    filter: store.filter,
    keyword: store.keyword,
    sort: store.sort
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterTask: filter => {
      dispatch(actions.filterTask(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
