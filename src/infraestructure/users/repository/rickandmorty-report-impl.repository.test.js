import { RickAndMortyReportImplRepository } from "./rickandmorty-report-impl.repository";

describe("RickAndMortyReportImplRepository", () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // mock global
  });

  afterEach(() => {
    jest.resetAllMocks(); // limpiar mocks
  });

  test("getAll debe retornar los personajes desde la API", async () => {
    const mockCharacters = [
      { id: 1, name: "Rick" },
      { id: 2, name: "Morty" },
    ];

    // Mock de la respuesta fetch
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: mockCharacters }),
    });

    const repo = new RickAndMortyReportImplRepository();
    const result = await repo.getAll();

    expect(fetch).toHaveBeenCalledWith("https://rickandmortyapi.com/api/character");
    expect(result).toEqual(mockCharacters);
  });
});
