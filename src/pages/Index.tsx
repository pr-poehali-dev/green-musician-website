import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CarAnimation from '@/components/CarAnimation';

const API_URL = 'https://functions.poehali.dev/ce7fef25-7591-4565-a050-3eabbc57ae75';

interface Track {
  id: number;
  title: string;
  duration: string;
  plays: string;
}

interface Release {
  id: number;
  title: string;
  year: string;
  cover_url: string;
  tracks_count: number;
  type: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    fetch(`${API_URL}?resource=tracks`)
      .then(res => res.json())
      .then(data => setTracks(data.tracks));
    
    fetch(`${API_URL}?resource=releases`)
      .then(res => res.json())
      .then(data => setReleases(data.releases));
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };



  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-secondary">secondgra2e</h1>
            
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
            
            <div className="hidden md:flex gap-8">
              {['home', 'music', 'releases'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors hover:text-secondary ${
                    activeSection === section ? 'text-secondary' : 'text-foreground/70'
                  }`}
                >
                  {section === 'home' ? 'Главная' : section === 'music' ? 'Музыка' : 'Релизы'}
                </button>
              ))}
            </div>
          </div>
          
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
              {['home', 'music', 'releases'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    scrollToSection(section);
                    setMobileMenuOpen(false);
                  }}
                  className={`capitalize transition-colors hover:text-secondary text-left ${
                    activeSection === section ? 'text-secondary' : 'text-foreground/70'
                  }`}
                >
                  {section === 'home' ? 'Главная' : section === 'music' ? 'Музыка' : 'Релизы'}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-secondary rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6">
          <div className="mb-6 sm:mb-8 inline-block">
            <img 
              src="https://cdn.poehali.dev/projects/6c479a3b-f230-4b60-9fc3-a32f02789c15/files/d8bb3772-871a-430c-8ef5-f85109c4931c.jpg"
              alt="secondgra2e"
              className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover border-4 border-secondary shadow-2xl shadow-secondary/50"
            />
          </div>
          <h2 className="text-4xl sm:text-7xl font-bold mb-6 sm:mb-8 animate-fade-in">secondgra2e</h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in max-w-sm sm:max-w-none mx-auto" style={{ animationDelay: '0.2s' }}>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg">
              <Icon name="Play" size={20} className="mr-2" />
              Слушать
            </Button>
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg">
              <Icon name="Mail" size={20} className="mr-2" />
              Контакт
            </Button>
          </div>
          
          <div className="flex gap-6 justify-center mt-12">
            {['Instagram', 'Music', 'Headphones'].map((icon, index) => (
              <a
                key={icon}
                href="#"
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <Icon name={icon} size={20} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="music" className="min-h-screen py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-12 text-center">Музыка</h2>
          
          <div className="grid gap-4">
            {tracks.map((track, index) => (
              <Card
                key={track.title}
                className="p-4 sm:p-6 bg-card border-primary/20 hover:border-secondary transition-all hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <Button size="icon" className="bg-secondary hover:bg-secondary/90 rounded-full w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                      <Icon name="Play" size={20} />
                    </Button>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-xl font-semibold truncate">{track.title}</h3>
                      <p className="text-sm text-muted-foreground">{track.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-6">
                    <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
                      <Icon name="Play" size={16} />
                      <span>{track.plays}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                      <Icon name="Heart" size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                      <Icon name="Share2" size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CarAnimation />

      <section id="releases" className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-12 text-center">Релизы</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {releases.map((release, index) => (
              <Card
                key={release.title}
                className="overflow-hidden bg-card border-primary/20 hover:border-secondary transition-all hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={release.cover_url}
                    alt={release.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                      {release.type}
                    </span>
                    <span className="text-sm text-muted-foreground">{release.year}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{release.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{release.tracks_count} треков</p>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <Icon name="Play" size={16} className="mr-2" />
                    Слушать
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-muted/50 border-t border-primary/20 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-secondary">secondgra2e</h3>
          <div className="flex gap-4 sm:gap-6 justify-center mb-6 sm:mb-8">
            {['Instagram', 'Music', 'Mail', 'Headphones'].map((icon) => (
              <a
                key={icon}
                href="#"
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all"
              >
                <Icon name={icon} size={20} />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">© 2025 secondgra2e. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;