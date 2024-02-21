import path from "path";
import fs from "fs/promises";

import { Fragment } from "react";

export default function ProductDetailPage({ loadedProduct }) {
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>

      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      loadedProduct: data.products.find((product) => product.id === productId),
    },
  };
}

export async function getStaticPaths() {
  return {
    // задължително име на ключа "paths"
    paths: [
      // задължително име на ключа "params"
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
}

/**
 * По подразбиране Next НЕ генерира предварително страници, чиито имена на файовете са с квадратни скоби,
 * защото са динамични и няма как да знае колко точно трябва да генерира,
 * затова трябва да ползваме getStaticPaths.
 */
