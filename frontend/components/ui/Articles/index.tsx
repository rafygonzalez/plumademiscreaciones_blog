import React from "react";
import { Grid } from "..";
import Card from "../Card";

const Articles = ({ articles }) => {
  return (
    <div>
      <Grid layout="C">
        {articles.map((article, i) => {
          return (
            <div className='py-4 px-4'>
              <Card article={article} key={`article__left__${article.slug}`} />
            </div>
          );
        })}
      </Grid>
    </div>
  );
};

export default Articles;
