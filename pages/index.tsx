import type { NextPage } from "next";

import Layout from "@components/Layout";
import withNavBar from "@hocs/withNavBar";

const Home: NextPage = () => {
  return (
    <Layout>
      <div
        style={{
          width: "90%",
          margin: "0 auto",
        }}
      >
        <h1>Index Page</h1>
      </div>
    </Layout>
  );
};

export default withNavBar(Home);
