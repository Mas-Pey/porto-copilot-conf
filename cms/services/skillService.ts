import type {
  ICollectionResponse,
  ICreateSkillBody,
  ISkill,
} from "@/interface/api";
import { satellite } from "@/services/satellite";

/** Lists every skill. */
export async function fetchSkills(): Promise<ICollectionResponse<ISkill>> {
  const { data } = await satellite.get<ICollectionResponse<ISkill>>("/skills");

  return data;
}

/** Creates a skill. */
export async function createSkill(body: ICreateSkillBody): Promise<ISkill> {
  const { data } = await satellite.post<ISkill>("/skills", body);

  return data;
}

/** Deletes a skill. The backend answers `204 No Content`. */
export async function deleteSkill(id: number): Promise<void> {
  await satellite.delete(`/skills/${id}`);
}