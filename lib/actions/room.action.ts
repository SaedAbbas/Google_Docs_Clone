'use server'
import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

//Set permission accesses to a room after creating a document  //this code server action //use server

export const createDocument = async ( {userId,email}: CreateDocumentParams) => {

  const roomId = nanoid();

  try {
    const metadata = {
      createId: userId,
      email,
      title: "untitled",
    };
    
    // جهزت بيانات وصفية (metadata) عن الغرفة، زي مين عملها والإيميل والعنوان.
    
    const usersAccesses : RoomAccesses = {
      [email]: ['room:write']
    }
    
    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses:['room:write'] // صلاحية اللي فالغرفة برضه انهم يكتبوا
    });
    revalidatePath('/') //بعد ما الغرفة اتعملت، طلبت من Next.js يعمل تحديث للصفحة الرئيسية على السيرفر طبعا بدون رفرش على المتصفح / عشان يظهر فيها التغييرات.
    
    return parseStringify(room)  //export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.log("error happend while creating a room", error);
  }
};




export const getDocument = async ({roomId, userId}: {roomId:string, userId:string}) => {
    try {
        const room = await liveblocks.getRoom(roomId)
      
        // const hasAccsess = Object.keys(room.usersAccesses).includes(userId)    // userId:clerkUser.emailAddresses[0].emailAddress
        //   if(!hasAccsess) 
        //     throw new Error('You do not have access to this document')
      
          return parseStringify(room)
      
    } catch (error) {
        console.log('Error happend while getting a room :' , error)
    }
}
/*
بيجيب بيانات غرفة موجودة من Liveblocks

بيتأكد إن اليوزر الحالي عنده صلاحية دخول

لو مفيش صلاحية → يرمي Error

لو عنده → بيرجع بيانات الغرفة
*/





/*
لو ما عملتها Server Action وشغلتها في Client Component مباشرة؟
هيحصل خطأ لأن @liveblocks/node مكتبة خاصة بالسيرفر (تستخدم مفاتيح سرية وغير مصممة للكلاينت).

لذلك لازم تكون الدالة دي موجودة فقط في السيرفر (Server Action أو API Route).
*/