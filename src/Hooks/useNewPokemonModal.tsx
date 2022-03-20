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
  open: boolean;
}

const NewPokemonModalContext = createContext<NewPokemonModalContextData>(
  {} as NewPokemonModalContextData
);

export function NewPokemonModalProvider({ children }: ModalProviderProps) {

  //handle modal state
  const [open, setOpen] =
    useState(false);

  function handleOpenNewPokemonModal() {
    setOpen(!open);
  }
  function handleCloseNewPokemonModal() {
    setOpen(false);
  }

  return (
    <NewPokemonModalContext.Provider
      value={{
        handleOpenNewPokemonModal,
        handleCloseNewPokemonModal,
        open: open,
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
