import Link from "next/link";
import { useRouter } from "next/router";

const Nav = props => {
  const route = useRouter();

  const links = [
    {
      name: "Todos",
      path: "/todos"
    },
    {
      name: "Create Folder",
      path: "/folder/create"
    },
    {
      name: "Create Todo",
      path: "/todo/create"
    }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">Navbar</a>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {links.map((l, i) => (
            <li
              key={i}
              className={`nav-item ${
                l.path === route.pathname ? "active" : ""
              }`}
            >
              <Link href={l.path}>
                <a className="nav-link">{l.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
