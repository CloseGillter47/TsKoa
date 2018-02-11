import * as Koa from "koa";
import * as Router from "koa-router";
import { BaseRoute } from "./route";

export class UserRoute extends BaseRoute {

    public static create(app: Koa) {
        //log
        console.log("[UsersRoute::create] Creating users route.");

        const router = new Router();

        router.prefix('/users');

        //add home page route
        router.get("/", async (ctx: Koa.Context, next: Koa.Middleware) => {
            await new UserRoute(app).index(ctx, next);
        });

        router.get("/string", async (ctx: Koa.Context, next: Koa.Middleware) => {
            await new UserRoute(app).string(ctx, next);
        });

        router.get("/json", async (ctx: Koa.Context, next: Koa.Middleware) => {
            await new UserRoute(app).json(ctx, next);
        });
    }

    constructor(app: Koa) {
        super(app);
    }

    private async index(ctx: Koa.Context, next: Koa.Middleware) {
        await ctx.render('index', {
            title: 'Hello Koa 2! usersApi'
        });
    }

    private async string(ctx: Koa.Context, next: Koa.Middleware) {
        ctx.body = 'koa2 string usersApi';
    }

    private async json(ctx: Koa.Context, next: Koa.Middleware) {
        ctx.body = {
            title: 'koa2 json usersApi'
        };
    }
}