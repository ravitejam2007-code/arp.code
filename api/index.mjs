import { pathToFileURL } from "url";
const url = pathToFileURL(new URL("../dist/server/server.js", import.meta.url).pathname);
const entry = await import(url.href);

export default entry.default;
