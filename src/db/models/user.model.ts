import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column("varchar", { unique: true })
    username: string

    @Column("varchar")
    password: string
}