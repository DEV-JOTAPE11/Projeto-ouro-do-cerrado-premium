import heroSuite from "../assets/suiteluxuosa.jpeg";
import heroSuiteHover from "../assets/Banheirahidro.webp";
import roomStandard from "../assets/Deixe_esssa_imagem4k_202604251821.jpeg";
import roomFamily from "../assets/luxo-executivo.jpg";
import masterTriplo from "../assets/master-triplo.jpg";
import masterExecu from "../assets/master-executivo-ar-frigo.jpg";
import masterAR from "../assets/master-ar.jpg";
import masterexe from "../assets/master-executivo.jpg";
import standartventi from "../assets/Standart_ventilador.jpg";

export interface AccommodationSlide {
  id: number;
  name: string;
  image: string;
  imageHover?: string;
  guests: string;
  beds: string;
  size?: string;
  price: {
    individual?: number;
    duplo?: number;
    triplo?: number;
    quadruplo?: number;
  };
  features: string[];
}

export const accommodations: AccommodationSlide[] = [
  {
    id: 1,
    name: "Suíte Super Luxo",
    image: heroSuite,
    imageHover: heroSuiteHover,
    guests: "2 pessoas",
    beds: "1 cama king size",
    size: "48m²",
    price: {
      individual: 480,
      duplo: 480,
    },
    features: ["Ar-condicionado", "Frigobar", "Banheira de hidromassagem"],
  },
  {
    id: 2,
    name: "Suíte família com ar",
    image: roomStandard,
    guests: "4 pessoas",
    beds: "1 cama de casal e 2 camas de solteiro",
    price: {
      duplo: 260,
      triplo: 360,
      quadruplo: 460,
    },
    features: ["Wi-Fi gratuito", "TV a cabo", "Ar-condicionado"],
  },
  {
    id: 3,
    name: "Luxo Executivo",
    image: roomFamily,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: {
      individual: 200,
      duplo: 260,
    },
    features: ["Frigobar", "Ar-condicionado", "Serviço de quarto"],
  },
  {
    id: 4,
    name: "Master Triplo",
    image: masterTriplo,
    guests: "3 pessoas",
    beds: "1 cama de casal e uma de solteiro",
    price: {
      individual: 180,
      duplo: 230,
      triplo: 310,
    },
    features: ["Ideal para família", "TV a cabo", "Ar-condicionado"],
  },
  {
    id: 5,
    name: "Master Executivo com ar e frigobar",
    image: masterExecu,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: {
      individual: 180,
      duplo: 230,
    },
    features: ["Frigobar", "Ar-condicionado"],
  },
  {
    id: 6,
    name: "Master com ar",
    image: masterAR,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: {
      individual: 160,
      duplo: 210,
    },
    features: ["Ar-condicionado", "Serviço de quarto"],
  },
  {
    id: 7,
    name: "Master executivo",
    image: masterexe,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: {
      individual: 180,
      duplo: 230,
    },
    features: ["Com acessibilidade", "Ar-condicionado", "TV a cabo", "Frigobar"],
  },
  {
    id: 8,
    name: "Standart com ventilador",
    image: standartventi,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: {
      individual: 140,
      duplo: 190,
    },
    features: ["Ventilador", "TV a cabo"],
  },
  {
    id: 9,
    name: "Standart executivo com ventilador e frigobar",
    image: masterAR,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: {
      individual: 160,
      duplo: 210,
    },
    features: ["Ventilador", "TV a cabo", "Frigobar"],
  },
];

export const formatPrice = (value: number) => `R$ ${value.toLocaleString("pt-BR")}`;

export const getStartingPrice = (room: AccommodationSlide) =>
  room.price.individual || room.price.duplo || room.price.triplo || room.price.quadruplo;
