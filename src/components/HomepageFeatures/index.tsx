import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Lightweight core',
    icon: '💫',
    description:
      'Minimal UI with only the essentials so you can keep FPS high and avoid clutter.',
  },
  {
    title: 'Fabric-native',
    icon: '🧵',
    description:
      'Built for Fabric 1.21.10 with matching API versions to stay close to vanilla.',
  },
  {
    title: 'Practical modules',
    icon: '🛠️',
    description:
      'Focused assists for building, movement, combat, and vision—no bloat, just tools that help.',
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.card)}>
      <div className={styles.icon}>{icon}</div>
      <Heading as="h3" className={styles.title}>
        {title}
      </Heading>
      <p className={styles.copy}>{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
