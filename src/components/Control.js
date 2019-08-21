import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';


class Control extends Component {
  render() {
    return (
        <div className="row mt-3">
            {/* Search */}
            <Search onSearchTask={this.props.onSearchTask} />
            {/* Sort */}
            <Sort onSortTask={this.props.onSortTask} />
        </div>
    );
  }
  
}

export default Control;
