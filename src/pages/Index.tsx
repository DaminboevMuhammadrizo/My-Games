import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { GameCard } from '@/components/GameCard';
import { useLanguage, Language } from '@/contexts/LanguageContext';

interface Game {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  fileAndroid: string;
  fileIos: string;
}

const Index = () => {
  const [games, setGames] = useState<Game[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    // Load games from JSON
    fetch('/games.json')
      .then(res => res.json())
      .then(data => setGames(data.games))
      .catch(err => console.error('Failed to load games:', err));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gradient-gaming">
            {t('myGames')}
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-gaming-cyan to-gaming-purple rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {games.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>

        {games.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-8 rounded-2xl bg-card border border-border">
              <p className="text-muted-foreground">O'yinlar yuklanmoqda...</p>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Muhammadrizo Daminboev.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
