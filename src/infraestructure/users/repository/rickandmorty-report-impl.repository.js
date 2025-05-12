
export class RickAndMortyReportImplRepository {
  
    async getAll() {
        const api = await fetch("https://rickandmortyapi.com/api/character");
        const charactersApi = await api.json();
        return charactersApi.results;
    }
  
  }
  