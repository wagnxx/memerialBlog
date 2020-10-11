import { TAGS } from '../config/TAGS';
import { provide, Router, IContext } from '../ioc';
import { IApiService, UserModel, ArtContentModel } from '../interface';
import { sequelize } from '../config/mysql';

import Users from 'src/models/user.model';
import { cpus } from 'os';
import { QueryTypes } from 'sequelize';
import Arts from 'src/models/art.model';
import { ErrorModel, SuccessModel } from '../../src/models/resModel';
// import QueryTypes from 'sequelize/types/lib/query-types';

@provide(TAGS.API)
class ApiService implements IApiService {
  /**
   *  测试接口
   * @param ctx
   */
  public async getTestData(ctx: IContext) {
    // let data = sequelize.models.GroupArts.findAll();
    // return data;
    const userId = ctx.request.query.id;

    if (!userId) return new ErrorModel('参数不正确');
    /**
    * 
     select g.*,ga.*,a.title 
     from groups g 
     left join group_arts ga on g.id=ga.group_id 
     left join arts a on a.id=ga.art_id and a.created_id=1;

 */
    let seq2 = `
      select 
      g.id as group_id,
      g.name,
      ga.art_id,
      a.title
      from groups g 
      left join group_arts ga on g.id=ga.group_id 
      left join arts a on a.id=ga.art_id and a.created_id=${userId};
      ;
    `;

    console.log('seq2  sesseion:=====', ctx.session);
    console.log('seq2 string:=====', seq2);
    const result = await sequelize.query(seq2, {
      raw: true,
      type: QueryTypes.SELECT,
    });
    return result;
  }
  /**
   * 获取菜单,有子项目的符合
   * @param ctx
   */
  public async getMenus(ctx: IContext) {
    const userId = ctx.session.userId;

    let seq2 = `
      select 
      ga.group_id,ga.art_id,
      g.name,
      a.title
      from group_arts ga 
      join arts a on  a.created_id=${userId}
      join groups g on g.id=ga.group_id
      where ga.art_id=a.id
      ;
    `;
    const result = await sequelize.query(seq2, {
      raw: true,
      logging: true,
      type: QueryTypes.SELECT,
    });

    return result;
  }

  public async findUser(ctx: Router.IRouterContext): Promise<UserModel> {
    const query = {
      // id:null,
      password: null,
      name: null,
    };
    query.password = ctx.request.body.password;
    query.name = ctx.request.body.username;

    try {
      let users = await sequelize.models.UsersModel.findOne({
        where: {
          ...query,
        },
        // raw: true,
      });

      let id = await users.get('id');
      let name = await users.get('name');
      let role_id = await users.get('role_id');
      return {
        id,
        name,
        role_id
      };
    } catch (error) {
      return null;
    }
  }

  public async getArtContent(ctx: IContext): Promise<object> {
    const { groupId: group_id, artId: art_id } = ctx.request.body;

    let sql = `
      select DISTINCT a.* from arts a
      join group_arts ga on ga.group_id=${group_id} and ga.art_id=${art_id}
      where a.id=${art_id};
    `;
    // console.log('sql string of search artical list', sql);
    let data = await sequelize.query(sql, {
      raw: true,
      type: QueryTypes.SELECT,
    });

    return data;
  }

  public async saveArt(ctx: IContext): Promise<object> {
    const { id, content } = ctx.request.body;

    let data = await sequelize.models.Arts.update(
      { content },
      { where: { id } }
    );

    return data;
  }
}

// select a.* from arts a
// join group_arts ga on ga.group_id=1 and ga.art_id=1
// where a.id=1;
