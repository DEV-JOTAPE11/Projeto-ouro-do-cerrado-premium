import { CalendarDays, Users, ChevronDown, Home } from "lucide-react";

const BookingCard = () => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl md:rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden relative z-20 p-3 md:p-4 lg:py-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-6 transition-transform duration-300">
      
      {/* Room Type */}
      <div className="flex-1 w-full md:w-auto flex items-center gap-3 p-2 md:p-0 rounded-lg hover:bg-gray-50 md:hover:bg-transparent cursor-pointer transition-colors border-b border-gray-100 md:border-none">
        <div className="w-10 h-10 rounded-full bg-[#b2875c]/10 flex items-center justify-center shrink-0">
          <Home className="w-5 h-5 text-[#b2875c]" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Acomodação</p>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm md:text-base font-medium text-foreground">Todas as opções</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <div className="hidden md:block w-[1px] h-8 bg-gray-200 ml-2 lg:ml-4"></div>
      </div>

      {/* Check In */}
      <div className="flex-1 w-full md:w-auto flex items-center gap-3 p-2 md:p-0 rounded-lg hover:bg-gray-50 md:hover:bg-transparent cursor-pointer transition-colors border-b border-gray-100 md:border-none">
        <div className="w-10 h-10 rounded-full bg-[#b2875c]/10 flex items-center justify-center shrink-0">
          <CalendarDays className="w-5 h-5 text-[#b2875c]" />
        </div>
        <div className="flex-1 relative">
          <p className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Check-in</p>
          <input 
            type="date" 
            className="w-full bg-transparent text-sm md:text-base font-medium text-foreground outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="hidden md:block w-[1px] h-8 bg-gray-200 ml-2 lg:ml-4"></div>
      </div>

      {/* Check Out */}
      <div className="flex-1 w-full md:w-auto flex items-center gap-3 p-2 md:p-0 rounded-lg hover:bg-gray-50 md:hover:bg-transparent cursor-pointer transition-colors border-b border-gray-100 md:border-none">
        <div className="w-10 h-10 rounded-full bg-[#b2875c]/10 flex items-center justify-center shrink-0">
          <CalendarDays className="w-5 h-5 text-[#b2875c]" />
        </div>
        <div className="flex-1 relative">
          <p className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Check-out</p>
          <input 
            type="date" 
            className="w-full bg-transparent text-sm md:text-base font-medium text-foreground outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            defaultValue={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
          />
        </div>
        <div className="hidden md:block w-[1px] h-8 bg-gray-200 ml-2 lg:ml-4"></div>
      </div>

      {/* Guests */}
      <div className="flex-1 w-full md:w-auto flex items-center gap-3 p-2 md:p-0 rounded-lg hover:bg-gray-50 md:hover:bg-transparent cursor-pointer transition-colors mb-3 md:mb-0">
        <div className="w-10 h-10 rounded-full bg-[#b2875c]/10 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5 text-[#b2875c]" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Hóspedes</p>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm md:text-base font-medium text-foreground">2 Adultos</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full md:w-auto shrink-0">
        <a 
          href="https://api.whatsapp.com/send?phone=5538999248203" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full text-center bg-[#2c2421] hover:bg-black text-white px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-medium transition-colors duration-300 shadow-md"
        >
          Ver disponibilidade
        </a>
      </div>

    </div>
  );
};

export default BookingCard;
