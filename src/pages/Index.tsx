import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import FloatingCardsDecor from "@/components/FloatingCardsDecor";
import MysticalBackground from "@/components/MysticalBackground";
import TarotReading from "@/components/TarotReading";
import About from "@/components/About";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden" style={{ cursor: 'none' }}>
      <CustomCursor />
      <Hero />
      
      {/* Sección con fondo místico */}
      <div className="relative">
        {/* Fondo místico comienza aquí */}
        <MysticalBackground />
        
        {/* Cartas centrales MÁS GRANDES con La Emperatriz interactiva */}
        <div className="relative z-10">
          <FloatingCardsDecor 
            variant="static" 
            size="xlarge"
            spacing="normal"
            showEmpress={true} 
          />
        </div>
        
        {/* El resto del contenido sobre el fondo místico */}
        <div className="relative z-10">
          <TarotReading />
          <About />
          <BookingForm />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
