import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useProduct } from "../hooks/useProduct";
import { ProductCard } from "../components/ProductCard";

export const ProductById = () => {
  const { id } = useParams();

  const { isLoading, product } = useProduct({ id: Number(id) });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto</h1>

      {isLoading && <p>Cargando...</p>}

      {product && <ProductCard product={product} fullDescription />}
    </div>
  );
};
