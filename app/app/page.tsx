'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type SyntheticEvent, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Beef,
  Check,
  ChevronDown,
  Clock3,
  Coffee,
  Compass,
  Eye,
  EyeOff,
  Heart,
  Home,
  LocateFixed,
  Map,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Search,
  Share2,
  Star,
  Store,
  User,
  UserPlus,
  Utensils,
  WalletCards,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Screen =
  | 'welcome'
  | 'auth'
  | 'location'
  | 'home'
  | 'detail'
  | 'favorites'
  | 'profile'
  | 'map';
type AuthMode = 'signup' | 'login';

const places = [
  {
    name: 'Cantinho da Maria Isabel',
    type: 'Comida típica',
    price: 'R$ 18–32',
    distance: '1,2 km',
    rating: '4,9',
    open: 'Aberto até 15h',
  },
  {
    name: 'Café da Dona Nena',
    type: 'Café regional',
    price: 'R$ 8–24',
    distance: '850 m',
    rating: '4,8',
    open: 'Aberto até 11h',
  },
  {
    name: 'Sabores do Mercado',
    type: 'Cozinha popular',
    price: 'R$ 20–35',
    distance: '2,4 km',
    rating: '4,7',
    open: 'Aberto até 16h',
  },
];

const locations = [
  'Centro, Teresina',
  'Zona Leste, Teresina',
  'Mercado da Piçarra',
];

