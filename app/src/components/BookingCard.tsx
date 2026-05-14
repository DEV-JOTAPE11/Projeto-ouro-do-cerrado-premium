import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock, Home, Send, Users } from "lucide-react";
import { accommodations } from "../lib/accommodations";

const WHATSAPP_PHONE = "5538999248203";

const checkInTimes = ["14:00", "15:00", "18:00", "A combinar"];
const checkOutTimes = ["11:00", "12:00", "A combinar"];
const guestOptions = ["1 adulto", "2 adultos", "3 hóspedes", "4 hóspedes"];

const formatInputDate = (date: Date) => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const addDaysToInputDate = (dateValue: string, days: number) => {
  const [year, month, day] = dateValue.split("-").map(Number);
  return formatInputDate(addDays(new Date(year, month - 1, day), days));
};

const today = formatInputDate(new Date());
const tomorrow = formatInputDate(addDays(new Date(), 1));

const BookingCard = () => {
  const [selectedRoom, setSelectedRoom] = useState("Todas as opções");
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [checkInTime, setCheckInTime] = useState(checkInTimes[0]);
  const [checkOutTime, setCheckOutTime] = useState(checkOutTimes[0]);
  const [guests, setGuests] = useState(guestOptions[1]);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const handleQuickReserve = (event: Event) => {
      const roomName = (event as CustomEvent<{ roomName?: string }>).detail?.roomName;
      if (!roomName) return;

      setSelectedRoom(roomName);
      setIsHighlighted(true);
      window.setTimeout(() => setIsHighlighted(false), 1400);
    };

    window.addEventListener("quick-reserve-room", handleQuickReserve);
    return () => window.removeEventListener("quick-reserve-room", handleQuickReserve);
  }, []);

  const handleCheckInChange = (value: string) => {
    setCheckIn(value);
    if (checkOut <= value) {
      setCheckOut(addDaysToInputDate(value, 1));
    }
  };

  const applyQuickStay = (offsetDays: number, nights: number) => {
    const arrivalDate = addDays(new Date(), offsetDays);
    const arrival = formatInputDate(arrivalDate);
    const departure = formatInputDate(addDays(arrivalDate, nights));

    setCheckIn(arrival);
    setCheckOut(departure);
  };

  const whatsappHref = useMemo(() => {
    const message = [
      "Olá! Vim pelo site do Hotel Ouro do Cerrado e gostaria de verificar disponibilidade.",
      "",
      `Acomodação: ${selectedRoom}`,
      `Check-in: ${checkIn} às ${checkInTime}`,
      `Check-out: ${checkOut} às ${checkOutTime}`,
      `Hóspedes: ${guests}`,
    ].join("\n");

    return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
  }, [checkIn, checkInTime, checkOut, checkOutTime, guests, selectedRoom]);

  return (
    <form
      className={`w-full max-w-6xl mx-auto bg-white rounded-2xl md:rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] relative z-20 p-3 md:p-4 lg:p-5 transition-all duration-300 ${
        isHighlighted ? "ring-4 ring-[#e3c385]/60 -translate-y-1" : "ring-0"
      }`}
      onSubmit={(event) => {
        event.preventDefault();
        window.open(whatsappHref, "_blank", "noopener,noreferrer");
      }}
      aria-label="Reserva rápida"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-gray-100 pb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8f6b43]">
          Reserva rápida
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyQuickStay(0, 1)}
            className="rounded-full border border-[#b2875c]/30 px-3 py-1 text-xs font-medium text-[#5b4635] transition-colors hover:bg-[#b2875c]/10 active:scale-[0.98]"
          >
            Hoje, 1 noite
          </button>
          <button
            type="button"
            onClick={() => applyQuickStay(1, 1)}
            className="rounded-full border border-[#b2875c]/30 px-3 py-1 text-xs font-medium text-[#5b4635] transition-colors hover:bg-[#b2875c]/10 active:scale-[0.98]"
          >
            Amanhã, 1 noite
          </button>
          <button
            type="button"
            onClick={() => applyQuickStay(1, 2)}
            className="rounded-full border border-[#b2875c]/30 px-3 py-1 text-xs font-medium text-[#5b4635] transition-colors hover:bg-[#b2875c]/10 active:scale-[0.98]"
          >
            Amanhã, 2 noites
          </button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr_1fr_0.85fr_auto] lg:items-end">
        <label className="flex min-w-0 items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 transition-colors hover:border-[#b2875c]/40">
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b2875c]/10">
            <Home className="h-5 w-5 text-[#b2875c]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Acomodação
            </span>
            <select
              value={selectedRoom}
              onChange={(event) => setSelectedRoom(event.target.value)}
              className="w-full min-w-0 bg-transparent text-sm font-semibold text-foreground outline-none"
            >
              <option>Todas as opções</option>
              {accommodations.map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 transition-colors hover:border-[#b2875c]/40">
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b2875c]/10">
            <CalendarDays className="h-5 w-5 text-[#b2875c]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Check-in
            </span>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(event) => handleCheckInChange(event.target.value)}
              className="mb-2 w-full bg-transparent text-sm font-semibold text-foreground outline-none"
            />
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#b2875c]" />
              <select
                value={checkInTime}
                onChange={(event) => setCheckInTime(event.target.value)}
                className="w-full bg-transparent text-sm text-muted-foreground outline-none"
              >
                {checkInTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </span>
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 transition-colors hover:border-[#b2875c]/40">
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b2875c]/10">
            <CalendarDays className="h-5 w-5 text-[#b2875c]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Check-out
            </span>
            <input
              type="date"
              min={addDaysToInputDate(checkIn, 1)}
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              className="mb-2 w-full bg-transparent text-sm font-semibold text-foreground outline-none"
            />
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#b2875c]" />
              <select
                value={checkOutTime}
                onChange={(event) => setCheckOutTime(event.target.value)}
                className="w-full bg-transparent text-sm text-muted-foreground outline-none"
              >
                {checkOutTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </span>
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 transition-colors hover:border-[#b2875c]/40">
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b2875c]/10">
            <Users className="h-5 w-5 text-[#b2875c]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Hóspedes
            </span>
            <select
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-foreground outline-none"
            >
              {guestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </span>
        </label>

        <button
          type="submit"
          className="inline-flex h-full min-h-[4.5rem] items-center justify-center gap-2 rounded-xl bg-[#2c2421] px-6 py-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#3a302c] active:scale-[0.98]"
        >
          <Send className="h-4 w-4" />
          Ver disponibilidade
        </button>
      </div>
    </form>
  );
};

export default BookingCard;
