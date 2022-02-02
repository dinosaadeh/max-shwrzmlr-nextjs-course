import styles from "../styles/Home.module.css";
// import { getFeaturedEvents } from "../dummy-data";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

export default function Home(props) {
  //const featuredEvents = getFeaturedEvents();

  return (
    <div className={styles.container}>
      <NewsletterRegistration />
      <EventList items={props.featuredEvents} />
    </div>
  );
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}
