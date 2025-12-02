import styles from './MyTasks.module.css';

export const ThirdParties = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.pageHeader}>Third Parties</div>
        <h1 className={styles.title}>Vendors, distributors & partner risk</h1>
        <p className={styles.description}>
          Maintain a consolidated view of third-party risk scores, contract status and incident links. IntegrityOS will highlight risky patterns such as repeated low-margin deals or abnormal discounting.
        </p>
      </div>
    </div>
  );
};

