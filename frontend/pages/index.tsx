import React, { useState } from "react";
import Articles from "../components/ui/Articles";
import Layout from "../components/common/Layout";
import Seo from "../components/common/Seo";
import { Container, Text } from "@components/ui";
import FilterList from "@components/common/Filter";
import { Searchbar } from "@components/common";
import { gql } from "@apollo/react-hooks";
import { fetchAPI } from "@lib/api";
import { getStandaloneApolloClient } from "@lib/apollo/apolloClient";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Pagination from "@components/ui/Pagination";

const GET_ARTICLES = gql`
  query articles($limit: Int, $start: Int, $where: JSON) {
    articles(limit: $limit, start: $start, where: $where) {
      id
      slug
      image {
        url
      }
      title
      category {
        slug
        name
      }
      topics {
        slug
        name
      }
    }
  }
`;

const GET_ARTICLES_COUNT = gql`
  query articlesConnection($where: JSON) {
    articlesConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const GET_CATEGORIES = gql`
  query categories {
    categories {
      id
      slug
      name
    }
  }
`;

interface InitialFilters {
  contentType: string[];
  topics: string[];
}

const limit = 6;

const Home: NextPage<any> = ({
  categories,
  homepage,
  articles,
  articlesCount,
  page,
  contentType,
  topics,
}) => {
  const router = useRouter();
  const { query } = router;
  const lastPage = Math.ceil(articlesCount / limit);
  const [filters, setFilters] = useState<InitialFilters>({
    contentType: contentType === "all" ? [] : contentType.split(","),
    topics: topics === "all" ? [] : topics.split(","),
  });
  const articlesCategories = categories.map((category: any) => ({
    id: category.id,
    label: category.name,
    criteria: {
      value: category.slug,
    },
  }));

  const deleteRouteParam = (query: ParsedUrlQuery, key: string) => {
    let returnedTarget = Object.assign({}, query);
    delete returnedTarget[key];
    return returnedTarget;
  };
  const handlePagination = (d: "prev" | "next") => {
    if (d === "prev")
      router.push({
        query: {
          ...query,
          page: page - 1,
        },
      });
    else if (d === "next")
      router.push({
        query: {
          ...query,
          page: page + 1,
        },
      });
  };
  const handleFilters = (
    event: React.ChangeEvent<HTMLInputElement>,
    filterName: "contentType" | "topics"
  ) => {
    let q: ParsedUrlQuery = query;
    //
    const findex = filters[filterName].findIndex(
      (v) => v === event.target.value
    );
    const cpyArr = [...filters[filterName]];
    if (findex >= 0) cpyArr.splice(findex, 1);
    else cpyArr.push(event.target.value);
    //
    if (!cpyArr.length) {
      q = deleteRouteParam(query, filterName);
    } else {
      q[filterName] = cpyArr.join(",");
    }
    q.page = String(1);
    router.push({
      query: q,
    });
    setFilters((filters) => {
      return {
        ...filters,
        [filterName]: cpyArr,
      };
    });
  };
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      <Container>
        <section>
          <Text variant="pageHeading">{homepage.hero.title}</Text>
          <aside className="md:float-left">
            <div className="justify-center flex-1 hidden lg:flex">
              <Searchbar />
            </div>
            <div className="flex pb-4 lg:px-6 lg:hidden">
              <Searchbar id="mobile-search" />
            </div>
            <FilterList
              id="tipos-de-contenido"
              selectedFilters={filters.contentType}
              onChange={(event) => {
                handleFilters(event, "contentType");
              }}
              title="Tipos de contenido"
              filters={articlesCategories}
            />
          </aside>
          <section>
            <Articles articles={articles} />
            <Pagination
              handlePagination={handlePagination}
              currentPage={page}
              pages={lastPage}
            />
          </section>
        </section>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 1, contentType = "all", topics = "all" },
}) => {
  const apolloClient = getStandaloneApolloClient();
  
  const start = +page === 1 ? 0 : (+page - 1) * limit;

  const getArticles = async () => {
    let variables: any = {
      limit,
      start,
      where: {
        status: "published",
      },
    };
    if (contentType !== "all") {
      variables = {
        ...variables,
        where: {
          ...variables.where,
          category: {
            slug_contains: contentType.split(","),
          },
        },
      };
    }
    if (topics !== "all") {
      variables = {
        ...variables,
        where: {
          ...variables.where,
          topics: {
            slug_contains: topics.split(","),
          },
        },
      };
    }
    const {
      data: { articles },
    } = await apolloClient.query({
      query: GET_ARTICLES,
      variables,
    });
    const {
      data: {
        articlesConnection: {
          aggregate: { count },
        },
      },
    } = await apolloClient.query({
      query: GET_ARTICLES_COUNT,
      variables,
    });

    return {
      articles,
      articlesCount: count,
    };
  };

  const [
    { articles, articlesCount },
    {
      data: { categories },
    },
    homepage,
  ] = await Promise.all([
    getArticles(),
    apolloClient.query({
      query: GET_CATEGORIES,
    }),
    fetchAPI("/homepage"),
  ]);

  return {
    props: {
      homepage,
      articles,
      articlesCount,
      categories,
      contentType,
      topics,
      page: +page,
    },
  };
};
export default Home;
