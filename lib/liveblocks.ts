import { Liveblocks } from "@liveblocks/node";  //هاي مكتبة بتشتغل فالسيرفر فبالتالي لما بدي استخدمها حستخدمها فالسيرفر اكشن

export const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});