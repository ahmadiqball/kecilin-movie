import { create } from 'zustand';
import { Movie } from '~~/typings';
import { createSelectors } from './selectors';

type State = {
  bookmarks: Array<Movie>;
  modalMovie: Movie | null;
};

type Actions = {
  addBookmarks: (value: Movie) => void;
  removeBookmarks: (value: Movie) => void;
  openModal: (value: Movie) => void;
  closeModal: () => void;
};

const tmdbStore = create<State & Actions>((set) => ({
  bookmarks: [],
  modalMovie: null,
  addBookmarks: (value: Movie) => set((state) => ({ bookmarks: [...state.bookmarks, value] })),
  removeBookmarks: (value: Movie) =>
    set((state) => ({ bookmarks: state.bookmarks.filter((movie) => movie.id !== value.id) })),
  openModal: (value: Movie) => set(() => ({ modalMovie: value })),
  closeModal: () => set(() => ({ modalMovie: null })),
}));

export const useTMDBStore = createSelectors(tmdbStore);
