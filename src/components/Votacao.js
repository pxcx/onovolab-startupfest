import React, { Component } from 'react';
import { Row, Col, Card, Avatar, Rate } from 'antd';

class Votacao extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount(){
    setTimeout(()=> {
      this.setState({loading: false})
    }, 1000)
  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="title">Votação</h1>
        <div className="title-decoration"></div>
        <Row type="flex" justify="center" style={{marginTop: 10}}>
          {
            Array.from(Array(28)).map((val,i) => (
              <Col key={i}>
                <Card className={(this.props.desktop) ? "card-desktop" : "card-mobile"} loading={this.state.loading}>
                  <h3 className="subtitle">Nome da Startup {i+1}</h3>
                  <Row type="flex">
                    <Col><Avatar shape="square" size={124} icon="user" /></Col>
                    <Col style={{marginLeft: 15, marginTop: -5}}>
                    <div>
                        <span className="subtitle" style={{fontSize: 12}}>Proposta<br/></span>
                        <Rate allowHalf defaultValue={0} style={{fontSize: 16, marginTop: -5}} />
                      </div>
                      <div>
                        <span className="subtitle" style={{fontSize: 12}}>Apresentação<br/></span>
                        <Rate allowHalf defaultValue={0} style={{fontSize: 16, marginTop: -5}} />
                      </div>
                      <div>
                        <span className="subtitle" style={{fontSize: 12}}>Desenvolvimento<br/></span>
                        <Rate allowHalf defaultValue={0} style={{fontSize: 16, marginTop: -5}} />
                      </div>
                    </Col>
                  </Row>
                  <p style={{marginTop: 10}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis cupiditate voluptate reiciendis facere molestias quos asperiores! Quia in necessitatibus repellat molestiae pariatur, alias sequi, quis similique architecto aliquam nulla odio.</p>
                </Card>
              </Col>
            ))
          }
          
        </Row>
      </div>
    );
  }
}

export default Votacao;