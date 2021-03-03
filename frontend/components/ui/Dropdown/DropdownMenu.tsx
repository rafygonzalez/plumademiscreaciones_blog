import cn from 'classnames'
import Link from 'next/link'
import { FC, useRef, useState, useEffect } from 'react'
//import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import s from './DropdownMenu.module.css'
//import { Moon, Sun } from '@components/icons'
import ClickOutside from '@lib/click-outside'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

type Links = {
  name: string;
  href: string;
  as: string;
}

interface DropdownMenuProps {
  open?: boolean
  text: string
  links: Links[]
}


const DropdownMenu: FC<DropdownMenuProps> = ({ open = false, text, links }) => {
  const { pathname } = useRouter()
 // const { theme, setTheme } = useTheme()
  const [display, setDisplay] = useState(false)
  const ref = useRef() as React.MutableRefObject<HTMLUListElement>

  useEffect(() => {
    if (ref.current) {
      if (display) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [display])

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div>
        <button
          className={s.avatarButton}
          onClick={() => setDisplay(!display)}
          aria-label="Menu"
        >
          {text}
        </button>
        {display && (
          <ul className={s.dropdownMenu} ref={ref}>
            {links.map(({ name, href, as, id }) => (
              <li key={id}>
                  <Link as={as} href={href}>
                    <a
                      className={cn(s.link, {
                        [s.active]: pathname === href,
                      })}
                      onClick={() => {
                        setDisplay(false)
                      }}
                    >
                      {name}
                    </a>
                  </Link>
              </li>
            ))}

          </ul>
        )}
      </div>
    </ClickOutside>
  )
}
/*
            <li>
              <a
                className={cn(s.link, 'justify-between')}
                onClick={() => {
                  theme === 'dark' ? setTheme('light') : setTheme('dark')
                 setDisplay(false)
                }}
              >
                <div>
                  Theme: <strong>{theme}</strong>{' '}
                </div>
                <div className="ml-3">
                  {theme == 'dark' ? (
                    <Moon width={20} height={20} />
                  ) : (
                    <Sun width="20" height={20} />
                  )}
                </div>
              </a>
            </li>
            
            */

export default DropdownMenu