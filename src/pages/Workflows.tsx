import styles from './MyTasks.module.css';

export const Workflows = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.pageHeader}>Workflows</div>
        <h1 className={styles.title}>Standardise approvals for quotations, campaigns & contracts</h1>
        <p className={styles.description}>
          Here you will design and manage IntegrityOS workflows – from simple quotation approvals to complex, multi-step governance processes with AI-assisted routing.
        </p>
      </div>
    </div>
  );
};

