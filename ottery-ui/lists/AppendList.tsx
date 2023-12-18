import { StyleSheet, View } from "react-native";

import { PropsWithChildren, ReactElement } from "react";
import { IconButton, Text } from "react-native-paper";
import { colors } from "../styles/colors";
import { radius } from "../styles/radius";

interface AppendListProps<T> {
  items: T[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  renderItem: (item: T) => ReactElement;
}

interface ItemProps {
  id: string;
  onDelete: (id: string) => void;
}

function Item({ children, id, onDelete }: PropsWithChildren<ItemProps>) {
  function handleDeleteItem(id: string) {
    return () => {
      onDelete(id);
    };
  }

  return (
    <View style={styles.itemField}>
      <View style={styles.item}>{children}</View>
      <IconButton
        icon="delete"
        iconColor={colors.error.contrastText}
        containerColor={colors.error.main}
        onPress={handleDeleteItem(id)}
        style={{ borderRadius: radius.default }}
      />
    </View>
  );
}

function AppendList<T extends { id: string }>({
  items,
  onAdd,
  onDelete,
  renderItem,
}: AppendListProps<T>) {
  return (
    <>
      {items.map((item) => (
        <Item id={item.id} key={item.id} onDelete={onDelete}>
          {renderItem(item)}
        </Item>
      ))}
      <View style={styles.itemField}>
        <Text>Add New Field</Text>
        <IconButton
          containerColor={colors.success.main}
          icon="plus"
          iconColor={colors.primary.contrastText}
          mode="contained"
          onPress={onAdd}
          style={{ borderRadius: radius.default }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  itemField: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
  },
});

export default AppendList;
