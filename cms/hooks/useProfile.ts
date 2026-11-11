"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { IProfile, IUpdateProfileBody } from "@/interface/api";
import { fetchProfile, updateProfile } from "@/services/profileService";
import { queryKeys } from "@/services/queryKeys";

/** Reads the profile row through the shared query cache. */
export function useProfile() {
  return useQuery<IProfile>({
    queryKey: queryKeys.profile,
    queryFn: fetchProfile,
  });
}

/** Replaces the profile row and refreshes the cached copy. */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<IProfile, Error, IUpdateProfileBody>({
    mutationFn: updateProfile,
    onSuccess: (profile) => {
      queryClient.setQueryData(queryKeys.profile, profile);
    },
  });
}