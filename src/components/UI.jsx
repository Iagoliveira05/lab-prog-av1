import { useEffect, useRef } from "react";
import { FiX, FiAlertCircle } from "react-icons/fi";
export function Notice({ error, success, onRetry }) {
  if (!error && !success) return null;
  return (
    <div
      className={`notice ${error ? "error" : "success"}`}
      role={error ? "alert" : "status"}
    >
      <FiAlertCircle />
      <span>{error || success}</span>
      {error && onRetry && <button onClick={onRetry}>Tentar novamente</button>}
    </div>
  );
}
export function Modal({ title, children, onClose, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? "modal-wide" : ""}`}
      aria-labelledby="modal-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="modal-header">
        <div>
          <span className="eyebrow">SEU ESPAÇO, ORGANIZADO</span>
          <h2 id="modal-title">{title}</h2>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Fechar">
          <FiX />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function EmptyState({ icon: Icon, title, description, children }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
}
export function Stat({ label, value, icon: Icon, detail, accent }) {
  return (
    <div className={`stat-card ${accent ? "stat-accent" : ""}`}>
      <div className="stat-top">
        <span>{label}</span>
        <Icon />
      </div>
      <strong>{value}</strong>
      <span className="stat-detail">{detail}</span>
    </div>
  );
}
