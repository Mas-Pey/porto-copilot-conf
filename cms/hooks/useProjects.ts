"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  ICollectionResponse,
  ICreateProjectBody,
  IProject,
  IUpdateProjectBody,
} from "@/interface/api";
import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from "@/services/projectService";
import { queryKeys } from "@/services/queryKeys";

/** Lists projects. */
export function useProjects() {
  return useQuery<ICollectionResponse<IProject>>({
    queryKey: queryKeys.projects,
    queryFn: fetchProjects,
  });
}

/** Creates a project and invalidates the list. */
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation<IProject, Error, ICreateProjectBody>({
    mutationFn: createProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
}

/** Updates a project and invalidates the list. */
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation<IProject, Error, { id: number; body: IUpdateProjectBody }>({
    mutationFn: ({ id, body }) => updateProject(id, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
}

/** Deletes a project and invalidates the list. */
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
}