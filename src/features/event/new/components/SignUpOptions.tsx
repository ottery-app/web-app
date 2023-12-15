import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { FormFieldDto, classifyWithDto } from "@ottery/ottery-dto";

import { EventFormData } from "..";
import AppendList from "../../../../../ottery-ui/lists/AppendList";
import CustomField, { FieldData } from "./CustomField";

export function makeHandleDone(
  setForm: React.Dispatch<React.SetStateAction<EventFormData>>,
  listFieldName: string
) {
  return function handleDone(fields: FieldData[]) {
    setForm((eventForm) => {
      eventForm[listFieldName] = [...fields];
      return eventForm;
    });
  };
}

interface SignUpOptionsProps {
  fields: FieldData[];
  handleUpdate: (fields: FieldData[]) => void;
  updateErrorHandler: React.Dispatch<React.SetStateAction<() => void>>;
}

function SignUpOptions({
  fields = [],
  handleUpdate,
  updateErrorHandler,
}: SignUpOptionsProps) {
  const [items, setItems] = useState(fields);

  useEffect(() => {
    updateErrorHandler(() => {
      for (let i = 0; i < items.length; i++) {
        if (!classifyWithDto(FormFieldDto, items[i])) {
          return "All fields must be marked done.";
        }
      }
    });

    handleUpdate(items);
  }, [items]);

  function handleAdd() {
    setItems((prev) => [...prev, { id: nanoid() }]);
  }

  function handleDelete(id: string) {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
  }

  function handleDone(updatedData: FieldData) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedData.id) {
        return updatedData;
      }
      return item;
    });

    setItems(updatedItems);
  }

  function renderListItem(item: FieldData) {
    return <CustomField data={item} key={item.id} onDone={handleDone} />;
  }

  return (
    <AppendList<FieldData>
      items={items}
      onAdd={handleAdd}
      onDelete={handleDelete}
      renderItem={renderListItem}
    />
  );
}

export default SignUpOptions;