import type {
  ICollectionResponse,
  ICreateMessageBody,
  IMessage,
} from "@/interface/api";
import { satellite } from "@/services/satellite";

/** Lists inbound contact messages, newest first. */
export async function fetchMessages(): Promise<ICollectionResponse<IMessage>> {
  const { data } = await satellite.get<ICollectionResponse<IMessage>>(
    "/messages",
  );

  return data;
}

/** Submits a contact message. */
export async function createMessage(
  body: ICreateMessageBody,
): Promise<IMessage> {
  const { data } = await satellite.post<IMessage>("/messages", body);

  return data;
}