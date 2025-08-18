import { DeleteModal } from "@/components/DeleteModal";
import AddDocumentBtn from "@/components/ui/AddDocumentBtn";
import Header from "@/components/ui/Header";
import { getDocuments } from "@/lib/actions/room.action";
import { dateConverter } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const clerkUser = await currentUser(); // عشان نقول انه اللي مش مسجل دخول ما يقدر ينشئ دكيومنت
  if (!clerkUser) redirect("/sign-in");

  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress)

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
      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
            <div className="document-list-title">
              <h3 className="text-28-semiblod">All Documents</h3>
              <AddDocumentBtn
                userId={clerkUser.id}
                email={clerkUser.emailAddresses[0].emailAddress}
              />
            </div>
            <ul className="document-ul">
              {
                roomDocuments.data.map(({id , metadata , createdAt }: any) => (
                  <li key={id} className="document-list-item">
                    <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                      <div className="hidden rounded-md bg-dark-100 p-2 sm:block">
                        <Image
                          src='/assets/icons/doc.svg'
                          width={40}
                          height={40}
                          alt={metadata.title}
                          priority
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="line-clamp-1 text-lg">{metadata.title}</p>
                        <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                      </div>
                    </Link>
                    {/* delete button later */}
                    <DeleteModal roomId= {id}/>
                  </li>
                ))
              }
            </ul>
        </div>
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
