import type { FastifyPluginAsync } from 'fastify';

import {
  ApiErrorSchema,
  CreateMessageBodySchema,
  MessageSchema,
  collectionResponse,
  type CreateMessageBody,
} from '../interface/apiSchema.js';
import { createMessage, getMessages } from '../services/messageService.js';

const MessageCollectionSchema = collectionResponse(MessageSchema);

/** Contact-form routes. Plain module so the `/api` prefix applies. */
export const messageRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: CreateMessageBody }>(
    '/messages',
    {
      schema: {
        body: CreateMessageBodySchema,
        response: {
          201: MessageSchema,
          400: ApiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const message = await createMessage(fastify.prisma, request.body);

      return reply.code(201).send(message);
    },
  );

  fastify.get(
    '/messages',
    {
      schema: {
        response: { 200: MessageCollectionSchema },
      },
    },
    async () => {
      const data = await getMessages(fastify.prisma);

      return { count: data.length, data };
    },
  );
};

export default messageRoutes;