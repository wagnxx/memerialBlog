"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const db_1 = require("./db");
const sequelize = new sequelize_typescript_1.Sequelize(db_1.MYSQL_CONF.database, db_1.MYSQL_CONF.user, db_1.MYSQL_CONF.password, {
    //   database: MYSQL_CONF.database,
    //   username: MYSQL_CONF.user,
    //   password: MYSQL_CONF.password,
    host: db_1.MYSQL_CONF.host,
    dialect: 'mysql',
    storage: ':memory:',
    define: {
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
    },
    models: [__dirname + '/../models/*.model.*s'],
});
exports.sequelize = sequelize;
// sequelize.addModels([__dirname + '/../model/*.model.*s']);
sequelize
    .authenticate()
    .then(() => {
    console.log('mysql数据库链接成功');
    // sequelize.addModels([UserTable]);
    setImmediate(() => {
        // let u = new UserTable();
        // u.$get('uname').then((res) => {
        //   console.log(res);
        // });
        // const person = new UserTable({ uname: 'bob', upass: '99',rule:1 });
        //   person.save();
        // UserTable.findOne().then((user) => {
        //   // user.upass = '123456';
        //   console.log(user);
        //   return user.save();
        // });
        // console.log('sequelize.models list:', sequelize.models);
        // sequelize.models.Arts.findAll().then((rows) => {
        //   console.log('art的数据', rows);
        // });
    }, 1000);
})
    .catch((err) => {
    console.error('链接数据库失败', err);
});
