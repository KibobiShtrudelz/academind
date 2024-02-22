import { useState, useEffect } from "react";
import useSWR from "swr";

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  const { error, isLoading } = useSWR(
    "https://nextjs-course-c1612-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();

      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          volume: data[key].volume,
          username: data[key].username,
        });
      }

      setSales(transformedSales);
    }
  );

  useEffect(() => {
    if (props.sales) {
      setSales(props.sales);
    }
  }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales || sales.length === 0) {
    return <p>No sales data yet</p>;
  }

  return (
    <div>
      <h1>Last Sales</h1>

      <ul>
        {sales?.map((sale) => (
          <li key={sale.id}>
            {sale.username} - ${sale.volume}
          </li>
        ))}
      </ul>
    </div>
  );
}
