import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import trash from './icon/trash.png'

class Item extends React.Component{


    render(){
        return(
            <div className="listItem">
              <div className="listItemIcon">
                <img src={this.props.src}/>
              </div>
              <div className="listItemBody">
              <div className="listItemHeader">
                  {this.props.brand} {this.props.model}
                  <a className="listItemRating">DXOmark rating: {this.props.rating}</a>
                </div>
                <div className="listItemDescription">
                  {this.props.description != "" ?
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
