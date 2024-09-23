import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import styles from './CreateTodoModal.module.scss';
import Button from '../Button';

interface CreateTodoModalProps {
  onAddTask: (taskName: string) => void;
}

const CreateTodoModal: React.FC<CreateTodoModalProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState(false);

  const handleAddTask = () => {
    if (taskName.trim() === '') {
      setError(true);  
    } else {
      onAddTask(taskName);
      setTaskName('');
      setError(false); 
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />

      <Dialog.Content className={styles.modalContainer}>
        <Dialog.Title className={styles.title}>Nova tarefa</Dialog.Title>

        <div className={styles.inputContainer}>
          <label htmlFor="taskName" className={styles.label}>
            Tarefa
          </label>
          <input
            id="taskName"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className={`${styles.input} ${error ? styles.errorInput : ''}`} 
            placeholder="Digite"
          />
          {error && <span className={styles.errorMessage}>Preencha o campo Tarefa.</span>}
        </div>

        <div className={styles.buttonContainer}>
          <Dialog.Close asChild>
            <Button 
              text="Cancelar" 
              variant="secondary" 
            />
          </Dialog.Close>
          <Button 
            text="Adicionar" 
            variant="primarySmall" 
            onClick={handleAddTask} 
          />
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default CreateTodoModal;
