import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import TarotReading from "@/components/TarotReading";
import About from "@/components/About";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden" style={{ cursor: 'none' }}>
      <CustomCursor />
      <Hero />
      <TarotReading />
      <About />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default Index;
