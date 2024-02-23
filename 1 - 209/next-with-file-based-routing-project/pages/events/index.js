import { useRouter } from "next/router";

import EventList from "../../components/events/event-list/event-list";
import EventsSearch from "../../components/events/events-search/events-search";

import { getAllEvents } from "../../helpers/api-util";

export default function AllEventsPage(props) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />

      <EventList items={props.events} />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { events: await getAllEvents() },
    revalidate: 60,
  };
}
