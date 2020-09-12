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
import { IApiService } from '../interface';
import checkLogin from '../utils/validateAuth';
import { SuccessModel, ErrorModel } from '../../src/models/resModel';

@controller('/api')
@validFluentProvide(TYPE.Controller, 'ApiController')
export class ApiController implements interfaces.Controller {
  constructor(@inject(TAGS.API) private apiService: IApiService) {}

  @httpGet('/isLogin')
  private async isLogin(ctx: IContext, next: () => Promise<any>) {
    return checkLogin(ctx, next);
  }

  @httpPost('/login')
  private async login(ctx: IContext, next: () => Promise<any>) {
    const user = await this.apiService.findUser(ctx);

    if (user?.name) {
      ctx.session.username = user.name;
      ctx.session.userId = user.id;
      ctx.body = new SuccessModel({ username: user.name });
      return;
    }
    ctx.body = new ErrorModel('登录失败');
  }

  @httpPost('/getMenus', checkLogin)
  private async menu(ctx: IContext, next: () => Promise<any>) {
    const data = await this.apiService.getMenus(ctx);
    ctx.body = new SuccessModel(data)
  }

  @httpPost('/getArtContent')
  private async getArtContent(ctx: IContext, next: () => Promise<any>) {
    console.log(ctx.request);
    const data = await this.apiService.getArtContent(ctx);

    ctx.body = new SuccessModel(data)
  }

  @httpPost('/saveArt')
  private async saveArt(ctx: IContext, next: () => Promise<any>) {
    console.log(ctx.request);
    const data = await this.apiService.saveArt(ctx);
    if (data) {
      ctx.body = new SuccessModel('更新成功');
      return;
    }
    ctx.body = new ErrorModel('更新失败');
  }

  /**
   * 测试接口,返回对应userID的 menuList
   * @param ctx
   * @param next
   */
  @httpGet('/test')
  private async index(ctx: IContext, next: () => Promise<any>) {
    const data = await this.apiService.getTestData(ctx);
    ctx.body = new SuccessModel(data)
    
  }

  // @httpGet('/')
  // private list(@queryParams('start') start: number, @queryParams('count') cound: number): string {
  //     return this.fooService.get(start, count);
  // }

  // @httpPost('/')
  // private async create(@response() res: Koa.Response) {
  //     try {
  //         await this.fooService.create(req.body)
  //         res.body = 201
  //     } catch (err) {
  //         res.status = 400
  //         res.body = { error: err.message }
  //     }
  // }

  // @httpDelete('/:id')
  // private delete(@requestParam("id") id: string, @response() res: Koa.Response): Promise<void> {
  //     return this.fooService.delete(id)
  //         .then(() => res.body = 204)
  //         .catch((err) => {
  //             res.status = 400
  //             res.body = { error: err.message }
  //         })
  // }
}
