import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { Header } from "../components/Header";
import { EditPokemonModalProvider } from "../Hooks/useEditPokemonModal";
import { NewPokemonModalProvider } from "../Hooks/useNewPokemonModal";
import { PokemonsProvider } from "../Hooks/usePokemons";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <PokemonsProvider>
        <NewPokemonModalProvider>
          <Header />
          <EditPokemonModalProvider>
            <Component {...pageProps} />
          </EditPokemonModalProvider>
        </NewPokemonModalProvider>
      </PokemonsProvider>
    </>
  );
}
export default MyApp;
