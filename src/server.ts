import * as Koa from "koa";
import * as views from "koa-views";
import * as json from "koa-json";
import * as bodyparser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "koa-router";

const onerror = require('koa-onerror');

import * as path from "path";

import { IndexRoute } from "./routes/index"
import { UserRoute } from "./routes/users"

export class Server {

    public app: Koa;

    /**
     * 启动服务.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {

        this.app = new Koa();

        onerror(this.app);

        this.config();

        this.routes();

        this.api();

        // error-handding
        this.app.on('error', (err, ctx) => {
            console.log('server error', err, ctx);
        });
    }

    public config() {

        this.app.use(bodyparser({
            enableTypes: ['json', 'form', 'text']
        }));

        this.app.use(json());

        this.app.use(logger());

        this.app.use(require('koa-static')(__dirname + '/public'));

        this.app.use(views(__dirname + '/views', { extension: 'pug' }));

        this.app.use(async (ctx, next) => {

            const start = +new Date();

            await next();

            const ms = +new Date() - start;

            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
        });
    }

    public routes() {

        let router = new Router();

        IndexRoute.create(router);

        UserRoute.create(router);

        this.app.use(router.routes());

        this.app.use(router.allowedMethods());
    }

    public api() {

    }
}