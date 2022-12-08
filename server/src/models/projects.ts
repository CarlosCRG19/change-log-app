import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import ProjectUpdates from './projectUpdates';

@Entity()
class Projects extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ unique: true })
    name: string;

  @Column()
    description: string;

  @CreateDateColumn()
    createdAt: Date;

  @OneToMany(() => ProjectUpdates, (update) => update.project)
    updates: ProjectUpdates[];
}

export default Projects;
