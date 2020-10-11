import {
  interfaces,
  controller,
  httpGet,
  inject,
  Router,
  validFluentProvide,
  TYPE,
  IContext,
  httpPost,
} from '../ioc/index';
import { TAGS } from '../config/TAGS';
import { IApiService, IManageService } from '../interface';
import { SuccessModel, ErrorModel } from '../models/resModel';
import {VALIDATE} from '../utils/validateAuth';
 

@controller('/api/manage')
@validFluentProvide(TYPE.Controller, 'ManageControler')
export class ManageControler implements interfaces.Controller {
  constructor(@inject(TAGS.MANAGE) private manageService: IManageService) {}

  @httpGet('/getMenu', VALIDATE.checkLogin)
  private async getMMenu(ctx: IContext, next: () => Promise<any>) {
    const data = await this.manageService.getData(ctx);
    ctx.body = new SuccessModel(data);
  }

  @httpPost('/createMenu', VALIDATE.checkLogin,VALIDATE.checkIfSSVIP)
  private async createMenu(ctx: IContext, next: () => Promise<any>) {
    const data = await this.manageService.createMenu(ctx);
    ctx.body = new SuccessModel(data);
  }
  @httpPost('/createArt', VALIDATE.checkLogin,VALIDATE.checkIfSSVIP)
  private async createArt(ctx: IContext, next: () => Promise<any>) {
    const data = await this.manageService.createArt(ctx);
    ctx.body = new SuccessModel(data);
  }
  @httpGet('/getUsers',VALIDATE.checkIfSSVIP)
  private async getUsers(ctx: IContext, next: () => Promise<any>) {
    const data = await this.manageService.getUsers(ctx);
    ctx.body = new SuccessModel(data);
  }
}
