import Link from 'next/link'
export default function Blog(){
  const posts = [
    {slug:'how-to-compress-video-for-whatsapp',title:'How to Compress Video for WhatsApp Without Losing Quality'},
    {slug:'convert-youtube-to-mp3-privacy-first',title:'Convert Video to MP3 — Privacy-first (No uploads)'},
    {slug:'best-settings-for-instagram-reels',title:'Best Settings to Export Audio for Instagram Reels'},
    {slug:'optimize-video-size-for-sharing',title:'Optimize Video Size for Fast Sharing (Guide)'},
    {slug:'increase-audio-quality-voiceovers',title:'Increase Audio Quality for Voiceovers — Simple Tips'}
  ]
  return (
    <div className="container">
      <div className="card"><h1>Blog</h1>
      <ul>
        {posts.map(p=> <li key={p.slug}><Link href={'/blog/'+p.slug}><a>{p.title}</a></Link></li>)}
      </ul>
      </div>
    </div>
  )
}
