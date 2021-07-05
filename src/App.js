import React from 'react';
import './App.css';
import Gallery from './components/Gallery';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleAddGallery = this.handleAddGallery.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: '',
      addName: [],
      dog: undefined,
      loading: true,
      dogs: [],
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }

  // shouldComponentUpdate(_nextProps, nextState) {
  //   const typeFilter = 'terrier';
  //   const { dog } = this.state;
  //   if (dog) {
  //     console.log(nextState.dog);
  //     return !nextState.dog.includes(typeFilter);
  //   }
  //   return true;
  // }

  componentDidUpdate() {

  }

  handleAddGallery() {
    this.setState(({ dog, dogs, name, addName }) => ({
      dogs: [...dogs, dog],
      addName: [...addName, name],
    }));

    this.fetchAPI();
  }

  handleChange({ target }) {
    this.setState({ name: target.value });
  }

  handleClick() {
    this.fetchAPI();
  }

  async fetchAPI() {
    this.setState({
      loading: true,
    }, async () => {
      const request = await fetch('https://dog.ceo/api/breeds/image/random');
      const response = await request.json();
      this.setState({
        dog: response.message,
        loading: false,
      });
      const { dog } = this.state;
      localStorage.setItem('currentURL', dog);
    });
  }

  render() {
    const { dog, loading, dogs, addName } = this.state;
    const dogImage = (
      <img src={ dog } alt="Imagem de cachorro" className="dog-image" />
    );
    const loadingElement = <div>Loading...</div>;
    return (
      <div className="body">
        <div className="image-container">
          {
            loading ? loadingElement : dogImage
          }
        </div>
        <div className="button-container">
          <button type="button" onClick={ this.handleClick }>Buscar</button>
          <input
            type="text"
            placeholder="Dê um nome ao Cachorro"
            onChange={ this.handleChange }
          />
          <button type="button" onClick={ this.handleAddGallery }>Adicionar</button>
        </div>
        <h2>Minha Galeria de Cães</h2>
        <div className="gallery">
          <Gallery
            title="My Dog Gallery"
            dogs={ dogs }
            name={ addName }
          />
        </div>
      </div>
    );
  }
}

export default App;
