import React from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component {

  generateToyCards = () => {
    return this.props.toys.map((toy) => 
      <ToyCard 
        id={toy.id}
        name={toy.name}
        image={toy.image}
        likes={toy.likes}
        increaseLikes={this.props.increaseLikes}
        deleteToy={this.props.deleteToy}
      />
    )
  }
  

  render (){
    return(
      <div id="toy-collection">
        {this.generateToyCards()}
      </div>
    );
  }
}

export default ToyContainer;
