import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/noticias")
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="carregando">Carregando notícias...</p>;
  }

  return (
    <div className="container">
      <h1 className="titulo">Notícias dos Minnesota Vikings</h1>

      {noticias.length === 0 && <p className="sem-noticias">Nenhuma notícia encontrada.</p>}

      {noticias.map((noticia) => (
        <article className="noticia" key={noticia.id}>
          <h2>{noticia.titulo}</h2>
          <p>{noticia.descricao}</p>
          <p>
            <a href={noticia.url} target="_blank" rel="noopener noreferrer">
              Ler mais
            </a>
          </p>
          <small>
            Publicado em: {new Date(noticia.publicado_em).toLocaleString()}
          </small>
        </article>
      ))}
    </div>
  );
}

export default App;
