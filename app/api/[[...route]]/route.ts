import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import accounts from "./accounts";
import categories from "./categories";
import transations from "./transactions";


export const runtime = 'edge';

const app = new Hono().basePath('/api');

// app.onError((err, c) => {
//     if (err instanceof HTTPException) {
//         return err.getResponse()
//     }
//     return c.json({ error: "Internal error" }, 500)
// });

const routes = app
.route("/accounts", accounts)
.route("/categories", categories)
.route("/transations", transations)
export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes