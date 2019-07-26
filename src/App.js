import React, { Component } from 'react';
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    debugger
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      gender: 'female',
      active: false,
      table: []
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { table } = this.state; // const orders = this.state.orders;
    this.setState({
      active: false,
      table: [...table, { userName: this.state.userName, firstName: this.state.firstName, lastName: this.state.lastName, gender: this.state.gender, id: new Date().getTime() }],
      firstName: '',
      lastName: '',
      userName: '',
    });
  }

  changeHandler = (event) => {
    debugger
    const { name, value } = event.target;
    this.setState({ [name]: value },
      function () {
        this.setState({
          active: (this.state.firstName && this.state.lastName && this.state.userName && this.state.gender)
        })
      });
  }

  // deleteHandler = (id) => {
  //   return () => {
  //   }
  // }

  deleteHandler = id => () => {
    const { table } = this.state;
    const idx = table.findIndex(row => row.id === id);
    table.splice(idx, 1);
    this.setState({ table });
  }

  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

        <h4>Enter Student Info:</h4>
        <form onSubmit={this.submitHandler} className="info">
          <div>
            <label >UserName:</label><input onChange={this.changeHandler} type='text' value={this.state.userName} name='userName' placeholder='user Name' />
          </div>

          <div>
            <label >FirstName:</label>
            <input onChange={this.changeHandler} type='text' value={this.state.firstName} name='firstName' placeholder='first Name' />
          </div>

          <div>
            <label >LastName:</label>
            <input onChange={this.changeHandler} type='text' value={this.state.lastName} name='lastName' placeholder='last Name' />
          </div>

          <div className='info-gender'>
            <label >Gender:</label>

            <span className='gender-input'>
            <input onChange={this.changeHandler} type='radio' name='gender' value='male' />Male
          <input onChange={this.changeHandler} type='radio' name='gender' value='female' />Female
            </span>
          </div>
          <button type='submit' disabled={!this.state.active}>Add</button>
        </form>

        <h1>Student List</h1>
        <div className="info">
          <ul className='students'>
            {this.state.table.map(item => <li className='students_item' key={item.id}>
           <span><i>UserName: </i> {item.userName} </span>
              <span><i>FirstName: </i>{item.firstName} </span>
              <span><i>LastName: </i>{item.lastName} </span>
              <span><i>Gender: </i>{item.gender}</span>
              <button onClick={this.deleteHandler(item.id)}>X</button>
            </li>)}
          </ul>
        </div>
      </div>
    )
  }

}