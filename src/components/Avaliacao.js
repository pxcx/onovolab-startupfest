import React, { Component } from 'react';
import { Row, Col, Card, Avatar, Rate, Button } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// assets
import './assets/css/AppContent.css';
import './assets/css/Avaliacao.css';

class Avaliacao extends Component {
  constructor(props){
    super(props)
    // state
    this.state = {
      datasource: []
    }
    // binds
    this.handleVote = this.handleVote.bind(this)
    this.confirmVote = this.confirmVote.bind(this)
    this.cancelVote = this.cancelVote.bind(this)
    this.updateDatasource = this.updateDatasource.bind(this)
  }

  componentDidMount(){
    this.updateDatasource()
  }

  componentWillReceiveProps(nextProps){
    this.updateDatasource(nextProps)
  }

  updateDatasource(props = this.props){
    const api = (props.startups.loading) ? [] : props.startups.allStartups
    const session = JSON.parse(localStorage.getItem("votos"))
    const datasource = api.map(startup => (
      {
        startup: startup.name,
        description: startup.description,
        imageUrl: startup.imageUrl,
        proposta: 0,
        apresentacao: 0,
        desenvolvimento: 0,
        computado: false
      }
    ))

    if(session && session.length > 0){
      const noVotes = datasource.filter(startup => {
        let computado = false;
        session.forEach(voto => {
          if(startup.startup === voto.startup) computado = true 
        })
        return !computado
      })

      this.setState({ datasource: Array.from(noVotes.concat(session)) })
    }
    else{
      this.setState({ datasource: Array.from(datasource) })
    }
    
  }

  // atualiza os votos na state
  handleVote(val, item, name){
    // atuazliando state
    const newDatasource = this.state.datasource.map(reg => {
      if(reg.startup === name){
        return Object.assign({}, reg, {[item] : val})
      }
      return reg
    })
    this.setState({ datasource: newDatasource })

    // mostrando o botao de confirmar caso tenha mais de 3 votos
    newDatasource.forEach(reg => {
      if(reg.proposta > 0 && reg.apresentacao > 0 && reg.desenvolvimento > 0){
        const actions = document.querySelector('#'+reg.startup.replace(/[^A-Z0-9]+/ig, "_")+' .ant-card-actions')
        if(actions) actions.style.display = 'block'
      }
    })
  }

  confirmVote(startup){
    const votes = Array.from(JSON.parse(localStorage.getItem('votos')))
    this.state.datasource.forEach(reg => {
      if(reg.startup === startup) {
        votes.push(Object.assign({}, reg, {computado: true}))
      }
    })
    localStorage.setItem('votos', JSON.stringify(votes))
    console.log('votos atualizados para: ', votes)
    console.log('Seu voto: ', this.state.vote, ' foi salvo no firestore! eh verdade essa msg!')
    document.querySelector('.ant-card-actions').style.display = 'none'
    this.updateDatasource()
  }

  // cancela um voto da state
  cancelVote(name){
    // atuazliando state
    const newDatasource = this.state.datasource.map(reg => {
      if(reg.startup === name){
        return Object.assign({}, reg, {
          proposta : 0,
          apresentacao : 0,
          desenvolvimento : 0,
        })
      }
      return reg
    })
    this.setState({ datasource: newDatasource })
    document.querySelector('#'+name.replace(/[^A-Z0-9]+/ig, "_")+' .ant-card-actions').style.display = 'none'
    this.updateDatasource()
  }

  render() {
    const { loading } = this.props.startups
    const datasource = (loading) ? [0,1,2] : Array.from(this.state.datasource)

    console.log('datasource: ', this.state.datasource)
    
    return (
      <div className="wrapper">
        <h1 className="title">Avaliação</h1>
        <div className="title-decoration"></div>
        <div className="grid">
          {
            datasource.map((startup,i) => {
              return (
                <Card key={i}
                  id={(startup.startup) ? startup.startup.replace(/[^A-Z0-9]+/ig, "_") : i}
                  className={(this.props.desktop) ? "card-desktop" : "card-mobile"}
                  actions={(startup.computado) ? [] : [
                    <Button type="danger" onClick={() => this.cancelVote(startup.startup)}>Cancelar</Button>,
                    <Button type="primary" onClick={() => this.confirmVote(startup.startup)}>Confirmar</Button>
                  ]}
                  loading={loading}
                >
                  <h3 className="subtitle">{startup.startup}</h3>
                  <Row type="flex">
                    <Col><Avatar shape="square" size={124} src={startup.imageUrl} /></Col>
                    <Col className="vote">
                      <div>
                        <span className="subtitle label">Proposta<br/></span>
                        <Rate allowHalf value={startup.proposta} className="rate" onChange={val => this.handleVote(val, 'proposta', startup.startup)} />
                      </div>
                      <div>
                        <span className="subtitle label">Apresentação<br/></span>
                        <Rate allowHalf value={startup.apresentacao} className="rate" onChange={val => this.handleVote(val, 'apresentacao', startup.startup)} />
                      </div>
                      <div>
                        <span className="subtitlelabel">Desenvolvimento<br/></span>
                        <Rate allowHalf value={startup.desenvolvimento} className="rate" onChange={val => this.handleVote(val, 'desenvolvimento', startup.startup)} />
                      </div>
                    </Col>
                  </Row>
                  <p className="marginTop">{startup.description}</p>
                </Card>
              )
            })
          }
        </div>
      </div>
    );
  }
}

const startupsQuery = gql`
  query GetAllStartups {
    allStartups {
      name
      description
      imageUrl
    }
  }
`;

export default graphql(startupsQuery, {
  name: 'startups'
})(Avaliacao);