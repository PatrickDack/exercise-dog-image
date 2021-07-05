import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      dog: undefined,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    const typeFilter = 'terrier';
    const { dog } = this.state;
    if (dog) {
      console.log(nextState.dog);
      return !nextState.dog.includes(typeFilter);
    }
    return true;
  }

  componentDidUpdate() {

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
        type: response.message.split('/')[4],
      });
      const { dog, type } = this.state;
      localStorage.setItem('currentURL', dog);
      const time = 1000;
      setTimeout(() => alert(type), time);
    });
  }

  render() {
    const { dog, loading } = this.state;
    const dogImage = <img src={ dog } alt="Imagem de cachorro" className="dog-image" />;
    const loadingElement = <div>Loading...</div>;
    return (
      <div className="body">
        {
          loading ? loadingElement : dogImage
        }
        <button type="button" onClick={ this.handleClick }>Buscar</button>
      </div>
    );
  }
}

export default App;
