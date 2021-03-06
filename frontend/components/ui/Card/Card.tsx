import React from "react";
import Link from "next/link";
import Image from "@components/ui/Image";
import s from "./Card.module.css";
import {Text} from '@components/ui'
const Card = ({ image, title, category, slug}) => {
  return (
    <Link as={`/article/${slug}`} href="/article/[id]">
      <article className={s.root}>
        <div>
          <Image className='rounded-t-md object-fill' image={image} />
        </div>
        <div>
          <Text variant='articleSubtitle'>
          {category.name}
          </Text>
          <Text variant='articleHeading'>{title} </Text>
        </div>
      </article>
    </Link>
  );
};

export default Card;
