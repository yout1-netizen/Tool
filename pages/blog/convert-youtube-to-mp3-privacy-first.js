import Link from 'next/link'
export default function Post(){
  return (
    <div style={maxWidth:900,margin:'24px auto',padding:16}>
      <h1>Convert Video to MP3 — Privacy-first (No uploads)</h1>
      <p style={color:'#374151'}>Many online converters upload files to servers. This guide explains why local conversion matters, how ffmpeg.wasm runs in the browser, and why privacy-first tools are faster and safer.</p>
      <p><Link href='/blog'><a>← Back to blog</a></Link></p>
    </div>
  )
}
