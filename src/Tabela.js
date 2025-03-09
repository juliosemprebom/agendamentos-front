function Tabela({vetor, selecionar, carregando}){

    if (carregando) {
        return <p>Carregando registros do servidor...</p>;
      }
    

    if(!vetor || vetor.length ===0){
        return <p>Nenhum agendamento disponível.</p>
    }

    return(
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Descrição Agendamento</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Selecionar</th>
                </tr>
            </thead>

            <tbody>
                {
                    vetor.map((obj, indice)=>(
                        <tr key={indice}>
                            <td>{indice+1}</td>
                            <td>{obj.descricao}</td>
                            <td>{obj.data}</td>
                            <td>{obj.hora}</td>
                            <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                         </tr>
                    )
                )
                }
            </tbody>
        </table>
)

}

export default Tabela;
 