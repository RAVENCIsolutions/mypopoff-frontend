"use client";

const NavBar = () => {
  return (
    <nav className="py-10 px-5 md:px-14 flex flex-row justify-between w-full max-w-windowed">
      {/*<DarkModeToggle />*/}
      <ul>
        <li>Explore</li>
      </ul>

      <p className="text-lg text-primary-dark dark:text-primary-light font-bold font-display">
        My Pop Off
      </p>

      <ul className="flex flex-row items-center gap-2">
        <li>Login</li>
        <li>
          <button className="py-2 px-4 bg-action rounded-full font-medium text-primary-light dark:text-primary-dark">
            Free Account
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
