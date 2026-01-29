/**
 * Script to clear all users from the database
 * WARNING: This will delete ALL users and their associated data
 * Run with: npx tsx scripts/clear-all-users.ts
 */

import { db } from "../lib/db";

async function clearAllUsers() {
  try {
    console.log("🗑️  Starting to clear all users...");

    // Delete all users (cascades to accounts, sessions, artist profiles, etc.)
    const result = await db.user.deleteMany({});

    console.log(`✅ Successfully deleted ${result.count} user(s)`);
    console.log("📝 Note: All related data (accounts, sessions, artist profiles, etc.) has been cascaded");

    // Also clear verification tokens
    const tokensResult = await db.verificationToken.deleteMany({});
    console.log(`✅ Cleared ${tokensResult.count} verification token(s)`);

    console.log("\n✨ Database cleared! You can now reuse any email addresses.");
  } catch (error) {
    console.error("❌ Error clearing users:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

clearAllUsers();
