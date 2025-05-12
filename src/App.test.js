/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { GetAllRickAndMortyUseCase } from "./application/users/usecases/getall-rickandmorty.usecase";

// Mock del componente Characters
jest.mock("./presentation/Components/Characters", () => ({ characters, setCharacters }) => (
  <div data-testid="mock-characters">Mock Characters Component</div>
));

// Mock del caso de uso
jest.mock("./application/users/usecases/getall-rickandmorty.usecase");

describe("App component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia mocks entre tests
  });

  test("muestra el botón y la imagen al inicio", () => {
    render(<App />);

    expect(screen.getByText("Rick & Morty")).toBeInTheDocument();
    expect(screen.getByAltText("Rick & Morty")).toBeInTheDocument();
    expect(screen.getByText("Buscar personajes")).toBeInTheDocument();
  });

  test("llama al caso de uso y muestra Characters tras hacer clic en el botón", async () => {
    const mockResults = [{ id: 1, name: "Rick Sanchez" }];
    const mockExecute = jest.fn().mockResolvedValue(mockResults);

    // Simula instancia del use case
    GetAllRickAndMortyUseCase.mockImplementation(() => ({
      execute: mockExecute,
    }));

    render(<App />);

    const button = screen.getByText("Buscar personajes");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId("mock-characters")).toBeInTheDocument();
    });
  });
});
