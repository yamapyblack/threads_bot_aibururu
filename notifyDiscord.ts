/**
 * Send a message to Discord via webhook.
 * If DISCORD_WEBHOOK_URL is not set, this becomes a no-op and logs a warning once.
 */
export async function notifyDiscord(content: string): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("Error webhookUrl is null");
    return;
  }

  const payload: Record<string, unknown> = {
    content,
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(
        `Failed to send Discord webhook: ${res.status} ${res.statusText} - ${body}`
      );
    }
  } catch (err) {
    console.error("Error sending Discord webhook:", err);
  }
}
