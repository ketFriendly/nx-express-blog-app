import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column("varchar")
    title: string

    @Column("varchar")
    slug: string

    @Column("date")
    published_at: Date
}