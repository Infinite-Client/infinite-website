import { ReactElement, useEffect, useState } from 'react'
import Layout from '@theme/Layout'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './downloads.module.css'

type Release = {
  tag_name: string
  html_url: string
  prerelease: boolean
  assets?: { name: string; browser_download_url: string }[]
}

export default function DownloadsPage(): ReactElement {
  const [releases, setReleases] = useState<Release[]>([])
  const [status, setStatus] = useState('Loading releases from GitHub…')
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
        setStatus(data.length ? 'Release list synced from GitHub.' : 'No releases found on GitHub.')
        if (data.length) {
          const firstUrl = jarAssetUrl(data[0]) ?? data[0].html_url
          setSelected(firstUrl)
        }
      } catch {
        setStatus('Could not load releases (GitHub API failed). Using fallback latest link.')
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
    <Layout title="Downloads" description="Download Infinite Client builds">
      <div className={styles.downloadShell}>
        <main className={styles.card}>
          <div className={styles.pill}>Fabric 1.21.10</div>
          <h1>Download Infinite Client</h1>
          <p>Select a version to download the jar directly.</p>

          <label htmlFor="version" className={styles.label}>
            Version
          </label>
          <select id="version" value={selected} onChange={(e) => setSelected(e.target.value)}>
            {releases.length === 0 && (
              <option value="https://github.com/Infinite-Client/infinite-client/releases/latest">
                Latest release
              </option>
            )}
            {releases.map((release, index) => {
              const jarUrl = jarAssetUrl(release) ?? release.html_url
              let label = index === 0 ? `Latest (${release.tag_name})` : release.tag_name
              if (release.prerelease) label += ' (pre-release)'
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
              ← Back
            </a>
            <button id="go" onClick={handleDownload}>
              Download
            </button>
            <span className={styles.muted}>
              Downloads the selected jar (or release page fallback).
            </span>
          </div>
        </main>
      </div>
    </Layout>
  )
}
