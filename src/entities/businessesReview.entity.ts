import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Businesses } from "./businesses.entity";

@Entity()
export class BusinessReview {
    @PrimaryGeneratedColumn()
    reviewId?: number;

    @Column("int", { width: 1 })
    rating!: number;

    @Column({ type: "text", nullable: true })
    review?: string;

    @Column("boolean", { default: false })
    isEdited?: boolean;

    @CreateDateColumn()
    createdOn?: Date;

    @UpdateDateColumn()
    updatedOn?: Date;

    @ManyToOne(() => Businesses, (business) => business.reviews, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "businessId" })
    business!: Businesses;

    @ManyToOne(() => User, (user) => user.reviews, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "userId" })
    user!: User;
}
