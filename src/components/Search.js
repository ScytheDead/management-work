import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';


class Search extends Component {
  constructor(props){
    super(props);
    this.state = {keyword: ''}
  }

  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  }
  
  onSearchTask = () => {
    this.props.searchTask(this.state.keyword);
  }

  render() {
    let { keyword } = this.state;
    return (
        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
            <input  name="keyword" 
                    type="text" 
                    className="form-control mr-1" 
                    placeholder="Nhập từ khóa..."
                    value={keyword}
                    onChange={this.onChange}
                    />
            <span className="input-group-btn">
              <button className="btn btn-primary" onClick={this.onSearchTask}><span className="fa fa-search mr-1"></span> Tìm</button>
            </span>
          </div>
        </div>
            
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchTask: keyword => {
      dispatch(actions.searchTask(keyword));
    }  
  }
}

export default connect(null, mapDispatchToProps)(Search);
