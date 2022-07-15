import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../Api/Api';
import { JwtHandler } from '../../jwt-handler/jwt-handler';
import './Login.css';


export const Login = ({ setDisplay, setStyleLogin }) => {
  const navigate = useNavigate()
  const changeStyle = (event) => {
    event.preventDefault()

    setStyleLogin('displayNone')
    setDisplay('contentHome')
  }

  const handleSubmit = async event => {
    // Previne o comportamento padrão do submit, que no caso do form é o refresh
    event.preventDefault();

    // Obtém os dados dos inputs
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Constrói um payload com esses dados
    const payload = {
      email,
      password,
    };

    // Faz uma requisição no backend
    const response = await Api.buildApiPostRequest(Api.loginUrl(), payload);

    const body = await response.json();
    console.log(body);

    if (response.status === 200) {
      // Login successfully
      const accessToken = body.accessToken;

      JwtHandler.setJwt(accessToken);

      navigate('/todolist')

    } else {
      console.log('senha incorreta');
    }
  }

  return (
    <div className='contentLogin' >
      <h1>LOGIN</h1>
      <div>
        <form className='form' onSubmit={handleSubmit}>
          <div id='label'>
            <label>E-mail</label>
            <input
              type="text"
              id="email"
              name="email"
            />
          </div>
          <div id='label'>
            <label>Senha</label>
            <input
              type='password'
              id="password"
              name="password"
            />
          </div>
          <div className='buttonsForm'>
            <button type='submit'>Entrar</button>
            <button onClick={changeStyle} >Voltar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
