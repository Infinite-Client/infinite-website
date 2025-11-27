import type { ReactNode } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Translate from '@docusaurus/Translate'

import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  const logo = useBaseUrl('/img/infinite-icon.svg')
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('container', styles.heroGrid)}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}>
            <Translate id="homepage.header.badge.fabricVersion">Fabric 1.21.10</Translate>
          </span>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.ctaRow}>
            <Link className={clsx('button button--lg', styles.cta)} to="/docs/intro">
              <Translate id="homepage.header.button.getStarted">Get Started</Translate>
            </Link>
            <Link className={clsx('button button--lg', styles.ghostButton)} to="/downloads">
              <Translate id="homepage.header.button.download">Download</Translate>
            </Link>
            <Link
              className={clsx('button button--lg', styles.ghostButton)}
              href="https://discord.gg/3ffN5JFpE4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Translate id="homepage.header.button.discord">Discord</Translate>
            </Link>
          </div>
          <ul className={styles.meta}>
            <li>
              <Translate id="homepage.header.meta.fabricLoader">Fabric Loader 0.17.x</Translate>
            </li>
            <li>
              <Translate id="homepage.header.meta.fabricApi">Fabric API 0.135.0+1.21.10</Translate>
            </li>
            <li>
              <Translate id="homepage.header.meta.focusedModules">
                Focused modules, clean UI
              </Translate>
            </li>
          </ul>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.glow} />
          <img src={logo} alt="Infinite Client logo" className={styles.logo} />
        </div>
      </div>
    </header>
  )
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={siteConfig.title}
      description={
        <Translate id="homepage.layout.description">
          Infinite Client — Lightweight Fabric utility client for Minecraft 1.21.10
        </Translate>
      }
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
