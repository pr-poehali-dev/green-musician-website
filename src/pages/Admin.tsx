import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const API_URL = 'https://functions.poehali.dev/ce7fef25-7591-4565-a050-3eabbc57ae75';

interface Track {
  id?: number;
  title: string;
  duration: string;
  plays: string;
}

interface Release {
  id?: number;
  title: string;
  year: string;
  cover_url: string;
  tracks_count: number;
  type: string;
}

const Admin = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [releases, setReleases] = useState<Release[]>([]);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [editingRelease, setEditingRelease] = useState<Release | null>(null);
  const [showTrackForm, setShowTrackForm] = useState(false);
  const [showReleaseForm, setShowReleaseForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTracks();
    loadReleases();
  }, []);

  const loadTracks = async () => {
    const response = await fetch(`${API_URL}?resource=tracks`);
    const data = await response.json();
    setTracks(data.tracks);
  };

  const loadReleases = async () => {
    const response = await fetch(`${API_URL}?resource=releases`);
    const data = await response.json();
    setReleases(data.releases);
  };

  const saveTrack = async (track: Track) => {
    const method = track.id ? 'PUT' : 'POST';
    await fetch(`${API_URL}?resource=tracks`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(track),
    });
    
    toast({
      title: track.id ? 'Трек обновлён' : 'Трек добавлен',
      description: `${track.title} успешно сохранён`,
    });
    
    loadTracks();
    setEditingTrack(null);
    setShowTrackForm(false);
  };

  const deleteTrack = async (id: number) => {
    await fetch(`${API_URL}?resource=tracks`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    
    toast({
      title: 'Трек удалён',
      variant: 'destructive',
    });
    
    loadTracks();
  };

  const saveRelease = async (release: Release) => {
    const method = release.id ? 'PUT' : 'POST';
    await fetch(`${API_URL}?resource=releases`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(release),
    });
    
    toast({
      title: release.id ? 'Релиз обновлён' : 'Релиз добавлен',
      description: `${release.title} успешно сохранён`,
    });
    
    loadReleases();
    setEditingRelease(null);
    setShowReleaseForm(false);
  };

  const deleteRelease = async (id: number) => {
    await fetch(`${API_URL}?resource=releases`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    
    toast({
      title: 'Релиз удалён',
      variant: 'destructive',
    });
    
    loadReleases();
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Админ-панель</h1>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            На сайт
          </Button>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Треки</h2>
            <Button 
              onClick={() => {
                setEditingTrack({ title: '', duration: '', plays: '0' });
                setShowTrackForm(true);
              }}
              className="bg-secondary hover:bg-secondary/90"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить трек
            </Button>
          </div>

          {showTrackForm && editingTrack && (
            <Card className="p-6 mb-6 bg-card">
              <h3 className="text-xl font-semibold mb-4">
                {editingTrack.id ? 'Редактировать трек' : 'Новый трек'}
              </h3>
              <div className="grid gap-4">
                <div>
                  <Label>Название</Label>
                  <Input
                    value={editingTrack.title}
                    onChange={(e) => setEditingTrack({ ...editingTrack, title: e.target.value })}
                    placeholder="Neon Dreams"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Длительность</Label>
                    <Input
                      value={editingTrack.duration}
                      onChange={(e) => setEditingTrack({ ...editingTrack, duration: e.target.value })}
                      placeholder="3:45"
                    />
                  </div>
                  <div>
                    <Label>Прослушиваний</Label>
                    <Input
                      value={editingTrack.plays}
                      onChange={(e) => setEditingTrack({ ...editingTrack, plays: e.target.value })}
                      placeholder="1.2M"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => saveTrack(editingTrack)} className="bg-secondary hover:bg-secondary/90">
                    Сохранить
                  </Button>
                  <Button variant="outline" onClick={() => { setShowTrackForm(false); setEditingTrack(null); }}>
                    Отмена
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="grid gap-4">
            {tracks.map((track) => (
              <Card key={track.id} className="p-4 bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{track.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {track.duration} • {track.plays} прослушиваний
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditingTrack(track);
                        setShowTrackForm(true);
                      }}
                    >
                      <Icon name="Pencil" size={18} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => track.id && deleteTrack(track.id)}
                    >
                      <Icon name="Trash2" size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Релизы</h2>
            <Button 
              onClick={() => {
                setEditingRelease({ title: '', year: '2024', cover_url: '', tracks_count: 1, type: 'Single' });
                setShowReleaseForm(true);
              }}
              className="bg-secondary hover:bg-secondary/90"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить релиз
            </Button>
          </div>

          {showReleaseForm && editingRelease && (
            <Card className="p-6 mb-6 bg-card">
              <h3 className="text-xl font-semibold mb-4">
                {editingRelease.id ? 'Редактировать релиз' : 'Новый релиз'}
              </h3>
              <div className="grid gap-4">
                <div>
                  <Label>Название</Label>
                  <Input
                    value={editingRelease.title}
                    onChange={(e) => setEditingRelease({ ...editingRelease, title: e.target.value })}
                    placeholder="Emerald Horizons"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Год</Label>
                    <Input
                      value={editingRelease.year}
                      onChange={(e) => setEditingRelease({ ...editingRelease, year: e.target.value })}
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <Label>Треков</Label>
                    <Input
                      type="number"
                      value={editingRelease.tracks_count}
                      onChange={(e) => setEditingRelease({ ...editingRelease, tracks_count: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Тип</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={editingRelease.type}
                      onChange={(e) => setEditingRelease({ ...editingRelease, type: e.target.value })}
                    >
                      <option value="Single">Single</option>
                      <option value="EP">EP</option>
                      <option value="Album">Album</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label>URL обложки</Label>
                  <Input
                    value={editingRelease.cover_url}
                    onChange={(e) => setEditingRelease({ ...editingRelease, cover_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => saveRelease(editingRelease)} className="bg-secondary hover:bg-secondary/90">
                    Сохранить
                  </Button>
                  <Button variant="outline" onClick={() => { setShowReleaseForm(false); setEditingRelease(null); }}>
                    Отмена
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {releases.map((release) => (
              <Card key={release.id} className="overflow-hidden bg-card">
                <div className="aspect-square overflow-hidden">
                  <img src={release.cover_url} alt={release.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded">
                      {release.type}
                    </span>
                    <span className="text-sm text-muted-foreground">{release.year}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{release.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{release.tracks_count} треков</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingRelease(release);
                        setShowReleaseForm(true);
                      }}
                      className="flex-1"
                    >
                      <Icon name="Pencil" size={14} className="mr-1" />
                      Изменить
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => release.id && deleteRelease(release.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
