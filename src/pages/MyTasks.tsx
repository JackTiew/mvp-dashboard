import styles from './MyTasks.module.css';

export const MyTasks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.pageHeader}>My Tasks</div>
        <h1 className={styles.title}>Approvals & governance actions assigned to you</h1>
        <p className={styles.description}>
          This page will show all quotations, campaigns, vendor reviews, policy approvals and incident follow-ups that require Jessica's decision, with AI risk insights on each row.
        </p>
        <ul className={styles.featureList}>
          <li>High-risk items highlighted with integrity and compliance flags.</li>
          <li>AI suggests priority ordering based on severity and due dates.</li>
          <li>Direct links into the underlying workflow or incident detail.</li>
        </ul>
      </div>
    </div>
  );
};

