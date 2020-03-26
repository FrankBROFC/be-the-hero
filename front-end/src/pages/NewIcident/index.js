import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../server/api';
import logoImg from '../../images/logo.svg';
import './style.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleCadastro(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            price
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar!');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descrevar o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleCadastro}>
                    <input 
                        placeholder="Titulo do caso"
                        value = {title}
                        onChange = {e => setTitle(e.target.value)}
                     />
                    <textarea
                        placeholder="Descrição"
                        value = {description}
                        onChange = {e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais" 
                        value = {price}
                        onChange = {e => setPrice(e.target.value)}
                    />
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}