export default function AppDemoPage() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [location, setLocation] = useState('Centro, Teresina');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState(places[0]);
  const [actionMessage, setActionMessage] = useState('');

  const visiblePlaces = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');
    return places.filter((place) => {
      const matchesCategory =
        activeCategory === 'Todos' ||
        (activeCategory === 'Cafés' && place.type.includes('Café')) ||
        (activeCategory === 'Típicos' && place.type.includes('típica')) ||
        (activeCategory === 'Baratos' && place.price.includes('8'));
      const text = `${place.name} ${place.type}`.toLocaleLowerCase('pt-BR');
      return matchesCategory && (!normalized || text.includes(normalized));
    });
  }, [activeCategory, query]);

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsGuest(false);
    setScreen('auth');
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setScreen('location');
  };

  const finishAuth = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    setIsGuest(false);
    setScreen('location');
  };

  const confirmLocation = (nextLocation: string) => {
    setLocation(nextLocation);
    setScreen('home');
  };

  const toggleFavorite = (name: string) => {
    setFavorites((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  };

  const openPlace = (place: (typeof places)[number]) => {
    setSelectedPlace(place);
    setActionMessage('');
    setScreen('detail');
  };

  return (
    <main className="min-h-screen bg-[#25100a] text-[#32170f] sm:bg-[radial-gradient(circle_at_top,#744025_0,#32170f_42%,#1c0b07_100%)] sm:px-6 sm:py-10">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col overflow-hidden bg-[#fffaf1] sm:min-h-[880px] sm:rounded-[2.4rem] sm:border-[9px] sm:border-[#170906] sm:shadow-[0_35px_100px_rgba(0,0,0,.45)]">
        <div className="hidden h-7 shrink-0 items-center justify-center bg-[#170906] sm:flex">
          <span className="h-1.5 w-20 rounded-full bg-white/20" />
        </div>

        {screen === 'welcome' && (
          <section className="flex flex-1 flex-col p-5 pb-7">
            <div className="flex items-center justify-between">
              <Link
                className="flex items-center gap-2 font-heading text-lg font-black"
                href="/"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Utensils className="size-4" />
                </span>
                OHFOME
              </Link>
              <Badge
                className="border-primary/20 bg-primary/10 text-primary"
                variant="outline"
              >
                Protótipo
              </Badge>
            </div>

            <div className="relative mt-8 overflow-hidden rounded-[1.75rem] bg-[#d4562e]">
              <Image
                alt="Apresentação do aplicativo OHFOME"
                className="aspect-[4/3] w-full object-cover"
                height={450}
                priority
                src="/og.png"
                width={600}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2b110a]/85 to-transparent p-5 pt-16 text-white">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="size-4 text-[#f6ca4c]" /> Teresina, Piauí
                </p>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-sm font-black uppercase tracking-[.14em] text-primary">
                Descubra o que é daqui
              </p>
              <h1 className="mt-2 font-heading text-4xl font-black leading-[.96] tracking-[-.05em]">
                O sabor de Teresina, do seu jeito.
              </h1>
              <p className="mt-4 leading-7 text-[#76564a]">
                Encontre comida boa, perto de você e dentro do seu orçamento.
              </p>
            </div>

            <div className="mt-auto space-y-3 pt-8">
              <Button
                className="h-12 w-full rounded-xl text-base font-bold"
                onClick={() => openAuth('signup')}
              >
                Criar minha conta <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                className="h-12 w-full rounded-xl text-base font-bold"
                onClick={() => openAuth('login')}
                variant="outline"
              >
                Já tenho uma conta
              </Button>
              <Button
                className="h-10 w-full text-[#76564a]"
                onClick={continueAsGuest}
                variant="ghost"
              >
                Continuar como visitante
              </Button>
            </div>
          </section>
        )}

        {screen === 'auth' && (
          <section className="flex flex-1 flex-col p-5 pb-8">
            <ScreenHeader
              onBack={() => setScreen('welcome')}
              title="Acessar o OHFOME"
            />

            <div className="mt-8">
              <Badge className="bg-[#f7d778] text-[#4d281c]">
                Demonstração
              </Badge>
              <h1 className="mt-4 font-heading text-3xl font-black tracking-[-.04em]">
                {authMode === 'signup'
                  ? 'Crie sua conta'
                  : 'Que bom ter você de volta'}
              </h1>
              <p className="mt-2 leading-6 text-[#76564a]">
                {authMode === 'signup'
                  ? 'Salve lugares e monte sua lista de sabores.'
                  : 'Entre para rever seus lugares favoritos.'}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 rounded-xl bg-[#f2e5d2] p-1">
              <button
                className={`rounded-lg px-3 py-2.5 text-sm font-bold ${authMode === 'signup' ? 'bg-white shadow-sm' : 'text-[#76564a]'}`}
                onClick={() => setAuthMode('signup')}
                type="button"
              >
                Criar conta
              </button>
              <button
                className={`rounded-lg px-3 py-2.5 text-sm font-bold ${authMode === 'login' ? 'bg-white shadow-sm' : 'text-[#76564a]'}`}
                onClick={() => setAuthMode('login')}
                type="button"
              >
                Fazer login
              </button>
            </div>

            <form className="mt-7 space-y-5" onSubmit={finishAuth}>
              {authMode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="name">Como podemos chamar você?</Label>
                  <Input
                    className="h-12 rounded-xl bg-white"
                    id="name"
                    placeholder="Seu nome"
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  className="h-12 rounded-xl bg-white"
                  id="email"
                  placeholder="voce@email.com"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    className="h-12 rounded-xl bg-white pr-11"
                    id="password"
                    minLength={6}
                    placeholder="Mínimo de 6 caracteres"
                    required
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    aria-label={
                      showPassword ? 'Ocultar senha' : 'Mostrar senha'
                    }
                    className="absolute right-1 top-1 grid size-10 place-items-center rounded-lg text-[#76564a]"
                    onClick={() => setShowPassword((current) => !current)}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                className="h-12 w-full rounded-xl text-base font-bold"
                type="submit"
              >
                {authMode === 'signup'
                  ? 'Criar conta e continuar'
                  : 'Entrar e continuar'}
              </Button>
            </form>

            <p className="mt-auto pt-7 text-center text-xs leading-5 text-[#896b60]">
              Nenhum dado é enviado. Este acesso existe apenas para demonstrar o
              fluxo do aplicativo.
            </p>
          </section>
        )}

        {screen === 'location' && (
          <section className="flex flex-1 flex-col p-5 pb-8">
            <ScreenHeader
              onBack={() => setScreen(isGuest ? 'welcome' : 'auth')}
              title="Sua localização"
            />

            <div className="mt-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#dcead8] text-[#2e6648]">
                <LocateFixed className="size-5" />
              </span>
              <h1 className="mt-5 font-heading text-3xl font-black tracking-[-.04em]">
                Onde vamos procurar?
              </h1>
              <p className="mt-2 leading-6 text-[#76564a]">
                Escolha uma região ou marque um ponto para ver opções próximas.
              </p>
            </div>

            <Button
              className="mt-6 h-12 w-full rounded-xl bg-[#2e6648] text-base font-bold hover:bg-[#285a40]"
              onClick={() => confirmLocation('Localização atual')}
            >
              <Navigation /> Usar minha localização atual
            </Button>

            <div className="mt-5 overflow-hidden rounded-[1.4rem] border border-[#32170f]/10 bg-[#eadcc5]">
              <div className="relative h-48 [background-image:linear-gradient(30deg,transparent_24%,rgba(255,255,255,.7)_25%,rgba(255,255,255,.7)_29%,transparent_30%,transparent_70%,rgba(255,255,255,.7)_71%,rgba(255,255,255,.7)_75%,transparent_76%),linear-gradient(100deg,transparent_34%,rgba(212,86,46,.2)_35%,rgba(212,86,46,.2)_38%,transparent_39%)] [background-size:110px_80px,160px_140px]">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid size-14 place-items-center rounded-full bg-white/70 shadow-sm">
                    <span className="grid size-10 place-items-center rounded-full bg-primary text-white shadow-lg">
                      <MapPin className="size-5" />
                    </span>
                  </span>
                </div>
                <Badge className="absolute left-3 top-3 bg-white text-[#32170f]">
                  <Map /> Mapa demonstrativo
                </Badge>
              </div>
              <div className="bg-white p-4">
                <p className="text-sm font-bold">Marcar localização</p>
                <p className="mt-1 text-xs text-[#806257]">
                  Toque em uma região para posicionar o marcador.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {locations.map((item) => (
                    <button
                      className="rounded-full border border-[#32170f]/15 px-3 py-2 text-xs font-bold transition-colors hover:border-primary hover:text-primary"
                      key={item}
                      onClick={() => confirmLocation(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              className="mt-auto h-10"
              onClick={() => confirmLocation(location)}
              variant="ghost"
            >
              Pular por enquanto <ArrowRight data-icon="inline-end" />
            </Button>
          </section>
        )}

        {screen === 'home' && (
          <section className="flex flex-1 flex-col overflow-hidden bg-[#f6ead8]">
            <div className="flex-1 overflow-y-auto px-5 pb-28 pt-5">
              <div className="flex items-center justify-between gap-4">
                <button
                  className="min-w-0 text-left"
                  onClick={() => setScreen('location')}
                  type="button"
                >
                  <span className="text-xs font-semibold text-[#806257]">
                    Explorando perto de
                  </span>
                  <span className="mt-0.5 flex items-center gap-1 font-bold">
                    <MapPin className="size-4 text-primary" />
                    <span className="truncate">{location}</span>
                    <ChevronDown className="size-4" />
                  </span>
                </button>
                <button
                  aria-label="Abrir perfil"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-[#32170f] text-white"
                  onClick={() => setScreen('profile')}
                  type="button"
                >
                  <User className="size-4" />
                </button>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-primary">
                  {isGuest ? 'Olá, visitante' : 'Olá! Que fome é essa?'}
                </p>
                <h1 className="mt-1 font-heading text-3xl font-black leading-tight tracking-[-.045em]">
                  O que combina com você hoje?
                </h1>
              </div>

              <label
                className="mt-5 flex h-12 items-center gap-3 rounded-xl bg-white px-4 shadow-sm ring-1 ring-[#32170f]/8"
                htmlFor="app-search"
              >
                <Search className="size-5 shrink-0 text-primary" />
                <span className="sr-only">Buscar lugares ou pratos</span>
                <Input
                  className="h-auto border-0 px-0 shadow-none focus-visible:ring-0"
                  id="app-search"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar prato ou lugar"
                  value={query}
                />
              </label>

              <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1">
                {[
                  ['Todos', Compass],
                  ['Típicos', Beef],
                  ['Cafés', Coffee],
                  ['Baratos', Store],
                ].map(([category, Icon]) => {
                  const CategoryIcon = Icon as typeof Compass;
                  return (
                    <button
                      className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-bold ${activeCategory === category ? 'bg-[#32170f] text-white' : 'bg-white text-[#69483c]'}`}
                      key={category as string}
                      onClick={() => setActiveCategory(category as string)}
                      type="button"
                    >
                      <CategoryIcon className="size-4" /> {category as string}
                    </button>
                  );
                })}
              </div>

              <div className="mt-7 flex items-end justify-between">
                <div>
                  <p className="font-heading text-xl font-black">
                    Perto de você
                  </p>
                  <p className="mt-1 text-xs text-[#806257]">
                    Sugestões demonstrativas
                  </p>
                </div>
                <button
                  className="text-sm font-bold text-primary"
                  onClick={() => setScreen('map')}
                  type="button"
                >
                  Ver mapa
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {visiblePlaces.map((place, index) => (
                  <Card
                    className="gap-0 rounded-2xl bg-white py-0"
                    key={place.name}
                  >
                    <CardContent className="flex gap-3 p-3">
                      <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-primary/10">
                        <Image
                          alt={`Imagem de demonstração de ${place.name}`}
                          className="h-full w-full object-cover"
                          height={160}
                          src="/og.png"
                          style={{
                            objectPosition: `${28 + index * 28}% center`,
                          }}
                          width={160}
                        />
                      </div>
                      <div className="min-w-0 flex-1 py-0.5">
                        <div className="flex items-start justify-between gap-2">
                          <Badge className="h-5 bg-[#f7d778] text-[10px] text-[#4d281c]">
                            {place.type}
                          </Badge>
                          <button
                            aria-label={`${favorites.includes(place.name) ? 'Remover' : 'Adicionar'} favorito`}
                            aria-pressed={favorites.includes(place.name)}
                            className="text-primary"
                            onClick={() => toggleFavorite(place.name)}
                            type="button"
                          >
                            <Heart
                              className={`size-[18px] ${favorites.includes(place.name) ? 'fill-current' : ''}`}
                            />
                          </button>
                        </div>
                        <p className="mt-2 truncate font-heading text-sm font-black">
                          {place.name}
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-xs font-bold">
                          <Star className="size-3 fill-[#efb928] text-[#efb928]" />{' '}
                          {place.rating}
                          <span className="text-[#b7a096]">•</span>{' '}
                          {place.distance}
                        </div>
                        <p className="mt-2 text-[11px] font-semibold text-[#2e6648]">
                          {place.open} · {place.price}
                        </p>
                        <button
                          className="mt-2 text-xs font-black text-primary"
                          onClick={() => openPlace(place)}
                          type="button"
                        >
                          Ver lugar{' '}
                          <ArrowRight className="ml-0.5 inline size-3" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {visiblePlaces.length === 0 && (
                <div className="mt-4 rounded-2xl border border-dashed border-[#32170f]/20 bg-white/60 px-5 py-10 text-center">
                  <Search className="mx-auto size-6 text-primary" />
                  <p className="mt-3 font-bold">Nenhum sabor encontrado</p>
                  <p className="mt-1 text-sm text-[#806257]">
                    Tente outro nome ou categoria.
                  </p>
                </div>
              )}
            </div>

            <AppNav active="home" onNavigate={setScreen} />
          </section>
        )}

        {screen === 'detail' && (
          <section className="flex flex-1 flex-col overflow-hidden bg-[#fffaf1]">
            <div className="flex-1 overflow-y-auto pb-8">
              <div className="relative h-72 bg-primary/10">
                <Image
                  alt={`Imagem de demonstração de ${selectedPlace.name}`}
                  className="h-full w-full object-cover"
                  height={520}
                  priority
                  src="/og.png"
                  width={720}
                />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                  <Button
                    aria-label="Voltar"
                    className="rounded-full bg-white text-[#32170f] hover:bg-white/90"
                    onClick={() => setScreen('home')}
                    size="icon-lg"
                  >
                    <ArrowLeft />
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      aria-label="Compartilhar"
                      className="rounded-full bg-white text-[#32170f] hover:bg-white/90"
                      onClick={() =>
                        setActionMessage('Link copiado para demonstração.')
                      }
                      size="icon-lg"
                    >
                      <Share2 />
                    </Button>
                    <Button
                      aria-label="Favoritar lugar"
                      className="rounded-full bg-white text-primary hover:bg-white/90"
                      onClick={() => toggleFavorite(selectedPlace.name)}
                      size="icon-lg"
                    >
                      <Heart
                        className={
                          favorites.includes(selectedPlace.name)
                            ? 'fill-current'
                            : ''
                        }
                      />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="-mt-6 rounded-t-[1.8rem] bg-[#fffaf1] px-5 pb-8 pt-6">
                <Badge className="bg-[#f7d778] text-[#4d281c]">
                  {selectedPlace.type}
                </Badge>
                <h1 className="mt-3 font-heading text-3xl font-black leading-tight tracking-[-.045em]">
                  {selectedPlace.name}
                </h1>
                <div className="mt-3 flex items-center gap-2 text-sm font-bold">
                  <Star className="size-4 fill-[#efb928] text-[#efb928]" />{' '}
                  {selectedPlace.rating}
                  <span className="text-[#b7a096]">•</span>{' '}
                  {selectedPlace.distance}
                  <span className="text-[#b7a096]">•</span> $$
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <InfoTile
                    icon={Clock3}
                    label="Horário"
                    value={selectedPlace.open.replace('Aberto ', '')}
                  />
                  <InfoTile
                    icon={WalletCards}
                    label="Faixa"
                    value={selectedPlace.price}
                  />
                  <InfoTile icon={MapPin} label="Região" value="Centro" />
                </div>

                <div className="mt-7">
                  <h2 className="font-heading text-lg font-black">
                    Por que conhecer
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#76564a]">
                    Comida regional preparada por um pequeno negócio local, com
                    opções para um almoço rápido e cheio de sabor piauiense.
                  </p>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-[#32170f]/10 bg-[#eadcc5]">
                  <div className="relative h-32 [background-image:linear-gradient(25deg,transparent_26%,rgba(255,255,255,.75)_27%,rgba(255,255,255,.75)_31%,transparent_32%),linear-gradient(100deg,transparent_48%,rgba(212,86,46,.22)_49%,rgba(212,86,46,.22)_53%,transparent_54%)] [background-size:100px_70px,150px_120px]">
                    <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-white shadow-lg">
                      <MapPin className="size-5" />
                    </span>
                  </div>
                  <button
                    className="flex w-full items-center justify-between bg-white px-4 py-3 text-left text-sm font-bold"
                    onClick={() => setScreen('map')}
                    type="button"
                  >
                    Ver localização no mapa{' '}
                    <ArrowRight className="size-4 text-primary" />
                  </button>
                </div>

                {actionMessage && (
                  <p className="mt-4 flex items-center gap-2 rounded-xl bg-[#dcead8] px-4 py-3 text-sm font-bold text-[#28533c]">
                    <Check className="size-4" /> {actionMessage}
                  </p>
                )}

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    className="h-12 rounded-xl bg-[#2e6648] font-bold hover:bg-[#285a40]"
                    onClick={() =>
                      setActionMessage(
                        'Rota simulada iniciada a partir da sua localização.',
                      )
                    }
                  >
                    <Navigation /> Ver rota
                  </Button>
                  <Button
                    className="h-12 rounded-xl font-bold"
                    onClick={() =>
                      setActionMessage(
                        'Contato demonstrativo aberto com sucesso.',
                      )
                    }
                    variant="outline"
                  >
                    <MessageCircle /> Contato
                  </Button>
                </div>
                <p className="mt-4 text-center text-[11px] leading-5 text-[#896b60]">
                  Endereço, rota e contato são simulados neste protótipo.
                </p>
              </div>
            </div>
          </section>
        )}

        {screen === 'map' && (
          <section className="flex flex-1 flex-col overflow-hidden bg-[#eadcc5]">
            <div className="relative flex-1 [background-image:linear-gradient(27deg,transparent_25%,rgba(255,255,255,.82)_26%,rgba(255,255,255,.82)_30%,transparent_31%,transparent_69%,rgba(255,255,255,.72)_70%,rgba(255,255,255,.72)_74%,transparent_75%),linear-gradient(102deg,transparent_38%,rgba(212,86,46,.2)_39%,rgba(212,86,46,.2)_42%,transparent_43%)] [background-size:130px_95px,190px_160px]">
              <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-3 p-5">
                <Button
                  aria-label="Voltar"
                  className="rounded-full bg-white"
                  onClick={() => setScreen('home')}
                  size="icon-lg"
                  variant="outline"
                >
                  <ArrowLeft />
                </Button>
                <div className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs text-[#806257]">Localização marcada</p>
                  <p className="truncate text-sm font-bold">{location}</p>
                </div>
              </div>

              {places.map((place, index) => (
                <button
                  aria-label={`Abrir ${place.name}`}
                  className="absolute grid size-11 place-items-center rounded-full bg-primary text-white shadow-[0_8px_20px_rgba(82,31,16,.28)]"
                  key={place.name}
                  onClick={() => openPlace(place)}
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${31 + (index % 2) * 22}%`,
                  }}
                  type="button"
                >
                  <Utensils className="size-5" />
                </button>
              ))}

              <div className="absolute inset-x-4 bottom-24 rounded-2xl bg-white p-4 shadow-xl">
                <p className="text-sm font-black">3 sabores próximos</p>
                <p className="mt-1 text-xs text-[#806257]">
                  Toque em um marcador para abrir os detalhes.
                </p>
              </div>
            </div>
            <AppNav active="search" onNavigate={setScreen} />
          </section>
        )}

        {screen === 'favorites' && (
          <section className="flex flex-1 flex-col overflow-hidden bg-[#f6ead8]">
            <div className="flex-1 overflow-y-auto px-5 pb-28 pt-5">
              <ScreenHeader
                onBack={() => setScreen('home')}
                title="Favoritos"
              />
              <h1 className="mt-7 font-heading text-3xl font-black tracking-[-.04em]">
                Seus sabores salvos
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#76564a]">
                Monte uma lista para decidir depois.
              </p>

              {isGuest && (
                <div className="mt-5 rounded-2xl bg-[#32170f] p-5 text-[#fffaf1]">
                  <UserPlus className="size-5 text-[#f7d778]" />
                  <p className="mt-3 font-heading text-lg font-black">
                    Salve sua lista de verdade
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#d8c0b7]">
                    Como visitante, seus favoritos duram apenas nesta
                    demonstração.
                  </p>
                  <Button
                    className="mt-4 h-10 bg-[#f7d778] font-bold text-[#32170f] hover:bg-[#f7d778]/90"
                    onClick={() => openAuth('signup')}
                  >
                    Criar conta
                  </Button>
                </div>
              )}

              <div className="mt-5 space-y-3">
                {places
                  .filter((place) => favorites.includes(place.name))
                  .map((place, index) => (
                    <Card
                      className="gap-0 rounded-2xl bg-white py-0"
                      key={place.name}
                    >
                      <CardContent className="flex items-center gap-3 p-3">
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            alt={`Imagem de ${place.name}`}
                            className="h-full w-full object-cover"
                            height={140}
                            src="/og.png"
                            style={{
                              objectPosition: `${30 + index * 35}% center`,
                            }}
                            width={140}
                          />
                        </div>
                        <button
                          className="min-w-0 flex-1 text-left"
                          onClick={() => openPlace(place)}
                          type="button"
                        >
                          <p className="truncate font-heading text-sm font-black">
                            {place.name}
                          </p>
                          <p className="mt-1 text-xs text-[#76564a]">
                            {place.type} · {place.distance}
                          </p>
                        </button>
                        <button
                          aria-label={`Remover ${place.name}`}
                          className="text-primary"
                          onClick={() => toggleFavorite(place.name)}
                          type="button"
                        >
                          <Heart className="size-5 fill-current" />
                        </button>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {favorites.length === 0 && (
                <div className="mt-6 rounded-2xl border border-dashed border-[#32170f]/20 bg-white/60 px-6 py-12 text-center">
                  <Heart className="mx-auto size-7 text-primary" />
                  <p className="mt-4 font-heading text-lg font-black">
                    Sua lista está vazia
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#806257]">
                    Toque no coração de um lugar para guardar aqui.
                  </p>
                  <Button
                    className="mt-5"
                    onClick={() => setScreen('home')}
                    variant="outline"
                  >
                    Explorar lugares
                  </Button>
                </div>
              )}
            </div>
            <AppNav active="favorites" onNavigate={setScreen} />
          </section>
        )}

        {screen === 'profile' && (
          <section className="flex flex-1 flex-col overflow-hidden bg-[#f6ead8]">
            <div className="flex-1 overflow-y-auto px-5 pb-28 pt-5">
              <ScreenHeader onBack={() => setScreen('home')} title="Perfil" />
              <div className="mt-8 flex items-center gap-4">
                <span className="grid size-16 place-items-center rounded-full bg-[#32170f] text-white">
                  <User className="size-6" />
                </span>
                <div>
                  <h1 className="font-heading text-2xl font-black">
                    {isGuest ? 'Visitante' : 'Explorador OHFOME'}
                  </h1>
                  <p className="mt-1 text-sm text-[#76564a]">
                    {isGuest ? 'Acesso temporário' : 'Conta demonstrativa'}
                  </p>
                </div>
              </div>

              {isGuest ? (
                <Card className="mt-7 rounded-2xl bg-white">
                  <CardContent>
                    <p className="font-heading text-lg font-black">
                      Tenha uma experiência completa
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#76564a]">
                      Crie uma conta para manter favoritos e personalizar
                      recomendações.
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <Button
                        className="h-11 font-bold"
                        onClick={() => openAuth('signup')}
                      >
                        <UserPlus /> Criar conta
                      </Button>
                      <Button
                        className="h-11 font-bold"
                        onClick={() => openAuth('login')}
                        variant="outline"
                      >
                        Entrar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <p className="mt-7 flex items-center gap-2 rounded-xl bg-[#dcead8] px-4 py-3 text-sm font-bold text-[#28533c]">
                  <Check className="size-4" /> Conta pronta para a demonstração
                </p>
              )}

              <div className="mt-6 space-y-2">
                <button
                  className="flex w-full items-center justify-between rounded-xl bg-white p-4 text-left"
                  onClick={() => setScreen('location')}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <MapPin className="size-5 text-primary" />
                    <span>
                      <span className="block text-sm font-bold">
                        Localização
                      </span>
                      <span className="block text-xs text-[#806257]">
                        {location}
                      </span>
                    </span>
                  </span>
                  <ArrowRight className="size-4" />
                </button>
                <button
                  className="flex w-full items-center justify-between rounded-xl bg-white p-4 text-left"
                  onClick={() => setScreen('favorites')}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <Heart className="size-5 text-primary" />
                    <span>
                      <span className="block text-sm font-bold">Favoritos</span>
                      <span className="block text-xs text-[#806257]">
                        {favorites.length} lugar(es) salvo(s)
                      </span>
                    </span>
                  </span>
                  <ArrowRight className="size-4" />
                </button>
                <div className="flex w-full items-center gap-3 rounded-xl bg-white p-4">
                  <Phone className="size-5 text-primary" />
                  <div>
                    <p className="text-sm font-bold">Suporte</p>
                    <p className="text-xs text-[#806257]">
                      Canal demonstrativo
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <AppNav active="profile" onNavigate={setScreen} />
          </section>
        )}
      </div>
    </main>
  );
}

function ScreenHeader({
  onBack,
  title,
}: {
  onBack: () => void;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Button
        aria-label="Voltar"
        className="rounded-full"
        onClick={onBack}
        size="icon-lg"
        variant="outline"
      >
        <ArrowLeft />
      </Button>
      <p className="font-heading font-black">{title}</p>
    </div>
  );
}

function AppNav({
  active,
  onNavigate,
}: {
  active: 'home' | 'search' | 'favorites' | 'profile';
  onNavigate: (screen: Screen) => void;
}) {
  return (
    <nav
      className="absolute inset-x-0 bottom-0 mx-auto flex w-full items-center justify-around border-t border-[#32170f]/10 bg-[#fffaf1]/95 px-3 py-3 backdrop-blur sm:rounded-b-[1.85rem]"
      aria-label="Navegação do aplicativo"
    >
      <NavButton
        active={active === 'home'}
        icon={Home}
        label="Início"
        onClick={() => onNavigate('home')}
      />
      <NavButton
        active={active === 'search'}
        icon={Search}
        label="Mapa"
        onClick={() => onNavigate('map')}
      />
      <NavButton
        active={active === 'favorites'}
        icon={Heart}
        label="Favoritos"
        onClick={() => onNavigate('favorites')}
      />
      <NavButton
        active={active === 'profile'}
        icon={User}
        label="Perfil"
        onClick={() => onNavigate('profile')}
      />
    </nav>
  );
}

function NavButton({
  active = false,
  icon: Icon,
  label,
  onClick,
}: {
  active?: boolean;
  icon: typeof Home;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex min-w-16 flex-col items-center gap-1 text-[10px] font-bold ${active ? 'text-primary' : 'text-[#806257]'}`}
      onClick={onClick}
      type="button"
    >
      <span
        className={`grid size-8 place-items-center rounded-xl ${active ? 'bg-primary/10' : ''}`}
      >
        <Icon className="size-[18px]" />
      </span>
      {label}
    </button>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Home;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#f3e7d4] p-3">
      <Icon className="size-4 text-primary" />
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-[#806257]">
        {label}
      </p>
      <p className="mt-1 text-xs font-black">{value}</p>
    </div>
  );
}
