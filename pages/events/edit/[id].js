import AddEvent from "@/components/events/AddEvent";
import Layout from "@/components/layout";
import { API_URL } from "@/config/index";
import parserCookie from "@/utils/cookie.helper";
import React from "react";

const EditPage = ({ event, token }) => {
  return (
    <Layout>
      <AddEvent event={event} token={token} />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const { req } = ctx;
  const { token } = parserCookie(req);

  const res = await fetch(`${API_URL}/events/${id}`);
  const event = await res.json();

  if (!token) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        event,
        token,
      },
    };
  }
}

export default EditPage;
