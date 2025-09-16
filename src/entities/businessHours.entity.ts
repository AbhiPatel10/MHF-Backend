import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Businesses } from './businesses.entity';

@Entity()
export class BusinessHours {
    @PrimaryGeneratedColumn()
    businessHourId?: number;

    @Column()
    day?: string; // e.g., 'Monday', 'Tuesday', etc.

    @Column({ type: 'time', nullable: true })
    openTime?: string; // e.g., '08:00'

    @Column({ type: 'time', nullable: true })
    closeTime?: string; // e.g., '19:00'

    @Column({ default: false })
    isClosed?: boolean;

    @Column({ default: false })
    isOpen24Hours?: boolean;

    @ManyToOne(() => Businesses, business => business.businessHours, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'businessId' })
    business?: Businesses;
}
