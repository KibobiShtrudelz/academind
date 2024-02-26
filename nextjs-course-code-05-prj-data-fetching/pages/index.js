import Head from "next/head";

import EventList from "../components/events/event-list";

import { getFeaturedEvents } from "../helpers/api-util";

export default function HomePage(props) {
  return <EventList items={props.events} />;
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    revalidate: 1800,
    props: { events: featuredEvents },
  };
}
