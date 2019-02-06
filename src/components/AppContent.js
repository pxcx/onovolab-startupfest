import React, { Component } from 'react';
import  { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom'
// components
import Votacao from './Votacao';
import Resultados from './Resultados';

// assets
import './assets/css/AppContent.css';

const { Content } = Layout;

class AppContent extends Component {
  const 
  render() {
    return (
      <Content className="app-content">
        <Switch>
          <Route path="/" exact={true} render={()=><Votacao desktop={this.props.desktop} />} />
          <Route path="/resultados" render={()=><Resultados desktop={this.props.desktop} />} />
        </Switch>
      </Content>
    );
  }
}

export default AppContent;