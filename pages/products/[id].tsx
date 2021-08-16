import { useRouter } from "next/dist/client/router";
import { FC, useEffect, useState } from "react";
import { getProduct } from "../../lib/product";
import { Layout } from "../../components/Layout";
import styles from "./[id].module.css";

import type { Product } from "../../lib/product";

const ProductPage: FC = () => {

  const router = useRouter();
  const id = router.query.id as string;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    getProduct(id).then((product) => setProduct(product));
  }, [id]);

  if (!product) return null;

  return (
    <Layout>
      <img className={styles.image} src={product.imageUrl} alt={`${product.name}の写真`} />
      <div className={styles.product}>
        <h2>{product.name}</h2>
        <p>{product.price}円</p>
        <p>{product.description}</p>
        <button className={styles.addCartBtn} >
          カートに追加する
        </button>
      </div>
    </Layout>
  );
};

export default ProductPage;
