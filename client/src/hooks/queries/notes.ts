import { fetchAllNotes } from "@/actions/notes";
import { useQuery } from "@tanstack/react-query";

export const useGetNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: fetchAllNotes,
  });
};
