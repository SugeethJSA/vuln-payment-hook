import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPlayFill, BsVolumeUp, BsVolumeMute } from 'react-icons/bs';
import { HiPlus, HiThumbUp, HiX } from 'react-icons/hi';
import { findMovieById, rows } from '../data/streamingData';
import PaymentWarningModal from './PaymentWarningModal';

export default function DetailModal({ movieId, onClose }) {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [muted, setMuted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const selected = findMovieById(movieId) || rows[0]?.movies[0];
    setMovie(selected);
  }, [movieId]);

  // Lock background scroll when modal is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!movie) return null;

  const match = movie.rating ? Math.min(99, Math.round(Number(movie.rating) * 10 + 8)) : 95;
  const isSeries = movie.type === 'series' || movie.episodes || movie.title === 'Super Subbu';

  const episodes = [
    {
      index: 1,
      title: 'Subbu S/o Kukku',
      duration: '37m',
      synopsis: "Subbu struggles to free himself from his strict father's watch and commit to a future with his girlfriend. But an unexpected opportunity soon arises.",
      image: '/covers/super-subbu-ep1.jpg'
    },
    {
      index: 2,
      title: 'Welcome to Makhipur',
      duration: '38m',
      synopsis: 'After a month of training, Subbu arrives in Makhipur and meets Kantha Rao. A session on consent for the village women draws the anger of their husbands.',
      image: '/covers/super-subbu-ep2.jpg'
    },
    {
      index: 3,
      title: 'Virginee!',
      duration: '35m',
      synopsis: 'Subbu faces mockery after a classroom demonstration goes wrong. Desperate to educate himself, he seeks help but his own guilt gets in the way.',
      image: '/covers/super-subbu-ep3.jpg'
    },
    {
      index: 4,
      title: 'The Man, The Mission',
      duration: '38m',
      synopsis: 'A lie leads to Subbu becoming an overnight hero. Swathi and Kantha Rao help him connect with the women of Makhipur. A hazy night leaves Subbu anxious.',
      image: '/covers/super-subbu-ep4.jpg'
    },
    {
      index: 5,
      title: 'Family Planning',
      duration: '41m',
      synopsis: "Subbu's family surprises him as he scrambles to meet his targets and hide his profession. An unexpected development leaves him stunned.",
      image: '/covers/super-subbu-ep5.jpg'
    },
    {
      index: 6,
      title: 'The Mystery Girl',
      duration: '42m',
      synopsis: "Subbu's teaching efforts finally start to pay off. A heartbroken Swathi turns to him for comfort. At a celebration, Ramesh Babu makes a major claim.",
      image: '/covers/super-subbu-ep6.jpg'
    },
    {
      index: 7,
      title: 'Subbu vs Kukku',
      duration: '41m',
      synopsis: 'A secret turns Makhipur against Subbu. As his relationships with his father and Swathi evolve, will luck finally side with him?',
      image: '/covers/super-subbu-ep7.jpg'
    }
  ];

  const similarTitles = [
    { title: 'Jaadugar', year: '2022', maturity: 'U/A 13+', duration: '2h 47m', synopsis: 'A small-town magician with zero interest in football must lead his local team to the finals of a tournament if he wishes to marry the love of his life.', image: '/covers/gatta-kusthi-2.jpg' },
    { title: 'Padmini', year: '2023', maturity: 'U/A 13+', duration: '2h', synopsis: 'After an ill-fated wedding night, a college professor becomes an object of ridicule. To win a second chance at love, he must face an uphill legal battle.', image: '/covers/peddi.jpg' },
    { title: 'Miss Shetty Mr. Polishetty', year: '2023', maturity: 'U/A 7+', duration: '2h 28m', synopsis: 'An ambitious chef starts working with a stand-up comedian and initially struggles to deal with his carefree attitude — only to unexpectedly find love.', image: '/covers/con-city.jpg' },
    { title: 'Sexify', year: '2023', maturity: 'A', duration: '2 Seasons', synopsis: 'Three distinct young women. One common goal: to unravel the mysteries of the female orgasm. Things are about to get hot and heavy.', image: '/covers/rao-bahadur.jpg' },
    { title: 'Aay', year: '2024', maturity: 'U/A 16+', duration: '2h 19m', synopsis: 'When a man comes home between COVID lockdowns, he connects with old friends and falls for a woman whose romantic feelings seem influenced by her caste.', image: '/covers/ikka.jpg' },
    { title: 'Doctor G', year: '2022', maturity: 'U/A 13+', duration: '2h 1m', synopsis: "Medical student Uday Gupta grudgingly joins an all-women's gynecology class, but being a good doctor — and person — rests on pondering his prejudice.", image: '/covers/mikael.jpg' }
  ];

  const trailers = [
    { title: `Teaser: ${movie.title}`, image: movie.poster || '/covers/super-subbu-ep1.jpg' },
    { title: `Official Trailer: ${movie.title}`, image: movie.backdrop || '/covers/super-subbu-ep2.jpg' }
  ];

  const handleWatchNow = () => {
    // Show Payment Warning Alert Modal
    setShowWarning(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex justify-center items-start overflow-y-auto bg-black/20 backdrop-blur-sm pt-6 pb-16 px-2 sm:px-4">
        {/* Modal Container */}
        <div className="relative w-full max-w-[850px] bg-[#181818] text-white shadow-2xl overflow-hidden border border-white/10 my-4 text-sm animate-fadeIn">
          {/* Top Player / Banner Area */}
          <div className="relative h-[320px] sm:h-[440px] w-full overflow-hidden bg-black">
            <img
              src={movie.backdrop || movie.poster || '/covers/super-subbu-bg.jpg'}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/50" />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-[#181818]/80 text-white transition hover:bg-white hover:text-black cursor-pointer shadow-lg"
            >
              <HiX className="h-6 w-6" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => setMuted(!muted)}
              aria-label="Audio toggle"
              className="absolute bottom-8 right-8 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-[#181818]/60 text-white transition hover:border-white"
            >
              {muted ? <BsVolumeMute className="h-5 w-5" /> : <BsVolumeUp className="h-5 w-5" />}
            </button>

            {/* Banner Controls & Title Overlay */}
            <div className="absolute bottom-8 left-6 sm:left-10 space-y-4 max-w-lg z-20">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-lg">
                {movie.title}
              </h1>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleWatchNow}
                  className="flex items-center gap-2 rounded bg-white px-6 py-2 text-base font-bold text-black transition hover:bg-slate-200 active:scale-95 shadow-md"
                >
                  <BsFillPlayFill className="h-6 w-6" />
                  Play
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#2a2a2a]/80 text-white transition hover:border-white hover:bg-white/20"
                  aria-label="My List"
                >
                  <HiPlus className="h-5 w-5" />
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#2a2a2a]/80 text-white transition hover:border-white hover:bg-white/20"
                  aria-label="Thumbs Up"
                >
                  <HiThumbUp className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Metadata Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 p-6 sm:p-10 border-b border-white/10">
            {/* Left Metadata Column */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold">
                <span className="text-emerald-400 font-extrabold">{match}% Match</span>
                <span>{movie.year || '2026'}</span>
                <span>{movie.episodes || `${movie.runtime || 120} min`}</span>
                <span className="rounded border border-white/40 px-1 text-[10px]">5.1</span>
                <span className="rounded border border-white/40 px-1 text-[10px]">CC</span>
                <span className="rounded border border-white/40 px-1 text-[10px] text-slate-300">
                  {movie.maturity || 'U/A 16+'}
                </span>
              </div>

              <div className="text-xs text-slate-400">
                <span className="font-semibold text-slate-200">{movie.maturity || 'U/A 16+'}</span>: violence, sexual content, substances, crude humor, tobacco use
              </div>

              <div className="rounded bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-slate-300">
                Watch in {movie.languages ? movie.languages.join(', ') : 'Telugu, Tamil, Hindi, Malayalam, Kannada'}
              </div>

              <p className="text-sm leading-relaxed text-slate-200">
                {movie.description || 'Faced with an ultimatum to get a job before marrying his girlfriend, Subbu risks his conservative father\'s anger by teaching sex ed in a hostile village.'}
              </p>
            </div>

            {/* Right Metadata Column */}
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 font-semibold">Cast: </span>
                <span>{movie.cast ? movie.cast.join(', ') : 'Sundeep Kishan, Mithila Palkar, Murli Sharma, Maanasa Choudhary'}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Genres: </span>
                <span>{movie.genres ? movie.genres.join(', ') : 'TV Dramas, TV Comedies, Social Issue TV Dramas'}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">This {isSeries ? 'Show' : 'Movie'} Is: </span>
                <span>Quirky, Heartfelt, Exciting</span>
              </div>
            </div>
          </div>

          {/* Episodes Selector Section (If Series) */}
          {isSeries && (
            <div className="p-6 sm:p-10 border-b border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Episodes</h3>
                <span className="text-xs text-slate-400 font-medium">{movie.title}</span>
              </div>

              <div className="space-y-3">
                {episodes.map((ep) => (
                  <div
                    key={ep.index}
                    onClick={handleWatchNow}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded bg-[#222222] p-4 transition hover:bg-[#2f2f2f] cursor-pointer border border-white/5"
                  >
                    <span className="text-lg font-bold text-slate-400 w-6 text-center">{ep.index}</span>
                    <div className="relative w-full sm:w-36 h-20 shrink-0 overflow-hidden bg-black">
                      <img src={ep.image} alt={ep.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition">
                        <BsFillPlayFill className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm sm:text-base">{ep.title}</span>
                        <span className="text-xs text-slate-400 font-semibold">{ep.duration}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{ep.synopsis}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More Like This Section */}
          <div className="p-6 sm:p-10 border-b border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white">More Like This</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {similarTitles.map((item, idx) => (
                <div
                  key={idx}
                  onClick={handleWatchNow}
                  className="rounded bg-[#222222] overflow-hidden border border-white/5 transition hover:scale-102 hover:border-white/20 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {item.duration}
                    </span>
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-white">{item.title}</span>
                        <span className="text-slate-400">{item.year}</span>
                      </div>
                      <span className="inline-block rounded border border-white/40 px-1 text-[9px] font-semibold text-slate-300">
                        {item.maturity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{item.synopsis}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trailers & More Section */}
          <div className="p-6 sm:p-10 border-b border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white">Trailers &amp; More</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trailers.map((tr, idx) => (
                <div key={idx} onClick={handleWatchNow} className="rounded bg-[#222222] overflow-hidden border border-white/5 cursor-pointer hover:border-white/20">
                  <div className="relative aspect-video w-full bg-black">
                    <img src={tr.image} alt={tr.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <BsFillPlayFill className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-white">{tr.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="p-6 sm:p-10 space-y-3 text-xs text-slate-300">
            <h3 className="text-base font-bold text-white mb-2">About <strong>{movie.title}</strong></h3>
            <div><span className="text-slate-500 font-semibold">Director: </span>Mallik Ram</div>
            <div><span className="text-slate-500 font-semibold">Cast: </span>{movie.cast ? movie.cast.join(', ') : 'Sundeep Kishan, Mithila Palkar, Murli Sharma'}</div>
            <div><span className="text-slate-500 font-semibold">Genres: </span>{movie.genres ? movie.genres.join(', ') : 'TV Dramas, TV Comedies, Social Issue TV Dramas'}</div>
            <div><span className="text-slate-500 font-semibold">Maturity Rating: </span><span className="rounded border border-white/40 px-1 py-0.2 text-[10px] text-white">{movie.maturity || 'U/A 16+'}</span> violence, sexual content, substances, crude humor</div>
          </div>
        </div>
      </div>

      {/* Render Payment Warning Alert Modal */}
      {showWarning && (
        <PaymentWarningModal movieId={movie.id} onClose={() => setShowWarning(false)} />
      )}
    </>
  );
}
