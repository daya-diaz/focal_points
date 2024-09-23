import * as Dialog from '@radix-ui/react-dialog';
import styles from './DeleteTodoModal.module.scss';
import Button from '../Button';

interface DeleteTodoModalProps {
  onDelete: () => void;
}

const DeleteTodoModal: React.FC<DeleteTodoModalProps> = ({ onDelete }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.modalContainer}>
        <Dialog.Title className={styles.title}>Deletar tarefa</Dialog.Title>
        <Dialog.Description className={styles.description}>
          Tem certeza que você deseja deletar essa tarefa?
        </Dialog.Description>

        <div className={styles.buttonContainer}>
          <Dialog.Close asChild>
            <Button text="Cancelar" variant="secondary" />
          </Dialog.Close>
          <Button
            text="Deletar"
            variant="delete"
            onClick={onDelete} 
          />
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default DeleteTodoModal;
