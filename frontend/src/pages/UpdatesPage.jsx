import React, { useState, useEffect } from 'react';
import { Play, Image as ImageIcon, Calendar, FileText, Loader2 } from 'lucide-react';

export default function UpdatesPage() {
  const [updates, setUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUpdates = async () => {
    setIsLoading(true);
    setError('');
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/updates`);
      const data = await response.json();

      if (response.ok) {
        setUpdates(data);
      } else {
        throw new Error(data.error || 'Failed to fetch updates');
      }
    } catch (err) {
      console.error(err);
      setError('Could not establish connection to the Goushala database server. Reconnecting...');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  // Robust media renderer supporting YouTube, Instagram, Facebook, and raw uploads
  const renderMedia = (post) => {
    const url = post.media_url;
    if (!url) return null;

    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const finalUrl = url.startsWith('/uploads/') ? `${apiBaseUrl}${url}` : url;

    // 1. YouTube embeds
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let embedUrl = url;
      if (url.includes('watch?v=')) {
        try {
          const videoId = new URL(url).searchParams.get('v');
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } catch (e) {
          console.warn('YouTube URL parsing failed:', e);
        }
      } else if (url.includes('youtu.be/')) {
        const videoId = url.split('/').pop().split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
      return (
        <iframe
          src={embedUrl}
          title={post.title}
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }

    // 2. Instagram embeds
    if (url.includes('instagram.com')) {
      const cleanUrl = url.split('?')[0];
      const baseDir = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
      const embedUrl = `${baseDir}embed/`;
      return (
        <iframe
          src={embedUrl}
          title={post.title}
          className="w-full h-full border-none bg-white"
          allowFullScreen
          scrolling="no"
          frameBorder="0"
        ></iframe>
      );
    }

    // 3. Facebook Video embeds
    if (url.includes('facebook.com')) {
      const embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
      return (
        <iframe
          src={embedUrl}
          title={post.title}
          className="w-full h-full border-none"
          allowFullScreen
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      );
    }

    // 4. Raw videos (Local uploads or direct URLs)
    if (post.media_type === 'video' || url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov') || url.endsWith('.ogg')) {
      return (
        <video
          src={finalUrl}
          controls
          playsInline
          className="w-full h-full object-cover"
        />
      );
    }

    // 5. Default Image render
    return (
      <img
        src={finalUrl}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
      />
    );
  };

  return (
    <div className="flex-1 animate-fadeIn bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3">
            Goushala Daily Log
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Daily Goushala Updates & Vlogs
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-gold-400 to-brand-gold-750 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-500 mt-6 text-base md:text-lg font-light leading-relaxed">
            Follow our daily activities! Read blogs, see visual snippets, and watch daily vlogs of cow feeding, veterinary care, and morning Gau Puja.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-100 rounded-2xl p-6 text-center max-w-md mx-auto mb-12">
            <p className="text-sm">{error}</p>
            <button 
              onClick={fetchUpdates} 
              className="mt-3 text-xs bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded-xl"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-brand-gold-500 animate-spin" />
            <p className="text-slate-400 text-sm font-light">Loading daily updates...</p>
          </div>
        ) : (
          <>
            {updates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {updates.map((post) => {
                  const formattedDate = new Date(post.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  });

                  return (
                    <div 
                      key={post.id} 
                      className="bg-brand-gold-50/15 border border-brand-gold-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Media Wrapper */}
                      {post.media_url && (
                        <div className="relative aspect-video w-full bg-slate-900 overflow-hidden group">
                          {renderMedia(post)}

                          {/* Media Type Icon Overlay */}
                          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white p-2 rounded-xl border border-white/10">
                            {post.media_type === 'video' ? (
                              <Play className="w-4.5 h-4.5 fill-white stroke-white" />
                            ) : (
                              <ImageIcon className="w-4.5 h-4.5" />
                            )}
                          </div>
                        </div>
                      )}

                      {/* Content block */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          {/* Date Stamp */}
                          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formattedDate}</span>
                          </div>

                          <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-850 leading-tight">
                            {post.title}
                          </h2>
                          
                          <p className="text-slate-600 text-sm font-light leading-relaxed break-words whitespace-pre-line">
                            {post.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 space-y-4 max-w-md mx-auto">
                <div className="inline-flex bg-amber-50 p-4 rounded-full border border-amber-100 text-brand-gold-600">
                  <FileText className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-800">No Daily Updates Posted Yet</h3>
                <p className="text-slate-500 text-xs font-light leading-relaxed">
                  Our Goushala admin has not posted any daily updates. Please check back later for blogs and vlogs of our cows.
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
