import firebase from 'firebase/app';
import 'firebase/firestore'

class Firestore {
  constructor(){
    const config = {
      apiKey: "API_KEY",
      authDomain: "AUTH_DOMAIN",
      databaseURL: "DB_URL",
      projectId: "PROJECT_ID",
      storageBucket: "BUCKET",
      messagingSenderId: "SENDER_ID"
    };
    firebase.initializeApp(config);
    
    this.db = firebase.firestore()
  }

  getVotes(categoria, startup){
    const collectionRef = this.db.collection(categoria+'-votes').doc(startup);
    return collectionRef.get().then(doc => {
      if (!doc.exists) {
        return false;
      } else {
        return doc.data();
      }
    }) 
    .catch(err => { console.log('Error getting document', err); });
  }

  listAllVotes(categoria){
    const collectionRef = this.db.collection(categoria+'-votes')
    return collectionRef.get().then(docList => {
      const list = []
      docList.forEach(doc => {
        const data = doc.data();
        list.push({
          startup: doc.id,
          rate: data.rate,
          imgUrl : data.imgUrl
        })
      })
      return list
    }) 
    .catch(err => { console.log('Error getting document', err); });
  }

  async setVote(startup, img, proposta, apresentacao, desenvolvimento){
    let sum, votes
    const allProposta = await this.getVotes('proposta', startup)
    const allApresentacao = await this.getVotes('apresentacao', startup)
    const allDesenvolvimento = await this.getVotes('desenvolvimento', startup)

    sum = (allProposta) ? allProposta.sum + proposta : proposta
    votes = (allProposta) ?  allProposta.votes + 1 : 1
    const propostaRef = this.db.collection('proposta-votes')
    propostaRef.doc(startup).set({ imgUrl: img, rate: parseFloat((sum/votes)), sum: parseFloat(sum), votes: parseFloat(votes) })
 
    sum = (allApresentacao) ? allApresentacao.sum + apresentacao : apresentacao
    votes = (allApresentacao) ?  allApresentacao.votes + 1 : 1
    const apresentacaoRef = this.db.collection('apresentacao-votes')
    apresentacaoRef.doc(startup).set({ imgUrl: img, rate: parseFloat((sum/votes)), sum: parseFloat(sum), votes: parseFloat(votes) })

    sum = (allDesenvolvimento) ? allDesenvolvimento.sum + desenvolvimento : desenvolvimento
    votes = (allDesenvolvimento) ? allDesenvolvimento.votes + 1 : 1
    const desenvolvimentoRef = this.db.collection('desenvolvimento-votes')
    desenvolvimentoRef.doc(startup).set({ imgUrl: img, rate: parseFloat((sum/votes)), sum: parseFloat(sum), votes: parseFloat(votes) })

  }

  async getResultados(){
    const propostas = await this.listAllVotes('proposta');
    const apresentacoes = await this.listAllVotes('apresentacao');
    const desenvolvimentos = await this.listAllVotes('desenvolvimento');
    
    const resultadoPropostas = propostas.sort((a,b) => {
      if(a.rate > b.rate) return -1
      if(a.rate < b.rate) return 1
      return 0
    })

    const resultadoApresentacoes = apresentacoes.sort((a,b) => {
      if(a.rate > b.rate) return -1
      if(a.rate < b.rate) return 1
      return 0
    })

    const resultadoDesenvolvimentos = desenvolvimentos.sort((a,b) => {
      if(a.rate > b.rate) return -1
      if(a.rate < b.rate) return 1
      return 0
    })

    return {
      proposta : resultadoPropostas.slice(0, 3),
      apresentacao : resultadoApresentacoes.slice(0, 3),
      desenvolvimento : resultadoDesenvolvimentos.slice(0, 3),
    }
  }
}



const firestoreClient = new Firestore();

export default firestoreClient;
