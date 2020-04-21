import React from 'react';
import './App.css';

class SortItem extends React.Component{
    render(){
        return(
          <div className="sortMenu">
            <a href="javascript:void(0)" onClick={this.props.sortByName.bind()} className="decrease">Name</a>
            <a href="javascript:void(0)" onClick={this.props.sortByRating.bind()}  className="active">Rating</a>
          </div>
        )
    }
}


export default SortItem
