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

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);

  return {
    // задължително име на ключа "paths"
    paths: ids?.map((id) => ({ params: { pid: id } })) || [],
    // [
    //   // задължително име на ключа "params"
    //   { params: { pid: "p1" } },
    //   // { params: { pid: "p2" } },
    //   // { params: { pid: "p3" } },
    // ],
    fallback: true,
  };
}

/**
 * По подразбиране Next НЕ генерира предварително страници, чиито имена на файовете са с квадратни скоби,
 * защото са динамични и няма как да знае колко точно трябва да генерира,
 * затова трябва да ползваме getStaticPaths.
 *
 * @ fallback: "blocking" - ако е "blocking" Next изчаква да се генерира цялата страница и чак тогава я показва на потребителя.
 * @ fallback: "true" - ако е "true" Next показва страницата на потребителя, докато се генерира.
 *    Ако е true трябва да добавим проверка дали props са заредили и ако не са - да покажем някакво съобщение или спинър, иначе апа гърми с undefined.
 */
