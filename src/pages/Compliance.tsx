import styles from './MyTasks.module.css';

export const Compliance = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.pageHeader}>Compliance</div>
        <h1 className={styles.title}>FINAS, MCMC & regulatory readiness</h1>
        <p className={styles.description}>
          This page will centralise all compliance requirements, checklists, approvals and evidence – including FINAS screening, content approvals and policy attestations.
        </p>
      </div>
    </div>
  );
};

