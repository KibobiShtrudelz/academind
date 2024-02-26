import Image from "next/image";

import DateIcon from "../icons/date-icon";
import LogisticsItem from "./logistics-item";
import AddressIcon from "../icons/address-icon";

import classes from "./event-logistics.module.css";

export default function EventLogistics({ date, address, image, imageAlt }) {
  const addressText = address.replace(", ", "\n");
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} width={400} height={400} />
      </div>

      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>

        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}
