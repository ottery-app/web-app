import { makeUseQuery } from "../../queryStatus/makeGetQuery";
import { getAll, getBaseFields, getFieldsByIds } from "./formApi";

export const CLIENT_FORM_TAG = "form";

export function useFormClient() {
  const useGetAllFormFields = makeUseQuery({
    queryKey: [CLIENT_FORM_TAG],
    queryFn: getAll,
  });

  const useGetBaseFormFields = makeUseQuery({
    queryFn: getBaseFields,
    queryKey: [CLIENT_FORM_TAG]
  });

  const useGetFieldsByIds = makeUseQuery({
    queryKey: [CLIENT_FORM_TAG],
    queryFn: getFieldsByIds,
  });

  return {
    useGetBaseFormFields,
    useGetAllFormFields,
    useGetFieldsByIds
  };
}
