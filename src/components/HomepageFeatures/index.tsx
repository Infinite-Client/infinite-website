import type { ReactNode } from 'react'
import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'
import Translate from '@docusaurus/Translate'

type FeatureItem = {
  title: ReactNode
  icon: string
  description: ReactNode
}

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="homepage.features.lightweightCore.title">Lightweight core</Translate>,
    icon: '💫',
    description: (
      <Translate id="homepage.features.lightweightCore.description">
        Minimal UI with only the essentials so you can keep FPS high and avoid clutter.
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.features.fabricNative.title">Fabric-native</Translate>,
    icon: '🧵',
    description: (
      <Translate id="homepage.features.fabricNative.description">
        Built for Fabric 1.21.10 with matching API versions to stay close to vanilla.
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.features.practicalModules.title">Practical modules</Translate>,
    icon: '🛠️',
    description: (
      <Translate id="homepage.features.practicalModules.description">
        Focused assists for building, movement, combat, and vision—no bloat, just tools that help.
      </Translate>
    ),
  },
]

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.card)}>
      <div className={styles.icon}>{icon}</div>
      <Heading as="h3" className={styles.title}>
        {title}
      </Heading>
      <p className={styles.copy}>{description}</p>
    </div>
  )
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
  )
}
