import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../Api/Api';
import { JwtHandler } from '../../jwt-handler/jwt-handler';
import './ToDoList.css';


export const ToDoList = () => {

    const navigate = useNavigate()

    const [tasks, setTasks] = useState([]);
    const loadData = async () => {
        const response = await Api.buildApiGetRequest(Api.readAllUrl());
        const results = await response.json();
        setTasks(results);
    }
    useEffect(() => {
        loadData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const titulo = event.target.titulo.value;

        const payload = {
            titulo
        }

        const response = await Api.buildApiPostRequest(
            Api.createTaskUrl(),
            payload,
            true
        );

        if (response.status === 200) {
            // Product created successfully
            alert('Tarefa adicionada com sucesso!')
            loadData()

        } else {
            // Error
        }
    }

    const handleDelete = async (event) => {
        const id = event.target.id;
        const response = await Api.buildApiDeleteRequest(
            Api.deleteUrl(id),
            true
        );

        if (response.status === 200) {
            // Delete product successfully
            loadData()
            alert('Tarefa excluida!')
        } else {
            // Error
        }
    };

    const check = async (event) => {
        // event.preventDefault();
        const id = event.target.id;
        let check = event.target.defaultChecked

        if (check === true) {
            check = false
        } else {
            check = true
        }

        const payload = {
            check
        };
        const response = await Api.buildApiPatchRequest(
            Api.updateUrl(id),
            payload,
            true
        );

        // const body = await response.json();

        if (response.status === 200) {
            // Product updated successfully
            loadData()
        }
    }



    const handleEdit = (event) => {
        const id = event.target.id;

        navigate('/editTask/' + id)
    }


    const logout = () => {
        JwtHandler.clearJwt();
        navigate('/')
    }

    return (
        <div >
            <h1>MINHA LISTA</h1>
            <div>
                <form className='formAdd' onSubmit={handleSubmit}>
                    <div>
                        <label>Adicionar nova tarefa:</label>
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                        />
                    </div>
                    <button type='submit'>Adicionar</button>
                </form>
                <div className='divListTask'>
                    {
                        tasks.map((task, index) => (
                            <div key={index}>
                                <div className='listTask' >
                                    <div className='tittleTask'>
                                        <input className='check' type="checkbox" id={task._id} defaultChecked={task.check} onClick={check} />
                                        <p>{task.titulo}</p>
                                    </div>
                                    <div className='iconsTask'>
                                        <button className='btnEdit' onClick={handleEdit} id={task._id}>Editar</button>

                                        <button className='btnDelete' onClick={handleDelete} id={task._id}>Delete</button>
                                    </div>
                                </div>

                            </div>

                        ))
                    }
                </div>
                <div className='divLogout'>

                    <button className='btnlogout' onClick={logout} >Sair</button>
                </div>

            </div>


        </div>
    )
}
