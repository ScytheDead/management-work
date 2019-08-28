import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Sort extends Component {
  onSortTask = (sortBy, sortValue) => {
    this.props.sortTask({by: sortBy, value: sortValue});
  }

  render() {
    let { sort } = this.props;
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

const mapStateToProps = store => {
  return {
    sort: store.sort
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sortTask: sort => {
      dispatch(actions.sortTask(sort));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
