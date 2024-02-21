import { Fragment } from "react";

import { useRouter } from "next/router";

import EventList from "../../components/events/event-list/event-list";
import EventsSearch from "../../components/events/events-search/events-search";

import { getAllEvents } from "../../dummy-data";

export default function AllEventsPage() {
  const router = useRouter();

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />

      <EventList items={getAllEvents()} />
    </Fragment>
  );
}
