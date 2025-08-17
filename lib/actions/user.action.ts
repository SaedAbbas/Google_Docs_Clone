"use server";

import { liveblocks } from '../liveblocks';
import { parseStringify } from '../utils';
import { clerkClient } from "@clerk/nextjs/server";

// دالة لجلب بيانات مستخدمين من Clerk حسب الإيميلات
export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    // إنشاء كائن Clerk Client للتعامل مع API الخاص بالسيرفر
    const client = await clerkClient();
    
    // استدعاء Clerk API لجلب المستخدمين اللي إيميلاتهم موجودة في المصفوفة userIds
    const { data } = await client.users.getUserList({
      emailAddress: userIds,
    });
    
    const users = data.map((user) => ({
      id: user.id, 
      name: `${user.firstName} ${user.lastName}`, 
      email: user.emailAddresses[0].emailAddress, 
      avatar: user.imageUrl, 
    }));
    
    // إعادة ترتيب النتائج بنفس ترتيب userIds
    // ليضمن أن البيانات اللي ترجع بنفس ترتيب الإيميلات اللي طلبتها
    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );
    
    // تحويل النتائج لكائن JSON نظيف (لحماية البيانات من مشاكل serialization)
    return parseStringify(sortedUsers);
    
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
};

export const getDocumentsUsers = async ({ roomId , currentUser , text }: {  roomId:string , currentUser:string , text:string }) => {
  try {
        const room = await liveblocks.getRoom(roomId)
        const users = Object.keys(room.defaultAccesses).filter((email) => email !== currentUser) // عشان المنشن لانه فالاخر ما بدي امنشن حالي طبعا

        if(text.length){
          const lowerCaseText = text.toLowerCase()

          const filteredUsers = users.filter((email) => email.toLowerCase().includes(lowerCaseText))
          
          return parseStringify(filteredUsers)
        
        }
        return parseStringify(users)
  } catch (error) {
        console.log('Error fetching document users:',error)
  }

}

