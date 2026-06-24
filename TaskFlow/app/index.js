import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import AddTaskModal from '../components/AddTaskModal';
import TaskItem from '../components/TaskItem';
import { supabase } from '../lib/supabase';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not load tasks', text2: error.message });
      return;
    }

    setTasks(data ?? []);
  }

  async function handleSubmitTask(title) {
    const { error } = await supabase
      .from('tasks')
      .insert([{ title, completed: false }]);

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not add task', text2: error.message });
      return;
    }

    setModalVisible(false);
    await loadTasks();
    Toast.show({ type: 'success', text1: 'Task added' });
  }

  async function handleToggleTask(item) {
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !item.completed })
      .eq('id', item.id);

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not update task', text2: error.message });
      return;
    }

    await loadTasks();
  }

  async function handleDeleteTask(id) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not delete task', text2: error.message });
      return;
    }

    await loadTasks();
    Toast.show({ type: 'success', text1: 'Task deleted' });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>TaskFlow</Text>
          <Text style={styles.subtitle}>Keep today moving.</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <MaterialIcons name="add" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={tasks.length === 0 ? styles.emptyList : styles.listContent}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem item={item} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="playlist-add-check" size={46} color="#9AA4B2" />
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptyText}>Tap the add button to create your first task.</Text>
          </View>
        }
      />

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmitTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FC',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 56,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  title: {
    color: '#1F2A44',
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: '#5A6472',
    fontSize: 15,
    marginTop: 4,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E5BBA',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 28,
    gap: 12,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#1F2A44',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
  },
  emptyText: {
    color: '#5A6472',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
    textAlign: 'center',
  },
});
