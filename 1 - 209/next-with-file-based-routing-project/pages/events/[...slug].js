import useSWR from "swr";
import { useRouter } from "next/router";

import Button from "../../components/ui/button/button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import EventList from "../../components/events/event-list/event-list";
import ResultsTitle from "../../components/events/results-title/results-title";

// import { getFilteredEvents } from "../../helpers/api-util";

export default function FilteredEventsPage(props) {
  const router = useRouter();

  const filterData = router.query.slug;

  const { data: loadedEvents, error } = useSWR(
    "https://nextjs-course-c1612-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    (url) =>
      fetch(url).then((response) => {
        const data = response.json();

        const events = [];

        if (!data) {
          return events;
        }

        for (const key in data) {
          events.push({ id: key, ...data[key] });
        }

        return events;
      })
  );

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const numYear = +filterData[0];
  const numMonth = +filterData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents?.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

// getServerSideProps няма смисъл да се ползва с client-side fetching, тъй като тъй или иначе се извиква на всеки рефреш на страницата
// export async function getServerSideProps({ params }) {
//   const filterData = params.slug;
//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: { year: numYear, month: numMonth },
//     },
//   };
// }
