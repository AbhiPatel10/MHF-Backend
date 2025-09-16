import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Categories } from './admin/categories.entity';
import { SubCategories } from './admin/subCategories.entity';
import { BusinessHours } from './businessHours.entity';
import { Services } from './service.entity';
import { Products } from './product.entity';
import { Image } from './image.entity';
import { TeamMembers } from './teamMembers.entity';
import { BusinessReview } from './businessesReview.entity';

@Entity()
export class Businesses {
    @PrimaryGeneratedColumn()
    businessId?: number;

    @Column()
    name?: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    phoneNo?: string;

    @Column({ nullable: true })
    whatsAppNo?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    website?: string;

    @Column({ nullable: true })
    landMark?: string;

    @Column({ nullable: true })
    city?: string;

    @Column({ nullable: true })
    pinCode?: string;

    @Column({ type: 'varchar', nullable: true })
    establishYear?: string;

    // ✅ Latitude & Longitude
    @Column('decimal', { precision: 10, scale: 7, nullable: true })
    latitude?: number;

    @Column('decimal', { precision: 10, scale: 7, nullable: true })
    longitude?: number;

    @ManyToMany(() => Categories, { cascade: true })
    @JoinTable({
        name: 'business_selected_categories',
        joinColumn: {
            name: 'businessId',
            referencedColumnName: 'businessId'
        },
        inverseJoinColumn: {
            name: 'categoryId',
            referencedColumnName: 'categoryId'
        }
    })
    categories?: Categories[];

    @ManyToMany(() => SubCategories, { cascade: true })
    @JoinTable({
        name: 'business_selected_subcategories',
        joinColumn: {
            name: 'businessId',
            referencedColumnName: 'businessId'
        },
        inverseJoinColumn: {
            name: 'subCategoryId',
            referencedColumnName: 'subCategoryId'
        }
    })
    subCategories?: SubCategories[];

    @Column("float", { default: 0 })
    avgRating?: number;

    @Column("int", { default: 0 })
    totalReviews?: number;

    @Column('boolean', { default: true })
    isDraft?: boolean;

    @Column('boolean', { default: false })
    isActive?: boolean;

    @Column('boolean', { default: false })
    isDelete?: boolean;

    @CreateDateColumn()
    createdOn?: Date;

    @UpdateDateColumn({ nullable: true })
    modifiedOn?: Date;

    @ManyToOne(() => User, {
        createForeignKeyConstraints: false,
        nullable: true
    })
    @JoinColumn({ name: 'createdBy' })
    createdBy?: User;

    @OneToOne(() => User, {
        createForeignKeyConstraints: false,
        nullable: true
    })
    @JoinColumn({ name: 'modifiedBy' })
    modifiedBy?: User;

    @OneToMany(() => BusinessHours, businessHours => businessHours.business, { cascade: true })
    businessHours?: BusinessHours[];

    @OneToMany(() => Services, service => service.business, { cascade: true })
    services?: Services[];

    @OneToMany(() => Products, product => product.business, { cascade: true })
    products?: Products[];

    @OneToMany(() => TeamMembers, (teamMember) => teamMember.business, {
        cascade: true,
    })
    teamMembers?: TeamMembers[];

    @ManyToMany(() => Image, { cascade: true, eager: true })
    @JoinTable({
        name: "business_images", // junction table
        joinColumn: { name: "businessId", referencedColumnName: "businessId" },
        inverseJoinColumn: { name: "imageId", referencedColumnName: "imageId" },
    })
    images?: Image[];

    @OneToMany(() => BusinessReview, (review) => review.business, { cascade: true })
    reviews?: BusinessReview[];
}