import Link from 'next/link';
import { DarkMode, LightMode, Menu } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
      setIsDarkTheme(true);
    } else if (storedTheme === 'light') {
      setIsDarkTheme(false);
    } else {
      const userPreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDarkTheme(userPreference);
      localStorage.setItem('theme', userPreference ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem('theme', isDarkTheme ? 'light' : 'dark');
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleNavLinkClick = () => {
    setShowMenu(false);
  };

  return (
    <nav>
      <div className="logo">EventPassify</div>
      <div className="menu">
        <div className="nav-links">
          <Link
            className={router.pathname === '/' ? 'active' : ''}
            href="/"
          >
            Home
          </Link>
          <Link
            className={router.pathname === '/concerts' ? 'active' : ''}
            href="/concerts"
          >
            Concerts
          </Link>
          <Link
            className={router.pathname === 'theaters' ? 'active' : ''}
            href="/theaters"
          >
            Theaters
          </Link>
          <Link
            className={router.pathname === '/sports' ? 'active' : ''}
            href="/sports"
          >
            Sports
          </Link>
        </div>
        <button
          className="dark-light-btn"
          onClick={() => toggleTheme()}
        >
          {isDarkTheme ? <DarkMode /> : <LightMode />}
        </button>
        <button
          className="mobile-menu-btn"
          onClick={() => handleMenuClick()}
        >
          <Menu />
        </button>
        {showMenu && (
          <div className="mobile-links">
            <Link
              className={router.pathname === '/' ? 'active' : ''}
              href="/"
            >
              Home
            </Link>
            <Link
              className={router.pathname === '/concerts' ? 'active' : ''}
              href="/concerts"
            >
              Concerts
            </Link>
            <Link
              className={router.pathname === 'theaters' ? 'active' : ''}
              href="/theaters"
            >
              Theaters
            </Link>
            <Link
              className={router.pathname === '/sports' ? 'active' : ''}
              href="/sports"
            >
              Sports
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
