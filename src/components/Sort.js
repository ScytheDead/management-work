import React, { Component } from 'react';

class Sort extends Component {
  constructor(props){
    super(props);
    this.state = {
      sort: {
        by: 'name',
        value: 1
      }
    }
  }

  onSortTask = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue
      }
    });
    this.props.onSortTask({by: sortBy, value: sortValue});
  }

  render() {
    let { sort } = this.state;
    return (
        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
              Sắp xếp 
            </button>
            <div className="dropdown-menu">
              <p role="button" 
                    className={sort.by === 'name' && sort.value === 1 ? 'dropdown-item sort_selected' : 'dropdown-item'}
                    onClick={() => {this.onSortTask('name', 1)}}>
                      <span className="fa fa-sort-alpha-asc mr-1"></span>
                      Tên A-Z
              </p>
              <p role="button" 
                    className={sort.by === 'name' && sort.value === -1 ? 'dropdown-item sort_selected' : 'dropdown-item'}
                    onClick={() => {this.onSortTask('name', -1)}}>
                      <span className="fa fa-sort-alpha-desc mr-1"></span>
                      Tên Z-A
              </p>
              <hr/>
              <p role="button" 
                    className={sort.by === 'status' && sort.value === 1 ? 'dropdown-item sort_selected' : 'dropdown-item'}
                    onClick={() => {this.onSortTask('status', 1)}}>
                      Trạng thái kích hoạt
              </p>
              <p role="button" 
                    className={sort.by === 'status' && sort.value === -1 ? 'dropdown-item sort_selected' : 'dropdown-item'}
                    onClick={() => {this.onSortTask('status', -1)}}>
                      Trạng thái ẩn
              </p>
            </div>
          </div>
        </div>
    );
  }
  
}

export default Sort;
