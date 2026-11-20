-- AlterTable
ALTER TABLE "email_verification_tokens" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "interactions" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "target_user_id" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "matches" ALTER COLUMN "user1_id" SET NOT NULL,
ALTER COLUMN "user2_id" SET NOT NULL,
ALTER COLUMN "seen" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "match_id" SET NOT NULL,
ALTER COLUMN "sender_id" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "email_verified" SET NOT NULL,
ALTER COLUMN "email_verified" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_tokens_token_hash_key" ON "email_verification_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "email_verification_tokens_user_id_idx" ON "email_verification_tokens"("user_id");

-- CreateIndex
CREATE INDEX "interactions_target_user_id_idx" ON "interactions"("target_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "interactions_user_id_target_user_id_type_key" ON "interactions"("user_id", "target_user_id", "type");

-- CreateIndex
CREATE INDEX "matches_user2_id_idx" ON "matches"("user2_id");

-- CreateIndex
CREATE UNIQUE INDEX "matches_user1_id_user2_id_key" ON "matches"("user1_id", "user2_id");

-- CreateIndex
CREATE INDEX "messages_match_id_idx" ON "messages"("match_id");

-- CreateIndex
CREATE INDEX "messages_sender_id_idx" ON "messages"("sender_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_dni_key" ON "users"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
