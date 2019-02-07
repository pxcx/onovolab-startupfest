import React, { Component } from 'react';
import { Row, Col, Card, Avatar, Rate } from 'antd';
// assets
import './assets/css/AppContent.css';
import './assets/css/Resultados.css';

class Resultados extends Component {
  render() {
    const names = ['Proposta', 'Apresentação', 'Desenvolvimento']

    return (
      <div className="wrapper">
        <h1 className="title">Resultados</h1><div className="title-decoration" />
        <Row type="flex" justify="center">
        {
          names.map( (categoria, i) => (
            <Col key={i}>
            <Card className={(this.props.desktop) ? "card-desktop" : "card-mobile"}>
              <h2 className="subtitle">{categoria}</h2><div className="subtitle-decoration" />
              <Row type="flex" justify="center">
                <Col span={3} className="place"><h1>1º</h1></Col>
                <Col span={4} className="photo"><Avatar shape="square" size={42} icon="user" /></Col>
                <Col span={15}>
                  <h3 className="name">Nome da Startup</h3>
                  <Rate disabled allowHalf defaultValue={5} className="rate" /> 5
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={3} className="place"><h1>2º</h1></Col>
                <Col span={4} className="photo"><Avatar shape="square" size={42} icon="user" /></Col>
                <Col span={15}>
                  <h3 className="name">Nome da Startup</h3>
                  <Rate disabled allowHalf defaultValue={4.5} className="rate" /> 4.5
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={3} className="place"><h1>3º</h1></Col>
                <Col span={4} className="photo"><Avatar shape="square" size={42} icon="user" /></Col>
                <Col span={15}>
                  <h3 className="name">Nome da Startup</h3>
                  <Rate disabled allowHalf defaultValue={3} className="rate" /> 3
                </Col>
              </Row>
            </Card>
            </Col>
          ))
        }
        </Row>
      </div>
    );
  }
}

export default Resultados;