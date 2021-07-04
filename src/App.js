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
    });
  }

  render() {
    const { dog, loading } = this.state;
    const dogImage = <img src={ dog } alt="Imagem de um cachorro" />;
    const loadingElement = <div>Loading...</div>;
    return (
      <div>
        {
          loading ? loadingElement : dogImage
        }
        <button type="button" onClick={ this.handleClick }>Buscar</button>
      </div>
    );
  }
}

export default App;
