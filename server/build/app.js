"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./ioc/inversify.config");
const ioc_1 = require("./ioc");
const middleWare_1 = require("./utils/middleWare");
const container = new ioc_1.Container();
container.load(ioc_1.buildProviderModule());
// create server
const server = new ioc_1.InversifyKoaServer(container);
// serveer setting config
server
    .setConfig(middleWare_1.entryMiddlewareSetting)
    .build()
    .listen(3000, () => {
    console.log(`server is running over 3000 port`);
});
