import { useRouter } from "next/dist/client/router";
import { FC, useEffect, useState } from "react";
import { getProduct } from "../../lib/product";
import { Layout } from "../../components/Layout";
// import styles from "../index.module.css";

import type { Product } from "../../lib/product";

const ProductPage: FC = () => {

  const router = useRouter();
  // const id = router.query.id ? String(router.query.id) : null;
  const id = router.query.id as string;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    getProduct(id).then((product) => setProduct(product));
  }, [id]);

  if (!product) return null;

  return (
    <Layout>
      <h1>{product?.name}</h1>
    </Layout>
  );
};

export default ProductPage;
