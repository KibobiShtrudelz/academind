import Head from "next/head";

import EventList from "../components/events/event-list";

import { getFeaturedEvents } from "../helpers/api-util";

export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>

        <description>
          Find a lot of great events that allow you to evolve...
        </description>
      </Head>

      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    revalidate: 1800,
    props: { events: featuredEvents },
  };
}
