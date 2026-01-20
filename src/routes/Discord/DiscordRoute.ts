import { Router, Request, Response } from "express";
import { verifySignature } from "../../utils/cryptoVerifier.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const rawBody: string = await new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
  });

  if (process.env.DISCORD_PUBLIC_KEY) {
    try {
      const signature = req.headers["x-signature-ed25519"] as string | undefined;
      const timestamp = req.headers["x-signature-timestamp"] as string | undefined;

      if (!signature || !timestamp) throw new Error("Missing signature or timestamp");

      const isValid = verifySignature(timestamp + rawBody, signature, process.env.DISCORD_PUBLIC_KEY);

      if (!isValid) return res.status(401).send("Invalid request signature");
    } catch (err: any) {
      console.log("Signature verification skipped (local/test environment):", err.message);
    }
  }

  // Parse body safely
  let body;
  try {
    body = JSON.parse(rawBody);
  } catch (err) {
    return res.status(400).send("Invalid JSON");
  }

  // Discord PING
  if (body.type === 1) return res.json({ type: 1 });

  // Slash command
  if (body.type === 2) {
    const username = body?.member?.user?.username || "stranger";
    return res.json({
      type: 4,
      data: { content: `Hello, ${username}!` },
    });
  }

  res.status(200).end();
});

export default router;
