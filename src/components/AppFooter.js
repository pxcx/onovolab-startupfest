import React, { Component } from 'react';
import { Layout } from 'antd';
// assets
import './assets/css/AppFooter.css';

const { Footer } = Layout;

class AppFooter extends Component {
  render() {
    return (
      <Footer className="app-footer">
        Por <b>Paulo Cézar</b> para <b>ONOVOLAB</b> em <b>2019</b>
      </Footer>
    );
  }
}

export default AppFooter;