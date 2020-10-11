import { TAGS } from '../config/TAGS';
import { provide, IContext } from '../ioc';
import { IManageService } from '../interface';
import { sequelize } from '../config/mysql';
import { QueryTypes } from 'sequelize';
import { ErrorModel, SuccessModel } from '../models/resModel';

@provide(TAGS.MANAGE)
class ManageService implements IManageService {
  getUsers(ctx: IContext): Promise<object> {
    let result = sequelize.models.UsersModel.scope('hasRole').findAll({
    nest:false
    });

    if (result) {
      return result;
    }
    return null;
  }
  /**
   * 添加文章 到 对应的分组
   */
  public async createArt(ctx: IContext): Promise<object> {
    let title = ctx.request.body.name;
    let group_id = ctx.request.body.groupId;
    let created_id = ctx.session.userId;

    console.log('start create art model', title);

    const transaction = await sequelize.transaction().then((t) => {
      return sequelize.models.Arts.create(
        { title, content: '', created_id },
        { transaction: t, raw: true }
      )
        .then((art) => {
          return art;
          // return sequelize.models.Arts.create({}, { transaction: t });
        })
        .then((af) => {
          let art_id = af.get('id');
          let group_id = 2;

          return sequelize.models.GroupArts.create(
            {
              art_id,
              group_id,
            },
            {
              raw: true,
              transaction: t,
            }
          );

          // console.log('保存后的值',af);
          // console.log('保存后的值.setDatavalue',af.get('id'));
        })
        .then((ga) => {
          console.log(
            '分组添加art,group 完成 gorup_id:' +
              group_id +
              ',art_id' +
              ga.get('art_id')
          );
          return ga;
        })
        .then(t.commit.bind(t))
        .catch(t.rollback.bind(t));
    });

    console.log('transaction 值:', transaction);

    if (transaction) {
      return new SuccessModel('art创建成功');
    }

    return new ErrorModel('art创建失败');
  }
  /**
   * 添加新的分组,注意权限问题,只有admin才能进入后台操作
   */
  public async createMenu(ctx: IContext): Promise<object> {
    let name = ctx.request.body.name;
    // console.log('开始创建新组', name);
    let groups = await sequelize.models.Groups.findAll({
      where: { name },
      logging: true,
    });

    if (groups.length) {
      return new ErrorModel('该组已存在');
    }

    let newGroup = await sequelize.models.Groups.create(
      {
        name,
      },
      {
        logging: true,
      }
    );

    // console.log('新创建的group ====', newGroup);

    if (newGroup) {
      return new SuccessModel('该组创建成功');
    }

    return new ErrorModel('创建失败');
  }
  /**
   * 获取分组,join g,a
   */
  public async getData(ctx: IContext) {
    const userId = ctx.session.userId;
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

    const result = await sequelize.query(seq2, {
      raw: true,
      type: QueryTypes.SELECT,
    });
    return result;
  }
}
