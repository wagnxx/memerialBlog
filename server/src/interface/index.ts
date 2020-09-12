import { Router, IContext } from '../ioc/index';
import { Model } from 'sequelize/types';
import Users from 'src/models/user.model';
export interface IApiService {
  /**
   * 测试接口
   * @param ctx 
   */
  getTestData(ctx: IContext): Promise<object>;
  getMenus(ctx: IContext): Promise<object>;
  findUser(ctx: IContext): Promise<UserModel>;
  getArtContent(ctx: IContext): Promise<object>;
  saveArt(ctx: IContext): Promise<object>;
}
export interface IManageService {
  getData(ctx: IContext): Promise<object>;
  createMenu(ctx: IContext): Promise<object>;
  createArt(ctx: IContext): Promise<object>;


}

export interface UserModel {
  id: number|unknown;
  name: string | any;
  passport?: string | any;
}

export interface ArtContentModel {
  id: number;
  content: string;
}
