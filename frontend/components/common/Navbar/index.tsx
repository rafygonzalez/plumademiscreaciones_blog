import React from "react";
import Link from "next/link";

const Nav = ({ categories }) => {
  return (
    <div>
      <nav  data-uk-navbar>
        <div>
          <ul>
            <li>
              <Link href="/">
                <a>Pluma de mis creaciones | Blog</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <Link as={`/category/${category.slug}`} href="/category/[id]">
                    <a>{category.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
