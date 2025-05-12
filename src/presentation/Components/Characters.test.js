import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Characters from "./Characters";

describe("Characters component", () => {
  const mockSetCharacters = jest.fn();
  const mockCharacters = [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      episode: ["ep1", "ep2"],
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Dead",
      species: "Human",
      episode: ["ep1"],
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    },
  ];

  beforeEach(() => {
    mockSetCharacters.mockClear();
  });

  test("renderiza personajes correctamente", () => {
    render(<Characters characters={mockCharacters} setCharacters={mockSetCharacters} />);

    expect(screen.getByText("Personajes")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(screen.getAllByText("Volver a la home").length).toBe(2);
    expect(screen.getByText("Alive")).toBeInTheDocument();
    expect(screen.getByText("Dead")).toBeInTheDocument();
    expect(screen.getAllByText("Episodios:").length).toBe(2);
    
  });

  test("hace reset de personajes al hacer clic en 'Volver a la home'", () => {
    render(<Characters characters={mockCharacters} setCharacters={mockSetCharacters} />);

    const backButtons = screen.getAllByText("Volver a la home");
    fireEvent.click(backButtons[0]);

    expect(mockSetCharacters).toHaveBeenCalledWith(null);
    expect(mockSetCharacters).toHaveBeenCalledTimes(1);
  });
});
