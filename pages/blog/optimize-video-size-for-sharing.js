import Link from 'next/link'

export default function Post() {
  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <h1>Optimize Video Size for Fast Sharing (Guide)</h1>
      <p style={{ color: '#374151' }}>
        Learn how to pick codecs, lower bitrates, and trim unnecessary frames to reduce size.
        Practical examples with command lines and how to do it in-browser.
      </p>
      <p>
        <Link href="/blog"><a>← Back to blog</a></Link>
      </p>
    </div>
  )
}
