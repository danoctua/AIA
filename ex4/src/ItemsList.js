
import React from 'react';
import Item from './Item';

class ItemsList extends React.Component{
   render() {
       // console.log(this.props.manga)
       return this.props.items.map(data => data.show === true ?
           (
           <Item key={data.id} id={data.id} brand={data.brand} model={data.model} rating={data.rating} description={data.description} src={data.src}
               deleteItem={this.props.deleteItem} decreaseRating={this.props.decreaseRating} increaseRating={this.props.increaseRating}
               />
       ): null
       );
   }
}


export default ItemsList;
