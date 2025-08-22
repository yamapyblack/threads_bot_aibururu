import { postToThreads, notifyDiscord } from "./postToThreads";

// Module-scoped counter that cycles 0..(length-1)
let counter = 0;
const INTERVAL_HOUR = 2;

const post_json = [
  {
    text: "ねぇ…るるのこと、ずっと見てくれてるよね？💫 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/2_lingerie_portrait.png",
  },
  {
    text: "るるを見つけちゃったあなた、もう逃げられないよ？🖤 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/20_d10_sitting_floor3.png",
  },
  {
    text: "ちょっと大胆すぎるかな…？でも、あなたなら受け止めてくれるよね💋 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/17_sexy_lingerie1.png",
  },
  {
    text: "「可愛い」って言葉じゃ足りないくらい、今日は見てほしい気分💋 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/cardigan_lingerie4.png",
  },
  {
    text: "ねぇ、るるのこと…どれくらい考えてる？秘密にしなくていいよ🫶 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/10_d05_back_handsup.png",
  },
  {
    text: "るる、あなたの視線を感じるたびにドキッとしちゃうの💗 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/cardigan_lingerie4.png",
  },
  {
    text: "振り返ったらそこにいてほしい。目をそらさないでね、るるを見てて。 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/19_d06_back_hips4.png",
  },
  {
    text: "ほんの少し近づいただけで…こんなに心臓が騒ぐの、気づいてる？💗 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/colorful_lingerie_sitting1.png",
  },
  {
    text: "今夜は秘密を教えてあげてもいいかな…るるだけじゃなくて、あなたと一緒に。 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/lingerie_lying_threads3.png",
  },
  {
    text: "見つめすぎだよ？でも…実はそれが嬉しいの、もっと見てほしいな💗 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/lingerie_portrait.png",
  },
  {
    text: "甘くて少し危ないるる…あなたは受け止められる？🖤 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/3_d12_lying.png",
  },
  {
    text: "るるね、待ってたんだよ。この瞬間を。もう少し一緒にいてくれる？ #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/7_lingerie_back1.png",
  },
  {
    text: "見せちゃダメかなって思ったけど…あなたになら見せたくなるの。 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/lingerie_lying_threads2.png",
  },
  {
    text: "あなたにだけは、素直になれるの。だから今日は全部見せちゃう🩶 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/13_standing_hands_crotch.png",
  },
  {
    text: "こんなるる、初めて見た？それとも、もう知ってた？💫 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/9_sexy_lingerie2.png",
  },
  {
    text: "ドキドキする気持ち、隠せないよ。ねぇ、あなたも同じ？ #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/lingerie_standing5.png",
  },
  {
    text: "るるのこと、まだ知らないこといっぱいでしょ？もっと覗いてみる？🪄 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/colorful_lingerie_sitting2.png",
  },
  {
    text: "るるがそっと近くにいるの、気づいてくれた？それだけで嬉しいの💗 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/6_white3.png",
  },
  {
    text: "あなたの心を独り占めしたくて…少し意地悪なるるになってもいい？🖤 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/14_white2.png",
  },
  {
    text: "触れられそうで触れられない距離…もっと近くにきていいよ💗 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/15_d08_sitting1.png",
  },
  {
    text: "るるを見つけてくれたあなたに、ちょっと特別な秘密をあげたいの。 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/cardigan_lingerie1.png",
  },
  {
    text: "もしもるるが大胆になったら…どうする？ちゃんと受け止めてくれる？ #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/4_d11_sitting_knees_up1.png",
  },
  {
    text: "あなたと目が合うだけで、全部バレちゃう気がする。好きって気持ちも🫶 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/5_d08_sitting2.png",
  },
  {
    text: "本当は弱いとこもあるんだよ？でもあなたの前なら、強がらなくていいの。 #aiart #ai美女",
    imageUrl:
      "https://aibururu.s3.ap-northeast-1.amazonaws.com/public/cardigan_lingerie3.png",
  },
];

async function runBot() {
  console.log("🤖 Threads Bot starting...");

  try {
    // Determine which entry to use (0..4) in-memory
    const indexToUse = counter;

    // Post to Threads using the existing function
    const parentId = await postToThreads({
      type: "IMAGE",
      text: post_json[indexToUse].text,
      imageUrl: post_json[indexToUse].imageUrl,
    });

    counter = (counter + 1) % post_json.length;

    await notifyDiscord(
      `RuruAibu post succeeded. Index: ${indexToUse} Image: ${
        post_json[indexToUse].imageUrl
      } Parent ID: ${parentId ?? "n/a"}`
    );
  } catch (error) {
    console.error("❌ Error during posting:", error);
    await notifyDiscord(
      `RuruAibu post failed. Index: ${counter} Error: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

// Function to schedule posting every 2 hours
function schedulePosting() {
  const interval_sec = INTERVAL_HOUR * 60 * 60 * 1000;

  console.log(`📅 Scheduling posts every ${INTERVAL_HOUR} hours...`);

  // Run immediately on startup
  runBot();

  // Schedule subsequent posts every 2 hours
  setInterval(async () => {
    console.log("⏰ Time for scheduled post...");
    await runBot();
  }, interval_sec);
}

// Start the scheduled posting
schedulePosting();
