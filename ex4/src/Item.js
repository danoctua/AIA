import React from 'react';
import './App.css';

class Item extends React.Component{


    render(){
        return(
            <div className="listItem">
              <div className="listItemIcon">
                <img src={this.props.src} alt=""/>
              </div>
              <div className="listItemBody">
              <div className="listItemHeader">
                  {this.props.brand} {this.props.model}
                  <span className="listItemRating">DXOmark rating: {this.props.rating}
                  <button className="ratingButton decrease" onClick={this.props.decreaseRating.bind(this, this.props.id)}></button>
                  <button className="ratingButton increase" onClick={this.props.increaseRating.bind(this, this.props.id)}></button>
                  </span>
                </div>
                <div className="listItemDescription">
                  {this.props.description !== "" ?
                    this.props.description : "no description"
                  }
                </div>
              </div>
              <div className="listItemAction">
                <button className="buttonPng buttonDelete" onClick={this.props.deleteItem.bind(this, this.props.id)}/>
              </div>
            </div>

            )
    }

}

export default Item;
