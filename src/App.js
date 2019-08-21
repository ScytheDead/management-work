import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1  //-1: all, 0: unactive, 1: active
      },
      keyword: '',
      sort: {
        by: 'name',
        value: 1
      }
    }
  }
  UNSAFE_componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      this.setState({
        tasks : JSON.parse(localStorage.getItem('tasks')),
        isDisplayForm: false
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID = () =>{
    return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  onToggleForm = () => {
    this.setState({
      taskEditing: null
    });

    if(this.state.isDisplayForm === false || this.state.taskEditing === null){
      this.setState({ isDisplayForm: !this.state.isDisplayForm });
    }
  }

  onCloseForm = () => {
    this.setState({isDisplayForm: false, taskEditing: null});
  }

  onSubmit = (data) => {
    let { tasks } = this.state;
    if(data.id === ''){
      data.id = this.generateID();
      tasks.push(data);
    } else {
      let index = tasks.findIndex(task => task.id === data.id)
      tasks[index] = data;
    }
    
    this.setState({
      tasks: tasks,
      isDisplayForm: false,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onChangeStatus = (id) => {
    let { tasks } = this.state;
    let index = tasks.findIndex(task => task.id === id);
    if(index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({tasks: tasks});
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onDeleteTask = (id) => {
    let { tasks } = this.state;
    let index = tasks.findIndex(task => task.id === id);
    if(index !== -1){
      tasks.splice(index, 1);
      this.setState({tasks: tasks, isDisplayForm: false});
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onEditTask = (id) => {
    let { tasks } = this.state;
    let taskEditing = tasks.find(task => task.id === id);
    if(taskEditing !== null){
      this.setState({taskEditing: taskEditing, isDisplayForm: true});
    }
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus)
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }

  onSearchTask = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase()
    });
  }

  onSortTask = (sort) => {
    this.setState({
      sort: sort
    });
  }

  render() {
    let { tasks, isDisplayForm, taskEditing, filter, keyword, sort } = this.state;
    if(filter){
      if(filter.name){
        tasks = tasks.filter(task => task.name.toLowerCase().indexOf(filter.name) !== -1)
      }

      tasks = tasks.filter(task => {
        if(filter.status === -1){
          return task;
        }else{
          return task.status === !!+filter.status;
        }
      });
    }

    tasks = tasks.filter(task => task.name.toLowerCase().indexOf(keyword) !== -1);

    if(sort.by === 'name' && sort.value === 1){
      tasks.sort((a, b) => a.name.localeCompare(b.name));
    } else if(sort.by === 'name' && sort.value === -1){
      tasks.sort((a, b) => b.name.localeCompare(a.name));
    } else if(sort.by === 'status' && sort.value === 1){
      tasks.sort((a, b) => b.status - a.status);
    } else if(sort.by === 'status' && sort.value === -1){
      tasks.sort((a, b) => a.status - b.status);
    }
      
    return (
      <div className="container mt-4">
        <div className="text-center">
          <h1>QUẢN LÝ CÔNG VIỆC</h1>
        </div>

        <hr/>

        <div className="row">
          <div className={isDisplayForm ? 'col-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {/* Form */}
            {isDisplayForm ? <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} taskEditing={taskEditing} /> : ''}
          </div>
  
          <div className={isDisplayForm ? 'col-8 col-sm-8 col-md-8 col-lg-8' : 'col-12 col-sm-12 col-md-12 col-lg-12'}>
            <button className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-1"></span> Thêm Công Việc
            </button>
            {/* Search - Sort */}
            <Control onSearchTask={this.onSearchTask} onSortTask={this.onSortTask} />
            {/* List */}
            <div className="row mt-3">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList tasks={ tasks } onChangeStatus={this.onChangeStatus} onDeleteTask={this.onDeleteTask} onEditTask={this.onEditTask} onFilter={this.onFilter}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
