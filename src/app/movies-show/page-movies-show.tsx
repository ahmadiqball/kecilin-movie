interface PageMovieAndShow {
  type: 'movies' | 'tv shows';
}

export function PageMovieAndShow({ type }: PageMovieAndShow) {
  return (
    <main className='bg-dark'>
      <h1>{type}</h1>
    </main>
  );
}
