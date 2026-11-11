import type {
  ICollectionResponse,
  ICreateProjectBody,
  IProject,
  IUpdateProjectBody,
} from "@/interface/api";
import { satellite } from "@/services/satellite";

/** Lists every project. */
export async function fetchProjects(): Promise<ICollectionResponse<IProject>> {
  const { data } = await satellite.get<ICollectionResponse<IProject>>(
    "/projects",
  );

  return data;
}

/** Reads one project by id. */
export async function fetchProjectById(id: number): Promise<IProject> {
  const { data } = await satellite.get<IProject>(`/projects/${id}`);

  return data;
}

/** Creates a project. */
export async function createProject(
  body: ICreateProjectBody,
): Promise<IProject> {
  const { data } = await satellite.post<IProject>("/projects", body);

  return data;
}

/** Replaces a project. */
export async function updateProject(
  id: number,
  body: IUpdateProjectBody,
): Promise<IProject> {
  const { data } = await satellite.put<IProject>(`/projects/${id}`, body);

  return data;
}

/** Deletes a project. The backend answers `204 No Content`. */
export async function deleteProject(id: number): Promise<void> {
  await satellite.delete(`/projects/${id}`);
}