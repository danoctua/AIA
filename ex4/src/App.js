import React from 'react';
import logo from './logo.svg';
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
    console.log("searchItem: " + showItem)
    this.setState(prevState => {
      const updatedItems = prevState.items.map(item => {
        const myReg = new RegExp(showItem, 'i')
        if ((item.brand+" "+item.model).match(myReg) === null && showItem !== "") {
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
      const sortedList = this.state.items.sort((a, b) => (a.brand + a.model > b.brand + b.model) ? 1 : -1)
      return {item: sortedList }
    })
  }

  sortByNameDesc = () =>{
    this.setState(prevState => {
      const sortedList = this.state.items.sort((a, b) => (a.brand + a.model > b.brand + b.model) ? 1 : -1)
      return {item: sortedList }
    })
  }

  sortByVolumes = () =>{
    this.setState(prevState => {
      const sortedList = this.state.items.sort((a, b) => (a.rating > b.rating) ? 1 : -1)
      return {item: sortedList }
    })
  }

  sortByVolumesDesc = () =>{
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
          sortByDescription={this.sortByDescription}
          sortByDescriptionDesc={this.sortByDescriptionDesc}
          sortByVolumes={this.sortByVolumes}
          sortByVolumesDesc={this.sortByVolumesDesc}
          />
          </div>


          <ItemsList items={this.state.items}
          //   incrementVolumes={this.incrementVolumes}
          //   decrementVolumes={this.decrementVolumes}
            deleteItem={this.deleteItem}
          />


      </div>
      );
    }
}

export default App;
