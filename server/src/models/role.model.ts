import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'roles',
})
export default class RolesModel extends Model<RolesModel> {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;
}
