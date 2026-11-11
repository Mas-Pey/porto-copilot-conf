"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  ICollectionResponse,
  ICreateSkillBody,
  ISkill,
} from "@/interface/api";
import { queryKeys } from "@/services/queryKeys";
import { createSkill, deleteSkill, fetchSkills } from "@/services/skillService";

/** Lists skills. */
export function useSkills() {
  return useQuery<ICollectionResponse<ISkill>>({
    queryKey: queryKeys.skills,
    queryFn: fetchSkills,
  });
}

/** Creates a skill and invalidates the list. */
export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation<ISkill, Error, ICreateSkillBody>({
    mutationFn: createSkill,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.skills });
    },
  });
}

/** Deletes a skill and invalidates the list. */
export function useDeleteSkill() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteSkill,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.skills });
    },
  });
}