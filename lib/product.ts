import { graphqlRequest } from "./graphqlClient";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

const listProductsQuery = `
  query listProducts {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

export async function listProducts(): Promise<Product[]> {
  const data = await graphqlRequest({ query: listProductsQuery });
  return data.products;
}

const getProductQuery = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

export async function getProduct(id: string): Promise<Product | null> {
  const data = await graphqlRequest({ query: getProductQuery, variables: { id: id } });
  return data.product;
}
