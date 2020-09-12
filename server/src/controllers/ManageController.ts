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
import checkLogin from '../utils/validateAuth';
import { SuccessModel, ErrorModel } from '../models/resModel';

@controller('/api/manage')
@validFluentProvide(TYPE.Controller, 'ManageControler')
export class ManageControler implements interfaces.Controller {
  constructor(@inject(TAGS.MANAGE) private manageService: IManageService) {}

  @httpGet('/getMenu', checkLogin)
  private async getMMenu(ctx: IContext, next: () => Promise<any>) {
    const data = await this.manageService.getData(ctx);
    ctx.body = new SuccessModel(data);
  }

  @httpPost('/createMenu', checkLogin)
  private async createMenu(ctx: IContext, next: () => Promise<any>) {
    const data = await this.manageService.createMenu(ctx);
    ctx.body = new SuccessModel(data);
  }
  @httpPost('/createArt', checkLogin)
  private async createArt(ctx: IContext, next: () => Promise<any>) {
    const data = await this.manageService.createArt(ctx);
    ctx.body = new SuccessModel(data);
  }
}
