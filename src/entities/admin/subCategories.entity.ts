import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AdminUser } from './admin.entity';
import { Categories } from './categories.entity';
import { AdminImages } from './adminImages.entity';

@Entity()
export class SubCategories {
    @PrimaryGeneratedColumn()
    subCategoryId?: number;

    @Column()
    subCategory?: string;

    @ManyToOne(() => Categories, {
        createForeignKeyConstraints: false,
        nullable: true
    })
    @JoinColumn({ name: 'categoryId' })
    category?: Categories;

    @Column('boolean', { default: true })
    isActive?: boolean;

    @Column('boolean', { default: false })
    isDelete?: boolean;

    @Column('json', { nullable: true })
    subCategoryAlias?: string[];

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

    @ManyToOne(() => AdminImages, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'adminImageId' })
    adminImage?: AdminImages | null;
}