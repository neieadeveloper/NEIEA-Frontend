import React, { useEffect, useRef, useState } from 'react';

const allowedDomains = ['youtube.com', 'youtu.be', 'facebook.com', 'fb.com', 'instagram.com', 'instagr.am'];

const isAllowedEmbedUrl = (url) => {
  try {
    const parsed = new URL(url);
    return allowedDomains.some((domain) => parsed.hostname.includes(domain));
  } catch (err) {
    return false;
  }
};

// Convert various YouTube URL formats to embed format
const normalizeYouTubeUrl = (url) => {
  try {
    // Already in embed format
    if (url.includes('/embed/')) return url;

    const parsed = new URL(url);

    // youtube.com/watch?v=ID
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) {
      return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }

    // youtu.be/ID
    if (parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.split('/')[1];
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  } catch (err) {
    return url;
  }
};

const loadScriptOnce = (src, id) => {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
};

const SocialEmbedCard = ({ embed }) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const containerRef = useRef(null);
  const blockquoteRef = useRef(null);

  useEffect(() => {
    // Load SDKs immediately (not on lazy load)
    if (embed.type === 'facebook') {
      loadScriptOnce('https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0', 'fb-sdk');
      const checkFB = setInterval(() => {
        if (window.FB && window.FB.XFBML) {
          window.FB.XFBML.parse();
          setSdkLoaded(true);
          clearInterval(checkFB);
        }
      }, 100);
      return () => clearInterval(checkFB);
    }

    if (embed.type === 'instagram') {
      loadScriptOnce('https://www.instagram.com/embed.js', 'ig-sdk');
      const checkIG = setInterval(() => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
          setSdkLoaded(true);
          clearInterval(checkIG);
        }
      }, 100);
      return () => clearInterval(checkIG);
    }

    setSdkLoaded(true);
  }, [embed.type]);

  // Process Instagram embed after blockquote is mounted
  useEffect(() => {
    if (embed.type === 'instagram' && blockquoteRef.current && sdkLoaded) {
      setTimeout(() => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      }, 100);
    }
  }, [embed.type, sdkLoaded, blockquoteRef.current]);

  const renderEmbed = () => {
    if (!isAllowedEmbedUrl(embed.url)) {
      return (
        <div className="text-sm text-red-600 p-4 text-center">
          Invalid or unsupported embed URL.
        </div>
      );
    }

    if (embed.type === 'youtube') {
      const embedUrl = normalizeYouTubeUrl(embed.url);
      return (
        <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ height: '240px' }}>
          <iframe
            src={embedUrl}
            title="YouTube embed"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      );
    }

    if (embed.type === 'facebook') {
      return (
        <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ height: '240px' }}>
          <iframe
            src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(embed.url)}&width=500&show_text=false&height=240&appId`}
            width="100%"
            height="100%"
            style={{ border: 'none', overflow: 'hidden', display: 'block' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      );
    }

    if (embed.type === 'instagram') {
      return (
        <div style={{ height: '240px', overflow: 'hidden' }}>
          <blockquote
            ref={blockquoteRef}
            className="instagram-media"
            data-instgrm-permalink={embed.url + (embed.url.includes('?') ? '&' : '?') + 'utm_source=ig_embed'}
            data-instgrm-version="14"
            style={{ minHeight: '240px', height: '240px' }}
          />
        </div>
      );
    }

    return <div className="text-sm text-gray-600 text-center p-4">Unsupported embed type.</div>;
  };

  return (
    <div ref={containerRef} className="p-3 bg-white border rounded-lg shadow-sm flex flex-col h-full" style={{ minHeight: '330px' }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">{embed.type}</span>
      </div>
      <div className="overflow-hidden">
        {renderEmbed()}
      </div>
    </div>
  );
};

const SocialEmbed = ({ embeds = [] }) => {
  const filteredEmbeds = Array.isArray(embeds)
    ? embeds.filter((e) => e && e.isActive !== false && isAllowedEmbedUrl(e.url))
    : [];

  if (filteredEmbeds.length === 0) return null;

  return (
    <section className="py-8">
      <div className="container our-mission ">
        <div className="om-cont">
          <span className='text-center'>
              Community Voices
          </span>
        <p className='text-center'>
          See what our community is sharing across YouTube, Facebook, and Instagram.
        </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {filteredEmbeds.map((embed) => (
            <SocialEmbedCard key={embed._id || embed.url} embed={embed} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialEmbed;
