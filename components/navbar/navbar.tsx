import { useEffect, useState } from 'react';
import classes from './navbar.module.css';
import Link from 'next/link';

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

  useEffect(() => {
    if (!activeLink) {
      setActiveLink(linksMockdata.find(({ href }) => href === window.location.pathname)?.title);
    }
  })

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
      <div className={classes.main}>
        {links}
      </div>
    </nav>
  );
}