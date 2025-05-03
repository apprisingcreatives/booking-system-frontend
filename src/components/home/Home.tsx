import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";

type Props = {
  servicesRef: React.RefObject<HTMLElement | null>;
  aboutUsRef: React.RefObject<HTMLElement | null>;
};

const Home = ({ servicesRef, aboutUsRef }: Props) => {
  return (
    <main className="scroll-smooth text-gray-900 md:-mt-16">
      <AboutSection aboutUsRef={aboutUsRef} />
      <ServicesSection servicesRef={servicesRef} />
    </main>
  );
};

export default Home;
