
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookmarkContextType {
  bookmarks: string[];
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const addBookmark = (id: string) => {
    setBookmarks(prev => [...prev, id]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(bookmarkId => bookmarkId !== id));
  };

  const isBookmarked = (id: string) => {
    return bookmarks.includes(id);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};
