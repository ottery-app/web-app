import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { FormFieldDto, classifyWithDto, id } from "@ottery/ottery-dto";

import { EventFormData } from "..";
import AppendList, { AppendListItem } from "../../../../../ottery-ui/lists/AppendList";
import { useFormClient } from "../../../form/useFormClient";
import FieldSelect from "./FieldSelect";

export function makeHandleDone(
  setForm: React.Dispatch<React.SetStateAction<EventFormData>>,
  listFieldName: string
) {
  return function handleDone(fields: AppendListItem<FormFieldDto>[]) {
    setForm((eventForm) => {
      eventForm[listFieldName] = [...fields];
      return eventForm;
    });
  };
}

interface SignUpOptionsProps {
  fields: AppendListItem<FormFieldDto>[];
  handleUpdate: (fields: AppendListItem<FormFieldDto>[]) => void;
  updateErrorHandler: React.Dispatch<React.SetStateAction<() => void>>;
}

function SignUpOptions({
  fields = [],
  handleUpdate,
  updateErrorHandler,
}: SignUpOptionsProps) {
  const { useGetAllFormFields } = useFormClient();
  const formFieldsResponse = useGetAllFormFields();
  const formFields = (formFieldsResponse?.data?.data.map((formField)=>{return {id:formField._id, value:formField}}) || []);
  const [items, setItems] = useState(fields);

  useEffect(() => {
    updateErrorHandler(() => {
      for (let i = 0; i < items.length; i++) {
        if (!classifyWithDto(FormFieldDto, items[i].value)) {
          return "All fields must saved.";
        }
      }
    });

    handleUpdate(items);
  }, [items]);

  function handleAdd() {
    setItems((prev) => [...prev, { 
      id: nanoid(),
      value: {} as FormFieldDto,
    }]);
  }

  function handleDelete(id: string) {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
  }

  function handleDone(updatedData: AppendListItem<FormFieldDto>) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedData.id) {
        return updatedData;
      }
      return item;
    });

    setItems(updatedItems);
  }

  function renderListItem(item: AppendListItem<FormFieldDto>) {
    console.log(formFields);
    return (
      <FieldSelect onDone={handleDone} options={formFields} value={item} />
    );
  }

  return (
    <AppendList
      items={items}
      onAdd={handleAdd}
      onDelete={handleDelete}
      renderItem={renderListItem}
    />
  );
}

export default SignUpOptions;
