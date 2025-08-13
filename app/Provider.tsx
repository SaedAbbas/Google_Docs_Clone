"use client";
import {ClientSideSuspense,LiveblocksProvider} from "@liveblocks/react/suspense";
import Loader from "@/components/ui/Loader";
import { ReactNode } from "react";
import { getClerkUsers } from "@/lib/actions/user.action";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    //السبب إنه استخدم authEndpoint بدل المفتاح العام هو الأمان، عشان ما ينكشف مفتاحك السري في المتصفح.
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers(userIds);

        return users;
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
