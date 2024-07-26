import { type Product, productsApi } from "..";
import { CreateProduct } from "../interfaces/product";

interface GetProductsOptions {
  filterKey?: string;
}

// const sleep = (seconds: number = 1): Promise<boolean> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, 1000 * seconds);
//   });
// };

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

export const createProduct = async (product: CreateProduct) => {
  // await sleep(2);

  const { data } = await productsApi.post<Product>("/products", product);

  return data;
};
