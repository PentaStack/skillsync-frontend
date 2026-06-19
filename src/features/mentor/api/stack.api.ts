import { apiClient } from "@/lib/api-client";
import type { Stack } from "../types";

export async function getStacks(): Promise<Stack[]> {
  const { data } = await apiClient.get<Stack[]>("/stacks");
  return data;
}
