import React , { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
 
function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  }
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);



  function setValue(chave, valor) {
    setValues({
      ...values, 
      [chave]: valor,
     })
  }

  function handleChange(infosDoEvento) {
    setValue(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value
    );                     
  }
    

  useEffect(() => {
    const URL_TOP = 'http://localhost:8080/categorias';
    fetch(URL_TOP)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias([
          ...resposta,
        ]);
      });
  },[]);  

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.nome}</h1>
        <form onSubmit = {function handleSubmit(infosDoEvento){
          infosDoEvento.preventDefault();
          setCategorias([
            ...categorias, 
            values
           ]);

          setValues (valoresIniciais);
        }}>
          
          <FormField
            label="Nome da Categoria"
            type="text"
            name="nome"
            value={values.nome} 
            onChange={handleChange}
          />
            
          <FormField
            label="Descrição"
            type="textarea"
            name="descricao"
            value={values.descricao} 
            onChange={handleChange}
          />
            
          <FormField
            label="Cor"
            type="color"
            name="cor"
            value={values.cor} 
            onChange={handleChange}
          />

          <button>
            Cadastrar
          </button>
        </form>
        
        {categorias.length === 0 && <div>
            Loading...
          </div>  
        }

        <ul>
          {categorias.map((categoria) => {
            return (
              <li key={`${categoria.nome}`}>
                {categoria.nome}
              </li>
            )
          })}
        </ul>

        <Link to="/">
            Ir para Home
        </Link>
      </PageDefault>
    )
}

export default CadastroCategoria;