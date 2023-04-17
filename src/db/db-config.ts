import { DataSource } from "typeorm"
import { User } from "./models/user.model"
import { Article } from "./models/article.model"

export const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "pg-test",
    entities: [User, Article],
    logging: true,
    synchronize: true,
})