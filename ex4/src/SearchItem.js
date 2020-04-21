import React from 'react';
import './App.css';

class SearchItem extends React.Component{

    constructor(){
        super()
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
        this.props.searchItem(value)
    }


    render(){
        return(
                <div className="divSearchPhone">
                    <input name="searchPhone"
                        placeholder="Search"
                        onChange={this.handleChange}
                        className="searchInput"
                        />
                </div>

        )
    }




}


export default SearchItem
