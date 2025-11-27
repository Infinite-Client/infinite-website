import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import Layout from '@theme/Layout'
import useBaseUrl from '@docusaurus/useBaseUrl'

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

  const styleBlock = useMemo(
    () => `
      :root {
        --bg: linear-gradient(135deg, #0b0a1a 0%, #110f2b 60%, #1c1135 100%);
        --card: rgba(12, 10, 28, 0.86);
        --accent-start: #5555ff;
        --accent-end: #ff55ff;
        --accent: #c778ff;
        --text: #f6f7ff;
        --muted: #b0b4d8;
        --border: rgba(255, 255, 255, 0.08);
        --shadow: 0 20px 60px rgba(0, 0, 0, 0.55);
      }
      * { box-sizing: border-box; }
      .navbar {
        display: none !important;
      }
      .main-wrapper {
        padding-top: 0 !important;
      }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: var(--bg);
        color: var(--text);
      }
      .download-shell {
        display: grid;
        place-items: center;
        padding: 24px;
      }
      .card {
        width: min(540px, 100%);
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 18px;
        box-shadow: var(--shadow);
        padding: 32px;
        position: relative;
        overflow: hidden;
      }
      .card::before {
        content: '';
        position: absolute;
        inset: -40% 10% auto auto;
        height: 180px;
        width: 180px;
        background: radial-gradient(circle, rgba(255, 85, 255, 0.2), transparent 60%);
        filter: blur(12px);
        pointer-events: none;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 28px;
        letter-spacing: -0.01em;
      }
      p {
        margin: 0 0 18px;
        color: var(--muted);
      }
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #c6d3ea;
      }
      select {
        width: 100%;
        padding: 12px 14px;
        border-radius: 12px;
        border: 1px solid var(--border);
        background: rgba(8, 10, 24, 0.9);
        color: var(--text);
        font-size: 15px;
        outline: none;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
        appearance: none;
      }
      option {
        background: #0a0d1c;
        color: var(--text);
      }
      .actions {
        display: flex;
        gap: 12px;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 18px;
      }
      button, .link {
        appearance: none;
        border: none;
        border-radius: 12px;
        padding: 12px 18px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      button {
        background: linear-gradient(120deg, var(--accent-start), var(--accent-end));
        color: #0c0b19;
        box-shadow: 0 10px 40px rgba(255, 85, 255, 0.35);
      }
      button:hover { transform: translateY(-1px); }
      button:active { transform: translateY(0); }
      .secondary {
        border: 1px solid var(--border);
        background: rgba(255, 255, 255, 0.04);
        color: var(--text);
        text-decoration: none;
        padding: 12px 16px;
      }
      .secondary:hover { background: rgba(255, 255, 255, 0.08); }
      .muted {
        color: var(--muted);
        font-size: 13px;
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid var(--border);
        font-size: 12px;
        color: #e5ddff;
        margin-bottom: 14px;
      }
      .status {
        font-size: 13px;
        color: var(--muted);
        margin-top: 6px;
      }
    `,
    []
  )

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
      <style dangerouslySetInnerHTML={{ __html: styleBlock }} />
      <div className="download-shell">
        <main className="card">
          <div className="pill">Fabric 1.21.10</div>
          <h1>Download Infinite Client</h1>
          <p>Select a version to download the jar directly.</p>

          <label htmlFor="version">Version</label>
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
          <div className="status">{status}</div>

          <div className="actions">
            <a className="secondary" id="back" href={backHref}>
              ← Back
            </a>
            <button id="go" onClick={handleDownload}>
              Download
            </button>
            <span className="muted">Downloads the selected jar (or release page fallback).</span>
          </div>
        </main>
      </div>
    </Layout>
  )
}
