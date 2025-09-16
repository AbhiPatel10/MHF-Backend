import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, } from 'typeorm';
import { User } from './user.entity';
import { Businesses } from './businesses.entity';
import { Image } from './image.entity';

@Entity()
export class TeamMembers {
    @PrimaryGeneratedColumn()
    teamMemberId?: number;

    @Column()
    name?: string;

    @Column({ nullable: true })
    qualification?: string;

    @Column({ nullable: true })
    specialization?: string;

    @Column({ nullable: true })
    experience?: string;

    @Column('text', { nullable: true })
    about?: string;

    @Column('boolean', { default: true })
    isActive?: boolean;

    @Column('boolean', { default: false })
    isDelete?: boolean;

    @CreateDateColumn()
    createdOn?: Date;

    @UpdateDateColumn({ nullable: true })
    modifiedOn?: Date;

    @ManyToOne(() => Businesses, {
        createForeignKeyConstraints: false,
        nullable: true,
    })
    @JoinColumn({ name: 'businessId' })
    business?: Businesses;

    @ManyToOne(() => User, {
        createForeignKeyConstraints: false,
        nullable: true,
    })
    @JoinColumn({ name: 'createdBy' })
    createdBy?: User;

    @ManyToOne(() => User, {
        createForeignKeyConstraints: false,
        nullable: true,
    })
    @JoinColumn({ name: 'modifiedBy' })
    modifiedBy?: User;

    @ManyToOne(() => Image, { cascade: true, nullable: true, eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'imageId' })
    image?: Image | null;
}
