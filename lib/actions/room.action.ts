'use server'
import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

//Set permission accesses to a room after creating a document
export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      createId: userId,
      email,
      title: "untitled",
    };

    const usersAccesses : RoomAccesses = {
        [email]: ['room:write']
    }

    const room = await liveblocks.createRoom(roomId, {
        metadata,
        usersAccesses,
        defaultAccesses:[]
    });
    revalidatePath('/')

    return parseStringify(room)  //export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.log("error happend while creating a room", error);
  }
};
