import Link from 'next/link'

export default function Post() {
  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <h1>How to Compress Video for WhatsApp Without Losing Quality</h1>
      <p style={{ color: '#374151' }}>
        WhatsApp limits video sizes for sharing. This post explains CRF settings with ffmpeg,
        recommended resolutions for phones, and how to keep audio quality high while reducing file size.
        Use our tool to compress locally in the browser.
      </p>
      <p>
        <Link href="/blog"><a>← Back to blog</a></Link>
      </p>
    </div>
  )
}
