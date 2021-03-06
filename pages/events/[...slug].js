import { useRouter } from "next/router";
import { Fragment } from "react";

import { getFilteredEvents } from "../../helpers/api-util";
import EventsList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import Button from "../../components/ui/button";

export default function FilteredEventsPage(props) {
  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const { filteredEvents, date } = props;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filterDate = new Date(date.year, date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={filterDate} />
      <EventsList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return { props: { hasError: true } };
  }

  console.log(`debugging dino`);
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  console.log(filteredEvents);
  return {
    props: { filteredEvents, date: { year: numYear, month: numMonth } },
  };
}
