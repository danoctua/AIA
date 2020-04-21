import React from 'react';
import './App.css';
import NewItem from './NewItem';
import SearchItem from './SearchItem';
import SortItem from './SortItem';
import ItemsList from './ItemsList';
import defaultData from './ItemsData.json'

class App extends React.Component {

  constructor(){
    super()

    this.state = {
      items: defaultData.Items,
      lastIndex: defaultData.Items.length + 1
    }
  }

  deleteItem = (id) => {
    this.setState({
      items: this.state.items.filter((m) => m.id !== id)
    })
  }

  decreaseRating = (id) => {
    this.setState(prevState => {
      const updatedItems = prevState.items.map(item => {
        if (item.id === id) {
          if(item.rating > 0){
            item.rating = item.rating - 0.5
          }
        }
        return item
      })
      return{item: updatedItems }
    })
  }

  increaseRating = (id) => {
    this.setState(prevState => {
      const updatedItems = prevState.items.map(item => {
        if (item.id === id) {
          if(item.rating < 150){
            item.rating = item.rating + 0.5
          }
        }
        return item
      })
      return{item: updatedItems }
    })
  }

  addItem = (newItem) =>{

    newItem.id = this.state.lastIndex + 1
    newItem.rating = parseInt(newItem.rating)

    const oldItems = this.state.items
    const newList = [newItem].concat(oldItems)
    this.setState({
      items: newList,
      lastIndex: newItem.id
    })
  }

  searchItem = (showItem) =>{
    this.setState(prevState => {
      const updatedItems = prevState.items.map(item => {
        const myReg = new RegExp(showItem, 'i')
        if (showItem !== "" && (item.brand+" "+item.model).match(myReg) === null) {
            item.show = false
        }
        else{
          item.show = true
        }
        return item
      })
      return{item: updatedItems }
    })
  }


  sortByName = () =>{
    this.setState(prevState => {
      const sortedList = this.state.items.sort((a, b) => ((a.brand + a.model).toLowerCase() > (b.brand + b.model).toLowerCase()) ? 1 : -1)
      return {item: sortedList }
    })
  }

  sortByNameDesc = () =>{
    this.setState(prevState => {
      const sortedList = this.state.items.sort((a, b) => (a.brand + a.model > b.brand + b.model) ? 1 : -1)
      return {item: sortedList }
    })
  }

  sortByRating = () =>{
    this.setState(prevState => {
      const sortedList = this.state.items.sort((a, b) => (a.rating > b.rating) ? 1 : -1)
      return {item: sortedList }
    })
  }

  sortByRatingDesc = () =>{
    this.setState(prevState => {
      const sortedList = this.state.items.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
      return {item: sortedList }
    })
  }

   render(){
    return (
      <div className="Container" >
        <NewItem
         addItem={this.addItem}
         />
         <div className="toolsContainer">
         <SearchItem
         searchItem={this.searchItem}
         />
          <SortItem
          sortByName={this.sortByName}
          sortByNameDesc={this.sortByNameDesc}
          sortByRating={this.sortByRating}
          sortByRatingDesc={this.sortByRatingDesc}
          />
          </div>


          <ItemsList items={this.state.items}
            increaseRating={this.increaseRating}
            decreaseRating={this.decreaseRating}
            deleteItem={this.deleteItem}
          />


      </div>
      );
    }
}

export default App;
