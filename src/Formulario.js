function Formulario({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}){
    return(
    <form>
        <input type='text' value={obj.descricao} onChange={eventoTeclado} name='descricao' placeholder="Descrição Agendamento" className='form-control'/>
        <input type='date' value={obj.data} onChange={eventoTeclado} name='data' placeholder="Data" className='form-control'/>
        <input type='time' value={obj.hora} onChange={eventoTeclado} name='hora' placeholder="Hora" className='form-control'/>
                            
        {
            botao
            ?
            <input type='button' value='Cadastrar' onClick={cadastrar} className="btn btn-primary"/>
                :
            <div>
                <input type="button" onClick={alterar} value='Alterar' className="btn btn-warning"/>
                <input type="button" onClick={remover} value='Remover'  className="btn btn-danger"/>
               <input type="button" onClick={cancelar} value='Cancelar' className='btn btn-secondary'/>
            </div>
        }
        
    </form>
)
}

export default Formulario;


