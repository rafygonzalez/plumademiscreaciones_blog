import React from "react";
import Articles from "../components/ui/Articles";
import Layout from "../components/common/Layout";
import Seo from "../components/common/Seo";
import { fetchAPI } from "../lib/api";
import { Container, Text } from "@components/ui";
import FilterList from "@components/common/Filter";
import { Filter } from "@lib/filteredResults";
import { Searchbar } from "@components/common";

const Home = ({ articles, categories, homepage }: any) => {
  const articlesTopics = articles.reduce(
    (acc: any[], val: { topics: any[] }) => {
      val.topics.forEach((topic) => {
        const result = acc.find((t: { id: any }) => t.id == topic.id);
        if (!result) {
          acc.push({
            id: topic.id,
            label: topic.name,
            criteria: {
              value: topic.slug,
            },
          });
        }
      });
      return acc;
    },
    []
  );

  const articlesCategories = articles.reduce((acc: Filter[], val: any) => {
    const result = acc.find((t: { id: any }) => t.id == val.category.id);
    if (!result) {
      acc.push({
        id: val.category.id,
        label: val.category.name,
        criteria: {
          value: val.category.slug,
        },
      });
    }
    return acc;
  }, []);

  //console.log(articlesTopics, articlesCategories);
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      <Container>
        <section>
          <Text variant="pageHeading">{homepage.hero.title}</Text>
          <aside className="float-left">
              <div className="justify-center flex-1 hidden lg:flex">
                <Searchbar />
              </div>
              <div className="flex pb-4 lg:px-6 lg:hidden">
                <Searchbar id="mobile-search" />
              </div>
              <FilterList
                title="Tipos de contenido"
                name=""
                filters={articlesCategories}
              />
              <FilterList
                title="Filtrar por temas"
                name=""
                filters={articlesTopics}
              />
          </aside>
          <section>
            <Articles articles={articles} />
          </section>
        </section>
      </Container>
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
  console.log(articles)
  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  };
}

export default Home;
