import Dashboard from "@/components/admin/dashboard";
import Layout from "@/components/layout";
import { API_URL } from "@/config/index";
import parserCookie from "@/utils/cookie.helper";
import React from "react";

const DashboardPage = ({ events, token }) => {
  return (
    <Layout>
      <Dashboard events={events} token={token} />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parserCookie(ctx.req);

  if (!token) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const events = await res.json();
  if (res.ok) {
    return {
      props: { events, token },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default DashboardPage;
