import React from 'react';
import './App.css';
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{
  constructor() {
    super()
    this.state = {
      display: false,
      toys: [],
      toyName: '',
      toyUrl: ''
    }
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {
      this.setState({
        toys: toys
      })
    })
  }

  increaseLikes = (likeCount, id) => {
    const count = (likeCount + 1)
    const formData = {likes: count}
    let updatedToys = this.state.toys
    let toy = updatedToys.find(toy => toy.id === id)
    let position = updatedToys.indexOf(toy)
    updatedToys[position].likes = count

    this.setState({
        toys: updatedToys
    })
  
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(formData)
    })
  } 

  deleteToy = (id) => {
    const formData = {id};
    let updatedToys = this.state.toys.filter(toy => toy.id !== id)

    this.setState({
      toys: updatedToys
    })

    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(formData)
    })
  }

  handleName = (event) => {
    this.setState({
      toyName: event.target.value
    })
  }

  handleImage = (event) => {
    this.setState({
      toyUrl: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const formData = {
      name: this.state.toyName,
      image: this.state.toyUrl,
      likes: 0
    }
    fetch(`http://localhost:3000/toys`, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(formData)
    })

    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {
      this.setState({
        toys: toys,
        toyName: '',
        toyUrl: ''

      })
    })

  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleName={this.handleName} handleImage={this.handleImage} handleSubmit={this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} increaseLikes={this.increaseLikes} deleteToy={this.deleteToy}/>
      </>
    );
  }

}

export default App;
