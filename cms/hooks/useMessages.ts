"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  ICollectionResponse,
  ICreateMessageBody,
  IMessage,
} from "@/interface/api";
import { createMessage, fetchMessages } from "@/services/messageService";
import { queryKeys } from "@/services/queryKeys";

/** Lists inbound contact messages. */
export function useMessages() {
  return useQuery<ICollectionResponse<IMessage>>({
    queryKey: queryKeys.messages,
    queryFn: fetchMessages,
  });
}

/** Submits a message and invalidates the inbox. */
export function useCreateMessage() {
  const queryClient = useQueryClient();

  return useMutation<IMessage, Error, ICreateMessageBody>({
    mutationFn: createMessage,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.messages });
    },
  });
}