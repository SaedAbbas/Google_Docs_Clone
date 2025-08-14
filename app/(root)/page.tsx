import AddDocumentBtn from "@/components/ui/AddDocumentBtn";
import Header from "@/components/ui/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const clerkUser = await currentUser(); // عشان نقول انه اللي مش مسجل دخول ما يقدر ينشئ دكيومنت
  if (!clerkUser) redirect("/sign-in");
  const documents = [];
  return (
    <main className="home-container">
      <Header className="sticky top-0 left-0">
        <div className="flex items-center gap-2 lg:gap-4">
          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {documents.length > 0 ? (
        <div className=""></div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="docs"
            width={40}
            height={40}
            className="mx-auto"
            priority
          />
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>

        // to add documnet we send the userid and his email from clerk and then when click to add doc the room will create automatically in server from server action and then the borwser will direct me to the document page with random id and this id for the room and this id we can take it and passes to CollaborativeRoom component that contain room provider and passes to this provider to know who is in this room and display all user in conditions
      )}
    </main>
  );
}
