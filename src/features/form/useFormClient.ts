import { makeUseQuery } from "../../queryStatus/makeGetQuery";
import { getAll, getBaseFields } from "./formApi";

export const CLIENT_FORM_TAG = "form";

export function useFormClient() {
  const useGetAllFormFields = makeUseQuery({
    queryKey: [CLIENT_FORM_TAG],
    queryFn: getAll,
  });

  const useGetBaseFormFields = makeUseQuery({
    queryFn: getBaseFields,
    queryKey: [CLIENT_FORM_TAG]
  })

  return {
    useGetBaseFormFields,
    useGetAllFormFields,
  };
}
