import heroSuite from "../assets/fachadaprincipal.webp";
import hotelExterior from "../assets/Melhore_a_qualidade_202604240012.jpeg";
import breakfast from "../assets/cafe-mmanha-frutas.jpg";
import roomStandard from "../assets/cafe-breakfast.jpg";
import roomFamily from "../assets/arealazer.webp";
import lobbyChandelier from "../assets/suiteluxuosa.jpeg";
import bathroomLuxury from "../assets/bathroom-luxury.png";
import salaTV from "../assets/sala-de-tv.webp";

const galleryImages = [
  { id: 1, src: heroSuite, alt: "Entrada do hotel" },
  { id: 2, src: hotelExterior, alt: "Fachada do hotel" },
  { id: 3, src: breakfast, alt: "Café da manhã completo" },
  { id: 4, src: lobbyChandelier, alt: "Suíte de luxo com ar e hidromassegem" },
  { id: 5, src: bathroomLuxury, alt: "Banheiro luxuoso" },
  { id: 6, src: roomStandard, alt: "Café da manhã" },
  { id: 7, src: roomFamily, alt: "Área de lazer" },
  { id: 8, src: salaTV, alt: "Sala de TV" },
];

const Gallery = () => {
  return (
    <section id="galeria" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-[#c1875c] font-semibold text-sm uppercase tracking-wider">
            Galeria de Fotos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Conheça Nossas Instalações
          </h2>
          <p className="text-lg text-muted-foreground">
            Uma prévia do que espera por você no Ouro do Cerrado Hotel
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`
                relative overflow-hidden rounded-xl shadow-card group cursor-pointer animate-scale-in
                ${index === 0 ? "col-span-2 row-span-2" : ""}
                ${index === 3 ? "col-span-2" : ""}
              `}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`
                  w-full object-cover group-hover:scale-110 transition-transform duration-500
                  ${index === 0 ? "h-full min-h-[500px]" : "h-64"}
                `}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center px-4 font-medium">
                    {image.alt}
                  </p>
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
