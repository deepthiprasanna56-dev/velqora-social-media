import { useEffect, useRef, useState } from 'react'
import './App.css'

// Curated Connoisseurs and Patrons
const connoisseurs = [
  { 
    name: 'Sophia Lee', 
    user: 'sophialee', 
    pic: 'photo-1534528741775-53994a69daeb', 
    role: 'Expeditionist & Leica Fellow',
    location: 'Reykjavik, Iceland',
    bio: 'Documenting glacial silence, geothermal mist, and northern auroras.' 
  },
  { 
    name: 'James Carter', 
    user: 'jamescarter', 
    pic: 'photo-1507003211169-0a1dd7228f2d', 
    role: 'Principal Systems Architect',
    location: 'Zurich & San Francisco',
    bio: 'Building intentional software for permanence. Craft over rapid churn.' 
  },
  { 
    name: 'Keisha Harrison', 
    user: 'keishaharrison', 
    pic: 'photo-1517841905240-472988babdf9', 
    role: 'Visual Artist & Restorer',
    location: 'Paris, France',
    bio: 'Art is the quiet confession of the human spirit. Exploring neoclassical portraiture.' 
  },
  { 
    name: 'Olivia Bennett', 
    user: 'oliviabennett', 
    pic: 'photo-1494790108377-be9c29b29330', 
    role: 'Interface Craftsman & Writer',
    location: 'Copenhagen, Denmark',
    bio: 'Coffee, code, and quiet atelier nights. Finding rhythm in understated details.' 
  },
  { 
    name: 'George Lobko', 
    user: 'georgelobko', 
    pic: 'photo-1500648767791-00dcc994a43e', 
    role: 'Alpine Photographer',
    location: 'Zermatt, Switzerland',
    bio: 'Chasing timeless light across peaks and glacial valleys with 35mm film.' 
  },
  { 
    name: 'Mary Snyder', 
    user: 'marysnyder', 
    pic: 'photo-1531123897727-8f129e1688ce', 
    role: 'Haute Horology & Design',
    location: 'Milan, Italy',
    bio: 'Curating subtle luxury, understated silhouettes, and mechanical perfection.' 
  },
  { 
    name: 'Golovin dos Santos', 
    user: 'golovin', 
    pic: 'photo-1506794778202-cad84cf45f1d', 
    role: 'Architect & Minimalist',
    location: 'Lisbon & Sintra',
    bio: 'Studying warm brutalism, limestone textures, and shadow geometry.' 
  },
  { 
    name: 'Katherine Cole', 
    user: 'katherinecole', 
    pic: 'photo-1544005313-94ddf0286df2', 
    role: 'Haute Couture Archivist',
    location: 'Los Angeles & Paris',
    bio: 'Curating silhouettes, sunlit drapery, and vintage Parisian collections.' 
  },
  { 
    name: 'Bailey Richards', 
    user: 'baileyrichards', 
    pic: 'photo-1524504388940-b1c1722653e1', 
    role: 'Editorial Muse & Movement Storyteller',
    location: 'New York & Milan',
    bio: 'A professional muse with a passion for style, film grain, and choreography.' 
  }
]

const image = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

// High-Reliability SVG Luxury Fallbacks so no image ever looks broken
const getLuxuryFallback = (label = 'Moment', category = 'Archival') => {
  const cleanLabel = encodeURIComponent(label.slice(0, 32))
  const cleanCat = encodeURIComponent(category.toUpperCase())
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><radialGradient id="g" cx="50%" cy="40%" r="65%"><stop offset="0%" stop-color="%2324201d"/><stop offset="100%" stop-color="%230c0c0e"/></radialGradient><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23d4af37"/><stop offset="100%" stop-color="%239a7b20"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g)"/><circle cx="400" cy="270" r="64" fill="none" stroke="url(%23gold)" stroke-width="2"/><text x="400" y="282" fill="%23d4af37" font-family="Georgia,serif" font-size="34" font-weight="bold" text-anchor="middle">V</text><text x="400" y="380" fill="%23f5f5f7" font-family="-apple-system,sans-serif" font-size="18" font-weight="600" letter-spacing="1" text-anchor="middle">${cleanLabel}</text><text x="400" y="415" fill="%23d4af37" font-family="-apple-system,sans-serif" font-size="11" font-weight="bold" letter-spacing="3" text-anchor="middle">${cleanCat}</text></svg>`
}

const getAvatarFallback = (name = 'V') => {
  const initial = encodeURIComponent(name.charAt(0).toUpperCase())
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><defs><radialGradient id="av" cx="40%" cy="30%" r="70%"><stop offset="0%" stop-color="%232a241e"/><stop offset="100%" stop-color="%23121110"/></radialGradient></defs><circle cx="60" cy="60" r="58" fill="url(%23av)" stroke="%23d4af37" stroke-width="2.5"/><text x="60" y="72" fill="%23d4af37" font-family="Georgia,serif" font-size="44" font-weight="bold" text-anchor="middle">${initial}</text></svg>`
}

