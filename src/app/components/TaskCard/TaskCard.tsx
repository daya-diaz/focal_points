"use client";

import { TrashSimple } from "@phosphor-icons/react/dist/ssr";
import styles from './TaskCard.module.scss';
import * as Dialog from '@radix-ui/react-dialog';
import DeleteTodoModal from "../DeleteTodoModal/DeleteTodoModal";
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

interface TaskCardProps {
  id: string;
  text: string;
  isCompleted: boolean;
  onDelete: () => void;
  onToggle: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, text, isCompleted, onDelete, onToggle }) => {

  return (
    <div className={styles.container}>
      <div className={styles.checkboxContainer}>
        <Checkbox.Root
          className={styles.checkbox}
          id={id}
          checked={isCompleted} // O estado checked é passado pela prop
          onCheckedChange={onToggle} // Alterna o status ao ser clicado
        >
          <Checkbox.Indicator className={styles.checkboxIndicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label
          className={`${styles.label} ${isCompleted ? styles.checked : ''}`}
          htmlFor={id}
        >
          {text}
        </label>
      </div>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className={styles.deleteTodoButton}>
            <TrashSimple size={24} color="#B0BBD1" />
          </button>
        </Dialog.Trigger>

        <DeleteTodoModal onDelete={onDelete} />
      </Dialog.Root>
    </div>
  );
};

export default TaskCard;
