import { createContext, ReactNode, useContext, useState } from "react";
import { PokemonInterface } from "./../services/axios";

interface ModalProviderProps {
  children: ReactNode;
}

interface EditPokemonModalContextData {
  handleOpenEditPokemonModal: () => void;
  handleCloseEditPokemonModal: () => void;
  handleEditPokemonModal: () => void;
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
  const [editingPokemon, setEditingPokemon] = useState({} as PokemonInterface);

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
