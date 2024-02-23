import EventList from "../components/events/event-list/event-list";

import { getFeaturedEvents } from "../helpers/api-util";

export default function HomePage(props) {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      events: await getFeaturedEvents(),
    },
    revalidate: 1800,
  };
}
