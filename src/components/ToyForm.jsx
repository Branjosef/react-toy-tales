import React, { Component } from 'react';

class ToyForm extends Component {

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={event => this.props.handleSubmit(event)}>
          <h3>Create a toy!</h3>
          <input type="text" onChange={event => this.props.handleName(event)} name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" onChange={event => this.props.handleImage(event)} name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
