import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { AdminImages } from './adminImages.entity';

@Entity()
export class AdminUser {
    @PrimaryGeneratedColumn()
    adminUserId?: number;

    @Column({ unique: true })
    email?: string;

    @Column()
    password?: string;  // Hashed password

    @Column('boolean', { default: true })
    isActive?: boolean;

    @Column('boolean', { default: false })
    isDelete?: boolean;

    @CreateDateColumn()
    createdOn?: Date;

    @UpdateDateColumn({ nullable: true })
    modifiedOn?: Date;

    @OneToOne(() => AdminImages, (image) => image.adminUser, {
        cascade: true,
        eager: true,
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'adminImageId' })
    adminImages?: AdminImages;
}