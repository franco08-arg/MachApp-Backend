-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nombres" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(100) NOT NULL,
    "dni" VARCHAR(8) NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" VARCHAR(20) DEFAULT 'user',
    "terms_accepted_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "email_verified" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_verification_tokens" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "token_hash" VARCHAR(64) NOT NULL,
    "used_at" TIMESTAMPTZ(6),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "email_verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interactions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "target_user_id" INTEGER,
    "type" VARCHAR(10),
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" SERIAL NOT NULL,
    "user1_id" INTEGER,
    "user2_id" INTEGER,
    "seen" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "match_id" INTEGER,
    "sender_id" INTEGER,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
