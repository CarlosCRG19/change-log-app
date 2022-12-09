import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import Projects from './projects';

@Entity()
class Users extends BaseEntity {
  @PrimaryColumn()
    id: string;

  @Column({ unique: true })
    email: string;

  @Column({ unique: true })
    username: string;

  @CreateDateColumn()
    joinedDate: Date;

  @OneToMany(() => Projects, (project) => project.creator)
    projects: Projects[];
}

export default Users;
