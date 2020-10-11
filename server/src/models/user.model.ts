import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  Scopes,
} from 'sequelize-typescript';
import RolesModel from './role.model';

@Scopes({
  hasRole: {
    include: [
      {
        model: () => RolesModel,
        attributes: ['name'],
      },
    ],
  },
})
@Table({
  tableName: 'users',
})
export default class UsersModel extends Model<UsersModel> {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  password: string;
  @Column
  email: string;

  @Column
  submission_date: Date;

  @ForeignKey(() => RolesModel)
  @Column
  role_id: number;

  @BelongsTo(() => RolesModel)
  role: RolesModel;


}
