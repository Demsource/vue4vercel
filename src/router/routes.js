import HomePage from "../views/HomePage";
import PostPage from "../views/PostPage";
import UserPage from "../views/UserPage";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/post/:id",
    name: "post",
    component: PostPage,
  },
  {
    path: "/user/:id",
    name: "user",
    component: UserPage,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

export default routes;
