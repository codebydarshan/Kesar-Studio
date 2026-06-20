import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

async function main() {
  config({ path: ".env.local" });

  const sql = neon(process.env.DATABASE_URL!);
  const clerkId = "user_3FJhoTCKjCqdZMoi5qkLqfmEM6G";

  const rows = await sql`SELECT id, clerk_id, name, email, role FROM users`;
  console.log("All users:", JSON.stringify(rows, null, 2));

  const match = await sql`SELECT * FROM users WHERE clerk_id = ${clerkId}`;
  console.log("Match count:", match.length);
  if (match[0]) console.log("Matched row:", match[0]);
}

main().catch(console.error);
