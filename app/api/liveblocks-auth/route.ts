import { liveblocks } from "@/lib/liveblocks"; // هنا نستورد إعدادات Liveblocks اللي تم تعريفها مسبقاً في ملف lib/liveblocks
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(request: Request) {

  const clerkUser = await currentUser();   // نحاول نجيب بيانات المستخدم الحالي من Clerk

  if (!clerkUser) redirect("sign-in");    // إذا ما فيه مستخدم مسجل دخول → نوجهه لصفحة تسجيل الدخول

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;   // نستخرج البيانات المهمة من المستخدم

  // نبني object يحتوي على بيانات المستخدم + لون خاص فيه
  const user = {
    id, // هذا هو الـ id الرئيسي للمستخدم (مثلاً: من Clerk)
    info: {
      id, // هذا نفس الـ id مكرر داخل info (لأنه ممكن تحتاجه في مكان تاني داخل بيانات المستخدم)
      name: `${firstName}  ${lastName}`, 
      email: emailAddresses[0].emailAddress, 
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };

  // نعرف المستخدم في Liveblocks ونرسل بياناته
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email, // نستخدم الإيميل كـ userId في Liveblocks
      groupIds: [], // ممكن تحدد مجموعات للمستخدم (اختياري)
    },
    { userInfo: user.info } // نرسل معلومات إضافية عن المستخدم
  );

  // نرجع الرد لواجهة المستخدم مع حالة الاستجابة
  return new Response(body, { status });
}
