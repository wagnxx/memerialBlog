import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  tableName:'users'
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

  // get(k:string):string{

  //   return this.getDataValue('name')
  // }
  // @Column
  // get name(): string {
  //   return this.getDataValue('name');
  // }
 
  // set name(value: string) {
  //   this.setDataValue('name', value);
  // }
  
}
