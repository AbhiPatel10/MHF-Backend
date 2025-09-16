import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Image } from './image.entity';
import { UserOTP } from './userOtp.entity';
import { Businesses } from './businesses.entity';
import { BusinessReview } from './businessesReview.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId?: number;

  @Column()
  name?: string;

  @Column()
  phoneNo?: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password?: string;

  @Column({ type: 'boolean', default: false })
  isVerified?: boolean;

  @Column('boolean', { default: true })
  isActive?: boolean;

  @Column('boolean', { default: false })
  isDelete?: boolean;

  @CreateDateColumn()
  createdOn?: Date;

  @UpdateDateColumn({ nullable: true })
  modifiedOn?: Date;

  @OneToOne(() => Image, (image) => image.user, {
    cascade: true,
    eager: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'imageId' })
  image?: Image | null;

  @OneToMany(() => UserOTP, (otp) => otp.user)
  otps?: UserOTP[];

  @OneToOne(() => Businesses, (business) => business.createdBy, { cascade: true, eager: true, onDelete: 'CASCADE' })
  business?: Businesses;

  @OneToMany(() => BusinessReview, (review) => review.user)
  reviews?: BusinessReview[];
}