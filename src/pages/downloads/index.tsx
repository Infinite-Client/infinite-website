import { ReactElement, useEffect, useState } from 'react'
import Layout from '@theme/Layout'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './downloads.module.css'
import Translate from '@docusaurus/Translate'

type Release = {
  tag_name: string
  html_url: string
  prerelease: boolean
  assets?: { name: string; browser_download_url: string }[]
}

export default function DownloadsPage(): ReactElement {
  const [releases, setReleases] = useState<Release[]>([])
  const [status, setStatus] = useState(
    <Translate id="downloads.status.loading">Loading releases from GitHub…</Translate>
  )
  const [selected, setSelected] = useState<string | undefined>()
  const backHref = useBaseUrl('/')
  const apiUrl = 'https://api.github.com/repos/Infinite-Client/infinite-client/releases?per_page=15'

  useEffect(() => {
    async function loadReleases() {
      try {
        const res = await fetch(apiUrl, { headers: { Accept: 'application/vnd.github+json' } })
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`)
        const data: Release[] = await res.json()
        setReleases(data)
        setStatus(
          data.length ? (
            <Translate id="downloads.status.synced">Release list synced from GitHub.</Translate>
          ) : (
            <Translate id="downloads.status.noReleases">No releases found on GitHub.</Translate>
          )
        )
        if (data.length) {
          const firstUrl = jarAssetUrl(data[0]) ?? data[0].html_url
          setSelected(firstUrl)
        }
      } catch {
        setStatus(
          <Translate id="downloads.status.error">
            Could not load releases (GitHub API failed). Using fallback latest link.
          </Translate>
        )
        setSelected('https://github.com/Infinite-Client/infinite-client/releases/latest')
      }
    }
    loadReleases()
  }, [])

  const jarAssetUrl = (release: Release): string | null => {
    if (!release.assets) return null
    const asset = release.assets.find((a) => {
      const name = (a.name || '').toLowerCase()
      return name.endsWith('.jar') && !name.includes('sources')
    })
    return asset ? asset.browser_download_url : null
  }

  const handleDownload = () => {
    if (!selected) return
    window.location.href = selected
  }

  return (
    <Layout
      title="Downloads"
      description="Download Infinite Client builds"
    >
      <div className={styles.downloadShell}>
        <main className={styles.card}>
          <div className={styles.pill}>
            <Translate id="downloads.pill.fabricVersion">Fabric 1.21.10</Translate>
          </div>
          <h1>
            <Translate id="downloads.header.title">Download Infinite Client</Translate>
          </h1>
          <p>
            <Translate id="downloads.header.description">
              Select a version to download the jar directly.
            </Translate>
          </p>

          <label htmlFor="version" className={styles.label}>
            <Translate id="downloads.label.version">Version</Translate>
          </label>
          <select id="version" value={selected} onChange={(e) => setSelected(e.target.value)}>
            {releases.length === 0 && (
              <option value="https://github.com/Infinite-Client/infinite-client/releases/latest">
                <Translate id="downloads.option.latestRelease">Latest release</Translate>
              </option>
            )}
            {releases.map((release, index) => {
              const jarUrl = jarAssetUrl(release) ?? release.html_url
              let label =
                index === 0 ? (
                  <Translate
                    id="downloads.option.latestVersion"
                    values={{ tagName: release.tag_name }}
                  ></Translate>
                ) : (
                  release.tag_name
                )
              if (release.prerelease)
                label = (
                  <>
                    {label} <Translate id="downloads.option.preRelease"> (pre-release)</Translate>
                  </>
                )
              return (
                <option key={release.tag_name} value={jarUrl}>
                  {label}
                </option>
              )
            })}
          </select>
          <div className={styles.status}>{status}</div>

          <div className={styles.actions}>
            <a className={styles.secondary} id="back" href={backHref}>
              <Translate id="downloads.button.back">← Back</Translate>
            </a>
            <button id="go" className={styles.button} onClick={handleDownload}>
              <Translate id="downloads.button.download">Download</Translate>
            </button>
            <span className={styles.muted}>
              <Translate id="downloads.text.downloadDescription">
                Downloads the selected jar (or release page fallback).
              </Translate>
            </span>
          </div>
        </main>
      </div>
    </Layout>
  )
}
