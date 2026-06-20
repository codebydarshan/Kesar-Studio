import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

async function main() {
  config({ path: ".env.local" });

  const sql = neon(process.env.DATABASE_URL!);

  const clerkId = process.argv[2] || "user_3FJhoTCKjCqdZMoi5qkLqfmEM6G";
  const email = process.argv[3] || "darshandesai842004@gmail.com";
  const name = process.argv[4] || "Darshan Desai";

  const existing = await sql`SELECT id FROM users WHERE clerk_id = ${clerkId}`;
  if (existing.length > 0) {
    console.log("Admin user already exists:", existing[0]);
    return;
  }

  const [user] = await sql`
    INSERT INTO users (clerk_id, name, email, role)
    VALUES (${clerkId}, ${name}, ${email}, 'ADMIN')
    RETURNING id, clerk_id, name, email, role
  `;

  console.log("Admin user created:", user);
}

main().catch((err) => {
  console.error("Failed to seed admin:", err.message);
  process.exit(1);
});
