import CollaborativeRoom from "@/components/ui/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.action";
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

  return (
    <main className="flex w-full flex-col">
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
      />
    </main>
  );
};

export default Document;
