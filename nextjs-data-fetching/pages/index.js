import path from "path";
import fs from "fs/promises";

import Link from "next/link";

export default function HomePage({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // if (data.products.length === 0) {
  //   return { notFound: true }; // връща 404 страница
  // }

  // if (!data) {
  //   return {
  //     redirect: {
  //       // пренасочва потребителя на друга страница
  //       destination: "/no-data",
  //     },
  //   };
  // }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // в секунди
  };
}

/**
 * Next създава всичко в runtime, т.е. предварително и потребителя получава готова страница
 * В getStaticProps извършваме само server side неща като резултата от тях
 * Next подава на React компонента като props.
 * props се подава от Next към page component-а като props
 *
 * @revalidate ключа регенерира страницата на всеки 10 секунди. Ако потребителя я посети отново, но не са изминали тези 10 секунди не се регенерира. В development се регенерира постоянно!
 */
