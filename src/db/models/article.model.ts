import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    title: string

    @Column("varchar")
    slug: string

    @Column("date")
    published_at: Date
}