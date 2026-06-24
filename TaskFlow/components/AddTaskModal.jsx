import { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AddTaskModal({ visible, onClose, onSubmit }) {
  const [text, setText] = useState('');

  function handleAdd() {
    const title = text.trim();

    if (!title) {
      return;
    }

    onSubmit(title);
    setText('');
  }

  function handleCancel() {
    setText('');
    onClose();
  }

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={handleCancel}>
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.title}>Add Task</Text>

          <TextInput
            style={styles.input}
            placeholder="What needs to get done?"
            placeholderTextColor="#8B95A5"
            value={text}
            onChangeText={setText}
            autoFocus
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(31, 42, 68, 0.55)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    gap: 16,
  },
  title: {
    color: '#1F2A44',
    fontSize: 22,
    fontWeight: '800',
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#D7DDE8',
    borderRadius: 8,
    paddingHorizontal: 14,
    color: '#1F2A44',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    minHeight: 46,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2F7',
  },
  cancelText: {
    color: '#5A6472',
    fontSize: 15,
    fontWeight: '700',
  },
  addButton: {
    minHeight: 46,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E5BBA',
  },
  addText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});