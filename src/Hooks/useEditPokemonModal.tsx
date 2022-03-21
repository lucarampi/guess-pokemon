import { createContext, ReactNode, useContext, useState } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

interface EditPokemonModalContextData {
  handleOpenEditPokemonModal: () => void;
  handleCloseEditPokemonModal: () => void;
  isOpen: boolean;
}

const EditPokemonModalContext = createContext<EditPokemonModalContextData>(
  {} as EditPokemonModalContextData
);

export function EditPokemonModalProvider({ children }: ModalProviderProps) {
  //========== handle modal state ==========
  const [isOpen, setIsOpen] = useState(false);

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
