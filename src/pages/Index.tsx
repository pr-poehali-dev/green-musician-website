import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const tracks = [
    { title: 'Neon Dreams', duration: '3:45', plays: '1.2M' },
    { title: 'Emerald Flow', duration: '4:12', plays: '890K' },
    { title: 'Digital Pulse', duration: '3:28', plays: '2.1M' },
    { title: 'Green Machine', duration: '5:03', plays: '1.5M' },
  ];

  const releases = [
    { 
      title: 'Emerald Horizons', 
      year: '2024', 
      cover: 'https://cdn.poehali.dev/projects/6c479a3b-f230-4b60-9fc3-a32f02789c15/files/9948f111-c6cc-4809-8001-179edf7a20ea.jpg',
      tracks: 8,
      type: 'Album'
    },
    { 
      title: 'Digital Dreams EP', 
      year: '2023', 
      cover: 'https://cdn.poehali.dev/projects/6c479a3b-f230-4b60-9fc3-a32f02789c15/files/1a4cd4ed-17b8-4906-8885-a72f88cdab0f.jpg',
      tracks: 4,
      type: 'EP'
    },
    { 
      title: 'Green Machine', 
      year: '2023', 
      cover: 'https://cdn.poehali.dev/projects/6c479a3b-f230-4b60-9fc3-a32f02789c15/files/d8bb3772-871a-430c-8ef5-f85109c4931c.jpg',
      tracks: 1,
      type: 'Single'
    },
  ];



  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-secondary">secondgra2e</h1>
            <div className="flex gap-8">
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
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-secondary rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <div className="mb-8 inline-block">
            <img 
              src="https://cdn.poehali.dev/projects/6c479a3b-f230-4b60-9fc3-a32f02789c15/files/d8bb3772-871a-430c-8ef5-f85109c4931c.jpg"
              alt="secondgra2e"
              className="w-64 h-64 rounded-full object-cover border-4 border-secondary shadow-2xl shadow-secondary/50"
            />
          </div>
          <h2 className="text-7xl font-bold mb-8 animate-fade-in">secondgra2e</h2>
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 text-lg">
              <Icon name="Play" size={20} className="mr-2" />
              Слушать
            </Button>
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-6 text-lg">
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

      <section id="music" className="min-h-screen py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center">Музыка</h2>
          
          <div className="grid gap-4">
            {tracks.map((track, index) => (
              <Card
                key={track.title}
                className="p-6 bg-card border-primary/20 hover:border-secondary transition-all hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button size="icon" className="bg-secondary hover:bg-secondary/90 rounded-full w-14 h-14">
                      <Icon name="Play" size={24} />
                    </Button>
                    <div>
                      <h3 className="text-xl font-semibold">{track.title}</h3>
                      <p className="text-muted-foreground">{track.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Play" size={16} />
                      <span>{track.plays}</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icon name="Heart" size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="Share2" size={20} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="releases" className="min-h-screen py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center">Релизы</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {releases.map((release, index) => (
              <Card
                key={release.title}
                className="overflow-hidden bg-card border-primary/20 hover:border-secondary transition-all hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={release.cover}
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
                  <p className="text-sm text-muted-foreground mb-4">{release.tracks} треков</p>
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

      <footer className="bg-muted/50 border-t border-primary/20 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-8 text-secondary">secondgra2e</h3>
          <div className="flex gap-6 justify-center mb-8">
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