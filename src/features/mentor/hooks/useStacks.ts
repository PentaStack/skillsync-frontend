import { useQuery } from "@tanstack/react-query";
import * as stackApi from "../api/stack.api";

export function useStacks() {
  return useQuery({
    queryKey: ["stacks"],
    queryFn: stackApi.getStacks,
  });
}
