// server.js
const next = require("next");
const express = require("express");
const getPort = require("get-port"); // 👈 auto finds an available port

(async () => {
    const dev = process.env.NODE_ENV !== "production";
    const app = next({ dev });
    const handle = app.getRequestHandler();

    await app.prepare();

    const server = express();

    // Optional: custom routes
    // server.get('/news/:slug', (req, res) => app.render(req, res, '/news/[slug]', { slug: req.params.slug }));

    // Let get-port find a free port (start checking from 3000 upward)
    const port = process.env.PORT || (await getPort({ port: getPort.makeRange(3000, 3100) }));

    server.all("*", (req, res) => handle(req, res));

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`🚀 Frontend running on http://localhost:${port}`);
    });
})();
