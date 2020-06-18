import React, { useState, useEffect } from "react";
import { Form } from '@unform/web'
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md'

import api from './services/api'

import Input from './components/Form/Input'
import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository(data) {
    const newRepository = await api.post('/repositories', {
      title: `${data.repository}`,
    })

    if(newRepository.data.title == ''){
      alert('Digite um repositório')
      return
    }

    setRepositories([...repositories, newRepository.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const newRepository = repositories.filter(repository => {
      if(repository.id != id) { return repository }
    })

    setRepositories(newRepository)
  }

  return (
    <div>
      <h1>Desafio: Conceitos do ReactJS</h1>
      <ul data-testid="repository-list">
        { 
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                  <MdRemoveCircleOutline /> Remover
              </button>
            </li>
          ))
        }
      </ul>
      <Form onSubmit={handleAddRepository}>
        <Input 
          name="repository" 
          type="text" 
          id="repo" 
          placeholder="Digite um repositório"
        />
        <button type="submit" > <MdAddCircleOutline /> Adicionar</button>
      </Form>
    </div>
  );
}

export default App;