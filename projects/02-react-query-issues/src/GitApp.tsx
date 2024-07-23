import { FC, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";

enum Url {
  LIST = "/issues/list",
  INFINITE = "/issues/list-infinite",
}

export const GitApp: FC = () => {
  const [url, setUrl] = useState<Url>();

  const { pathname } = useLocation();

  useEffect(() => {
    setUrl(pathname as Url);
  }, []);

  return (
    <div className="container mt-3">
      <h1>
        Git Issues <small>Seguimiento de problemas</small>{" "}
      </h1>

      <nav className="navbar w-50">
        <div className="nav nav-pills">
          <li className="nav-item">
            <Link
              className={`nav-link ${url === Url.LIST ? "active" : ""}`}
              to="list"
              onClick={() => setUrl(Url.LIST)}
            >
              Pagination
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${url === Url.INFINITE ? "active" : ""}`}
              onClick={() => setUrl(Url.INFINITE)}
              to="list-infinite"
            >
              Scroll infinite
            </Link>
          </li>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};
