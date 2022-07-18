import React, { useEffect, useState } from 'react';
import { Login } from '../../components/Login/Login';
import { Cadastro } from '../../components/Cadastro/Cadastro';
import './Home.css';
import { JwtHandler } from '../../jwt-handler/jwt-handler';
import { Link } from 'react-router-dom';

export const Home = () => {

    const [display, setDisplay] = useState('contentHome')
    const [styleLogin, setStyleLogin] = useState('displayNone')
    const [styleCadastro, setStyleCadastro] = useState('displayNone')


    const changeStyle = (event) => {
        event.preventDefault()
        const id = event.target.id;

        if (id === 'login') {
            setDisplay('displayNone')
            setStyleLogin('active')
        } else {
            setDisplay('displayNone')
            setStyleCadastro('active')
        }
    }

    const [isLogged, setIsLogged] = useState(JwtHandler.isJwtValid);

    useEffect(() => {
        const handleOnJwtChange = () => {
            setIsLogged(JwtHandler.isJwtValid());
        };

        window.addEventListener("onJwtChange", handleOnJwtChange);

        // Função de limpeza
        return () => {
            window.removeEventListener("onJwtChange", handleOnJwtChange);
        };
    }, []);

    return (
        <div className='Home'>
            <div className={display}>
                <h1>MINHA LISTA</h1>
                <div className='buttons'>
                    {isLogged ?
                        <div className='divLoginCadastro btnMinhaLista'>
                            <Link to='/todolist'>Minha Lista</Link>
                        </div>
                        :
                        <div className='divLoginCadastro'>
                            <h2>Login</h2>
                            <p>Faça o login para acessar "Minha Lista"</p>
                            <button className='btnlogout' onClick={changeStyle} id='login'>Entrar</button>
                        </div>
                    }

                    <div className='divLoginCadastro'>
                        <h2>Cadastro</h2>
                        <p>Cadastre-se para acessar "Minha Lista" </p>
                        <button className='btnlogout' onClick={changeStyle} id='cadastro'>Cadastre-se</button>
                    </div>
                </div>
            </div>
            <div className={styleLogin}>
                <Login
                    setDisplay={setDisplay}
                    setStyleLogin={setStyleLogin}
                />
            </div>
            <div className={styleCadastro}>
                <Cadastro
                    setDisplay={setDisplay}
                    setStyleCadastro={setStyleCadastro}
                />
            </div>

        </div>
    )
}
