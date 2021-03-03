import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import { Searchbar } from '@components/common'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import DropdownMenu from '@components/ui/Dropdown'

const Navbar: FC = ({ categories }) => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset
      setHasScrolled(scrolled)
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const preparedCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
    as:`/category/${category.slug}`,
    href: "/category/[id]",
    slug: category.slug,
  }));

  return (
    <div className={cn(s.root, { 'shadow-magical': hasScrolled })}>
      <Container>
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center flex-1">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
            <nav className="hidden ml-6 space-x-4 lg:block">
            <DropdownMenu text="Tipos de post" links={preparedCategories}/>
            </nav>
          </div>
        </div>

      </Container>
    </div>
  )
}

export default Navbar