import Link from 'next/link'
export default function Post(){
  return (
    <div style={maxWidth:900,margin:'24px auto',padding:16}>
      <h1>Best Settings to Export Audio for Instagram Reels</h1>
      <p style={color:'#374151'}>To make voiceovers and music sound great on Reels, export MP3 at 192 kbps or AAC 128k. Keep videos under 30s for Reels; normalize audio levels before export.</p>
      <p><Link href='/blog'><a>← Back to blog</a></Link></p>
    </div>
  )
}
