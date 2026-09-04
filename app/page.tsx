'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Check,
  Clock3,
  Compass,
  Database,
  Flag,
  Heart,
  Lightbulb,
  MapPin,
  MessageCircle,
  Route,
  Search,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Utensils,
  WandSparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const categories = ['Tudo', 'Comida típica', 'Até R$ 30', 'Perto de mim', 'Queridinhos locais'];

const places = [
  {
    name: 'Cantinho da Maria Isabel',
    type: 'Comida típica',
    detail: 'Maria Isabel, paçoca e sabores do Piauí',
    price: 'R$ 18–32',
    distance: '1,2 km',
    rating: '4,9',
    status: 'Aberto até 15h',
    image:
      'https://i0.wp.com/s2.glbimg.com/lAnCnHF5aaeibx_iL2OqjbAyIdI%3D/620x465/s.glbimg.com/jo/g1/f/original/2015/08/10/pratos.jpg',
    imagePosition: 'center',
    tags: ['Comida típica', 'Até R$ 30', 'Queridinhos locais'],
  },
  {
    name: 'Café da Dona Nena',
    type: 'Café regional',
    detail: 'Cuscuz, tapioca e café passado na hora',
    price: 'R$ 8–24',
    distance: '850 m',
    rating: '4,8',
    status: 'Aberto até 11h',
    image:
      'https://www.viagora.com.br/media/images/2025/10/24/mercado-da-picarra.jpeg.950x0_q95_crop.webp',
    imagePosition: 'center',
    tags: ['Até R$ 30', 'Perto de mim', 'Queridinhos locais'],
  },
  {
    name: 'Sabores do Mercado',
    type: 'Cozinha popular',
    detail: 'Panelada, carne de sol e almoço caseiro',
    price: 'R$ 20–35',
    distance: '2,4 km',
    rating: '4,7',
    status: 'Aberto até 16h',
    image:
      'https://storage.stwonline.com.br/180graus/uploads/ckeditor/pictures/1901476/30831238cf.jpg',
    imagePosition: 'center',
    tags: ['Comida típica', 'Queridinhos locais'],
  },
];

