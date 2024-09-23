import Image from "next/image";
import Button from "../Button";
import CreateTodoModal from "../CreateTodoModal/CreateTodoModal";
import TaskCard from "../TaskCard";
import styles from './TodoList.module.scss';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import EmptyImage from '@/assets/emptyImage.svg';

const TodoList: React.FC = () => {
  const [pendingTodos, setPendingTodos] = useState<string[]>(() => {
    // Inicializa o estado com os dados do localStorage, se disponíveis
    const savedPendingTodos = localStorage.getItem('pendingTodos');
    return savedPendingTodos ? JSON.parse(savedPendingTodos) : [];
  });
  const [completedTodos, setCompletedTodos] = useState<string[]>(() => {
    // Inicializa o estado com os dados do localStorage, se disponíveis
    const savedCompletedTodos = localStorage.getItem('completedTodos');
    return savedCompletedTodos ? JSON.parse(savedCompletedTodos) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Salva tarefas no localStorage sempre que os estados mudam
  useEffect(() => {
    localStorage.setItem('pendingTodos', JSON.stringify(pendingTodos));
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [pendingTodos, completedTodos]);

  // Função para adicionar uma nova tarefa
  const handleAddTask = (newTask: string) => {
    setPendingTodos(prev => [...prev, newTask]);
    setIsModalOpen(false);
  };

  // Função para deletar uma tarefa da lista de pendentes ou concluídas
  const handleDeleteTask = (id: number, isCompleted: boolean) => {
    if (isCompleted) {
      setCompletedTodos(prev => prev.filter((_, index) => index !== id));
    } else {
      setPendingTodos(prev => prev.filter((_, index) => index !== id));
    }
  };

  // Função para alternar o status da tarefa (pendente <=> completada)
  const handleToggleTaskStatus = (task: string, isCompleted: boolean) => {
    if (isCompleted) {
      setCompletedTodos(prev => prev.filter(todo => todo !== task));
      setPendingTodos(prev => [...prev, task]);
    } else {
      setPendingTodos(prev => prev.filter(todo => todo !== task));
      setCompletedTodos(prev => [...prev, task]);
    }
  };

  // Renderiza o estado vazio
  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <h2 className={styles.emptyStateTitle}>Você ainda não tem atividades</h2>
      <p className={styles.motivationalText}>
        Que tal começar agora e organizar seu dia? Adicione sua primeira tarefa!
      </p>
      <Image width={200} height={200} src={EmptyImage} alt="imagem" />
    </div>
  );

  return (
    <div className={styles.content}>
      <div className={styles.todosContainer}>
        {pendingTodos.length === 0 && completedTodos.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            <h2 className={styles.title}>Suas tarefas de hoje</h2>
            <div className={styles.pendingTodos}>
              {pendingTodos.map((todo, index) => (
                <TaskCard
                  key={index}
                  text={todo}
                  id={String(index)}
                  isCompleted={false} // Passa como não completa
                  onDelete={() => handleDeleteTask(index, false)} // Deletar da lista pendente
                  onToggle={() => handleToggleTaskStatus(todo, false)} // Mover para a lista completada
                />
              ))}
            </div>
            <h2 className={styles.title}>Tarefas finalizadas</h2>
            <div className={styles.completedTodos}>
              {completedTodos.map((todo, index) => (
                <TaskCard
                  key={index}
                  text={todo}
                  id={String(index)}
                  isCompleted={true} // Passa como completa
                  onDelete={() => handleDeleteTask(index, true)} // Deletar da lista completada
                  onToggle={() => handleToggleTaskStatus(todo, true)} // Mover para a lista pendente
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Trigger asChild>
          <Button
            text="Adicionar nova tarefa"
            variant="primaryLarge"
            onClick={() => setIsModalOpen(true)}
          />
        </Dialog.Trigger>

        <CreateTodoModal onAddTask={handleAddTask} />
      </Dialog.Root>
    </div>
  );
};

export default TodoList;
