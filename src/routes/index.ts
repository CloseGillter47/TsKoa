import * as Koa from "koa";
import * as Router from "koa-router";
import { BaseRoute } from "./route";

export class IndexRoute extends BaseRoute {

    protected app: Koa;

    protected router: Router;

    public static create(app: Koa) {
        //log
        console.log("[IndexRoute::create] Creating index route.");

        const router = new Router();

        router.prefix('/index');

        //add home page route
        router.get("/", async (ctx: Koa.Context, next: Koa.Middleware) => {
            await new IndexRoute(app).index(ctx, next);
        });

        router.get("/string", async (ctx: Koa.Context, next: Koa.Middleware) => {
            await new IndexRoute(app).string(ctx, next);
        });

        router.get("/json", async (ctx: Koa.Context, next: Koa.Middleware) => {
            await new IndexRoute(app).json(ctx, next);
        });

        return router;
    }

    constructor(app: Koa) {
        super(app);
    }

    private async index(ctx: Koa.Context, next: Koa.Middleware) {
        await ctx.render('index', {
            title: 'Hello Koa 2!'
        });
    }

    private async string(ctx: Koa.Context, next: Koa.Middleware) {
        ctx.body = 'koa2 string';
    }

    private async json(ctx: Koa.Context, next: Koa.Middleware) {
        ctx.body = {
            title: 'koa2 json'
        };
    }
}