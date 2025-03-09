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
    const [agendamentos, setAgendamentos] = useState([]); 
    const [objAgendamento, setObjAgendamento] = useState(agendamentoInicial);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
      setCarregando(true); // Iniciar carregamento
    
      fetch("https://crud-agendamentos-back-end.onrender.com/listarTodos")
        .then(retorno => retorno.json())
        .then(retornoJson => {
          setAgendamentos(retornoJson);
          setCarregando(false);// Desativar carregamento ao receber os dados 
        })
        .catch(error => {
          console.error('Erro ao carregar agendamentos:', error);
          setCarregando(false);  // Desativar carregamento mesmo em caso de erro
        });
    
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
        setAgendamentos([...agendamentos, responseJson]);
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

      let vetorTemp = [...agendamentos];

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
    fetch('https://crud-agendamentos-back-end.onrender.com/alterar', {
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
            let vetorTemp = [...agendamentos];
            let indice = vetorTemp.findIndex((p)=>{
            return p.id === objAgendamento.id;
            });
            vetorTemp[indice] = responseJson; 
            setAgendamentos(vetorTemp);

            alert('Agendamento alterado com sucesso');
            limparFormulario();
        }
    })
    .catch(error => console.error('Erro ao alterar:', error));
  };

    const limparFormulario = () =>{
      setObjAgendamento(agendamentoInicial);
      setBtnCadastrar(true);
    }

    const selecionarAgendamento = (indice) =>{
      setObjAgendamento(agendamentos[indice]);
      setBtnCadastrar(false);
    }
    
    return (
      <div className="App">
        <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} 
                   obj={objAgendamento} cancelar={limparFormulario} remover={remover} alterar={alterar} />
        <Tabela vetor={agendamentos} selecionar={selecionarAgendamento} carregando={carregando} />
      </div>
    );
}


export default App;