const developmentSteps = [
  {
    number: '01',
    title: 'Entender o território',
    text: 'Conversas com moradores, turistas e pequenos comerciantes para priorizar necessidades reais.',
    output: 'Mapa de dores e oportunidades',
    icon: Lightbulb,
  },
  {
    number: '02',
    title: 'Prototipar a experiência',
    text: 'Desenho da busca, dos filtros, do perfil do estabelecimento e do roteiro gastronômico.',
    output: 'Protótipo navegável',
    icon: Smartphone,
  },
  {
    number: '03',
    title: 'Preparar os dados',
    text: 'Cadastro simples de localização, faixa de preço, horário, fotos, contato e tipo de comida.',
    output: 'Base inicial de estabelecimentos',
    icon: Database,
  },
  {
    number: '04',
    title: 'Construir e integrar',
    text: 'Desenvolvimento do site responsivo com mapas, avaliações e contato direto com o negócio.',
    output: 'MVP funcional',
    icon: Building2,
  },
  {
    number: '05',
    title: 'Testar em Teresina',
    text: 'Piloto com usuários e comerciantes, medindo descoberta, contato e visitas geradas.',
    output: 'Aprendizados para evolução',
    icon: Flag,
  },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tudo');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortClosest, setSortClosest] = useState(false);

  const filteredPlaces = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');

    const matches = places.filter((place) => {
      const matchesCategory = activeCategory === 'Tudo' || place.tags.includes(activeCategory);
      const searchableText = `${place.name} ${place.type} ${place.detail} ${place.price}`.toLocaleLowerCase('pt-BR');
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });

    if (!sortClosest) return matches;

    return [...matches].sort((a, b) => {
      const parseDistance = (value: string) => Number(value.replace(' km', '').replace(',', '.').replace('850 m', '0.85'));
      return parseDistance(a.distance) - parseDistance(b.distance);
    });
  }, [activeCategory, query, sortClosest]);

  const toggleFavorite = (name: string) => {
    setFavorites((current) =>
      current.includes(name) ? current.filter((favorite) => favorite !== name) : [...current, name],
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="relative z-20 border-b border-[#3b1c12]/10 bg-[#fffaf1]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#inicio" className="flex items-center gap-2.5" aria-label="OHFOME, início">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_7px_0_#9d2f1d]">
              <Utensils className="size-5" strokeWidth={2.5} />
            </span>
            <span className="font-heading text-xl font-black tracking-[-0.04em]">OHFOME</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#5b3a2e] md:flex" aria-label="Navegação principal">
            <a className="transition-colors hover:text-primary" href="#descobertas">Descobrir</a>
            <a className="transition-colors hover:text-primary" href="#como-funciona">Como funciona</a>
            <a className="transition-colors hover:text-primary" href="#negocio">Para negócios</a>
          </nav>

          <Button className="h-10 rounded-full px-4 shadow-none" variant="outline">
            Entrar <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </header>

      <section id="inicio" className="relative isolate border-b border-[#3b1c12]/10 bg-[#fffaf1]">
        <div className="absolute inset-0 -z-10 opacity-45 [background-image:radial-gradient(#d4562e_0.8px,transparent_0.8px)] [background-size:18px_18px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.08fr_.92fr] lg:py-24">
          <div className="max-w-2xl">
            <Badge className="mb-6 h-7 rounded-full border-[#d4562e]/20 bg-[#f7d778] px-3 text-[#4d281c]" variant="outline">
              <Sparkles className="size-3.5" /> Feito para sentir o sabor de Teresina
            </Badge>
            <h1 className="font-heading text-[clamp(3.2rem,8vw,6.8rem)] font-black leading-[.84] tracking-[-0.075em] text-[#32170f]">
              Coma como <span className="text-primary">quem mora aqui.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#6b493c] sm:text-xl">
              Descubra pequenos restaurantes, barracas e sabores que contam a história de Teresina — perto de você e dentro do seu orçamento.
            </p>

            <form
              className="mt-9 flex max-w-2xl flex-col gap-3 rounded-[1.35rem] border border-[#432217]/12 bg-white p-2.5 shadow-[0_18px_60px_rgba(74,34,20,.14)] sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
              role="search"
            >
              <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="sr-only">O que você quer comer?</span>
                <Input
                  className="h-12 border-0 px-0 text-base shadow-none focus-visible:ring-0"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ex.: comida típica gastando pouco"
                  value={query}
                />
              </label>
              <Button className="h-12 rounded-2xl px-6 text-base font-bold shadow-none" type="submit">
                Encontrar sabores
              </Button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2" aria-label="Filtros rápidos">
              {categories.map((category) => (
                <button
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-all ${
                    activeCategory === category
                      ? 'border-[#32170f] bg-[#32170f] text-[#fffaf1]'
                      : 'border-[#432217]/15 bg-[#fffaf1]/80 text-[#69483c] hover:border-primary hover:text-primary'
                  }`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[570px] lg:mx-0">
            <div className="absolute -left-5 -top-5 size-32 rounded-full bg-[#f5c94f] blur-2xl" />
            <div className="relative rotate-1 overflow-hidden rounded-[2.3rem] border-[10px] border-white bg-[#e5bf7f] shadow-[0_35px_90px_rgba(70,28,13,.25)]">
              <img
                alt="Pratos inspirados na culinária regional do Piauí"
                className="aspect-[4/5] w-full object-cover"
                src="https://i0.wp.com/s2.glbimg.com/lAnCnHF5aaeibx_iL2OqjbAyIdI%3D/620x465/s.glbimg.com/jo/g1/f/original/2015/08/10/pratos.jpg"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1d0b06]/90 via-[#1d0b06]/45 to-transparent p-7 pt-24 text-white">
                <p className="text-sm font-semibold text-[#ffd878]">Descoberta do dia</p>
                <p className="mt-1 font-heading text-3xl font-black tracking-tight">Sabores do nosso Piauí</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-white/80"><MapPin className="size-4" /> Teresina, PI</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl border border-[#32170f]/10 bg-white p-3.5 pr-5 shadow-[0_16px_45px_rgba(70,28,13,.2)] sm:-left-9">
              <span className="grid size-11 place-items-center rounded-xl bg-[#dff0d8] text-[#28533c]"><Compass className="size-5" /></span>
              <div><p className="text-xs font-semibold text-[#826257]">Perto de você</p><p className="font-bold text-[#32170f]">23 lugares para explorar</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="descobertas" className="bg-[#f3e7d4] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[.16em] text-primary">Descobertas agora</p>
              <h2 className="mt-2 font-heading text-4xl font-black tracking-[-.045em] text-[#32170f] sm:text-5xl">Lugar bom se compartilha.</h2>
            </div>
            <button
              aria-pressed={sortClosest}
              className={`flex items-center gap-2 self-start rounded-full px-3 py-2 text-sm font-bold transition-colors sm:self-auto ${sortClosest ? 'bg-[#32170f] text-[#fffaf1]' : 'text-[#5f3b2f] hover:bg-[#32170f]/5'}`}
              onClick={() => setSortClosest((current) => !current)}
              type="button"
            >
              Mais próximos primeiro <ChevronDown className={`size-4 transition-transform ${sortClosest ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {filteredPlaces.length > 0 ? (
            <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredPlaces.map((place) => (
                <Card className="gap-0 rounded-[1.6rem] border-0 bg-[#fffaf1] py-0 shadow-[0_14px_40px_rgba(72,35,20,.08)] ring-1 ring-[#32170f]/8" key={place.name}>
                  <div className="relative overflow-hidden">
                    <img alt="Ambiente e sabores de um pequeno negócio local" className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-[1.03]" src={place.image} style={{ objectPosition: place.imagePosition }} />
                    <Badge className="absolute left-4 top-4 h-7 bg-[#fffaf1] text-[#32170f] shadow-sm">{place.type}</Badge>
                    <button
                      aria-label={`${favorites.includes(place.name) ? 'Remover' : 'Salvar'} ${place.name}`}
                      aria-pressed={favorites.includes(place.name)}
                      className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-[#fffaf1] text-[#b83d27] shadow-sm transition-transform active:scale-90"
                      onClick={() => toggleFavorite(place.name)}
                      type="button"
                    >
                      <Heart className={`size-[18px] ${favorites.includes(place.name) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <CardHeader className="gap-2 px-5 pb-3 pt-5">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="font-heading text-xl font-black tracking-tight text-[#32170f]">{place.name}</CardTitle>
                      <span className="flex items-center gap-1 text-sm font-bold text-[#32170f]"><Star className="size-4 fill-[#f2bd35] text-[#f2bd35]" /> {place.rating}</span>
                    </div>
                    <p className="text-sm leading-6 text-[#79594e]">{place.detail}</p>
                  </CardHeader>
                  <CardContent className="flex items-center gap-3 px-5 pb-5 text-sm font-semibold text-[#4c3027]">
                    <span>{place.price}</span><span className="size-1 rounded-full bg-[#b89a8d]" /><span>{place.distance}</span>
                  </CardContent>
                  <CardFooter className="justify-between border-[#32170f]/8 bg-[#f8eddc] px-5 py-3.5 text-sm text-[#5d4035]">
                    <span className="flex items-center gap-2"><Clock3 className="size-4 text-[#2f6749]" /> {place.status}</span>
                    <button className="font-bold text-primary" type="button">Ver lugar</button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-9 rounded-[1.6rem] border border-dashed border-[#32170f]/20 bg-[#fffaf1]/60 px-6 py-16 text-center">
              <p className="font-heading text-2xl font-black text-[#32170f]">Ainda não encontramos esse sabor.</p>
              <p className="mt-2 text-[#79594e]">Tente “comida típica”, “café” ou limpe os filtros.</p>
            </div>
          )}

          <p className="mt-5 text-xs text-[#806357]">Nomes, avaliações, distâncias e preços são dados demonstrativos para este protótipo.</p>
        </div>
      </section>

      <section id="como-funciona" className="bg-[#fffaf1] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
            <div className="lg:sticky lg:top-10">
              <Badge className="h-7 border-[#d4562e]/20 bg-[#f7d778] text-[#4d281c]" variant="outline">Da vontade ao caminho</Badge>
              <h2 className="mt-5 font-heading text-5xl font-black leading-[.94] tracking-[-.055em] text-[#32170f] sm:text-6xl">
                Seu próximo sabor em quatro passos.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-[#76564a]">
                A demonstração traduz a proposta do projeto em uma jornada curta, clara e possível de usar pelo celular.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Search, step: '1', title: 'Conte sua vontade', text: 'Digite o prato, o orçamento ou a experiência que procura.' },
                { icon: MapPin, step: '2', title: 'Use os filtros', text: 'Aproxime os resultados por preço, distância e preferência local.' },
                { icon: Sparkles, step: '3', title: 'Receba sugestões', text: 'Veja lugares compatíveis e recomendações que ficam melhores com o uso.' },
                { icon: Route, step: '4', title: 'Escolha e vá', text: 'Confira horário, rota e forma de contato antes de sair.' },
              ].map(({ icon: Icon, step, title, text }) => (
                <article className="relative min-h-60 rounded-[1.65rem] border border-[#32170f]/10 bg-[#f7ecda] p-6" key={step}>
                  <span className="absolute right-5 top-3 font-heading text-7xl font-black tracking-tighter text-[#d4562e]/10">{step}</span>
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#2e6648] text-[#fffaf1]"><Icon className="size-5" /></span>
                  <h3 className="mt-8 font-heading text-2xl font-black tracking-tight text-[#32170f]">{title}</h3>
                  <p className="mt-3 leading-7 text-[#76564a]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#fffaf1]/10 bg-[#2b1510] px-5 py-20 text-[#fffaf1] sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[.16em] text-[#f4c84e]">Fluxo de desenvolvimento</p>
            <h2 className="mt-3 font-heading text-5xl font-black leading-[.96] tracking-[-.055em] sm:text-6xl">Da ideia ao piloto na rua.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d6bfb6]">
              Um caminho enxuto para validar valor primeiro e adicionar tecnologia à medida que a comunidade usa a plataforma.
            </p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/10 lg:grid-cols-5">
            {developmentSteps.map(({ number, title, text, output, icon: Icon }) => (
              <li className="flex min-h-[330px] flex-col bg-[#321a14] p-6 transition-colors hover:bg-[#3a1e17]" key={number}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-[#f4c84e]">{number}</span>
                  <Icon className="size-5 text-[#e06a43]" />
                </div>
                <h3 className="mt-12 font-heading text-2xl font-black leading-tight tracking-tight">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#cdb5ac]">{text}</p>
                <p className="mt-auto flex items-start gap-2 border-t border-white/10 pt-5 text-sm font-semibold text-[#f8e8d4]"><Check className="mt-0.5 size-4 shrink-0 text-[#7eb995]" /> {output}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['MVP', 'Busca, filtros, perfis e contato'],
              ['Piloto', '20 a 30 negócios de diferentes regiões'],
              ['Métrica principal', 'Pessoas que descobrem e contatam um local'],
            ].map(([label, value]) => (
              <div className="rounded-2xl border border-white/10 bg-white/[.045] p-5" key={label}>
                <p className="text-xs font-black uppercase tracking-[.14em] text-[#d8896e]">{label}</p>
                <p className="mt-2 font-heading text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="negocio" className="relative overflow-hidden bg-[#e45734] px-5 py-20 sm:px-8 sm:py-24">
        <div className="absolute -right-24 -top-24 size-80 rounded-full border-[60px] border-[#f3c64c]/70" />
        <div className="absolute -bottom-28 left-[8%] size-56 rounded-full bg-[#2d6547]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <Badge className="h-7 border-white/30 bg-white/15 text-white" variant="outline"><Store className="size-3.5" /> Para pequenos negócios</Badge>
            <h2 className="mt-5 max-w-3xl font-heading text-5xl font-black leading-[.92] tracking-[-.06em] text-white sm:text-7xl">Seu tempero merece ser encontrado.</h2>
          </div>
          <div className="rounded-[1.6rem] bg-[#fffaf1] p-7 text-[#32170f] shadow-[0_24px_70px_rgba(73,19,8,.24)] sm:p-9">
            <p className="text-lg leading-8 text-[#6b493c]">O cadastro foi pensado para quem não tem site ou equipe de marketing: informações simples, presença digital e contato direto com novos clientes.</p>
            <ul className="mt-6 space-y-3 text-sm font-semibold">
              {['Perfil gratuito e fácil de atualizar', 'Horários, preços, fotos e localização', 'Mais visibilidade para turistas e moradores'].map((benefit) => (
                <li className="flex items-center gap-3" key={benefit}><span className="grid size-6 place-items-center rounded-full bg-[#dcead8] text-[#2e6648]"><Check className="size-3.5" /></span>{benefit}</li>
              ))}
            </ul>
            <Button className="mt-8 h-12 w-full rounded-xl bg-[#32170f] text-base font-bold text-[#fffaf1] hover:bg-[#32170f]/90 sm:w-auto sm:px-6">
              <MessageCircle /> Quero cadastrar meu negócio
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-[#fffaf1] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-[#32170f]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl bg-[#32170f] text-[#fffaf1]"><Utensils className="size-4" /></span><span className="font-heading text-lg font-black tracking-tight">OHFOME</span></div>
          <p className="max-w-xl text-sm leading-6 text-[#79594e]">Demonstração acadêmica de uma plataforma que valoriza a culinária, a cultura e os pequenos negócios de Teresina.</p>
          <span className="flex items-center gap-2 text-sm font-bold text-[#2e6648]"><WandSparkles className="size-4" /> Protótipo 2026</span>
        </div>
      </footer>
    </main>
  );
}
