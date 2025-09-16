import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne, ManyToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Businesses } from './businesses.entity';

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    imageId!: number;

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

    @OneToOne(() => User, (user) => user.image, { onDelete: 'CASCADE' })
    user!: User;

    // Reverse relation
    @ManyToMany(() => Businesses, (business) => business.images)
    businesses?: Businesses[];
}
