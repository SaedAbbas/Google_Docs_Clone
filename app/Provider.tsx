"use client";
import {ClientSideSuspense,LiveblocksProvider} from "@liveblocks/react/suspense";
import Loader from "@/components/ui/Loader";
import { ReactNode } from "react";
import { getClerkUsers, getDocumentsUsers } from "@/lib/actions/user.action";
import { useUser } from "@clerk/nextjs";

const Provider = ({ children }: { children: ReactNode }) => {

  const {user: clerkUser} = useUser() //useUser هاي بتشتغل فالكلينت كمبوننت عكس الكرنت يوزر
  return (
    //السبب إنه استخدم authEndpoint بدل المفتاح العام هو الأمان، عشان ما ينكشف مفتاحك السري في المتصفح.
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => { // بدونه مش حيقدر يتعرف عاليوزرز اللايف بلوكس
     // جلب بيانات المستخدمين (الاسم، الإيميل، الصورة) من Clerk حسب الإيميلات القادمة من Liveblocks
        const users = await getClerkUsers({ userIds: userIds ?? [] });
        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId}) => { // هاي عشان المنشن يشتغل
        const roomUsers = await getDocumentsUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses?.[0]?.emailAddress ?? "",
          text
        })
        return roomUsers
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;

/*
يطلب من Liveblocks إصدار توكن مصادقة (auth token) خاص بهذا المستخدم عن طريق liveblocks.identifyUser(...). 
يرجع التوكن للواجهة (الكلاينت) كاستجابة.
*/

/** 
5. السيناريو بالكامل:
المستخدم يدخل التطبيق وهو مسجل دخول (عبر Clerk).

LiveblocksProvider في الكلاينت يطلب توكن من /api/liveblocks-auth.

السيرفر يجيب بيانات المستخدم (من Clerk) وينادي Liveblocks لتحديد هوية المستخدم.

السيرفر يرجع توكن مصادقة للكلاينت.

الكلاينت يستخدم التوكن عشان يتصل بغرف Liveblocks ويشغل الـ realtime collaboration مع الصلاحيات الصحيحة.


| النقطة                 | الوصف                                                        |
| ---------------------- | ------------------------------------------------------------ |
| `authEndpoint`         | رابط API في السيرفر يطلع توكن مصادقة للمستخدم                |
| `/api/liveblocks-auth` | API Route يستخرج بيانات المستخدم ويصدر توكن من Liveblocks    |
| `LiveblocksProvider`   | يستخدم التوكن عشان يدخل المستخدم لغرف Liveblocks مع صلاحياته |

 */


/*

بدون resolveUsers:

json

["user1@example.com", "user2@example.com"]
مع resolveUsers:

json
[
  { "id": "abc123", "name": "Saeed Abbas", "email": "saeed@example.com", "avatar": "https://..." },
  { "id": "xyz456", "name": "Omar Ali", "email": "omar@example.com", "avatar": "https://..." }
]


*/
