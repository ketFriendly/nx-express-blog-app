import { DataSource } from "typeorm"
import { User } from "./models/user.model"
import { Article } from "./models/article.model"

export const datasource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "pg-test",
    entities: [User, Article], 
    migrationsTableName: "migration_table", 
    migrations: ["1681853620963-ArticleRefactor1681853620963"],
    logging: true,
    synchronize: true,
    uuidExtension: "uuid-ossp"
})