import React, { useState } from "react";
import axios from "axios";

const Pecas = () => {
  const [codigo, setCodigo] = useState(""); // Estado para armazenar o código digitado
  const [peca, setPeca] = useState(null); // Estado para armazenar os dados da peça
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros

  const API_BASE_URL = `${process.env.REACT_APP_SUPABASE_URL}/pecas_mw`;
  const API_KEY = process.env.REACT_APP_SUPABASE_API_KEY;

  // Função para buscar os dados
  const buscarPeca = () => {
    if (!codigo) {
      setError("Por favor, insira um código.");
      return;
    }

    setLoading(true);
    setError(null);

    const url = `${API_BASE_URL}?Codigo=eq.${codigo}`;

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
          setError("Nenhuma peça encontrada.");
        }
      })
      .catch(() => setError("Erro ao buscar os dados."))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h1>Pesquisar Peça</h1>
      
      <input
        type="text"
        placeholder="Digite o código da peça"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <button onClick={buscarPeca}>Pesquisar</button>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {peca && (
        <div>
          <h2>Detalhes da Peça</h2>
          <p><strong>Código:</strong> {peca.Codigo}</p>
          <p><strong>Descrição:</strong> {peca.Descricao}</p>
          <p><strong>Departamento:</strong> {peca.Descricao_departamento}</p>
          <p><strong>Seção:</strong> {peca.Descricao_secao}</p>
          <p><strong>Marca:</strong> {peca.Marca}</p>
          <p><strong>Número Original:</strong> {peca.Numero_original}</p>
          <p><strong>Informações Técnicas:</strong> {peca.Informacoes_tecnicas}</p>
        </div>
      )}
    </div>
  );
};

export default Pecas;
