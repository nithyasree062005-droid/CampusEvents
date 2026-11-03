import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  addFavorite,
  getFavorites,
  removeFavorite
} from "../services/favoriteservices.js";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  // Each record looks like { id, eventId } and is stored in db.json.
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function loadFavorites() {
      try {
        setRecords(await getFavorites());
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    }

    loadFavorites();
  }, []);

  const favorites = useMemo(
    () => new Set(records.map(record => String(record.eventId))),
    [records]
  );

  async function toggleFavorite(eventId) {
    const existing = records.find(
      record => String(record.eventId) === String(eventId)
    );

    if (existing) {
      await removeFavorite(existing.id);
      setRecords(previous =>
        previous.filter(record => record.id !== existing.id)
      );
    } else {
      const saved = await addFavorite(eventId);
      setRecords(previous => [...previous, saved]);
    }
  }

  // Used after an event is deleted (json-server already removed the record).
  function dropFavorite(eventId) {
    setRecords(previous =>
      previous.filter(record => String(record.eventId) !== String(eventId))
    );
  }

  const value = {
    favorites,
    favoriteCount: favorites.size,
    toggleFavorite,
    dropFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider.");
  }
  return context;
}
