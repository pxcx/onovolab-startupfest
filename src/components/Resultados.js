import React, { Component } from 'react';
import { Row, Col, Card, Avatar, Rate, Icon } from 'antd';
// assets
import './assets/css/AppContent.css';
import './assets/css/Resultados.css';
// services
import firestoreClient from '../services/firestore.js'

class Resultados extends Component {
  constructor(props){
    super(props)

    this.state = {
      proposta: [],
      apresentacao: [],
      desenvolvimento: [],
    }
  }
  
  async componentDidMount(){
    const resultados = await firestoreClient.getResultados()
    this.setState(resultados)
  }

  render() {
    // componente que mostra o resultado da categoria proposta
    const Proposta = () => (
      <Col>
        <Card className={(this.props.desktop) ? "card-desktop" : "card-mobile"}>
          <h2 className="subtitle">Proposta</h2><div className="subtitle-decoration" />
          {
            (this.state.proposta.length > 0) ? 
              this.state.proposta.map( (resultado, i) => {
                // arredondando para x.5 ou x.0
                const intRate = parseInt(resultado.rate)
                const floatRate = ( (resultado.rate-intRate) >= 0.5 ) ? 0.5 : 0
                const rate = intRate + floatRate
  
                return (
                  <Row type="flex" justify="center" key={i}>
                    <Col span={4} className="place"><h1>{i+1} º</h1></Col>
                    <Col span={4} className="photo"><Avatar shape="square" size={42} src={resultado.imgUrl}/></Col>
                    <Col span={14}>
                      <h3 className="name">{resultado.startup}</h3>
                      <Rate disabled allowHalf defaultValue={rate} className="rate" /> {resultado.rate.toFixed(1)}
                    </Col>
                  </Row>
                )
              }) : ( <p className="loading-container"><Icon type="loading" className="loading" /></p> )
            
          }
          
        </Card>
      </Col>
    )
    // componente que mostra o resultado da categoria apresentacao
    const Apresentacao = () => (
      <Col>
        <Card className={(this.props.desktop) ? "card-desktop" : "card-mobile"}>
          <h2 className="subtitle">Apresentação</h2><div className="subtitle-decoration" />

          {
            (this.state.apresentacao.length > 0) ? 
              this.state.apresentacao.map( (resultado, i) => {
                // arredondando para x.5 ou x.0
                const intRate = parseInt(resultado.rate)
                const floatRate = ( (resultado.rate-intRate) >= 0.5 ) ? 0.5 : 0
                const rate = intRate + floatRate

                return (
                  <Row type="flex" justify="center" key={i}>
                    <Col span={4} className="place"><h1>{i+1} º</h1></Col>
                    <Col span={4} className="photo"><Avatar shape="square" size={42} src={resultado.imgUrl}/></Col>
                    <Col span={14}>
                      <h3 className="name">{resultado.startup}</h3>
                      <Rate disabled allowHalf defaultValue={rate} className="rate" /> {resultado.rate.toFixed(1)}
                    </Col>
                  </Row>
                )
              })  : ( <p className="loading-container"><Icon type="loading" className="loading" /></p> )
          }
          
        </Card>
      </Col>
    )

    // componente que mostra o resultado da categoria desenvolvimento
    const Desenvolvimento = () => (
      <Col>
        <Card className={(this.props.desktop) ? "card-desktop" : "card-mobile"}>
          <h2 className="subtitle">Desenvolvimento</h2><div className="subtitle-decoration" />

          {
            (this.state.desenvolvimento.length > 0) ? 
              this.state.desenvolvimento.map( (resultado, i) => {
                // arredondando para x.5 ou x.0
                const intRate = parseInt(resultado.rate)
                const floatRate = ( (resultado.rate-intRate) >= 0.5 ) ? 0.5 : 0
                const rate = intRate + floatRate

                return (
                  <Row type="flex" justify="center" key={i}>
                    <Col span={3} className="place"><h1>{i+1}º</h1></Col>
                    <Col span={4} className="photo"><Avatar shape="square" size={42} src={resultado.imgUrl}/></Col>
                    <Col span={15}>
                      <h3 className="name">{resultado.startup}</h3>
                      <Rate disabled allowHalf defaultValue={rate} className="rate" /> {resultado.rate.toFixed(1)}
                    </Col>
                  </Row>
                )
              })  : ( <p className="loading-container"><Icon type="loading" className="loading" /></p> )
          }
          
        </Card>
      </Col>
    )
    
    return (
      <div className="wrapper">
        <h1 className="title">Resultados</h1><div className="title-decoration" />
        <Row type="flex" justify="center" className="resultados">
          <Proposta />
          <Apresentacao />
          <Desenvolvimento />
        </Row>
      </div>
    );
  }
}

export default Resultados;