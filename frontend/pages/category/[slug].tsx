import Articles from "../../components/ui/Articles";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/common/Layout";
import Seo from "../../components/common/Seo";

const Category = ({ category, categories }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  };

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div>
        <div>
          <h1>{category.name}</h1>
          <Articles articles={category.articles} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const categories = await fetchAPI("/categories");

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = (await fetchAPI(`/categories?slug=${params.slug}`))[0];
  const categories = await fetchAPI("/categories");

  return {
    props: { category, categories },
    revalidate: 1,
  };
}

export default Category;
