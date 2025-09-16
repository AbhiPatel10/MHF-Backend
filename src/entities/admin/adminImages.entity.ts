import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne, ManyToMany, JoinColumn } from 'typeorm';
import { AdminUser } from './admin.entity';

@Entity()
export class AdminImages {
    @PrimaryGeneratedColumn()
    adminImageId!: number;

    @Column()
    url!: string; // path or cloud storage URL

    @Column()
    publicId?: string;

    @Column({ nullable: true })
    altText?: string;

    @Column({ nullable: true })
    mimeType?: string;

    @CreateDateColumn()
    createdOn!: Date;

    @OneToOne(() => AdminUser, (adminUser) => adminUser.adminImages, { onDelete: 'CASCADE' })
    adminUser!: AdminUser;
}
