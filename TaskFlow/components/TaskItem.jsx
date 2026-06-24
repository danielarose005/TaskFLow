import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TaskItem({ item, onToggle, onDelete }) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onToggle(item)}
      onLongPress={() => onDelete(item.id)}
      activeOpacity={0.75}
    >
      <MaterialIcons
        name={item.completed ? 'check-box' : 'check-box-outline-blank'}
        size={26}
        color={item.completed ? '#2E5BBA' : '#5A6472'}
      />

      <View style={styles.textWrap}>
        <Text style={[styles.title, item.completed && styles.completedTitle]}>{item.title}</Text>
        <Text style={styles.hint}>Long press to delete</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#1F2A44',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: '#1F2A44',
    fontSize: 16,
    fontWeight: '600',
  },
  completedTitle: {
    color: '#7C8796',
    textDecorationLine: 'line-through',
  },
  hint: {
    color: '#5A6472',
    fontSize: 12,
    marginTop: 4,
  },
});