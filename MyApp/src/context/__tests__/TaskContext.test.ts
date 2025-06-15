import { renderHook, act } from '@testing-library/react-hooks';
import { TaskProvider } from '../taskContext';
import { useTasks } from '../../hooks/useTasks';
import React from 'react';
import { Task } from '../../types/Task';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TaskProvider>{children}</TaskProvider>
);

describe('TaskContext', () => {
  it('devrait mettre à jour une tâche existante', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    const task: Task = {
      id: 1,
      title: 'Tâche test',
      description: 'Description test',
      isDone: false,
      createdAt: new Date().toISOString(),
    };

    
    act(() => {
      result.current.createTask(task);
    });

    // Met à jour la tâche
    act(() => {
      result.current.updateTask({ ...task, isDone: true });
    });

    // Vérifie que l'état est à jour
    expect(result.current.tasks.find(t => t.id === task.id)?.isDone).toBe(true);
  });
});
