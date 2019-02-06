import React, { Component } from 'react';
import { Layout, Menu, Button, Icon } from 'antd';
import { Link } from 'react-router-dom'
// assets
import Images from './assets';
import './assets/css/AppMenu.css';

const { Header } = Layout;

class AppMenu extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      menuOpen: false
    };
    // binds
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  // toggle para o botao do menu
  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render() {
    // botao do menu mobile
    const MenuButton = () => (
      (this.props.desktop) ? null :
      (
        <Button type="primary" onClick={this.toggleMenu} style={{ marginBottom: 16 }}>
          <Icon type={this.state.menuOpen ? 'menu-unfold' : 'menu-fold'} />
        </Button>
      )
    )

    return (
      <Header className="app-header">
        <Link to="/"><img src={Images.Logo} className={(this.props.desktop) ? "logo-desktop" : "logo-mobile"} alt="Startup Fest Logo" /></Link>
        <MenuButton />
        <Menu
          theme="dark"
          mode={(this.props.desktop) ? "horizontal" : "vertical"}
          className={(this.props.desktop) ? "menu-desktop" : "menu-mobile"}
          style={ (this.props.desktop) ? {} : {display: (this.state.menuOpen) ? 'block' : 'none' }}
        >
          <Menu.Item key="1" className="icon" onClick={this.toggleMenu}><Link to="/"><Icon type="like" className="icon-lg" />Votação</Link></Menu.Item>
          <Menu.Item key="2" className="icon" onClick={this.toggleMenu}><Link to="/resultados"><Icon type="trophy" className="icon" />Resultados</Link></Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default AppMenu;