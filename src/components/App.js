import React, { Component } from 'react';
import  { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import apolloClient from '../services/apollo.js';
// components
import AppMenu from './AppMenu';
import AppContent from './AppContent';
import AppFooter from './AppFooter';

class App extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = { 
      width: window.innerWidth
    };
    // binds
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
  }

  // componente montado
  componentDidMount() {
    // iniciando o array de votos no local storage
    if(!localStorage.getItem('votos')){
      localStorage.setItem('votos', JSON.stringify([]))
    }
    // setando evento para atualizar a largura
    window.addEventListener('resize', this.updateWindowWidth);
  }

  // componente vai desmontar
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth);
  }

  // atualiza a largura da janela
  updateWindowWidth() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    // flag pra controlar exibicao desktop ou mobile (breakpoint=495px)
    const desktop = (this.state.width >= 495) ? true : false;
 
    return (
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Layout>
            <AppMenu desktop={desktop} />
            <AppContent desktop={desktop} />
            <AppFooter />
          </Layout>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;