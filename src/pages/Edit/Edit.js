import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Api } from '../../Api/Api';

export const Edit = () => {
    const id = useParams().id

    const navigate = useNavigate()

    const [task, setTask] = useState('');

    useEffect(() => {
        const loadProduct = async () => {
            const response = await Api.buildApiGetRequest(
                Api.readByIdUrl(id),
                true
            );

            const results = await response.json();

            console.log(results);
            setTask(results);
        };

        loadProduct();
    }, [id]);

    const handleSubmit = async (event) => {
        console.log('oi');

        event.preventDefault();

        const titulo = event.target.titulo.value;
        const payload = {
            titulo
        }

        const response = await Api.buildApiPatchRequest(
            Api.updateUrl(id),
            payload,
            true
        );
        // const body = await response.json();

        if (response.status === 200) {
            // Product updated successfully

            navigate('/todolist')



        } else {
            // Error
        }
    }

    console.log(task.titulo);

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <h1 className="form__label" htmlFor="name">
                        Titulo:
                    </h1>
                </div>

                <div>
                    <input
                        className="form__input-text"
                        type="text"
                        id="titulo"
                        name="titulo"
                        defaultValue={task.titulo}
                    />
                </div>

                <div>
                    <button className='btnlogout' type='submit'>Salvar</button>
                    <button className='btnlogout' onClick={() => navigate('/todolist')}>Voltar</button>
                </div>
            </form>
        </div>
    )
}
