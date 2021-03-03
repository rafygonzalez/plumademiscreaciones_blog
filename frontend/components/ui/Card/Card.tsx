import React from "react";
import Link from "next/link";
import Image from "@components/ui/Image";
import s from "./Card.module.css";
import {Text} from '@components/ui'
const Card = ({ article }) => {
  return (
    <Link as={`/article/${article.slug}`} href="/article/[id]">
      <article className={s.root}>
        <div>
          <Image className='rounded-t-md object-fill' image={article.image} />
        </div>
        <div>
          <Text variant='articleSubtitle'>
          {article.category.name}
          </Text>
          <Text variant='articleHeading'>{article.title} </Text>
        </div>
      </article>
    </Link>
  );
};

export default Card;
