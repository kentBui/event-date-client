import EventList from "@/components/events/EventList";
import Layout from "@/components/layout";
import { API_URL } from "@/config/index";
import React from "react";
import Link from "next/link";
import QueryString from "qs";
import { useRouter } from "next/router";

const SearchPage = ({ events }) => {
  const router = useRouter();
  const { term } = router.query;

  return (
    <Layout title="Search Page">
      <h1>Searching Events for {term}</h1>
      <Link href="/">
        <a>Go back</a>
      </Link>
      <EventList events={events} />
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
};

export default SearchPage;

export async function getServerSideProps(ctx) {
  const { term } = ctx.query;
  const query = QueryString.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  console.log(query);
  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}
