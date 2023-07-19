import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1689726089342 implements MigrationInterface {
    name = 'Migrations1689726089342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization" ("id_organization" SERIAL NOT NULL, "name" character(50) NOT NULL, "status" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_c1137363ad9deea0a4e9c6ff32b" PRIMARY KEY ("id_organization"))`);
        await queryRunner.query(`CREATE TABLE "tribe" ("id_tribe" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "status" integer NOT NULL DEFAULT '1', "idOrganizationIdOrganization" integer, "organizationIdOrganization" integer, CONSTRAINT "PK_c165ed5e52b4e2ff2af9a7d0fb6" PRIMARY KEY ("id_tribe"))`);
        await queryRunner.query(`CREATE TABLE "repository" ("id_repository" SERIAL NOT NULL, "name" character varying NOT NULL, "state" character varying(1) NOT NULL DEFAULT 'E', "create_time" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(1) NOT NULL DEFAULT 'A', "idTribeIdTribe" integer, "tribeIdTribe" integer, CONSTRAINT "PK_431a174129d882e2c5398a9f420" PRIMARY KEY ("id_repository"))`);
        await queryRunner.query(`CREATE TABLE "metrics" ("id_repository" integer NOT NULL, "coverage" integer NOT NULL, "bugs" integer NOT NULL, "vulnerabilities" integer NOT NULL, "hotspot" integer NOT NULL, "code_smells" integer NOT NULL, "idRepositoryIdRepository" integer, "repositoryIdRepository" integer, CONSTRAINT "PK_c3d911b1d911a990e617041947b" PRIMARY KEY ("id_repository"))`);
        await queryRunner.query(`ALTER TABLE "tribe" ADD CONSTRAINT "FK_71db8b8090c3661ea9ab8270eb4" FOREIGN KEY ("idOrganizationIdOrganization") REFERENCES "organization"("id_organization") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tribe" ADD CONSTRAINT "FK_ac7b59ee194ac695e5b587ee6bf" FOREIGN KEY ("organizationIdOrganization") REFERENCES "organization"("id_organization") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_6151470ec9f87c4ae5ce4615f24" FOREIGN KEY ("idTribeIdTribe") REFERENCES "tribe"("id_tribe") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_d72214c49cc027f0106ec55103d" FOREIGN KEY ("tribeIdTribe") REFERENCES "tribe"("id_tribe") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "metrics" ADD CONSTRAINT "FK_ca7300693f3c5a00c0c49989fcd" FOREIGN KEY ("idRepositoryIdRepository") REFERENCES "repository"("id_repository") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "metrics" ADD CONSTRAINT "FK_9d3bd2abc3f4fb719e0f01e2b0b" FOREIGN KEY ("repositoryIdRepository") REFERENCES "repository"("id_repository") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "metrics" DROP CONSTRAINT "FK_9d3bd2abc3f4fb719e0f01e2b0b"`);
        await queryRunner.query(`ALTER TABLE "metrics" DROP CONSTRAINT "FK_ca7300693f3c5a00c0c49989fcd"`);
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_d72214c49cc027f0106ec55103d"`);
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_6151470ec9f87c4ae5ce4615f24"`);
        await queryRunner.query(`ALTER TABLE "tribe" DROP CONSTRAINT "FK_ac7b59ee194ac695e5b587ee6bf"`);
        await queryRunner.query(`ALTER TABLE "tribe" DROP CONSTRAINT "FK_71db8b8090c3661ea9ab8270eb4"`);
        await queryRunner.query(`DROP TABLE "metrics"`);
        await queryRunner.query(`DROP TABLE "repository"`);
        await queryRunner.query(`DROP TABLE "tribe"`);
        await queryRunner.query(`DROP TABLE "organization"`);
    }

}
