import { useQuery } from "react-query";
import "./App.css";
import { getRandomNumberFromApi } from "./services/getRandomNumber";

function App() {
  const {
    isLoading,
    isError,
    error,
    data: number,
    isFetching,
    refetch,
  } = useQuery(["randomApi"], () => getRandomNumberFromApi());

  return (
    <>
      <div>
        {isLoading ? (
          <h2>Cargando...</h2>
        ) : (
          <h2>Número aleatorio: {number} </h2>
        )}

        {!isFetching && isError && <h3>{String(error)}</h3>}

        <button onClick={() => refetch()} disabled={isLoading}>
          {isFetching ? "..." : "Nuevo número"}
        </button>
      </div>
    </>
  );
}

export default App;
