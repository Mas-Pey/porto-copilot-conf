import type { IProfile, IUpdateProfileBody } from "@/interface/api";
import { satellite } from "@/services/satellite";

/** Reads the singleton profile row. */
export async function fetchProfile(): Promise<IProfile> {
  const { data } = await satellite.get<IProfile>("/profile");

  return data;
}

/** Replaces the profile row. */
export async function updateProfile(
  body: IUpdateProfileBody,
): Promise<IProfile> {
  const { data } = await satellite.put<IProfile>("/profile", body);

  return data;
}