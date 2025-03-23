// Stylesheet import
import styles from "./Modal.module.css";

// Define the props interface for the Modal component
interface ModalProps {
  title: React.ReactNode; // Title to display in the modal header
  children: React.ReactNode; // Content to display inside the modal body
  onClose: () => void; // Callback to handle closing the modal
}

// Modal Component
export default function Modal({ title, children, onClose }: ModalProps) {
  return (
    // Modal overlay to capture background clicks and close the modal
    <div className={styles.modal__container} onClick={onClose}>
      {/* Modal content - stopPropagation prevents closing on internal clicks */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header with title and close button */}
        <div className={styles.modal__header}>
          <h2>{title}</h2>
          <button onClick={onClose}>&times;</button>
        </div>

        {/* Modal Body - displays the passed children */}
        <div className={styles.modal__body}>{children}</div>
      </div>
    </div>
  );
}
