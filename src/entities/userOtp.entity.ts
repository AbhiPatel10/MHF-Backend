import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserOTP {
  @PrimaryGeneratedColumn()
  userOTPId?: number;

  @Column('varchar', { nullable: true, default: null })
  OTP?: string | null;

  @ManyToOne(() => User, (user) => user.otps, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column('boolean', { default: true })
  isActive?: boolean;

  @Column('boolean', { default: false })
  isVerified?: boolean;

  @CreateDateColumn()
  createdOn?: Date;

  @UpdateDateColumn()
  updatedOn?: Date;
}
