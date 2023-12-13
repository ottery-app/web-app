import { makeUseQuery } from "../../queryStatus/makeGetQuery";
import { getAll } from "./formApi";

export const CLIENT_FORM_TAG = "form";

export function useFormClient() {
  const useGetAllFormFields = makeUseQuery({
    queryKey: [CLIENT_FORM_TAG],
    queryFn: getAll,
  });

  return {
    useGetAllFormFields,
  };
}
