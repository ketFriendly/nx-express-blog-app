import { MigrationInterface, QueryRunner } from "typeorm"

export class ArticleRefactor1681853620963 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "article" 
            ADD private boolean`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
