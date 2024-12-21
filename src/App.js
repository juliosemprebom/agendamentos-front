import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  const agendamentoInicial = {
    id: 0,
    descricao: '',
    data: '', 
    hora: ''
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [agedamentos, setAgendamentos] = useState([]); 
  const [objAgendamento, setObjAgendamento] = useState(agendamentoInicial);

  useEffect(()=>{
    fetch("https://crud-agendamentos-back-end.onrender.com/listarTodos")
    .then( retorno => retorno.json()) 
    .then(retornoJason => setAgendamentos(retornoJason))
    .catch(error => console.error('Erro ao carregar agendamentos:', error)); 
  }, []);

const aoDigitar = (e) => {
  const { name, value } = e.target;
  setObjAgendamento(prevState => ({
    ...prevState,
    [name]: value
  }));
}

const cadastrar = () => {
  fetch('https://crud-agendamentos-back-end.onrender.com/cadastrar', {
    method: 'POST',
    body: JSON.stringify({
      ...objAgendamento,
      data: objAgendamento.data,
      hora: objAgendamento.hora 
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(responseJson => {
    if(responseJson.mensagem !== undefined){
      alert(responseJson.mensagem);
    }else{
      setAgendamentos([...agedamentos, responseJson]);
      alert('Agendamento cadastrado com sucesso');
      limparFormulario();
    }
  })
  .catch(error => console.error('Erro ao cadastrar:', error));
};

const remover = () => {
  fetch('https://crud-agendamentos-back-end.onrender.com/remover/'+objAgendamento.id, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(responseJson => {
    
    alert(responseJson.mensagem);

    let vetorTemp = [...agedamentos];

    let indice = vetorTemp.findIndex((p)=>{
      return p.id === objAgendamento.id;
    });

    vetorTemp.splice(indice, 1);
    setAgendamentos(vetorTemp);

    limparFormulario();

  })
  .catch(error => console.error('Erro ao remover:', error));
};

const alterar = () => {
  fetch('https://crud-agendamentos-back-end.onrender.com/alterar/'+objAgendamento.id, {
    method: 'put',
    body: JSON.stringify({
      ...objAgendamento,
      data: objAgendamento.data,
      hora: objAgendamento.hora 
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(responseJson => {
    if(responseJson.mensagem !== undefined){
      alert(responseJson.mensagem);
    }else{
      setAgendamentos([...agedamentos, responseJson]);
      alert('Agendamento cadastrado com sucesso');
      limparFormulario();
    }
  })
  .catch(error => console.error('Erro ao cadastrar:', error));
};

  const limparFormulario = () =>{
    setObjAgendamento(agendamentoInicial);
    setBtnCadastrar(true);
  }

  const selecionarAgendamento = (indice) =>{
    setObjAgendamento(agedamentos[indice]);
    setBtnCadastrar(false);
  }
  
  return (
    <div className="App">
   
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objAgendamento} cancelar={limparFormulario} remover={remover} />
      <Tabela vetor={agedamentos} selecionar={selecionarAgendamento}/>
    </div>
  );
}


export default App;
