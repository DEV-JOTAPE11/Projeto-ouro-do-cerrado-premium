import { Maximize2 } from "lucide-react";
import img1 from "@/assets/arealazer.webp";
import img2 from "@/assets/lobby-chandelier.png";
import img3 from "@/assets/bathroom-luxury.png";
import img4 from "@/assets/Nova-imagem--fundo.jpg";
import img5 from "@/assets/hotel-exterior.jpg";

const galleryImages = [
  { src: img1, alt: "Área de Lazer", span: "md:col-span-2 md:row-span-2" },
  { src: img2, alt: "Lobby Elegante", span: "md:col-span-1 md:row-span-1" },
  { src: img3, alt: "Banheiro Luxuoso", span: "md:col-span-1 md:row-span-1" },
  { src: img4, alt: "Ambiente Aconchegante", span: "md:col-span-1 md:row-span-1" },
  { src: img5, alt: "Exterior do Hotel", span: "md:col-span-1 md:row-span-1" },
];

const Gallery = () => {
  return (
    <section id="galeria" className="section-padding bg-muted/20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-medium tracking-widest uppercase text-sm">
              Galeria de Fotos
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            A Experiência Visual
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[250px]">
          {galleryImages.map((img, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer animate-scale-in ${img.span}`}
              data-delay={index * 0.1}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Maximize2 className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
