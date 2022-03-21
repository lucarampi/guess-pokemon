import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { EditPokemonModalProvider } from "../Hooks/useEditPokemonModal";
import { NewPokemonModalProvider } from "../Hooks/useNewPokemonModal";
import { PokemonsProvider } from "../Hooks/usePokemons";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>

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
