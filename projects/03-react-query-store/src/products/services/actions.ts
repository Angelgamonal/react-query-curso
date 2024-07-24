import { type Product, productsApi } from "..";

interface GetProductsOptions {
  filterKey?: string;
}

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  const params = new URLSearchParams();

  if (filterKey) {
    params.append("category", filterKey);
  }

  const { data } = await productsApi.get<Product[]>("/products", { params });

  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`);

  return data;
};
