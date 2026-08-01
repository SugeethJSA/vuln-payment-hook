export const profiles = [
  {
    id: 'nihara',
    name: 'Nihara',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'niranjan',
    name: 'Niranjan',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'anjali',
    name: 'Anjali',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'nikhil',
    name: 'Nikhil',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'family',
    name: 'Family',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
  }
];

export const movieCatalog = [
  {
    id: 'redemption-code',
    title: 'Redemption Code',
    tagline: 'A hacker must break the system to save her family.',
    description: 'A high-stakes cyber-thriller that moves from neon-lit rooftops to server rooms and midnight heists.',
    backdrop: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1517602617237-96f6d8f4d26a?auto=format&fit=crop&w=500&q=80',
    maturity: '16+',
    runtime: 136,
    rating: '8.4',
    year: 2025,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    languages: ['English', 'Hindi'],
    progress: 42
  },
  {
    id: 'midnight-legacy',
    title: 'Midnight Legacy',
    tagline: 'When dawn falls, the truth rises.',
    description: 'A suspenseful drama about hidden alliances, buried secrets, and one family’s fight for justice.',
    backdrop: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=500&q=80',
    maturity: '13+',
    runtime: 122,
    rating: '7.9',
    year: 2024,
    genres: ['Drama', 'Mystery'],
    languages: ['English']
  },
  {
    id: 'cosmic-outlaw',
    title: 'Cosmic Outlaw',
    tagline: 'The frontier is no longer in our galaxy.',
    description: 'A rogue pilot leads a ragtag crew through a galaxy of mercenaries, space pirates, and imperial lies.',
    backdrop: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1517971071642-7a7b405d6b54?auto=format&fit=crop&w=500&q=80',
    maturity: '14+',
    runtime: 148,
    rating: '8.1',
    year: 2025,
    genres: ['Sci-Fi', 'Adventure'],
    languages: ['English']
  },
  {
    id: 'nightshift',
    title: 'Nightshift',
    tagline: 'Under cover, every move is a risk.',
    description: 'A fast-paced crime saga where an undercover officer must survive a city that never sleeps.',
    backdrop: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=500&q=80',
    maturity: '16+',
    runtime: 129,
    rating: '7.8',
    year: 2023,
    genres: ['Crime', 'Action'],
    languages: ['English', 'Tamil']
  },
  {
    id: 'laughter-circuit',
    title: 'Laughter Circuit',
    tagline: 'Comedy that rewrites the rules of the stage.',
    description: 'A comedy ensemble races to save a beloved theater while the spotlight reveals who they really are.',
    backdrop: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1517260912420-209d77ef03f7?auto=format&fit=crop&w=500&q=80',
    maturity: '13+',
    runtime: 110,
    rating: '8.0',
    year: 2024,
    genres: ['Comedy', 'Family'],
    languages: ['English']
  },
  {
    id: 'documented',
    title: 'Documented',
    tagline: 'The story behind the scandal that shook the world.',
    description: 'A landmark documentary investigating hidden corruption and the journalists who refused to stay quiet.',
    backdrop: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1459284260900-43a4a5628d4e?auto=format&fit=crop&w=500&q=80',
    maturity: '16+',
    runtime: 96,
    rating: '8.7',
    year: 2023,
    genres: ['Documentary'],
    languages: ['English', 'Spanish']
  }
];

export const heroMovie = movieCatalog[0];

export const rows = [
  {
    title: 'Continue Watching',
    category: 'continue',
    movies: movieCatalog.filter((movie) => movie.progress !== undefined)
  },
  {
    title: 'Trending Now',
    category: 'trending',
    movies: movieCatalog.slice(0, 5)
  },
  {
    title: 'Popular on Netflix',
    category: 'popular',
    movies: movieCatalog.slice(1, 6)
  },
  {
    title: 'Top Picks',
    category: 'top_picks',
    movies: movieCatalog.slice(0, 4)
  },
  {
    title: 'Action',
    category: 'action',
    movies: movieCatalog.filter((movie) => movie.genres.includes('Action'))
  },
  {
    title: 'Comedy',
    category: 'comedy',
    movies: movieCatalog.filter((movie) => movie.genres.includes('Comedy'))
  },
  {
    title: 'Drama',
    category: 'drama',
    movies: movieCatalog.filter((movie) => movie.genres.includes('Drama'))
  },
  {
    title: 'Crime',
    category: 'crime',
    movies: movieCatalog.filter((movie) => movie.genres.includes('Crime'))
  },
  {
    title: 'Sci-Fi',
    category: 'sci-fi',
    movies: movieCatalog.filter((movie) => movie.genres.includes('Sci-Fi'))
  },
  {
    title: 'Documentaries',
    category: 'documentaries',
    movies: movieCatalog.filter((movie) => movie.genres.includes('Documentary'))
  }
];

export function findMovieById(id) {
  return movieCatalog.find((movie) => movie.id === id) || null;
}

export function searchMovies(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return movieCatalog.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(normalized) ||
      movie.tagline.toLowerCase().includes(normalized) ||
      movie.description.toLowerCase().includes(normalized) ||
      movie.genres.some((genre) => genre.toLowerCase().includes(normalized))
    );
  });
}

export function getBrowseRows() {
  return rows;
}
