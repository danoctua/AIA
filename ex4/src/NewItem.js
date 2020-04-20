import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';


class NewItem extends React.Component{

    constructor(){
        super()
        this.state = {
            id: -1,
            brand: "",
            model: "",
            description: "",
            rating: 0,
            src: "",
            show: true
        }
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    newPhone = () => {
        if (this.state.brand == "" ||
            this.state.model == "" ||
            this.state.rating == ""){
              return
            }
        this.setState((prevState) => {
            return ({
                id: -1,
                brand: "",
                model: "",
                description: "",
                rating: 0,
                src: "",
                show: true
            }
            )
        })

        this.props.addItem(this.state)
    }

    render(){
        return(
            <div className="header">
                  <div className="headerTitle">
                  Phone catalog
                  </div>
                <div className="newPhoneForm">
                        <div>
                            <label for="newBrand">Brand:</label>
                            <input name="brand" id="newBrand"
                                placeholder="iPhone"
                                onChange={this.handleChange}
                                value={this.state.brand}
                                />
                        </div>
                        <div>
                            <label for="newModel">Model:</label>
                            <input id="newModel" name="model"
                                placeholder="11"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.model}
                                />
                        </div>
                        <div>
                          <label for="newDxomark">DXOmark rating:</label>
                            <input id="newDxomark" name="rating"
                                placeholder="110"
                                type="number"
                                onChange={this.handleChange}
                                value={this.state.rating}
                                />
                        </div>
                        <div>
                            <label for="newPhoto">Choose photo:</label>
                            <input name="src"
                                placeholder="/home/user/src"
                                onChange={this.handleChange}
                                value={this.state.src}
                                />
                        </div>
                        <button type="submit" class="newSubmit" onClick={this.newPhone}>Add new phone</button>
                </div>
            </div>

        )
    }




}


export default NewItem
