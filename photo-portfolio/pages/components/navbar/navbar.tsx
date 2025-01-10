import { useState } from 'react';
import classes from './navbar.module.css';

const linksMockdata = [
  'Home',
  'Portraits',
  'Street photography',
  'Booking a shoot',
  'Contact',
];

export function Navbar() {
  const [activeLink, setActiveLink] = useState('Home');

  const links = linksMockdata.map((link) => (
    <a
      className={classes.link}
      data-active={activeLink === link || undefined}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      <span className={classes.innerLink}>{link}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.main}>
        {links}
      </div>
    </nav>
  );
}