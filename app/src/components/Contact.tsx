import { MapPin, Phone, Clock, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dataCheckin: "",
    dataCheckout: "",
    module: "",
    occupancy: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Gostaria de fazer uma pré-reserva.
Nome: ${formData.name}
Telefone: ${formData.phone}
Quarto: ${formData.module || "A definir"}
Ocupação: ${formData.occupancy || "A definir"}
Check-in: ${formData.dataCheckin || "A definir"}
Check-out: ${formData.dataCheckout || "A definir"}

Mensagem: ${formData.message}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=5538999248203&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contato" className="section-padding bg-muted/20 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info & Map */}
          <div className="space-y-12 animate-slide-in">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary font-medium tracking-widest uppercase text-sm">
                  Contato e Localização
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
                Estamos Prontos para Recebê-lo
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                Planeje sua estadia conosco. Nossa equipe está à disposição para ajudar com sua reserva e tirar qualquer dúvida.
              </p>
            </div>

            {/* Contact Details Grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Endereço</h3>
                  <p className="text-sm text-muted-foreground">R. Juscelino Kubitscheck, 1060 - Planalto, Buritis - MG, 38660-000</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Telefone/WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">(38) 99924-8203</p>
                </div>
              </div>

              <div className="flex gap-4 sm:col-span-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Horários</h3>
                  <p className="text-sm text-muted-foreground">Check-in: a partir das 13h00 | Check-out: até as 12h00</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-card h-[300px] relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3842.279505541775!2d-46.42932612411607!3d-15.630097618932535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9356b305f48a343f%3A0xe3dcce9676d90e9a!2sHotel%20Ouro%20do%20Cerrado%20Buritis!5e0!3m2!1spt-BR!2sbr!4v1763047220356!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Localização do Ouro do Cerrado Hotel"
                className="grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          </div>

          {/* Form */}
          <div className="animate-slide-in-right">
            <div className="bg-card p-8 md:p-10 rounded-[2rem] shadow-luxury border border-border/50">
              <h3 className="text-2xl font-bold mb-8 font-display">Solicitar Pré-Reserva</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome Completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 bg-background border border-input rounded-lg px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 bg-background border border-input rounded-lg px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data de Check-in</label>
                    <input
                      type="date"
                      value={formData.dataCheckin}
                      onChange={(e) => setFormData({ ...formData, dataCheckin: e.target.value })}
                      className="w-full h-12 bg-background border border-input rounded-lg px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data de Check-out</label>
                    <input
                      type="date"
                      value={formData.dataCheckout}
                      onChange={(e) => setFormData({ ...formData, dataCheckout: e.target.value })}
                      className="w-full h-12 bg-background border border-input rounded-lg px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Qual acomodação deseja?</label>
                  <select
                    value={formData.module}
                    onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                    className="w-full h-12 bg-background border border-input rounded-lg px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-foreground"
                  >
                    <option value="">Selecione um quarto</option>
                    <option value="Suíte Super Luxo">Suíte Super Luxo</option>
                    <option value="Suite família com ar">Suite família com ar</option>
                    <option value="Luxo Executivo">Luxo Executivo</option>
                    <option value="Master Triplo">Master Triplo</option>
                    <option value="Master Executivo">Master Executivo</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Ocupação</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {["Individual", "Casal", "Triplo", "Quádruplo"].map((op) => (
                      <label key={op} className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.occupancy === op ? 'bg-primary border-primary' : 'border-input group-hover:border-primary'}`}>
                          {formData.occupancy === op && <div className="w-2.5 h-2.5 bg-white rounded-[2px]" />}
                        </div>
                        <input
                          type="radio"
                          name="occupancy"
                          value={op}
                          checked={formData.occupancy === op}
                          onChange={(e) => setFormData({ ...formData, occupancy: e.target.value })}
                          className="hidden"
                        />
                        <span className="text-sm">{op}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensagem Adicional</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full bg-background border border-input rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none"
                    placeholder="Algo que devemos saber? (Necessidades especiais, horário de chegada...)"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-14 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>Enviar para WhatsApp</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
