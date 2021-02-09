import React from "react";

import CinemaSSIApp from "./pages/index";
import MovieList from "./pages/movies/movies-list";
import MovieDetail from "./pages/movies/movie-detail";

import routeFactory from "./utilities/router.factory";

const routes = [
  {
    path: "",
    exact: true,
    component: CinemaSSIApp,
  },
  {
    path: "movie-list",
    exact: true,
    component: MovieList
  },
  {
    path: "movie-detail/:id",
    exact: true,
    component: MovieDetail
  },
  /* {
    path: "/dashboard",
    component: Dashboard,
    exact: false,
    private: true,
    routes: [
      {
        path: "/homepage",
        component: AdminHomepage,
        exact: false,
        routes: [],
      },
    ],
  }, */
];

const Routes = () => {
  const routesObj = routeFactory(routes);
  return <div>{routesObj}</div>;
};

export default Routes;
