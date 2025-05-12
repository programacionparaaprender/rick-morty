import { GetAllRickAndMortyUseCase } from "./getall-rickandmorty.usecase";
import { RickAndMortyReportImplRepository } from "../../../infraestructure/users/repository/rickandmorty-report-impl.repository";

// Mock del repositorio
jest.mock("../../../infraestructure/users/repository/rickandmorty-report-impl.repository");

describe("GetAllRickAndMortyUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe llamar a RickAndMortyReportImplRepository.getAll y retornar los resultados", async () => {
    const mockCharacters = [{ id: 1, name: "Rick" }, { id: 2, name: "Morty" }];
    const mockGetAll = jest.fn().mockResolvedValue(mockCharacters);

    // Mock de la instancia y método getAll
    RickAndMortyReportImplRepository.mockImplementation(() => ({
      getAll: mockGetAll,
    }));

    const useCase = new GetAllRickAndMortyUseCase();
    const result = await useCase.execute();

    expect(mockGetAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCharacters);
  });
});