// SafeImage Component with Zero-State Shimmer Placeholder and Instant Error Recovery
const SafeImage = ({ src, alt = 'Velqora Moment', category = 'Archival', className = '', onClick }) => {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const fallbackSrc = getLuxuryFallback(alt, category)

  return (
    <div className={`safe-image-container ${className}`} onClick={onClick}>
      {!isLoaded && <div className="image-skeleton-shimmer" />}
      <img
        key={src}
        src={hasError ? fallbackSrc : (src || fallbackSrc)}
        alt={alt}
        className={`safe-img ${isLoaded ? 'loaded' : ''}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true)
          setIsLoaded(true)
        }}
      />
    </div>
  )
}

// SVG Icon System with Precision Lines
const Icon = ({ name, size = 18, fill = 'none' }) => {
  const paths = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-7h6v7"/></>,
    explore: <><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.8 6.4-5.6 2 2.8-6.4z"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    bookmark: <path d="M6 4h12v17l-6-4-6 4z"/>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    more: <><circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></>,
    video: <><polygon points="5 3 19 12 5 21 5 3"/></>,
    smile: <><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    comment: <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/>,
    share: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
    repost: <><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></>,
    sparkle: <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></>,
    moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>,
    check: <polyline points="20 6 9 17 4 12"/>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    stream: <><rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/></>,
    diamond: <polygon points="12 2 22 8.5 12 22 2 8.5 12 2"/>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

const Avatar = ({ person, size = 'md', ring = false, className = '' }) => {
  const [hasError, setHasError] = useState(false)
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  }
  const primarySrc = person?.photoUrl || (person?.pic ? image(person.pic, 160) : '')
  const fallbackSrc = getAvatarFallback(person?.name || 'V')

  return (
    <img 
      key={primarySrc}
      className={`rounded-full object-cover shrink-0 ${sizeMap[size] || 'w-10 h-10'} ${ring ? 'ring-2 ring-[var(--gold-border)] ring-offset-2 ring-offset-[var(--bg-primary)]' : ''} ${className}`} 
      src={hasError ? fallbackSrc : (primarySrc || fallbackSrc)} 
      alt={person?.name || 'Patron'} 
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
    />
  )
}

const defaultCurrentUser = {
  name: 'Jung Kook',
  user: 'jungkook',
  pic: 'photo-1500648767791-00dcc994a43e',
  photoUrl: '/jk-profile.png',
  coverPhoto: 'photo-1470252649378-9c29740c9fa8',
  role: 'Sound Artist & Velqora Founding Patron',
  location: 'Seoul & Portland',
  bio: 'Collecting quiet mornings, timeless aesthetics, and the resonance of understated craftsmanship. ✨☕ Big dreams & slow hours.'
}

export default function App() {
  const [active, setActive] = useState('Home')
  const [isSignedIn, setIsSignedIn] = useState(() => localStorage.getItem('velqora-authenticated') === 'true' || sessionStorage.getItem('velqora-authenticated') === 'true')
  const [theme, setTheme] = useState(() => localStorage.getItem('velqora-theme') || 'dark')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [feedViewMode, setFeedViewMode] = useState('stream') // 'stream' or 'mosaic'
  const [liked, setLiked] = useState({ 1: true, 2: true, 3: true, 7: true })
  const [saved, setSaved] = useState({ 1: true, 3: true, 7: true })
  const [diamonds, setDiamonds] = useState({ 1: 48, 2: 32, 3: 115, 4: 24, 5: 38, 6: 120, 7: 65, 8: 38, 9: 95 })
  const [pollVotes, setPollVotes] = useState({})
  const [playingAudio, setPlayingAudio] = useState({})
  const [lightboxData, setLightboxData] = useState(null)

  const [comments, setComments] = useState({
    1: [
      { person: connoisseurs[3], text: 'The atmosphere in these frames is extraordinarily poetic. Truly captures the stillness.' }
    ],
    2: [
      { person: connoisseurs[1], text: 'The pigment depth and emotional clarity are breathtaking, Keisha.' }
    ],
    7: [
      { person: connoisseurs[0], text: 'What an extraordinary perspective on friendship and shared stillness.' }
    ]
  })
  const [feedFilter, setFeedFilter] = useState('curated')
  const [feedSort, setFeedSort] = useState('latest')
  const [selectedPost, setSelectedPost] = useState(null)
  const [selectedStory, setSelectedStory] = useState(null)
  const [activeSoundscape, setActiveSoundscape] = useState(null)
  const [profileTab, setProfileTab] = useState('moments')
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState('')
  const [modal, setModal] = useState('')
  const [authMode, setAuthMode] = useState('login')
  const [authError, setAuthError] = useState('')
  const [profile, setProfile] = useState(defaultCurrentUser)
  const [following, setFollowing] = useState({ [connoisseurs[0].user]: true, [connoisseurs[1].user]: true, [connoisseurs[6].user]: true })
  const [joinedCommunities, setJoinedCommunities] = useState({ photo: true, arch: true, alpine: true })
  const [joinedSalons, setJoinedSalons] = useState({ nature: true, art: true, design: false, light: false })
  const [reactions, setReactions] = useState({ 1: { fire: 142, love: 89, spark: 214, cheer: 67 } })
  const [activeAudience, setActiveAudience] = useState('Curated Circle')
  const [inlineComments, setInlineComments] = useState({})

  const toastTimerRef = useRef(null)
  const postCounterRef = useRef(100)

  // Composer State
  const [composerText, setComposerText] = useState('')
  const [composerMedia, setComposerMedia] = useState('')
  const [composerMediaType, setComposerMediaType] = useState('')

  // Messaging State
  const [chatUser, setChatUser] = useState(connoisseurs[0])
  const [chatFilter, setChatFilter] = useState('')
  const [messageText, setMessageText] = useState('')
  const [messageMedia, setMessageMedia] = useState('')
  const [messagesByUser, setMessagesByUser] = useState({
    [connoisseurs[0].user]: [
      { from: 'them', text: 'Jung Kook, did you see the new Iceland archival frames? Truly sublime.' },
      { from: 'me', text: 'I did, Sophia! The Skógafoss mist and Kirkjufell aurora are pure poetry.' },
      { from: 'them', text: 'We must curate an editorial salon around this journey soon ✨' }
    ]
  })

  // Curated Posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      person: connoisseurs[0], // Sophia Lee
      time: '2 hours ago',
      location: 'South Coast, Iceland 🇮🇸',
      text: 'Just returned from an unforgettable journey through Iceland! The landscapes are beyond words. Here are a few shots from our quiet expedition into the northern light.',
      photo: 'photo-1476610182048-b716b80d88ac',
      gallery: [
        'photo-1476610182048-b716b80d88ac', // Skógafoss waterfall
        'photo-1504893524553-b855bce32c67', // Reynisdrangar black sea stacks
        'photo-1531366936337-7c912a4589a7'  // Kirkjufell aurora borealis
      ],
      hasAudio: true,
      audioTitle: 'Alpine Glacial Wind & Geothermal Stream (3D Lossless)',
      exif: 'Leica SL2-S · Vario-Elmarit 24-70mm · f/2.8 · 1/500s · ISO 100',
      tag: '#IcelandArchival',
      likes: 1240,
      comments: 128,
      shares: 96
    },
    {
      id: 2,
      person: connoisseurs[1], // James Carter
      time: '4 hours ago',
      location: 'Zurich Atelier',
      text: 'Building in public with intention is the only way to build for permanence. Here is what we shipped this week at Velqora. ⚜️',
      linkPreview: {
        badge: 'V',
        title: 'Velqora Weekly Update — Archival Edition (Vol. IV)',
        desc: 'We shipped lossless media archival, sovereign member vaults, and curated whisper rooms. Check out our latest progress.',
        url: 'velqora.luxury/dispatch/vol-4'
      },
      tag: '#BuildInPublic',
      likes: 842,
      comments: 64,
      shares: 45
    },
    {
      id: 7,
      person: connoisseurs[6], // Golovin dos Santos
      time: '6 hours ago',
      location: 'Sintra Peaks, Portugal',
      text: 'Sometimes we forget that life is too short to hesitate. The best way forward is to think less, breathe deeply, and make memories with the ones who bring warmth into our lives. #AlpineSanctuary #SpendingQualityTime #Life',
      gallery: [
        'photo-1529156069898-49953e39b3ac',
        'photo-1511632765486-a01980e01a18',
        'photo-1464822759023-fed622ff2c3b',
        'photo-1506744038136-46273834b3fb'
      ],
      exif: 'Canon EOS R5 · RF 28-70mm f/2L · 1/640s · Natural Sunset',
      tag: '#Friends #Life',
      likes: 2840,
      comments: 84,
      shares: 52
    },
    {
      id: 3,
      person: connoisseurs[2], // Keisha Harrison
      time: '7 hours ago',
      location: 'Atelier Marais, Paris',
      text: '“Art is the quiet confession of the human spirit.” Layering raw mineral pigments, umber glazes, and beeswax on unprimed Belgian linen.',
      photo: 'photo-1579783900882-c0d3dad7b119',
      exif: 'Hasselblad 907X 50C · XCD 45mm · f/4 · 1/125s · Natural Light',
      tag: '#ExpressionistArchival',
      likes: 3120,
      comments: 64,
      shares: 42
    },
    {
      id: 8,
      person: connoisseurs[7], // Katherine Cole
      time: '9 hours ago',
      location: 'Malibu Coast, California',
      headline: 'The Curated Silhouettes of the Season: Form, Linen, and Golden Light',
      text: 'If you are looking for a gentle reprieve from the winter cold, seek sanctuary where warm sea breezes soften the horizon. A study in effortless drapery, raw silk, and sunlit coastlines.',
      photo: 'photo-1507525428034-b723cf961d3e',
      exif: 'Contax 645 · Zeiss Planar 80mm f/2 · Kodak Portra 400',
      tag: '#HauteCouture #GoldenLight',
      likes: 1420,
      comments: 148,
      shares: 76
    },
    {
      id: 9,
      person: connoisseurs[8], // Bailey Richards
      time: '12 hours ago',
      location: 'Botanical Conservatory, NY',
      headline: 'Style in Motion: Fluidity & Poetics',
      text: 'Finding poetry in the flow of fabric and unhurried choreography. A quiet afternoon at the botanical conservatory with 35mm film.',
      photo: 'photo-1534528741775-53994a69daeb',
      isVideoReel: true,
      hasAudio: true,
      audioTitle: 'Ambient Botanical Resonance & 35mm Shutter',
      exif: 'ARRI Alexa Mini LF · Cooke Anamorphic /i Full Frame Plus',
      tag: '#MovementStorytelling #ArchivalStyle',
      likes: 3850,
      comments: 112,
      shares: 88
    },
    {
      id: 10,
      person: connoisseurs[1], // James Carter
      time: '14 hours ago',
      location: 'Zurich Atelier',
      text: 'A question for our fellow patrons and architects: which design philosophy most powerfully anchors your personal sanctuary?',
      isPoll: true,
      pollData: {
        question: 'Which aesthetic discipline most inspires your craft?',
        options: [
          { text: 'Neoclassical Proportion & Vaulted Form', votes: 412 },
          { text: 'Japanese Wabi-Sabi & Wood Joinery', votes: 348 },
          { text: 'Warm Brutalism & Monolithic Stone', votes: 219 },
          { text: 'Bauhaus Functional Reductionism', votes: 164 }
        ],
        totalVotes: 1143
      },
      tag: '#DesignPhilosophy #CuratorsPoll',
      likes: 920,
      comments: 72,
      shares: 38
    },
    {
      id: 4,
      person: connoisseurs[3], // Olivia Bennett
      time: '16 hours ago',
      location: 'Copenhagen, Denmark',
      text: 'Coffee, code, and a little night atelier vibe. ☕✨ Crafting interfaces where every pixel feels intentional. What is everyone refining tonight?',
      photo: 'photo-1517694712202-14dd9538aa97',
      exif: 'Sony A7R V · FE 50mm f/1.2 GM · Ambient Studio Lights',
      tag: '#AtelierNights',
      likes: 620,
      comments: 48,
      shares: 19
    },
    {
      id: 5,
      person: connoisseurs[4], // George Lobko
      time: '1 day ago',
      location: 'Zermatt, Switzerland',
      text: 'Found my sanctuary somewhere between the jagged ridges and the low clouds. Morning light piercing through Alpine frost on 35mm monochrome.',
      photo: 'photo-1464822759023-fed622ff2c3b',
      gallery: [
        'photo-1464822759023-fed622ff2c3b',
        'photo-1506744038136-46273834b3fb'
      ],
      exif: 'Leica M-A (Typ 127) · Summicron-M 35mm · Ilford HP5+ Black & White',
      tag: '#AlpineSanctuary',
      likes: 1840,
      comments: 38,
      shares: 22
    },
    {
      id: 6,
      person: connoisseurs[5], // Mary Snyder
      time: '2 days ago',
      location: 'Milan, Italy',
      text: '5 Tenets of Considered Archival Spaces:\n1. Sovereign Curation & Ownership\n2. Quiet Typography over Noise\n3. Proof of Craftsmanship\n4. Intimate Salons over Virality\n5. Timeless Archival Permanence\n\nPreserve more in our new dispatch 📖✨',
      photo: 'photo-1512820790803-83ca734da794',
      exif: 'Fujifilm GFX 100 II · GF 80mm f/1.7 · Softbox Diffuser',
      tag: '#ArchivalKnowledge',
      likes: 5694,
      comments: 16,
      shares: 34
    }
  ])

  // Stories
  const [stories, setStories] = useState([
    { person: connoisseurs[0], photo: 'photo-1534528741775-53994a69daeb' },
    { person: connoisseurs[1], photo: 'photo-1507003211169-0a1dd7228f2d' },
    { person: connoisseurs[2], photo: 'photo-1517841905240-472988babdf9' },
    { person: connoisseurs[3], photo: 'photo-1494790108377-be9c29b29330' },
    { person: connoisseurs[4], photo: 'photo-1500648767791-00dcc994a43e' },
    { person: connoisseurs[5], photo: 'photo-1531123897727-8f129e1688ce' },
    { person: connoisseurs[6], photo: 'photo-1506794778202-cad84cf45f1d' },
    { person: connoisseurs[7], photo: 'photo-1544005313-94ddf0286df2' }
  ])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('velqora-theme', theme)
  }, [theme])

  const flash = (msg) => {
    setToast(msg)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToast(''), 3000)
  }

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
    flash(`Switched to ${newTheme === 'dark' ? 'Obsidian Noir' : 'Alabaster Silk'}`)
  }

  const openLightbox = (src, alt, exif, author, location) => {
    setLightboxData({ src, alt, exif, author, location })
  }

  // Post Actions
  const toggleLike = (id) => {
    setLiked(prev => {
      const isLiked = !prev[id]
      return { ...prev, [id]: isLiked }
    })
  }

  const toggleSave = (id) => {
    setSaved(prev => {
      const isSaved = !prev[id]
      flash(isSaved ? 'Archived to Your Dossier' : 'Removed from Dossier')
      return { ...prev, [id]: isSaved }
    })
  }

  const giveDiamond = (id) => {
    setDiamonds(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
    flash('💎 1 Diamond awarded to Creator')
  }

  const addReaction = (id, type) => {
    setReactions(prev => {
      const current = prev[id] || { fire: 0, love: 0, spark: 0, cheer: 0 }
      return {
        ...prev,
        [id]: {
          ...current,
          [type]: (current[type] || 0) + 1
        }
      }
    })
    flash('Appreciation recorded')
  }

  const handleInlineCommentSubmit = (postId) => {
    const text = (inlineComments[postId] || '').trim()
    if (!text) return
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { person: profile, text }]
    }))
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: p.comments + 1 } : p))
    setInlineComments(prev => ({ ...prev, [postId]: '' }))
    flash('Reflection recorded in the atelier ✨')
  }

  const publishPost = () => {
    if (!composerText.trim() && !composerMedia) return
    postCounterRef.current += 1
    const newPost = {
      id: postCounterRef.current,
      person: profile,
      time: 'Just now',
      location: profile.location || 'Sanctuary',
      text: composerText.trim(),
      photo: composerMedia && !composerMedia.startsWith('blob:') ? composerMedia : '',
      mediaUrl: composerMedia,
      mediaType: composerMediaType || 'image',
      exif: 'Velqora Digital Master · 4K Lossless Archival',
      tag: '#PersonalCuration',
      likes: 1,
      comments: 0,
      shares: 0
    }
    setPosts([newPost, ...posts])
    setComposerText('')
    setComposerMedia('')
    setComposerMediaType('')
    flash('Curated moment published to Velqora')
  }

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setComposerMedia(URL.createObjectURL(file))
    setComposerMediaType(file.type.startsWith('video/') ? 'video' : 'image')
    flash('Media attached')
  }

  const sendMessage = () => {
    if (!messageText.trim() && !messageMedia) return
    const currentList = messagesByUser[chatUser.user] || []
    setMessagesByUser({
      ...messagesByUser,
      [chatUser.user]: [
        ...currentList,
        { from: 'me', text: messageText.trim(), media: messageMedia }
      ]
    })
    setMessageText('')
    setMessageMedia('')
  }

  const submitAuth = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') || '').trim()
    const name = String(form.get('name') || '').trim()
    if (authMode === 'signup' && !name) {
      setAuthError('Please enter your full name.')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setAuthError('Please provide a valid email.')
      return
    }
    setAuthError('')
    if (authMode === 'signup') {
      setProfile({ ...profile, name, user: email.split('@')[0] })
    }
    localStorage.setItem('velqora-authenticated', 'true')
    setIsSignedIn(true)
    flash(authMode === 'login' ? `Welcome back, ${profile.name}` : 'Welcome to the Velqora Circle')
  }

  const signOut = () => {
    localStorage.removeItem('velqora-authenticated')
    sessionStorage.removeItem('velqora-authenticated')
    setIsSignedIn(false)
    flash('Signed out of Velqora')
  }

  // --------------------------------------------------------------------------
  // Render Helpers
  // --------------------------------------------------------------------------

  const renderSidebar = () => (
    <aside className={`sidebar ${mobileMenu ? 'open' : ''}`}>
      <div className="brand-wrapper">
        <button className="brand-link" onClick={() => { setActive('Home'); setMobileMenu(false) }}>
          <div className="brand-badge">
            <span className="brand-glyph">V</span>
          </div>
          <div className="brand-info">
            <span className="brand-name">Velqora</span>
            <span className="brand-subtitle">Haute Sociale</span>
          </div>
        </button>
      </div>

      <div className="nav-section-label">Curations</div>
      <nav className="nav-list">
        {[
          { name: 'Home', icon: 'home', label: 'Feed' },
          { name: 'Explore', icon: 'explore', label: 'Explore' },
          { name: 'Notifications', icon: 'bell', label: 'The Ledger', badge: '8' },
          { name: 'Messages', icon: 'mail', label: 'Whispers', badge: '1' },
          { name: 'Saved', icon: 'bookmark', label: 'Treasures' },
          { name: 'Profile', icon: 'user', label: 'Atelier' },
        ].map(item => (
          <button
            key={item.name}
            onClick={() => { setActive(item.name); setMobileMenu(false) }}
            className={`nav-item ${active === item.name ? 'active' : ''}`}
          >
            <span className="nav-icon"><Icon name={item.icon} size={18} /></span>
            <span>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </button>
        ))}
      </nav>

      {/* Sidebar Shortcuts */}
      <div className="sidebar-shortcuts-section mt-5">
        <span className="sidebar-shortcuts-label">Active Salons</span>
        <button className="shortcut-link" onClick={() => { setQuery('Photography'); setActive('Explore') }}>
          <span className="shortcut-status-dot" />
          <span>Photography Connoisseurs</span>
        </button>
        <button className="shortcut-link" onClick={() => { setQuery('Architecture'); setActive('Explore') }}>
          <span className="shortcut-status-dot" />
          <span>Architectural Ateliers</span>
        </button>
        <button className="shortcut-link" onClick={() => { setQuery('Alpine'); setActive('Explore') }}>
          <span className="shortcut-status-dot" />
          <span>Alpine Explorers</span>
        </button>
      </div>

      {/* Privé Concierge VIP Box */}
      <div className="prive-card">
        <span className="prive-sparkle">✦</span>
        <span className="prive-tag">Velqora Privé</span>
        <h4 className="prive-title">The Connoisseur Circle</h4>
        <p className="prive-desc">Private exhibitions, archival audio streams, and invitation-only salons.</p>
        <button className="prive-btn" onClick={() => setModal('prive-modal')}>
          <span>Explore Membership</span>
          <span>↗</span>
        </button>
      </div>

      {/* Theme Switcher */}
      <div className="theme-switch-bar">
        <button
          className={`theme-pill-btn ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => toggleTheme('dark')}
        >
          <Icon name="moon" size={13} />
          <span>Obsidian</span>
        </button>
        <button
          className={`theme-pill-btn ${theme === 'light' ? 'active' : ''}`}
          onClick={() => toggleTheme('light')}
        >
          <Icon name="sun" size={13} />
          <span>Alabaster</span>
        </button>
      </div>

      {/* User Footer Profile */}
      <button className="user-footer" onClick={() => setModal('account-menu')}>
        <Avatar person={profile} size="sm" ring={true} />
        <div className="user-footer-details">
          <span className="user-footer-name">
            {profile.name}
            <span className="text-[var(--gold-primary)] text-xs">✦</span>
          </span>
          <span className="user-footer-handle">@{profile.user}</span>
        </div>
        <Icon name="more" size={16} />
      </button>
    </aside>
  )

  const renderTopNav = (title, eyebrow) => (
    <header className="top-nav">
      <div className="top-nav-left">
        <button className="hamburger-btn" onClick={() => setMobileMenu(!mobileMenu)}>
          <Icon name={mobileMenu ? 'close' : 'menu'} />
        </button>
        <div className="page-title-box">
          <span className="page-eyebrow">{eyebrow || 'Curated Sphere'}</span>
          <h1 className="page-main-heading">{title}</h1>
        </div>
      </div>

      <div className="top-search-wrap">
        <span className="top-search-icon"><Icon name="search" size={15} /></span>
        <input
          className="top-search-input"
          placeholder="Search creators, salons, aesthetics…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (active !== 'Explore') setActive('Explore')
          }}
        />
        <span className="top-search-kbd">⌘K</span>
      </div>

      <div className="top-nav-actions">
        {/* View Mode Switcher: Stream vs Mosaic */}
        {active === 'Home' && (
          <div className="view-mode-switcher mr-2 hidden md:flex">
            <button
              className={`view-mode-btn ${feedViewMode === 'stream' ? 'active' : ''}`}
              onClick={() => setFeedViewMode('stream')}
              title="Stream View"
            >
              <Icon name="stream" size={14} />
              <span>Stream</span>
            </button>
            <button
              className={`view-mode-btn ${feedViewMode === 'mosaic' ? 'active' : ''}`}
              onClick={() => setFeedViewMode('mosaic')}
              title="Visual Mosaic (3-Col Grid)"
            >
              <Icon name="grid" size={14} />
              <span>Mosaic</span>
            </button>
          </div>
        )}

        <button className="icon-action-btn" onClick={() => setActive('Notifications')}>
          <Icon name="bell" size={18} />
          <span className="action-dot" />
        </button>
        <button className="icon-action-btn" onClick={() => setActive('Messages')}>
          <Icon name="mail" size={18} />
        </button>
        <button className="curate-post-btn" onClick={() => { setActive('Home'); window.setTimeout(() => document.querySelector('.composer-textarea')?.focus(), 50) }}>
          <Icon name="plus" size={16} />
          <span>Curate Moment</span>
        </button>
      </div>
    </header>
  )

  const renderPostCard = (post) => {
    const isLiked = liked[post.id]
    const isSaved = saved[post.id]
    const postReactions = reactions[post.id] || { fire: 82, love: 44, spark: 120, cheer: 32 }
    const postDiamonds = diamonds[post.id] || 12

    return (
      <article className="post-card" key={post.id}>
        <div className="post-card-header">
          <div className="post-author-box">
            <div className="post-author-avatar-wrap">
              <Avatar person={post.person} size="md" ring={true} />
            </div>
            <div className="post-author-details">
              <div className="post-author-name-row">
                <span className="post-author-name">{post.person.name}</span>
                <span className="verified-gold-badge">✦</span>
              </div>
              <div className="post-meta-row">
                <span>@{post.person.user}</span>
                <span>·</span>
                {post.location && <span className="post-location-tag">{post.location}</span>}
                <span>·</span>
                <span>{post.time}</span>
              </div>
            </div>
          </div>
          <button className="post-options-btn" onClick={() => { setSelectedPost(post); setModal('post-options') }}>
            <Icon name="more" size={16} />
          </button>
        </div>

        {post.headline && <h3 className="post-editorial-headline">{post.headline}</h3>}
        <p className="post-text-content whitespace-pre-line">{post.text}</p>
        {post.tag && <span className="post-tag-chip">{post.tag}</span>}

        {/* Embedded Link Preview Card */}
        {post.linkPreview && (
          <div className="embedded-link-card" onClick={() => flash('Archival dispatch opened')}>
            <div className="link-card-body">
              <div className="link-card-logo-wrap">
                <div className="link-card-badge">{post.linkPreview.badge}</div>
                <h4 className="link-card-title">{post.linkPreview.title}</h4>
              </div>
              <p className="link-card-desc">{post.linkPreview.desc}</p>
              <span className="link-card-domain">↗ {post.linkPreview.url}</span>
            </div>
          </div>
        )}

        {/* Interactive Curated Poll Component */}
        {post.isPoll && post.pollData && (
          <div className="curated-poll-box">
            <div className="poll-question">✦ {post.pollData.question}</div>
            <div className="flex flex-col gap-2">
              {post.pollData.options.map((opt, oIdx) => {
                const userVoted = pollVotes[post.id] === oIdx
                const hasVoted = pollVotes[post.id] !== undefined
                const total = post.pollData.totalVotes + (hasVoted ? 1 : 0)
                const currentVotes = opt.votes + (userVoted ? 1 : 0)
                const pct = Math.round((currentVotes / total) * 100)

                return (
                  <button
                    key={oIdx}
                    className="poll-option-btn"
                    onClick={() => {
                      setPollVotes(prev => ({ ...prev, [post.id]: oIdx }))
                      flash(`Your vote for "${opt.text}" has been recorded`)
                    }}
                  >
                    {hasVoted && (
                      <div
                        className="poll-progress-fill"
                        style={{ width: `${pct}%` }}
                      />
                    )}
                    <div className="poll-option-content">
                      <span>{opt.text}</span>
                      {hasVoted && <span>{pct}% {userVoted && '✓'}</span>}
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="poll-meta-footer">
              <span>{post.pollData.totalVotes + (pollVotes[post.id] !== undefined ? 1 : 0)} verified votes</span>
              <span>Exclusive to Patrons</span>
            </div>
          </div>
        )}

        {/* Atmospheric Audio Soundscape Waveform */}
        {post.hasAudio && (
          <div className={`soundscape-player-bar ${playingAudio[post.id] ? 'playing' : ''}`}>
            <button
              className="soundscape-play-btn"
              onClick={() => {
                const next = !playingAudio[post.id]
                setPlayingAudio(prev => ({ ...prev, [post.id]: next }))
                setActiveSoundscape(next ? { title: post.audioTitle || 'Atmospheric Soundscape (Lossless)' } : null)
                flash(next ? 'Atmospheric 3D soundscape active 🎧' : 'Soundscape paused')
              }}
            >
              {playingAudio[post.id] ? '❚❚' : '▶'}
            </button>
            <div className="soundscape-waveform">
              {[8, 14, 22, 12, 18, 24, 10, 16, 20, 14, 22, 18, 12, 16, 20, 8, 14, 22, 12, 18].map((h, wIdx) => (
                <div key={wIdx} className="waveform-bar" style={{ height: playingAudio[post.id] ? undefined : `${h}px` }} />
              ))}
            </div>
            <span className="soundscape-label">{post.audioTitle || 'Atmospheric Soundscape (Lossless)'}</span>
          </div>
        )}

        {/* Multi-Photo Media Presentation with SafeImage and Lightbox Zoom */}
        {post.gallery && post.gallery.length === 4 ? (
          <div className="post-media-stage">
            <div className="post-gallery-grid grid-4">
              {post.gallery.map((imgId, idx) => (
                <SafeImage
                  key={idx}
                  src={image(imgId, 800)}
                  alt={`${post.text} (Frame ${idx + 1})`}
                  category="Alpine"
                  className="cursor-zoom-in"
                  onClick={() => openLightbox(image(imgId, 1600), post.text, post.exif, post.person.name, post.location)}
                />
              ))}
            </div>
            <div className="post-curated-watermark">✦ Quad Gallery</div>
          </div>
        ) : post.gallery && post.gallery.length === 3 ? (
          <div className="post-media-stage">
            <div className="post-gallery-grid grid-3">
              {post.gallery.map((imgId, idx) => (
                <SafeImage
                  key={idx}
                  src={image(imgId, 800)}
                  alt={`${post.text} (Frame ${idx + 1})`}
                  category="Gallery"
                  className="cursor-zoom-in"
                  onClick={() => openLightbox(image(imgId, 1600), post.text, post.exif, post.person.name, post.location)}
                />
              ))}
            </div>
            <div className="post-curated-watermark">✦ Archival Gallery</div>
          </div>
        ) : post.gallery && post.gallery.length === 2 ? (
          <div className="post-media-stage">
            <div className="post-gallery-grid grid-2">
              {post.gallery.map((imgId, idx) => (
                <SafeImage
                  key={idx}
                  src={image(imgId, 800)}
                  alt={`${post.text} (Frame ${idx + 1})`}
                  category="Duo"
                  className="cursor-zoom-in"
                  onClick={() => openLightbox(image(imgId, 1600), post.text, post.exif, post.person.name, post.location)}
                />
              ))}
            </div>
            <div className="post-curated-watermark">✦ Duo Series</div>
          </div>
        ) : post.photo || post.mediaUrl ? (
          <div className="post-media-stage">
            <div className="post-single-wrap">
              {post.mediaType === 'video' ? (
                <video className="post-single-video" src={post.mediaUrl} controls />
              ) : (
                <SafeImage
                  src={post.mediaUrl || image(post.photo, 1200)}
                  alt={post.text}
                  category="Moment"
                  className="cursor-zoom-in"
                  onClick={() => openLightbox(post.mediaUrl || image(post.photo, 1600), post.text, post.exif, post.person.name, post.location)}
                />
              )}
              {post.isVideoReel && <div className="video-play-badge">▷</div>}
            </div>
            <div className="post-curated-watermark">✦ Archival Moment</div>
          </div>
        ) : null}

        {/* Unified Social Interaction Bar (Clean Alignment) */}
        <div className="post-interaction-bar">
          <div className="post-actions-group">
            <button
              className={`post-action-btn ${isLiked ? 'liked' : ''}`}
              onClick={() => toggleLike(post.id)}
            >
              <Icon name="heart" fill={isLiked ? 'currentColor' : 'none'} size={17} />
              <span>{((post.likes || 0) + (isLiked ? 1 : 0)).toLocaleString()}</span>
            </button>
            <button
              className="post-action-btn"
              onClick={() => {
                const el = document.getElementById(`comment-input-${post.id}`)
                el?.focus()
              }}
            >
              <Icon name="comment" size={17} />
              <span>{post.comments || 0}</span>
            </button>
            <button
              className="post-action-btn"
              onClick={() => { setSelectedPost(post); setModal('share-modal') }}
            >
              <Icon name="share" size={17} />
              <span>{post.shares || 0}</span>
            </button>
            <button
              className={`post-action-btn ${isSaved ? 'saved' : ''}`}
              onClick={() => toggleSave(post.id)}
            >
              <Icon name="bookmark" fill={isSaved ? 'currentColor' : 'none'} size={17} />
            </button>
          </div>

          <div className="post-reactions-right">
            <div
              className="post-reaction-cluster"
              onClick={() => {
                addReaction(post.id, 'fire')
                flash('Woow! Appreciation recorded ✨')
              }}
              title="Quick Appreciation"
            >
              <span className="reaction-emoji">🔥</span>
              <span className="reaction-emoji">😍</span>
              <span className="reaction-emoji">❤️</span>
              <span className="reaction-label">
                {(postReactions.fire || 0) + (postReactions.love || 0) > 0
                  ? `${(postReactions.fire || 0) + (postReactions.love || 0)} Woow!`
                  : 'Woow!'}
              </span>
            </div>
            <button
              className="post-diamond-chip"
              onClick={() => giveDiamond(post.id)}
              title="Award Diamond"
            >
              <Icon name="diamond" size={13} fill="currentColor" />
              <span>{postDiamonds}</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {(comments[post.id] || []).length > 0 && (
          <div className="post-comments-container">
            {comments[post.id].map((c, i) => (
              <div className="comment-row" key={i}>
                <Avatar person={c.person} size="sm" />
                <div className="comment-text-bubble">
                  <span className="comment-author-name">{c.person.name}</span>
                  <span className="comment-body-text">{c.text}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SquaChat Permanent Inline Reflection Bar */}
        <div className="post-inline-comment-row">
          <Avatar person={profile} size="sm" />
          <div className="post-inline-input-wrap">
            <input
              className="post-inline-input"
              placeholder="Add a reflection or whisper to the atelier…"
              value={inlineComments[post.id] || ''}
              onChange={(e) => setInlineComments(prev => ({ ...prev, [post.id]: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleInlineCommentSubmit(post.id)
              }}
            />
            <button
              className="post-inline-action-icon"
              type="button"
              title="Add Aura"
              onClick={() => {
                const current = inlineComments[post.id] || ''
                setInlineComments(prev => ({ ...prev, [post.id]: current ? `${current} ✨` : 'Sublime ✨' }))
              }}
            >
              <Icon name="sparkle" size={15} />
            </button>
            <button
              className="post-inline-send-btn"
              type="button"
              onClick={() => handleInlineCommentSubmit(post.id)}
            >
              Send
            </button>
          </div>
        </div>
      </article>
    )
  }

  // Visual Mosaic Grid Card
  const renderMosaicCard = (post) => (
    <div
      key={post.id}
      className="mosaic-post-card"
      onClick={() => { setSelectedPost(post); setModal('post-preview') }}
    >
      <div className="mosaic-post-img-wrap">
        <SafeImage
          src={post.mediaUrl || image(post.gallery ? post.gallery[0] : post.photo, 700)}
          alt={post.tag || 'Moment'}
          className="mosaic-post-img"
        />
        <div className="post-curated-watermark">✦ {post.tag || 'Velqora'}</div>
      </div>
      <div className="mosaic-post-footer">
        <div className="mosaic-author-info">
          <Avatar person={post.person} size="sm" ring={true} />
          <span className="mosaic-author-name">{post.person.name}</span>
        </div>
        <div className="mosaic-counters">
          <span>❤️ {post.likes.toLocaleString()}</span>
          <span>💬 {post.comments}</span>
        </div>
      </div>
    </div>
  )

  const renderRightRail = () => (
    <aside className="right-rail">
      {/* Profile Summary Card with Vault Metrics */}
      <div className="rail-profile-card">
        <SafeImage
          className="rail-profile-cover"
          src={image(profile.coverPhoto || 'photo-1470252649378-9c29740c9fa8', 600)}
          alt="Cover"
        />
        <div className="rail-profile-body">
          <Avatar
            person={profile}
            size="lg"
            className="rail-profile-avatar"
            ring={true}
          />
          <h3 className="rail-profile-name">
            {profile.name}
            <span className="text-[var(--gold-primary)]">✦</span>
          </h3>
          <span className="rail-profile-handle">@{profile.user}</span>
          <p className="rail-profile-bio">{profile.role || 'Connoisseur of fine arts & slow living'}</p>
          <div className="rail-profile-stats">
            <div className="rail-stat-item">
              <span className="rail-stat-val">128</span>
              <span className="rail-stat-lbl">Moments</span>
            </div>
            <div className="rail-stat-item">
              <span className="rail-stat-val">3.4k</span>
              <span className="rail-stat-lbl">Patrons</span>
            </div>
            <div className="rail-stat-item">
              <span className="rail-stat-val">492</span>
              <span className="rail-stat-lbl">Following</span>
            </div>
          </div>

          {/* Sovereign Vault Metrics */}
          <div className="vault-metrics-box w-full text-left">
            <div className="vault-metric-row">
              <span className="vault-metric-label">Archival Diamonds</span>
              <span className="vault-metric-value text-sky-400">💎 145</span>
            </div>
            <div className="vault-metric-row">
              <span className="vault-metric-label">Privé Invitations</span>
              <span className="vault-metric-value text-[var(--gold-primary)]">3 Available</span>
            </div>
          </div>

          <button className="rail-view-dossier-btn mt-3" onClick={() => setActive('Profile')}>
            View Full Dossier
          </button>
        </div>
      </div>

      {/* Desofy-Inspired Sovereign Patron Metrics */}
      <div className="desofy-patron-card">
        <div className="desofy-badge-row">
          <div className="desofy-token-pill">
            <span className="text-base">⚜️</span>
            <span>$VELQ · Sovereign</span>
          </div>
          <span className="desofy-growth-tag">+4.8% ↗</span>
        </div>
        <div className="desofy-stats-table">
          <div className="desofy-stat-row">
            <span className="label">$VELQ Index</span>
            <span className="val text-sky-400">$9.02 USD</span>
          </div>
          <div className="desofy-stat-row">
            <span className="label">Patron Vault</span>
            <span className="val">245.50 $VELQ ($2,214.41)</span>
          </div>
          <div className="desofy-stat-row">
            <span className="label">Archival Diamonds</span>
            <span className="val text-amber-300">💎 1,420</span>
          </div>
          <div className="desofy-stat-row">
            <span className="label">Royalties Earned</span>
            <span className="val text-emerald-400">$8,650.00</span>
          </div>
        </div>
        <button
          className="desofy-claim-btn"
          onClick={() => flash('⚜️ 245.50 $VELQ royalties successfully claimed to your sovereign vault')}
        >
          Claim Patron Royalties
        </button>
      </div>

      {/* Bogdan Nikitin Curated Recommendations */}
      <div className="rail-card">
        <div className="rail-card-header">
          <h4 className="rail-card-title">Recommendations</h4>
          <span className="text-xs text-[var(--gold-primary)] font-semibold cursor-pointer" onClick={() => setActive('Explore')}>
            Explore All
          </span>
        </div>
        <div className="recommendations-grid">
          <button
            className="rec-tile ui-ux"
            onClick={() => { setQuery('Architecture'); setActive('Explore'); flash('Exploring UI/UX & Systems Craft') }}
          >
            <div className="rec-tile-icon">⤫</div>
            <span className="rec-tile-title">UI / UX</span>
            <span className="rec-tile-sub">Curated Craft</span>
          </button>
          <button
            className="rec-tile music"
            onClick={() => { setQuery('Iceland'); setActive('Explore'); flash('Listening to 3D Lossless Soundscapes') }}
          >
            <div className="rec-tile-icon">♫</div>
            <span className="rec-tile-title">Music</span>
            <span className="rec-tile-sub">3D Lossless</span>
          </button>
          <button
            className="rec-tile cooking"
            onClick={() => { setQuery('Atelier'); setActive('Explore'); flash('Browsing Artisan Roasts & Salons') }}
          >
            <div className="rec-tile-icon">☕</div>
            <span className="rec-tile-title">Atelier</span>
            <span className="rec-tile-sub">Slow Hours</span>
          </button>
          <button
            className="rec-tile hiking"
            onClick={() => { setQuery('Alpine'); setActive('Explore'); flash('Exploring Alpine Expeditions') }}
          >
            <div className="rec-tile-icon">▲</div>
            <span className="rec-tile-title">Alpine</span>
            <span className="rec-tile-sub">High Summits</span>
          </button>
        </div>
      </div>

      {/* SquaChat Suggested Salons & Ateliers */}
      <div className="rail-card">
        <div className="rail-card-header">
          <h4 className="rail-card-title">Suggested Salons</h4>
          <span className="text-xs text-[var(--gold-primary)] font-semibold cursor-pointer" onClick={() => setActive('Explore')}>
            See All
          </span>
        </div>
        <div className="flex flex-col">
          {[
            { key: 'nature', name: 'All About Nature', icon: '🌿', meta: 'Followed by Sophia & 14k others' },
            { key: 'art', name: 'Artistic Belief', icon: '🎨', meta: 'Neoclassical & pigment ateliers' },
            { key: 'design', name: 'Design Hub & Brutalism', icon: '🏛️', meta: '19.4k architects & connoisseurs' },
            { key: 'light', name: 'Love & Quiet Light', icon: '✨', meta: '5.3k members · Atmospheric study' }
          ].map((salon) => {
            const isJoined = joinedSalons[salon.key]
            return (
              <div className="suggested-salon-row" key={salon.key}>
                <div className="suggested-salon-info">
                  <div className="suggested-salon-avatar">{salon.icon}</div>
                  <div className="suggested-salon-meta">
                    <span className="suggested-salon-name">{salon.name}</span>
                    <span className="suggested-salon-desc">{salon.meta}</span>
                  </div>
                </div>
                <button
                  className={`suggested-salon-join-btn ${isJoined ? 'joined' : ''}`}
                  onClick={() => {
                    setJoinedSalons(prev => ({ ...prev, [salon.key]: !isJoined }))
                    flash(isJoined ? `Left ${salon.name}` : `Welcome to ${salon.name}`)
                  }}
                >
                  {isJoined ? 'Joined' : 'Join'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Trending Now with Real Mini Wave Graphs */}
      <div className="rail-card">
        <div className="rail-card-header">
          <h4 className="rail-card-title">Trending Now</h4>
          <span className="text-xs text-[var(--gold-primary)] font-semibold cursor-pointer" onClick={() => setActive('Explore')}>
            View All
          </span>
        </div>
        {[
          {
            rank: '1',
            tag: '#VelqoraArchival',
            count: '24.5K posts',
            color: '#38bdf8',
            path: 'M 0 16 Q 18 4, 36 14 T 72 8'
          },
          {
            rank: '2',
            tag: '#MinimalistCraft',
            count: '18.7K posts',
            color: '#34d399',
            path: 'M 0 20 Q 20 8, 40 18 T 72 6'
          },
          {
            rank: '3',
            tag: '#AlpineMonochrome',
            count: '15.2K posts',
            color: '#c084fc',
            path: 'M 0 14 Q 24 24, 48 10 T 72 12'
          },
          {
            rank: '4',
            tag: '#HauteHorology',
            count: '11.8K posts',
            color: '#fbbf24',
            path: 'M 0 18 Q 20 12, 40 22 T 72 4'
          },
          {
            rank: '5',
            tag: '#SlowLiving',
            count: '9.6K posts',
            color: '#f43f5e',
            path: 'M 0 22 Q 18 10, 42 16 T 72 8'
          }
        ].map((item) => (
          <button
            className="trending-chart-row"
            key={item.rank}
            onClick={() => { setQuery(item.tag); setActive('Explore') }}
          >
            <span className="trending-rank-num">{item.rank}</span>
            <div className="trending-chart-meta">
              <span className="trending-chart-tag">{item.tag}</span>
              <span className="trending-chart-count">{item.count}</span>
            </div>
            <svg className="sparkline-svg" viewBox="0 0 72 28">
              <path
                d={item.path}
                fill="none"
                stroke={item.color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ))}
      </div>

      {/* Communities Section */}
      <div className="rail-card">
        <div className="rail-card-header">
          <h4 className="rail-card-title">Curated Communities</h4>
          <span className="text-xs text-[var(--gold-primary)] font-semibold cursor-pointer" onClick={() => setActive('Explore')}>
            Explore
          </span>
        </div>
        {[
          { key: 'photo', name: 'Photography Connoisseurs', members: '128K members', icon: '📷' },
          { key: 'arch', name: 'Architectural Ateliers', members: '98K members', icon: '🏛️' },
          { key: 'lit', name: 'The Literary Salon', members: '76K members', icon: '📜' },
          { key: 'alpine', name: 'Alpine Explorers', members: '54K members', icon: '🏔️' },
          { key: 'horo', name: 'Haute Horology Society', members: '32K members', icon: '⏱️' }
        ].map((com) => {
          const isJoined = joinedCommunities[com.key]
          return (
            <div className="community-row" key={com.key}>
              <div className="community-info">
                <div className="community-icon-box">{com.icon}</div>
                <div className="community-meta">
                  <span className="community-name">{com.name}</span>
                  <span className="community-members">{com.members}</span>
                </div>
              </div>
              <button
                className={`community-join-btn ${isJoined ? 'joined' : ''}`}
                onClick={() => {
                  setJoinedCommunities(prev => ({ ...prev, [com.key]: !isJoined }))
                  flash(isJoined ? `Left ${com.name}` : `Joined ${com.name}`)
                }}
              >
                {isJoined ? 'Joined' : 'Join'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Suggested for You */}
      <div className="rail-card">
        <div className="rail-card-header">
          <h4 className="rail-card-title">Suggested for you</h4>
          <span className="text-xs text-[var(--gold-primary)] font-semibold cursor-pointer" onClick={() => setActive('Explore')}>
            View All
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {connoisseurs.slice(0, 3).map((person) => {
            const isFollowed = following[person.user]
            return (
              <div className="flex items-center justify-between gap-3" key={person.user}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar person={person} size="sm" ring={true} />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[var(--text-primary)] truncate">{person.name}</span>
                    <span className="text-[10.5px] text-[var(--text-muted)] truncate">@{person.user}</span>
                  </div>
                </div>
                <button
                  className={`follow-pill-btn ${isFollowed ? 'following' : ''}`}
                  onClick={() => {
                    setFollowing(prev => ({ ...prev, [person.user]: !isFollowed }))
                    flash(isFollowed ? `Unfollowed ${person.name}` : `Following ${person.name}`)
                  }}
                >
                  {isFollowed ? 'Following' : 'Follow'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Patrons in Salon */}
      <div className="rail-card">
        <div className="rail-card-header">
          <h4 className="rail-card-title">Patrons in Salon</h4>
          <span className="text-[11px] text-[#34d399] font-semibold flex items-center gap-1.5">
            <span className="online-circle-dot-active" /> 6 Online
          </span>
        </div>
        <div className="flex flex-col gap-1">
          {[
            { name: 'Marcus Rosser', loc: 'Milan Atelier', status: 'active', user: 'georgelobko' },
            { name: 'Miracle George', loc: 'Paris Salon', status: 'active', user: 'keishaharrison' },
            { name: 'Tiana Franci', loc: 'Kyoto Studio', status: 'active', user: 'oliviabennett' },
            { name: 'Kierra Dokidis', loc: 'London Gallery', status: 'active', user: 'sophialee' },
            { name: 'Nolan Dorwart', loc: 'Zurich Vault', status: 'busy', user: 'jamescarter' },
            { name: 'Cheyenne Mango', loc: 'Lisbon Archive', status: 'active', user: 'golovin' },
          ].map((friend, i) => (
            <button
              key={i}
              className="online-circle-row"
              onClick={() => {
                const partner = connoisseurs.find(c => c.user === friend.user) || connoisseurs[0]
                setChatUser(partner)
                setActive('Messages')
                flash(`Opening Whisper dialogue with ${friend.name}`)
              }}
            >
              <div className="online-circle-meta">
                <span className={friend.status === 'active' ? 'online-circle-dot-active' : 'online-circle-dot-busy'} />
                <span className="text-xs font-semibold text-[var(--text-primary)]">{friend.name}</span>
                <span className="text-[10px] text-[var(--text-muted)]">· {friend.loc}</span>
              </div>
              <span className="text-xs text-[var(--gold-primary)] font-bold">✓</span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Epigraph */}
      <div className="epigraph-card">
        <span className="epigraph-label">✦ The Daily Epigraph</span>
        <blockquote className="epigraph-quote">
          “Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.”
        </blockquote>
        <span className="epigraph-author">— Antoine de Saint-Exupéry</span>
      </div>

      <div className="site-footer-rail">
        <p>© 2026 Velqora Haute Sociale. All rights reserved.</p>
        <p>Private Sphere · Archival Standards · Intention First</p>
      </div>
    </aside>
  )

  // --------------------------------------------------------------------------
  // Main Views
  // --------------------------------------------------------------------------

  const renderHome = () => (
    <>
      {renderTopNav(`Good day, ${profile.name}`, 'FRIDAY, AUTUMN SALON')}
      <div className="content-container">
        <div className="feed-layout">
          <div className="center-stream">
            {/* The Stories Salon Shelf */}
            <section className="stories-shelf">
              <div className="shelf-header">
                <h3 className="shelf-title">The Circle Stories</h3>
                <button className="shelf-action" onClick={() => setModal('all-stories')}>
                  <span>Watch all</span>
                  <span>→</span>
                </button>
              </div>
              <div className="stories-track">
                {/* Add Story */}
                <div className="story-card-add" onClick={() => document.getElementById('story-file-input')?.click()}>
                  <div className="story-add-icon-wrap">
                    <Icon name="plus" size={18} />
                  </div>
                  <span className="story-add-label">Your Story</span>
                  <input
                    id="story-file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) {
                        const url = URL.createObjectURL(f)
                        setStories([{ person: profile, photo: url, isCustom: true }, ...stories])
                        flash('Story published to The Circle')
                      }
                    }}
                  />
                </div>

                {/* Story Cards */}
                {stories.map((st, i) => (
                  <div
                    className="story-card"
                    key={i}
                    onClick={() => { setSelectedStory(st); setModal('story-view') }}
                  >
                    <SafeImage
                      className="story-card-img"
                      src={st.isCustom ? st.photo : image(st.photo, 400)}
                      alt={st.person.name}
                      category="Story"
                    />
                    <div className="story-card-overlay">
                      <div className="story-avatar-ring">
                        <Avatar
                          person={st.person}
                          size="sm"
                          className="story-avatar-img"
                        />
                      </div>
                      <span className="story-author-name">{st.person.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Editorial Composer ("What's on your mind?") */}
            <section className="composer-card">
              <div className="composer-header">
                <Avatar person={profile} size="md" ring={true} />
                <div className="composer-input-wrap">
                  <textarea
                    className="composer-textarea"
                    placeholder={`What's on your mind, ${profile.name.split(' ')[0]}? Curate a moment worth preserving…`}
                    value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                  />
                  {composerMedia && (
                    <div className="composer-media-preview-box">
                      {composerMediaType === 'video' ? (
                        <video src={composerMedia} controls className="w-full max-h-56 object-cover" />
                      ) : (
                        <img src={composerMedia} alt="Preview" className="composer-media-preview-img" />
                      )}
                      <button className="remove-media-btn" onClick={() => setComposerMedia('')}>
                        <Icon name="close" size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="composer-footer">
                <div className="composer-actions-left">
                  <button
                    className="composer-tool-btn"
                    onClick={() => document.getElementById('composer-upload')?.click()}
                  >
                    <Icon name="image" size={16} />
                    <span>Image</span>
                  </button>
                  <input
                    id="composer-upload"
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleMediaUpload}
                  />

                  <button
                    className="composer-tool-btn"
                    onClick={() => document.getElementById('composer-upload')?.click()}
                  >
                    <Icon name="video" size={16} />
                    <span>Video</span>
                  </button>

                  <button
                    className="composer-tool-btn"
                    onClick={() => setModal('audience-modal')}
                  >
                    <Icon name="lock" size={15} />
                    <span>{activeAudience}</span>
                  </button>

                  <button
                    className="composer-tool-btn"
                    onClick={() => setComposerText(prev => prev ? `${prev} #TimelessCraft` : '#TimelessCraft')}
                  >
                    <Icon name="sparkle" size={15} />
                    <span>Aura</span>
                  </button>
                </div>

                <button
                  className="composer-submit-btn"
                  onClick={publishPost}
                  disabled={!composerText.trim() && !composerMedia}
                >
                  <span>Publish Moment</span>
                  <Icon name="share" size={14} />
                </button>
              </div>
            </section>

            {/* Feed Filters & View Switcher */}
            <div className="feed-filter-bar">
              <div className="filter-pills">
                {[
                  { key: 'curated', label: 'Curated Stream' },
                  { key: 'circle', label: 'Inner Circle' },
                  { key: 'visual', label: 'Visual Poetry' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    className={`filter-pill ${feedFilter === tab.key ? 'active' : ''}`}
                    onClick={() => setFeedFilter(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                className="sort-dropdown-btn"
                onClick={() => setFeedSort(feedSort === 'latest' ? 'popular' : 'latest')}
              >
                <span>{feedSort === 'latest' ? 'Sort: Chronological' : 'Sort: Most Appreciated'}</span>
                <span>⌄</span>
              </button>
            </div>

            {/* Posts Flow: Stream vs Mosaic */}
            {feedViewMode === 'mosaic' ? (
              <div className="visual-mosaic-grid">
                {(feedSort === 'popular' ? [...posts].sort((a, b) => b.likes - a.likes) : posts).map(post => renderMosaicCard(post))}
              </div>
            ) : (
              <div className="posts-flow">
                {(feedSort === 'popular' ? [...posts].sort((a, b) => b.likes - a.likes) : posts).map(post => renderPostCard(post))}
              </div>
            )}
          </div>

          {renderRightRail()}
        </div>
      </div>
    </>
  )

  const renderExplore = () => {
    const matchingPosts = posts.filter(p =>
      `${p.text} ${p.tag} ${p.person.name}`.toLowerCase().includes(query.toLowerCase())
    )
    const matchingConnoisseurs = connoisseurs.filter(c =>
      `${c.name} ${c.role} ${c.location}`.toLowerCase().includes(query.toLowerCase())
    )

    return (
      <>
        {renderTopNav('Explore & Curations', 'ARCHIVES & DISCOVERY')}
        <div className="content-container">
          <div className="page-standalone-wrap">
            {/* Hero Feature Banner */}
            <div className="explore-hero-card">
              <SafeImage
                className="explore-hero-bg"
                src={image('photo-1513694203232-719a280e022f', 1200)}
                alt="Feature Archival"
                category="Architecture"
              />
              <div className="explore-hero-gradient" />
              <div className="explore-hero-content">
                <span className="explore-hero-badge">✦ Retrospective Curation</span>
                <h2 className="explore-hero-title">The Essence of Architectural Stillness</h2>
                <button className="explore-hero-btn" onClick={() => { setQuery('Architecture'); flash('Filtered by Architecture') }}>
                  Immerse in Exhibition
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="filter-pills">
              {['All Collections', 'Architecture', 'Visual Arts', 'Haute Horology', 'Alpine', 'Slow Living'].map((pill, idx) => (
                <button
                  key={idx}
                  className={`filter-pill ${idx === 0 && !query ? 'active' : query === pill ? 'active' : ''}`}
                  onClick={() => setQuery(idx === 0 ? '' : pill)}
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Connoisseur Row */}
            <div className="rail-card">
              <h3 className="rail-card-title mb-4">Leading Curators in the Salon</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {matchingConnoisseurs.slice(0, 3).map((person) => (
                  <div key={person.user} className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] flex items-center gap-3">
                    <Avatar person={person} size="md" ring={true} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[var(--text-primary)] truncate">{person.name}</h4>
                      <p className="text-xs text-[var(--text-muted)] truncate">{person.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Tiles */}
            <h3 className="rail-card-title mt-4">Curated Moments from the Sphere</h3>
            <div className="explore-tiles-grid">
              {matchingPosts.filter(p => p.photo || p.mediaUrl || p.gallery).map((p) => (
                <div
                  key={p.id}
                  className="explore-tile-item"
                  onClick={() => { setSelectedPost(p); setModal('post-preview') }}
                >
                  <SafeImage
                    className="explore-tile-img"
                    src={p.mediaUrl || image(p.gallery ? p.gallery[0] : p.photo, 600)}
                    alt={p.tag}
                    category="Explore"
                  />
                  <div className="explore-tile-overlay">
                    <span className="explore-tile-caption">{p.tag} · {p.likes.toLocaleString()} Appreciations</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderMessages = () => {
    const threadMessages = messagesByUser[chatUser.user] || []
    const filteredContacts = connoisseurs.filter(c =>
      c.name.toLowerCase().includes(chatFilter.toLowerCase())
    )

    return (
      <>
        {renderTopNav('Whispers & Salons', 'ENCRYPTED DIALOGUE')}
        <div className="content-container">
          <div className="messages-messenger">
            {/* Contact List */}
            <div className="messenger-contact-list">
              <div className="messenger-search-box">
                <input
                  className="messenger-search-input"
                  placeholder="Search dialogues…"
                  value={chatFilter}
                  onChange={(e) => setChatFilter(e.target.value)}
                />
              </div>
              <div className="messenger-scroll-area">
                {filteredContacts.map((contact) => {
                  const isSelected = chatUser.user === contact.user
                  const lastMsg = (messagesByUser[contact.user] || []).slice(-1)[0]
                  return (
                    <button
                      key={contact.user}
                      className={`contact-thread-item ${isSelected ? 'active' : ''}`}
                      onClick={() => setChatUser(contact)}
                    >
                      <div className="contact-thread-avatar-wrap">
                        <Avatar person={contact} size="md" />
                        <span className="online-status-dot" />
                      </div>
                      <div className="contact-thread-meta">
                        <span className="contact-thread-name">{contact.name}</span>
                        <span className="contact-thread-preview">
                          {lastMsg ? lastMsg.text : 'Initiate a dialogue…'}
                        </span>
                      </div>
                      <span className="contact-thread-time">10:42</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Conversation Pane */}
            <div className="messenger-conversation-pane">
              <div className="chat-header-bar">
                <div className="chat-partner-info">
                  <Avatar person={chatUser} size="md" ring={true} />
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">{chatUser.name}</h4>
                    <span className="text-xs text-[var(--gold-primary)]">● Active in Private Salon</span>
                  </div>
                </div>
                <button className="icon-action-btn" onClick={() => setModal('chat-details')}>
                  <Icon name="more" size={16} />
                </button>
              </div>

              <div className="chat-messages-scroll">
                <div className="text-center my-4">
                  <span className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-3 py-1 rounded-full border border-[var(--border-subtle)]">
                    End-to-End Encrypted Salon
                  </span>
                </div>
                {threadMessages.map((msg, idx) => (
                  <div key={idx} className={`chat-bubble ${msg.from}`}>
                    {msg.text}
                    {msg.media && (
                      <img src={msg.media} alt="Attachment" className="chat-media-attachment" />
                    )}
                  </div>
                ))}
              </div>

              <div className="chat-input-bar">
                <button
                  className="icon-action-btn"
                  onClick={() => document.getElementById('chat-file-input')?.click()}
                >
                  <Icon name="image" size={16} />
                </button>
                <input
                  id="chat-file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) setMessageMedia(URL.createObjectURL(f))
                  }}
                />
                <input
                  className="chat-composer-input"
                  placeholder={`Whisper a note to ${chatUser.name.split(' ')[0]}…`}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button className="chat-send-icon-btn" onClick={sendMessage}>
                  <Icon name="share" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderNotifications = () => (
    <>
      {renderTopNav('The Ledger', 'ACTIVITY & APPRECIATIONS')}
      <div className="content-container">
        <div className="notification-ledger max-w-3xl mx-auto">
          <div className="ledger-header">
            <h3 className="shelf-title">Recent Appreciations</h3>
            <button className="shelf-action" onClick={() => flash('All notifications marked as reviewed')}>
              Mark all as read
            </button>
          </div>
          {[
            { person: connoisseurs[0], action: 'appreciated your reflection on Skógafoss waterfall and northern light.', time: '14 min ago', unread: true },
            { person: connoisseurs[1], action: 'awarded 💎 5 Diamonds to your Archival Dispatch.', time: '35 min ago', unread: true },
            { person: connoisseurs[2], action: 'began following your curations in the Alpine Salon.', time: '1 hour ago', unread: true },
            { person: connoisseurs[3], action: 'commented: “The emotional clarity of this frame is profound.”', time: '3 hours ago', unread: false },
            { person: connoisseurs[4], action: 'archived your moment to their Private Dossier.', time: 'Yesterday', unread: false },
          ].map((item, idx) => (
            <div className={`ledger-row ${item.unread ? 'unread' : ''}`} key={idx}>
              <Avatar person={item.person} size="md" ring={true} />
              <div className="ledger-content">
                <p>
                  <b>{item.person.name}</b> {item.action}
                </p>
                <span className="ledger-time">{item.time}</span>
              </div>
              <SafeImage
                className="ledger-thumb"
                src={image('photo-1470252649378-9c29740c9fa8', 100)}
                alt="Thumbnail"
                category="Ledger"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )

  const renderProfile = () => {
    const profilePhotos = [
      'photo-1476610182048-b716b80d88ac',
      'photo-1504893524553-b855bce32c67',
      'photo-1531366936337-7c912a4589a7',
      'photo-1470252649378-9c29740c9fa8',
      'photo-1464822759023-fed622ff2c3b',
      'photo-1472214103451-9374bd1c798e'
    ]
    const savedPosts = posts.filter(p => saved[p.id])

    return (
      <>
        {renderTopNav('The Atelier Dossier', 'PRIVATE PORTFOLIO')}
        <div className="content-container">
          <div className="profile-dossier-card max-w-4xl mx-auto">
            <div className="relative">
              <SafeImage
                className="profile-cover-banner"
                src={image(profile.coverPhoto || 'photo-1470252649378-9c29740c9fa8', 1200)}
                alt="Dossier Cover"
                category="Cover"
              />
              <button
                className="profile-cover-action"
                onClick={() => document.getElementById('cover-input')?.click()}
              >
                Edit Cover Art
              </button>
              <input
                id="cover-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) setProfile({ ...profile, coverPhoto: URL.createObjectURL(f) })
                }}
              />
            </div>

            <div className="profile-dossier-body">
              <div className="profile-dossier-avatar-row">
                <Avatar
                  person={profile}
                  size="xl"
                  className="profile-main-avatar"
                  ring={true}
                />
                <button className="profile-edit-btn" onClick={() => setModal('edit-profile')}>
                  Edit Dossier
                </button>
              </div>

              <h2 className="profile-name-title">{profile.name}</h2>
              <span className="profile-handle-sub">@{profile.user} · Velqora Founding Patron</span>
              <p className="profile-bio-text">{profile.bio}</p>

              <button
                type="button"
                className="profile-link-chip"
                onClick={() => {
                  navigator.clipboard?.writeText('https://velqora.luxury/patron/jungkook')
                  flash('Dossier link copied to clipboard')
                }}
              >
                <span>velqora.luxury/patron/jungkook</span>
                <span>↗</span>
              </button>

              <div className="profile-stats-capsule">
                <div className="profile-stat-box">
                  <span className="profile-stat-num">128</span>
                  <span className="profile-stat-text">Moments</span>
                </div>
                <div className="profile-stat-box">
                  <span className="profile-stat-num">205k</span>
                  <span className="profile-stat-text">Patrons</span>
                </div>
                <div className="profile-stat-box">
                  <span className="profile-stat-num">110</span>
                  <span className="profile-stat-text">Following</span>
                </div>
                <div className="profile-stat-box">
                  <span className="profile-stat-num">11.3k</span>
                  <span className="profile-stat-text">Appreciations</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 border-b border-[var(--border-subtle)] mt-8 mb-6 overflow-x-auto">
                <button
                  className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${profileTab === 'moments' ? 'border-[var(--gold-primary)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-muted)]'}`}
                  onClick={() => setProfileTab('moments')}
                >
                  ▦ Moments (128)
                </button>
                <button
                  className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${profileTab === 'reels' ? 'border-[var(--gold-primary)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-muted)]'}`}
                  onClick={() => setProfileTab('reels')}
                >
                  ▷ Motion Reels (15)
                </button>
                <button
                  className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${profileTab === 'vault' ? 'border-[var(--gold-primary)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-muted)]'}`}
                  onClick={() => setProfileTab('vault')}
                >
                  🔒 Privé Vault (Archival)
                </button>
                <button
                  className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${profileTab === 'saved' ? 'border-[var(--gold-primary)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-muted)]'}`}
                  onClick={() => setProfileTab('saved')}
                >
                  ▱ Archival Treasures ({savedPosts.length})
                </button>
              </div>

              {profileTab === 'moments' ? (
                <div className="profile-moments-grid">
                  {profilePhotos.map((pPhoto, i) => (
                    <div
                      key={i}
                      className="profile-photo-cell"
                      onClick={() => openLightbox(image(pPhoto, 1600), `Archival moment #${i + 1} by ${profile.name}`, 'Leica M11 · 35mm f/1.4 · Lossless 4K', profile.name, profile.location)}
                    >
                      <SafeImage
                        src={image(pPhoto, 500)}
                        alt={`Moment ${i}`}
                        category="Dossier"
                      />
                      <div className="profile-photo-overlay">
                        <span>♡ 23.5k</span>
                        <span>💬 1.2k</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : profileTab === 'reels' ? (
                <div className="reels-grid">
                  {[
                    { title: 'Botanical Movement & 35mm Shutter', img: 'photo-1524504388940-b1c1722653e1', views: '42.5k', diamonds: 840, loc: 'Conservatory NY' },
                    { title: 'Nocturne Atelier & Soft Rain', img: 'photo-1517694712202-14dd9538aa97', views: '28.4k', diamonds: 612, loc: 'Copenhagen' },
                    { title: 'Glacial Echoes in Kirkjufell', img: 'photo-1531366936337-7c912a4589a7', views: '64.1k', diamonds: '1.2k', loc: 'Iceland' },
                    { title: 'Drapery & Natural Light Choreography', img: 'photo-1507525428034-b723cf961d3e', views: '31.9k', diamonds: 750, loc: 'Malibu' },
                    { title: 'Midnight in Paris Marais', img: 'photo-1579783900882-c0d3dad7b119', views: '19.8k', diamonds: 420, loc: 'Paris' },
                    { title: 'Alpine Ridge & Monolithic Stone', img: 'photo-1464822759023-fed622ff2c3b', views: '52.0k', diamonds: 980, loc: 'Zermatt' },
                  ].map((reel, rIdx) => (
                    <div
                      key={rIdx}
                      className="reel-card"
                      onClick={() => openLightbox(image(reel.img, 1200), reel.title, 'ARRI Alexa Mini LF · Cooke Anamorphic', profile.name, reel.loc)}
                    >
                      <SafeImage src={image(reel.img, 600)} alt={reel.title} category="Reel" />
                      <div className="reel-play-icon-badge">▷</div>
                      <div className="reel-footer-meta">
                        <span className="reel-title">{reel.title}</span>
                        <div className="reel-stats-row">
                          <span>👁 {reel.views}</span>
                          <span>💎 {reel.diamonds}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : profileTab === 'vault' ? (
                <div className="py-6">
                  <div className="p-4 rounded-xl border border-[var(--gold-border)] bg-[var(--bg-tertiary)] flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--gold-glow)] text-[var(--gold-primary)] flex items-center justify-center font-bold">
                        🔒
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[var(--text-primary)]">Founding Patron Vault Unlocked</h4>
                        <p className="text-xs text-[var(--text-muted)]">Encrypted 4K raw masters & unpublished exhibition negatives.</p>
                      </div>
                    </div>
                    <span className="text-xs text-[var(--gold-primary)] font-bold">Tier 01 Active</span>
                  </div>
                  <div className="profile-moments-grid">
                    {['photo-1513694203232-719a280e022f', 'photo-1579783900882-c0d3dad7b119', 'photo-1516483638261-f4dbaf036963'].map((vaultPhoto, idx) => (
                      <div
                        key={idx}
                        className="profile-photo-cell"
                        onClick={() => openLightbox(image(vaultPhoto, 1600), 'Privé Vault Master Negative', 'Hasselblad 907X · Archival Master Raw', profile.name, 'Atelier Vault')}
                      >
                        <SafeImage
                          src={image(vaultPhoto, 500)}
                          alt="Vault Asset"
                          category="Vault"
                        />
                        <div className="profile-photo-overlay">
                          <span>✦ Archival Master</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="posts-flow mt-4">
                  {savedPosts.map(sp => renderPostCard(sp))}
                  {savedPosts.length === 0 && (
                    <div className="text-center py-12 text-[var(--text-muted)]">
                      No archived treasures yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  // --------------------------------------------------------------------------
  // Auth Screen
  // --------------------------------------------------------------------------
  if (!isSignedIn) {
    return (
      <main className="auth-split-viewport">
        <section className="auth-art-column">
          <div className="flex items-center gap-3">
            <div className="brand-badge">
              <span className="brand-glyph">V</span>
            </div>
            <span className="brand-name">Velqora</span>
          </div>

          <div className="auth-art-copy">
            <span className="prive-tag">✦ Exclusive Sphere</span>
            <h1 className="auth-art-headline">
              Timeless Elegance.<br />
              <i>Permanent Impression.</i>
            </h1>
            <p className="auth-art-sub">
              An invitation into a more considered social landscape. Curated moments, enduring aesthetics, and elevated dialogue for the discerning mind.
            </p>
          </div>

          <div className="text-xs text-[var(--text-muted)]">
            © 2026 Velqora Haute Sociale. By invitation & application.
          </div>

          <SafeImage
            src="/jk-profile.png"
            alt="Editorial Muse"
            category="Portrait"
            className="auth-art-bg-portrait"
          />
        </section>

        <section className="auth-form-column">
          <div className="auth-form-box">
            <span className="prive-tag">Welcome to Velqora</span>
            <h2 className="text-3xl font-bold font-[var(--font-display)] text-[var(--text-primary)] mt-1">
              {authMode === 'login' ? 'Enter the Salon' : 'Request Membership'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {authMode === 'login'
                ? 'Sign in to access your curated stream and private salons.'
                : 'Join a private network of artisans, collectors, and thinkers.'}
            </p>

            <div className="auth-tab-switch">
              <button
                type="button"
                className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => { setAuthError(''); setAuthMode('login') }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => { setAuthError(''); setAuthMode('signup') }}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={submitAuth}>
              {authMode === 'signup' && (
                <div className="auth-input-group">
                  <label className="auth-input-label">Full Name</label>
                  <input
                    name="name"
                    className="auth-field"
                    placeholder="Jung Kook"
                    required
                  />
                </div>
              )}

              <div className="auth-input-group">
                <label className="auth-input-label">Email Address</label>
                <input
                  name="email"
                  type="email"
                  className="auth-field"
                  placeholder="jungkook@velqora.luxury"
                  defaultValue="jungkook@velqora.luxury"
                  required
                />
              </div>

              <div className="auth-input-group">
                <label className="auth-input-label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="auth-field"
                  placeholder="••••••••••••"
                  defaultValue="velqora2026"
                  required
                />
              </div>

              {authError && (
                <p className="text-rose-500 text-xs mb-3">{authError}</p>
              )}

              <button type="submit" className="auth-submit-btn">
                {authMode === 'login' ? 'Enter Sanctuary' : 'Submit Credentials'}
              </button>
            </form>
          </div>
        </section>
      </main>
    )
  }

  // --------------------------------------------------------------------------
  // Main Render Shell
  // --------------------------------------------------------------------------
  return (
    <div className="app-shell">
      {renderSidebar()}

      <main className="main-stage">
        {active === 'Home' && renderHome()}
        {active === 'Explore' && renderExplore()}
        {active === 'Messages' && renderMessages()}
        {active === 'Notifications' && renderNotifications()}
        {active === 'Saved' && (
          <>
            {renderTopNav('Archived Treasures', 'PERSONAL DOSSIER')}
            <div className="content-container">
              <div className="posts-flow max-w-3xl mx-auto">
                {posts.filter(p => saved[p.id]).map(p => renderPostCard(p))}
              </div>
            </div>
          </>
        )}
        {active === 'Profile' && renderProfile()}
      </main>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="toast-pill">
          <span>✦</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Floating Soundscape Dock */}
      {activeSoundscape && (
        <div className="floating-soundscape-dock">
          <div className="dock-visualizer">
            {[1,2,3,4,5].map(i => <div key={i} className="dock-vis-bar" />)}
          </div>
          <div className="dock-info">
            <span className="dock-title">{activeSoundscape.title}</span>
            <span className="dock-sub">Velqora Lossless · 3D Audio</span>
          </div>
          <div className="dock-controls">
            <button className="dock-play-btn">❚❚</button>
            <button className="dock-close-btn" onClick={() => { setActiveSoundscape(null); setPlayingAudio({}) }}>✕</button>
          </div>
        </div>
      )}

      {/* Mobile Floating Bottom Navigation Dock */}
      <nav className="mobile-floating-nav">
        <button className={`mobile-nav-btn ${active === 'Home' ? 'active' : ''}`} onClick={() => setActive('Home')}>
          <Icon name="home" size={20} />
        </button>
        <button className={`mobile-nav-btn ${active === 'Explore' ? 'active' : ''}`} onClick={() => setActive('Explore')}>
          <Icon name="explore" size={20} />
        </button>
        <button className="mobile-nav-center-btn" onClick={() => { setActive('Home'); setTimeout(() => document.querySelector('.composer-textarea')?.focus(), 100) }}>
          +
        </button>
        <button className={`mobile-nav-btn ${active === 'Notifications' ? 'active' : ''}`} onClick={() => setActive('Notifications')}>
          <Icon name="bell" size={20} />
          <span className="mobile-nav-badge" />
        </button>
        <button className={`mobile-nav-btn ${active === 'Profile' ? 'active' : ''}`} onClick={() => setActive('Profile')}>
          <Icon name="user" size={20} />
        </button>
      </nav>

      {/* Cinematic Fullscreen Image Lightbox Modal */}
      {lightboxData && (
        <div className="lightbox-backdrop" onClick={() => setLightboxData(null)}>
          <button className="lightbox-close-btn" onClick={() => setLightboxData(null)}>
            <Icon name="close" size={22} />
          </button>

          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-img-wrap">
              <img
                src={lightboxData.src}
                alt={lightboxData.alt || 'Curated Moment'}
                className="lightbox-img"
              />
            </div>

            <div className="lightbox-bar">
              <div className="flex flex-col gap-1 text-left">
                <span className="text-sm font-bold text-[#ffffff] flex items-center gap-2">
                  <span>{lightboxData.author}</span>
                  {lightboxData.location && <span className="text-[var(--gold-primary)] text-xs">· {lightboxData.location}</span>}
                </span>
                <span className="text-xs text-[var(--text-muted)] max-w-lg truncate">{lightboxData.alt}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="lightbox-exif-pill">
                  <span>📷 {lightboxData.exif || 'Leica M11 · 35mm f/1.4 · ISO 100'}</span>
                </div>
                <button
                  className="lightbox-action-pill"
                  onClick={() => {
                    flash('Moment archived to your private dossier')
                    setLightboxData(null)
                  }}
                >
                  <Icon name="bookmark" size={14} fill="currentColor" />
                  <span>Archive</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Standard Modals & Dialogs */}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal('')}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setModal('')}>
              <Icon name="close" size={18} />
            </button>

            {modal === 'prive-modal' && (
              <div>
                <span className="prive-tag">✦ Privé Concierge</span>
                <h3 className="text-2xl font-bold font-[var(--font-display)] text-[var(--text-primary)] my-2">
                  Velqora Privé Membership
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Welcome to the tier of quiet luxury. As a Privé patron, enjoy bespoke profile themes, loss-free audio archival sharing, and private salon keys.
                </p>
                <div className="p-4 rounded-xl border border-[var(--gold-border)] bg-[var(--bg-tertiary)] mb-4">
                  <div className="flex items-center gap-2 text-[var(--gold-primary)] font-bold text-sm">
                    <span>✦ Active Status: Patron Tier 01</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Concierge Line: concierge@velqora.luxury</p>
                </div>
                <button className="composer-submit-btn w-full justify-center" onClick={() => setModal('')}>
                  Done
                </button>
              </div>
            )}

            {modal === 'story-view' && selectedStory && (
              <div className="text-center">
                <div className="flex items-center gap-3 mb-4 text-left">
                  <Avatar person={selectedStory.person} size="md" ring={true} />
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">{selectedStory.person.name}</h4>
                    <span className="text-xs text-[var(--gold-primary)]">The Salon Story</span>
                  </div>
                </div>
                <SafeImage
                  src={selectedStory.isCustom ? selectedStory.photo : image(selectedStory.photo, 800)}
                  alt="Story"
                  category="Story"
                  className="w-full max-h-[500px] rounded-xl border border-[var(--border-subtle)]"
                />
                <button className="composer-submit-btn w-full justify-center mt-4" onClick={() => setModal('')}>
                  Close Story
                </button>
              </div>
            )}

            {modal === 'edit-profile' && (
              <div>
                <span className="prive-tag">Dossier Customization</span>
                <h3 className="text-xl font-bold font-[var(--font-display)] text-[var(--text-primary)] my-2">
                  Edit Personal Dossier
                </h3>
                <div className="auth-input-group">
                  <label className="auth-input-label">Display Name</label>
                  <input
                    className="auth-field"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="auth-input-group">
                  <label className="auth-input-label">Aesthetic Role</label>
                  <input
                    className="auth-field"
                    value={profile.role || ''}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  />
                </div>
                <div className="auth-input-group">
                  <label className="auth-input-label">Bio Reflection</label>
                  <textarea
                    className="auth-field !h-24 py-2 resize-none"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </div>
                <button
                  className="composer-submit-btn w-full justify-center mt-4"
                  onClick={() => { setModal(''); flash('Dossier updated successfully') }}
                >
                  Save Changes
                </button>
              </div>
            )}

            {modal === 'share-modal' && (
              <div>
                <span className="prive-tag">Share Moment</span>
                <h3 className="text-xl font-bold font-[var(--font-display)] text-[var(--text-primary)] my-2">
                  Invite Others to this Reflection
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mb-4">
                  Direct encrypted link to this curated reflection:
                </p>
                <div className="p-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--gold-primary)] truncate mb-4 select-all">
                  https://velqora.luxury/moment/{selectedPost?.id || '2026'}
                </div>
                <button
                  className="composer-submit-btn w-full justify-center"
                  onClick={() => {
                    navigator.clipboard?.writeText(`https://velqora.luxury/moment/${selectedPost?.id || '2026'}`)
                    setModal('')
                    flash('Archival link copied to clipboard')
                  }}
                >
                  Copy Encrypted Link
                </button>
              </div>
            )}

            {modal === 'audience-modal' && (
              <div>
                <span className="prive-tag">Audience Sphere</span>
                <h3 className="text-xl font-bold font-[var(--font-display)] text-[var(--text-primary)] my-2">
                  Select Visibility
                </h3>
                <div className="flex flex-col gap-2 my-4">
                  {['Curated Circle', 'Patrons Only', 'Velqora Public'].map((aud) => (
                    <button
                      key={aud}
                      className={`p-3 text-left rounded-xl border ${activeAudience === aud ? 'border-[var(--gold-primary)] bg-[var(--bg-tertiary)] text-[var(--text-primary)]' : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'}`}
                      onClick={() => { setActiveAudience(aud); setModal(''); flash(`Audience set to ${aud}`) }}
                    >
                      <div className="font-semibold text-sm">{aud}</div>
                      <div className="text-xs text-[var(--text-muted)]">
                        {aud === 'Curated Circle' ? 'Only your closest connoisseurs can view' : aud === 'Patrons Only' ? 'Visible to VIP patrons and verified artisans' : 'Discoverable across the full Velqora sphere'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {modal === 'account-menu' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar person={profile} size="md" ring={true} />
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">{profile.name}</h4>
                    <span className="text-xs text-[var(--gold-primary)]">@{profile.user}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="p-3 rounded-lg text-left text-sm font-medium hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                    onClick={() => { setModal(''); setActive('Profile') }}
                  >
                    View Dossier (Profile)
                  </button>
                  <button
                    className="p-3 rounded-lg text-left text-sm font-medium hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                    onClick={() => { setModal(''); setActive('Saved') }}
                  >
                    Archived Treasures
                  </button>
                  <button
                    className="p-3 rounded-lg text-left text-sm font-medium hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                    onClick={() => { setModal('prive-modal') }}
                  >
                    Velqora Privé Status
                  </button>
                  <hr className="border-[var(--border-subtle)] my-1" />
                  <button
                    className="p-3 rounded-lg text-left text-sm font-medium text-rose-400 hover:bg-[var(--bg-tertiary)]"
                    onClick={signOut}
                  >
                    Sign Out of Velqora
                  </button>
                </div>
              </div>
            )}

            {modal === 'post-preview' && selectedPost && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar person={selectedPost.person} size="md" ring={true} />
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">{selectedPost.person.name}</h4>
                    <span className="text-xs text-[var(--text-muted)]">{selectedPost.time}</span>
                  </div>
                </div>
                <SafeImage
                  src={selectedPost.mediaUrl || image(selectedPost.gallery ? selectedPost.gallery[0] : selectedPost.photo, 800)}
                  alt="Preview"
                  category="Preview"
                  className="w-full max-h-[400px] rounded-xl border border-[var(--border-subtle)] mb-4 cursor-zoom-in"
                  onClick={() => {
                    openLightbox(
                      selectedPost.mediaUrl || image(selectedPost.gallery ? selectedPost.gallery[0] : selectedPost.photo, 1600),
                      selectedPost.text,
                      selectedPost.exif,
                      selectedPost.person.name,
                      selectedPost.location
                    )
                  }}
                />
                <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-4 whitespace-pre-line">{selectedPost.text}</p>
                <div className="flex gap-3">
                  <button className="composer-submit-btn flex-1 justify-center" onClick={() => setModal('')}>
                    Close Preview
                  </button>
                  <button
                    className="action-control-btn border border-[var(--border-subtle)] px-4"
                    onClick={() => { toggleSave(selectedPost.id); setModal('') }}
                  >
                    {saved[selectedPost.id] ? 'Archived' : 'Archive to Dossier'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
