import { useState } from "react";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  module: string;
  dataCheckin: string;
  dataCheckout: string;
  occupancy: string;
  message: string;
}

const initialFormData: ReservationForm = {
  name: "",
  email: "",
  phone: "",
  cpf: "",
  cep: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  module: "",
  dataCheckin: "",
  dataCheckout: "",
  occupancy: "",
  message: "",
};

const roomOptions = [
  "Suíte Super Luxo",
  "Suíte família com ar",
  "Luxo Executivo",
  "Master Triplo",
  "Master Executivo com ar e frigobar",
  "Master com ar",
  "Master executivo",
  "Standart com ventilador",
  "Standart executivo com ventilador e frigobar",
];

const occupancyOptions = ["Individual", "Casal", "Triplo", "Quádruplo"];

const inputClass =
  "h-10 rounded-md border-[#ded6cd] bg-[#fbfaf8] text-xs shadow-none placeholder:text-muted-foreground/80 focus-visible:ring-1 focus-visible:ring-[#b2875c] focus-visible:ring-offset-0";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Hotel%20Ouro%20do%20Cerrado%20Buritis";

const Contact = () => {
  const [formData, setFormData] = useState<ReservationForm>(initialFormData);

  const updateField = (field: keyof ReservationForm, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    const message = `Olá! Gostaria de fazer uma reserva.
Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone}
CPF: ${formData.cpf || "Não informado"}
CEP: ${formData.cep || "Não informado"}
Rua: ${formData.rua || "Não informado"}
Número: ${formData.numero || "Não informado"}
Bairro: ${formData.bairro || "Não informado"}
Cidade: ${formData.cidade || "Não informado"}
Estado: ${formData.estado || "Não informado"}
Quarto: ${formData.module || "Não informado"}
Ocupação: ${formData.occupancy || "Não informado"}
Check-in: ${formData.dataCheckin || "Não informado"}
Check-out: ${formData.dataCheckout || "Não informado"}
Mensagem: ${formData.message || "Não informado"}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=5538999248203&text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
    setFormData(initialFormData);
  };

  return (
    <section id="contato" className="section-padding bg-[#f7f5f1]">
      <div className="container-custom">
        <div className="mx-auto mb-14 max-w-3xl text-center animate-fade-in">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b2875c]">
            Entre em Contato
          </span>
          <h2 className="mt-3 mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Faça Sua Reserva
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Estamos prontos para recebê-lo. Entre em contato conosco!
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <form className="space-y-4 animate-slide-in">
            <Input
              placeholder="Seu nome"
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              required
              className={inputClass}
            />
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
              className={inputClass}
            />
            <Input
              type="tel"
              placeholder="Seu telefone"
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              required
              className={inputClass}
            />
            <Input
              placeholder="Seu CPF"
              value={formData.cpf}
              onChange={(event) => updateField("cpf", event.target.value)}
              required
              className={inputClass}
            />

            <div className="pt-1">
              <span className="mb-3 block text-xs text-muted-foreground">Endereço:</span>
              <div className="space-y-4">
                <Input
                  placeholder="CEP"
                  value={formData.cep}
                  onChange={(event) => updateField("cep", event.target.value)}
                  required
                  className={inputClass}
                />
                <Input
                  placeholder="Rua / Avenida"
                  value={formData.rua}
                  onChange={(event) => updateField("rua", event.target.value)}
                  required
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Número (Casa/Apto)"
                    value={formData.numero}
                    onChange={(event) => updateField("numero", event.target.value)}
                    required
                    className={inputClass}
                  />
                  <Input
                    placeholder="Bairro"
                    value={formData.bairro}
                    onChange={(event) => updateField("bairro", event.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Cidade"
                    value={formData.cidade}
                    onChange={(event) => updateField("cidade", event.target.value)}
                    required
                    className={inputClass}
                  />
                  <Input
                    placeholder="Estado (ex: MG)"
                    value={formData.estado}
                    onChange={(event) => updateField("estado", event.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <select
              value={formData.module}
              onChange={(event) => updateField("module", event.target.value)}
              required
              className="h-10 w-full rounded-md border border-[#ded6cd] bg-[#fbfaf8] px-3 py-2 text-xs text-muted-foreground outline-none focus-visible:ring-1 focus-visible:ring-[#b2875c]"
            >
              <option value="" disabled>
                Selecione o tipo de quarto
              </option>
              {roomOptions.map((room) => (
                <option key={room} value={room} translate="no" className="notranslate">
                  {room}
                </option>
              ))}
            </select>

            <div>
              <span className="mb-3 block text-xs text-muted-foreground">Tipo de Ocupação</span>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {occupancyOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2 text-xs text-foreground">
                    <input
                      type="radio"
                      name="occupancy"
                      value={option}
                      checked={formData.occupancy === option}
                      onChange={(event) => updateField("occupancy", event.target.value)}
                      required
                      className="h-3.5 w-3.5 accent-[#b2875c]"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs text-muted-foreground">Check-in</label>
                <Input
                  type="date"
                  value={formData.dataCheckin}
                  onChange={(event) => updateField("dataCheckin", event.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-muted-foreground">Check-out</label>
                <Input
                  type="date"
                  value={formData.dataCheckout}
                  onChange={(event) => updateField("dataCheckout", event.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <Textarea
              placeholder="Sua mensagem (datas desejadas, número de hóspedes, etc.)"
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              rows={5}
              className="resize-none rounded-md border-[#ded6cd] bg-[#fbfaf8] text-xs shadow-none placeholder:text-muted-foreground/80 focus-visible:ring-1 focus-visible:ring-[#b2875c] focus-visible:ring-offset-0"
            />

            <Button
              type="button"
              onClick={handleSubmit}
              size="lg"
              className="h-10 w-full rounded-md bg-[#9a4635] text-xs font-semibold text-white hover:bg-[#7f382a]"
            >
              Enviar Mensagem via WhatsApp
            </Button>
          </form>

          <div className="space-y-7 pt-0 animate-fade-in lg:pt-1">
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-[#efe2d2]">
                  <MapPin className="h-5 w-5 text-[#b2875c]" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">Endereço</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    R. Juscelino Kubitscheck, 1060 - Planalto, Buritis - MG, 38660-000
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-[#efe2d2]">
                  <Phone className="h-5 w-5 text-[#b2875c]" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">Telefone</h3>
                  <p className="text-xs text-muted-foreground">(38) 99924-8203</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-[#efe2d2]">
                  <Clock className="h-5 w-5 text-[#b2875c]" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">Horário de Check-in</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Check-in: 13h00
                    <br />
                    Check-out: 12h00
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative h-[230px] overflow-hidden rounded-lg border border-[#ded6cd] bg-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-20px_rgba(0,0,0,0.45)] sm:h-[260px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3842.279505541775!2d-46.42932612411607!3d-15.630097618932535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9356b305f48a343f%3A0xe3dcce9676d90e9a!2sHotel%20Ouro%20do%20Cerrado%20Buritis!5e0!3m2!1spt-BR!2sbr!4v1763047220356!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Localização do Ouro do Cerrado Hotel"
                className="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 top-3 inline-flex h-9 items-center gap-2 rounded-md bg-white/95 px-3 text-xs font-semibold text-foreground shadow-md transition-colors hover:bg-[#9a4635] hover:text-white"
              >
                Abrir mapa
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
