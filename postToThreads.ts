async function notifyDiscord(content: string): Promise<void> {
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

type MediaType = "TEXT" | "IMAGE" | "VIDEO";

interface PostOptions {
  type: MediaType;
  text: string;
  imageUrl?: string;
  videoUrl?: string;
  replyToId?: string;
}

// Threads API投稿処理
async function postToThreads({
  type,
  text,
  imageUrl,
  videoUrl,
  replyToId,
}: PostOptions): Promise<string | undefined> {
  const THREADS_USER_ID = process.env.THREADS_USER_ID!;
  const THREADS_ACCESS_TOKEN = process.env.THREADS_ACCESS_TOKEN!;

  // POST本体のパラメータ構築
  const params: Record<string, string> = {
    media_type: type,
    text,
    access_token: THREADS_ACCESS_TOKEN,
  };

  if (type === "IMAGE" && imageUrl) {
    params.image_url = imageUrl;
  } else if (type === "VIDEO" && videoUrl) {
    params.video_url = videoUrl;
  }

  // Optional: reply to an existing post
  if (replyToId) {
    params.reply_to_id = replyToId;
  }

  // STEP 1: Media Container 作成
  const createRes = await fetch(
    `https://graph.threads.net/v1.0/${THREADS_USER_ID}/threads`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(params),
    }
  );

  const createData = (await createRes.json()) as {
    id?: string;
    [key: string]: unknown;
  };
  if (!createData?.id) {
    console.error("❌ メディア作成失敗:", createData);
    await notifyDiscord(
      `Threads media creation failed: ${JSON.stringify(createData)}`
    );
    return;
  }

  const creationId = createData.id;
  console.log("✅ Media Container 作成成功:", creationId);

  // STEP 2: Publish
  const publishRes = await fetch(
    `https://graph.threads.net/v1.0/${THREADS_USER_ID}/threads_publish`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        creation_id: creationId,
        access_token: THREADS_ACCESS_TOKEN,
      }),
    }
  );

  const publishData = (await publishRes.json()) as {
    id?: string;
    [key: string]: unknown;
  };
  if (publishData.id) {
    console.log("🎉 投稿成功！投稿ID:", publishData.id);
    return publishData.id as string;
  } else {
    console.error("❌ 投稿失敗:", publishData);
    await notifyDiscord(
      `Threads publish failed: ${JSON.stringify(publishData)}`
    );
    return undefined;
  }
}

export { postToThreads, notifyDiscord };
