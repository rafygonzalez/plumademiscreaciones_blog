import React from "react";
import Articles from "../components/ui/Articles";
import Layout from "../components/common/Layout";
import Seo from "../components/common/Seo";
import { fetchAPI } from "../lib/api";

const Home = ({ articles, categories, homepage }) => {
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      <div>
        <div>
          <h1>{homepage.hero.title}</h1>
          <Articles articles={articles} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage] = await Promise.all([
    fetchAPI("/articles?status=published"),
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
  ]);

  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  };
}

export default Home;
