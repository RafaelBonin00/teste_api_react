import React, { useState } from "react";
import axios from "axios";

const Task = () => {
  const [id, setId] = useState(""); // Estado para armazenar o ID digitado
  const [peca, setPeca] = useState(null); // Estado para armazenar os dados retornados
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros

  const API_BASE_URL = `${process.env.REACT_APP_SUPABASE_URL}/task`; // Base da API
  const API_KEY = process.env.REACT_APP_SUPABASE_API_KEY; // Chave de API do Supabase

  // Função para buscar os dados
  const buscarPeca = () => {
    if (!id) {
      setError("Por favor, insira um ID.");
      return;
    }

    setLoading(true);
    setError(null);

    const url = `${API_BASE_URL}?id=eq.${id}`; // Montando a URL de busca

    axios
      .get(url, {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setPeca(response.data[0]);
        } else {
          setPeca(null);
          setError("Nenhum registro encontrado.");
        }
      })
      .catch(() => setError("Erro ao buscar os dados."))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h1>Pesquisar Registro</h1>

      <input
        type="text"
        placeholder="Digite o ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={buscarPeca}>Pesquisar</button>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {peca && (
        <div>
          <h2>Detalhes do Registro</h2>
          <p><strong>ID:</strong> {peca.id}</p>
          <p><strong>Data de Criação:</strong> {new Date(peca.created_at).toLocaleString()}</p>
          <p><strong>Descrição:</strong> {peca.description}</p>
          <p><strong>Status:</strong> {peca.status ? "Ativo" : "Inativo"}</p>
        </div>
      )}
    </div>
  );
};

export default Task;
