import CollaborativeRoom from "@/components/ui/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.action";
import { getClerkUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Document = async({params} : SearchParamProps) => {

  const {id} = await params

    const clerkUser = await currentUser()
    if(!clerkUser) redirect('/sign-in')

      const room = await getDocument({
        roomId: id,
        userId:clerkUser.emailAddresses[0].emailAddress
      })

      if(!room) redirect('/')
        
        //assess to the permissions of the user to access the document
        const userIds = Object.keys(room.usersAccesses) //يعني هاتلي الايميلات تعوتهم اللي هي عبارة عن كييز اللي موجودة بالغرفة
        const users = await getClerkUsers({userIds}) // بعدها بجيب كل اليوزر اللي تسجلوا بكليرك طبعا حسب الايميلات 

        const userData = users.map((user:User) => ({
          ...user, //معلومات اليوزر 
          // بعدها الغرفة بتشوف اذا الايميل هاد تاع اليوزر بحتوي على روم رايت فهو ادتر
          userType: room?.usersAccesses[user.email]?.includes('room:write') ? 'editor' : 'viewer'
        }))
        
        const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer'

  return (
    <main className="flex w-full flex-col">
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
        users={userData} // كل اليوزرز فالغرفة بمعلوماتهم ونوع صلاحيتهم ادتر او فيوور
        currentUserType={currentUserType}  //صلاحية الشخص الحالي صاحب اللي مسجل دخول
      />
    </main>
  );
};

export default Document;
