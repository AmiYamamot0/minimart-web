import { useRouter } from "next/dist/client/router";
import { FC, useEffect, useState } from "react";
import { getProduct } from "../../lib/product";
import { Layout } from "../../components/Layout";
// import { addToCart, usecartItemCount, updateCartItemCount } from "../../lib/cart"
import styles from "./[id].module.css";

import type { Product } from "../../lib/product";

const ProductPage: FC = () => {

  const router = useRouter();
  const id = router.query.id as string;
  const [product, setProduct] = useState<Product | null>(null);

  const STORAGE_KEY = "storagekey";

  // カートに追加するデータの型
  type CartItem = {
    product: Product; // 商品
    quantity: number; // 個数
  };

  useEffect(() => {
    if (!id) return;
    getProduct(id).then((product) => setProduct(product));
  }, [id]);

  if (!product) return null;

  // カートに追加
  const addToCart = (product: Product): void => {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) as string);
    const item = cartItems.find((item) => item.product.id === product.id);

    if (item) {
      item.quantity++;
    } else {
      cartItems.push({ product, quantity: 1 });
    }
  
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  };

  return (
    <Layout>
      <img className={styles.image} src={product.imageUrl} alt={`${product.name}の写真`} />
      <div className={styles.product}>
        <h2>{product.name}</h2>
        <p>{product.price}円</p>
        <p>{product.description}</p>
        <button className={styles.addCartBtn} onClick={() => addToCart(product)}>
          カートに追加する
        </button>
      </div>
    </Layout>
  );
};

export default ProductPage;
