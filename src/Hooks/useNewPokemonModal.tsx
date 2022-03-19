import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

interface ModalProviderProps {
  children: ReactNode;
}

interface NewPokemonModalContextData {
  handleOpenNewPokemonModal: () => void;
  handleCloseNewPokemonModal: () => void;
  isOpen: boolean;
}

const NewPokemonModalContext = createContext<NewPokemonModalContextData>(
  {} as NewPokemonModalContextData
);

export function NewPokemonModalProvider({ children }: ModalProviderProps) {

  //handle modal state
  const [isOpen, setIsOpen] =
    useState(false);

  function handleOpenNewPokemonModal() {
    setIsOpen(true);
  }
  function handleCloseNewPokemonModal() {
    setIsOpen(false);
  }

  return (
    <NewPokemonModalContext.Provider
      value={{
        handleOpenNewPokemonModal,
        handleCloseNewPokemonModal,
        isOpen,
      }}
    >
      {children}
    </NewPokemonModalContext.Provider>
  );
}

export function useNewPokemonModal() {
  const context = useContext(NewPokemonModalContext);
  if (!context) {
    throw new Error(
      "useNewPokemonModal must be used within a NewPokemonModalProvider"
    );
  }
  return context;
}
