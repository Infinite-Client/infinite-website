import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const logo = useBaseUrl('/img/infinite-icon.svg');
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('container', styles.heroGrid)}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}>Fabric 1.21.10</span>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.ctaRow}>
            <Link className={clsx('button button--lg', styles.cta)} to="/docs/intro">
              Get Started
            </Link>
            <Link className={clsx('button button--lg', styles.ghostButton)} to="/downloads">
              Download
            </Link>
            <Link
              className={clsx('button button--lg', styles.ghostButton)}
              href="https://discord.gg/3ffN5JFpE4"
              target="_blank"
              rel="noopener noreferrer">
              Discord
            </Link>
          </div>
          <ul className={styles.meta}>
            <li>Fabric Loader 0.17.x</li>
            <li>Fabric API 0.135.0+1.21.10</li>
            <li>Focused modules, clean UI</li>
          </ul>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.glow} />
          <img src={logo} alt="Infinite Client logo" className={styles.logo} />
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Infinite Client — Lightweight Fabric utility client for Minecraft 1.21.10">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
