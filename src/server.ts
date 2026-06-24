import { createStartServer } from "@tanstack/react-start/server";

export default createStartServer({
  getRouterManifest: () => import("./routeTree.gen"),
});