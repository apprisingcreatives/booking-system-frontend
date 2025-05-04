import { dashboardSubtitle } from "./constants";

type Props = {
  aboutUsRef: React.RefObject<HTMLElement | null>;
};

const AboutSection = ({ aboutUsRef }: Props) => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center bg-gray-50 px-8 py-16"
      ref={aboutUsRef}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to <span className="text-blue-600">SmileCare Dental</span>
        </h1>
        {dashboardSubtitle.split("\n").map((line, index) => (
          <p
            key={index}
            className="mb-4 text-gray-700 leading-relaxed  text-base md:text-lg"
          >
            {line.trim()}
          </p>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
