import imageRickMorty from "./img/rick-morty.png";

import "./App.css";
import { useState } from "react";
import Characters from "./presentation/Components/Characters";
import { GetAllRickAndMortyUseCase } from "./application/users/usecases/getall-rickandmorty.usecase"; 

function App() {
  const [characters, setCharacters] = useState(null);

  const reqApi = async () => {
    const api = new GetAllRickAndMortyUseCase();
    const results = await api.execute();
    setCharacters(results);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Rick & Morty </h1>
        {characters ? (
          <Characters characters={characters} setCharacters={setCharacters} />
        ) : (
          <>
            <img src={imageRickMorty} alt="Rick & Morty" className="img-home" />
            <button onClick={reqApi} className="btn-search">
              Buscar personajes
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
