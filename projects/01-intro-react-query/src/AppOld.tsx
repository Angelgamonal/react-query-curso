import { useEffect, useReducer, useState } from "react";
import "./App.css";
import { getRandomNumberFromApi } from "./services/getRandomNumber";

export const AppOld = () => {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceRefetch] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setIsLoading(true);
    getRandomNumberFromApi()
      .then(setNumber)
      .catch((error) => setError(error.message));
  }, [key]);

  useEffect(() => {
    if (number) setIsLoading(false);
  }, [number]);

  useEffect(() => {
    if (error) setIsLoading(false);
  }, [error]);

  return (
    <div>
      {isLoading ? <h2>Cargando...</h2> : <h2>Número aleatorio: {number} </h2>}

      {!isLoading && error && <h3>{error}</h3>}

      <button onClick={forceRefetch} disabled={isLoading}>
        {isLoading ? "..." : "Nuevo número"}
      </button>
    </div>
  );
};
