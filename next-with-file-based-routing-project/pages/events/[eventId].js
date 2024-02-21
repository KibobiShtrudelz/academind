import { Fragment } from "react";

import { useRouter } from "next/router";

import ErrorAlert from "../../components/ui/error-alert/error-alert";
import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";

import { getEventById } from "../../dummy-data";

export default function EventDetailPage() {
  const router = useRouter();

  const event = getEventById(router.query.eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary />

      <EventLogistics
        date={event.date}
        image={event.image}
        imageAlt={event.title}
        address={event.location}
      />

      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
