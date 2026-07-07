const { createServerEntry } = require("../dist/server/server.js");

module.exports = createServerEntry({
  fetch: async (...args) => {
    const entry = require("../dist/server/server.js");
    return entry.default.fetch(...args);
  },
}).default;
