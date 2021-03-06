import React from "react";
import { Grid } from "..";
import Card from "../Card";

const Articles = ({ articles }) => {
  return (
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 px-4'>
        {articles.map((article) => {
          return (
                <Card
                  key={article.slug}
                  {...article}
                />
          );
        })}
      </div>
  );
};

export default Articles;
