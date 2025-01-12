import { useEffect, useState } from 'react';
import classes from './navbar.module.css';
import Link from 'next/link';
import { Button } from '@mantine/core';
import classNames from 'classnames';

type Link = {
  title: string, href: string;
}

const linksMockdata: Link[] = [
  { title: 'Home', href: "/" },
  { title: 'Portraits', href: "/portraits" },
  { title: 'Street photography', href: "/street-photography" },
  { title: 'Booking a shoot', href: "/booking-a-shoot" },
  { title: 'Safety', href: "/safety" },
  { title: 'Contact', href: "/contact" },
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState<string | undefined>();
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    if (!activeLink) {
      setActiveLink(linksMockdata.find(({ href }) => href === window.location.pathname)?.title);
    }
  }, [setActiveLink, activeLink])

  const links = linksMockdata.map(({ href, title }) => (
    <Link
      className={classes.link}
      data-active={activeLink === title || undefined}
      href={href}
      onClick={() => {
        setActiveLink(title);
      }}
      key={title}
    >
      <span className={classes.innerLink}>{title}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classNames(classes.main, {[classes.show]: show})}>
        {links}
      </div>
      <div className={classes.forMobile}>
        <Button variant="transparent" size="compact-lg" onClick={toggleShow}>
          <svg className={classes.burger} focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path></svg>
        </Button>
      </div>
    </nav>
  );
}