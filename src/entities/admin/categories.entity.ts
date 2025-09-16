import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AdminUser } from './admin.entity';
import { SubCategories } from './subCategories.entity';
import { AdminImages } from './adminImages.entity';

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    categoryId?: number;

    @Column()
    category?: string;

    @Column('boolean', { default: true })
    isActive?: boolean;

    @Column('boolean', { default: false })
    isDelete?: boolean;

    @Column('json', { nullable: true })
    categoryAlias?: string[];

    @CreateDateColumn()
    createdOn?: Date;

    @UpdateDateColumn({ nullable: true })
    modifiedOn?: Date;

    @ManyToOne(() => AdminUser, {
        createForeignKeyConstraints: false,
        nullable: true
    })
    @JoinColumn({ name: 'createdBy' })
    createdBy?: AdminUser;

    @ManyToOne(() => AdminUser, {
        createForeignKeyConstraints: false,
        nullable: true
    })
    @JoinColumn({ name: 'modifiedBy' })
    modifiedBy?: AdminUser;

    @OneToMany(() => SubCategories, subCategory => subCategory.category, { cascade: true })
    subCategories?: SubCategories[];

    @ManyToOne(() => AdminImages, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'adminImageId' })
    adminImage?: AdminImages | null;
}