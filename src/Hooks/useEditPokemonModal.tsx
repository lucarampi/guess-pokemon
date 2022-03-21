import { createContext, ReactNode, useContext, useState } from "react";
import { PokemonInterface } from "./../services/axios";

interface ModalProviderProps {
  children: ReactNode;
}

interface EditPokemonModalContextData {
  handleOpenEditPokemonModal: () => void;
  handleCloseEditPokemonModal: () => void;
  handleResetEditPokemonModal: () => void;
  isOpen: boolean;
  setEditingPokemon: (pokemon: PokemonInterface) => void;
  editingPokemon: PokemonInterface;
}

const EditPokemonModalContext = createContext<EditPokemonModalContextData>(
  {} as EditPokemonModalContextData
);

export function EditPokemonModalProvider({ children }: ModalProviderProps) {
  //========== handle modal state ==========
  const [isOpen, setIsOpen] = useState(false);
  const defaultPokemon = () => {
    return {
      height: 0,
      weight: 0,
      id: 0,
      imageUrl: "",
      name: "",
      types: {
        type1: "",
        type2: "",
      },
    } as PokemonInterface
  };
  const [editingPokemon, setEditingPokemon] = useState(defaultPokemon);
  function handleResetEditPokemonModal() {
    setEditingPokemon(defaultPokemon);
  }

  function handleOpenEditPokemonModal() {
    setIsOpen(true);
  }
  function handleCloseEditPokemonModal() {
    setIsOpen(false);
  }
  //========================================

  return (
    <EditPokemonModalContext.Provider
      value={{
        handleOpenEditPokemonModal,
        handleCloseEditPokemonModal,
        isOpen,
        setEditingPokemon,
        editingPokemon,
        handleResetEditPokemonModal,
      }}
    >
      {children}
    </EditPokemonModalContext.Provider>
  );
}

export function useEditPokemonModal() {
  const context = useContext(EditPokemonModalContext);
  if (!context) {
    throw new Error(
      "useNEditPokemonModal must be used within a EditPokemonModalProvider"
    );
  }
  return context;
}
