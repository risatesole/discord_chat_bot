const DISCORD_API = "https://discord.com/api/v10";

export async function registerCommands() {
  const appId = process.env.DISCORD_APP_ID;
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!appId || !botToken || !guildId) {
    console.warn("⚠️ Missing Discord env vars, skipping command registration");
    return;
  }

  const url = `${DISCORD_API}/applications/${appId}/guilds/${guildId}/commands`;

  const commands = [
    {
      name: "hello",
      description: "Say hello",
    },
  ];

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bot ${botToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to register commands: ${res.status} ${text}`);
  }

  console.log("✅ Slash commands registered");
}
