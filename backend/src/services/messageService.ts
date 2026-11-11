import type { PrismaClientInstance } from '../plugins/prisma.js';
import type { IMessage } from '../interface/api.js';
import type { CreateMessageBody } from '../interface/apiSchema.js';
import { toMessageDto } from './mappers.js';

/** Contact-form submissions. */

export async function createMessage(
  prisma: PrismaClientInstance,
  input: CreateMessageBody,
): Promise<IMessage> {
  const row = await prisma.message.create({
    data: {
      name: input.name,
      email: input.email,
      message: input.message,
    },
  });

  return toMessageDto(row);
}

/** Newest first, so the inbox reads like an email client. */
export async function getMessages(
  prisma: PrismaClientInstance,
): Promise<readonly IMessage[]> {
  const rows = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return rows.map(toMessageDto);
}