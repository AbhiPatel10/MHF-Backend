import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Businesses } from './businesses.entity';
import { Image } from './image.entity';

@Entity()
export class Services {
  @PrimaryGeneratedColumn()
  serviceId?: number;

  @Column()
  serviceName?: string;

  @Column()
  description?: string;

  @Column('boolean', { default: true })
  isActive?: boolean;

  @Column('boolean', { default: false })
  isDelete?: boolean;

  @CreateDateColumn()
  createdOn?: Date;

  @UpdateDateColumn({ nullable: true })
  modifiedOn?: Date;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    default: null,
    transformer: {
      to: (value: number) => value,
      from: (value: string): number => parseFloat(value)
    }
  })
  price?: number;

  @Column('float', { nullable: true, default: null })
  gstPercentage?: number; // New: GST %

  @Column('boolean', { default: false })
  rateInclusive?: boolean;

  @ManyToOne(() => Businesses, {
    createForeignKeyConstraints: false,
    nullable: true
  })
  @JoinColumn({ name: 'businessId' })
  business?: Businesses;

  @ManyToOne(() => User, {
    createForeignKeyConstraints: false,
    nullable: true
  })
  @JoinColumn({ name: 'createdBy' })
  createdBy?: User;

  @ManyToOne(() => User, {
    createForeignKeyConstraints: false,
    nullable: true
  })
  @JoinColumn({ name: 'modifiedBy' })
  modifiedBy?: User;

  @ManyToMany(() => Image, { cascade: true })
  @JoinTable({
    name: "service_images", // junction table name
    joinColumn: { name: "serviceId", referencedColumnName: "serviceId" },
    inverseJoinColumn: { name: "imageId", referencedColumnName: "imageId" },
  })
  images?: Image[];
}