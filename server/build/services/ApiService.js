"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TAGS_1 = require("../config/TAGS");
const ioc_1 = require("../ioc");
const mysql_1 = require("../config/mysql");
let ApiService = class ApiService {
    getData() {
        return Promise.resolve({
            data: [
                {
                    id: 123,
                    title: 't1',
                },
            ],
        });
    }
    getMenus(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = ctx.query.id || 1;
            const sql = `
       select ga.group_id,ga.art_id ,g.name ,a.title      
       from group_arts ga       
       left join groups g on g.id=ga.group_id       
       join arts a on a.created_id=1 and a.id=ga.art_id;

    `;
            const result = yield mysql_1.sequelize.query(sql, {
                raw: true,
                logging: true,
            });
            console.log('result', result[0]);
            return result[0];
        });
    }
};
ApiService = __decorate([
    ioc_1.provide(TAGS_1.TAGS.API)
], ApiService);
