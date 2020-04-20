
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';

class ItemsList extends React.Component{
   render() {
       // console.log(this.props.manga)
       return this.props.items.map(data => data.show == true ?
           (
           <Item key={data.id} id={data.id} brand={data.brand} model={data.model} rating={data.rating} description={data.description} src={data.src}
               deleteItem={this.props.deleteItem}
               />
       ): null
       );
   }
}


export default ItemsList;
