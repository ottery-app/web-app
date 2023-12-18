import { query_paths } from "../provider/queryClient";
import { makeUseQuery } from "../queryStatus/makeGetQuery";
import { getChildAtEvent } from "./attendanceApi";

export function useAttendanceClient() {

  const useGetChildAtEvent = makeUseQuery({
    queryKey: [query_paths.attendance],
    queryFn: getChildAtEvent,
  })

  return {
    useGetChildAtEvent
  };
}
