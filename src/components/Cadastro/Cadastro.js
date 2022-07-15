import React from 'react';
import { Api } from '../../Api/Api';
// import { useNavigate } from 'react-router-dom';

import './Cadastro.css';

export const Cadastro = ({ setDisplay, setStyleCadastro }) => {
    // const navigate = useNavigate()

    const changeStyle = (event) => {
        event.preventDefault()

        setStyleCadastro('displayNone')
        setDisplay('contentHome')
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.emailRegister.value;
        const password = event.target.passwordRegister.value;

        const payload = {
            name,
            email,
            password
        }

        try {
            const response = await Api.buildApiPostRequest(Api.createUsuariosUrl(), payload);
            const data = await response.json();

            console.log(data);
        } catch (err) {
            console.log(err, 'erro no cadastro');
        }
    }


    return (
        <div className='contentCadastro' >
            <h1>CADASTRO</h1>
            <div>
                <form className='form' onSubmit={handleSubmit}>
                    <div id='label'>
                        <label>Nome</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                        />
                    </div>
                    <div id='label'>
                        <label>E-mail</label>
                        <input
                            type='email'
                            id='emailRegister'
                            name='emailRegister'
                        />
                    </div>
                    <div id='label'>
                        <label>Senha</label>
                        <input
                            type='password'
                            id='passwordRegister'
                            name='passwordRegister'

                        />
                    </div>
                    <div className='buttonsForm'>
                        <button type='submit'>Cadastrar</button>
                        <button onClick={changeStyle} >Voltar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

