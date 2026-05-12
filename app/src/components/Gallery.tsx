import { InteractiveSelector } from "./ui/interactive-selector"
import {
  Hotel,
  UtensilsCrossed,
  BedDouble,
  Sparkles,
  Tv,
  Bath,
} from "lucide-react"

// Import local hotel images
import fachadaPrincipal from "../assets/fachadaprincipal.webp"
import hotelExterior from "../assets/Melhore_a_qualidade_202604240012.jpeg"
import cafeManhaFrutas from "../assets/cafe-mmanha-frutas.jpg"
import suiteLuxuosa from "../assets/suiteluxuosa.jpeg"
import bathroomLuxury from "../assets/bathroom-luxury.png"
import areaLazer from "../assets/arealazer.webp"
import salaTV from "../assets/sala-de-tv.webp"

const galleryOptions = [
  {
    title: "Fachada Principal",
    description: "Entrada elegante e acolhedora",
    image: fachadaPrincipal,
    icon: <Hotel size={22} className="text-[#d4b896]" />,
  },
  {
    title: "Vista Panorâmica",
    description: "Arquitetura refinada do hotel",
    image: hotelExterior,
    icon: <Sparkles size={22} className="text-[#d4b896]" />,
  },
  {
    title: "Café da Manhã",
    description: "Frutas frescas e sabores do cerrado",
    image: cafeManhaFrutas,
    icon: <UtensilsCrossed size={22} className="text-[#d4b896]" />,
  },
  {
    title: "Suíte Luxuosa",
    description: "Conforto premium com hidromassagem",
    image: suiteLuxuosa,
    icon: <BedDouble size={22} className="text-[#d4b896]" />,
  },
  {
    title: "Banheiro Premium",
    description: "Acabamentos de alto padrão",
    image: bathroomLuxury,
    icon: <Bath size={22} className="text-[#d4b896]" />,
  },
  {
    title: "Área de Lazer",
    description: "Piscina e espaço de convivência",
    image: areaLazer,
    icon: <Sparkles size={22} className="text-[#d4b896]" />,
  },
  {
    title: "Sala de TV",
    description: "Entretenimento e relaxamento",
    image: salaTV,
    icon: <Tv size={22} className="text-[#d4b896]" />,
  },
]

const Gallery = () => {
  return (
    <InteractiveSelector
      title="Conheça Nossas Instalações"
      subtitle="Uma prévia do que espera por você no Ouro do Cerrado Hotel"
      badgeText="Galeria"
      options={galleryOptions}
    />
  )
}

export default Gallery
