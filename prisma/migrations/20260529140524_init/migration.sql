-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `githubId` BIGINT NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NULL,
    `followers` INTEGER NOT NULL,
    `following` INTEGER NOT NULL,
    `publicRepos` INTEGER NOT NULL,
    `publicGists` INTEGER NOT NULL,
    `avatarUrl` VARCHAR(191) NOT NULL,
    `profileUrl` VARCHAR(191) NOT NULL,
    `Score` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Profile_githubId_key`(`githubId`),
    UNIQUE INDEX `Profile_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
