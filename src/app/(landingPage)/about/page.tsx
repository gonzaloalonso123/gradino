import StaffImage from "../assets/staff.jpg";
export default function About() {
  return (
    <section id="about" className="flex flex-col-reverse lg:flex-row ">
      <div className="lg:w-1/2 h-[70vh] overflow-hidden lg:mb-0">
        <img
          src={StaffImage.src}
          alt="Vårt team"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:w-1/2 lg:pl-8 p-8 flex flex-col justify-between items-center lg:items-start">
        <h2 className="text-4xl font-bold mb-6">Om Oss</h2>
        <p className="text-xl text-gray-800 mb-6">
          På Benvenuti handlar allt om att ge våra gäster en unik och minnesvärd
          upplevelse. Vi kombinerar passion och expertis för att skapa rätter
          som inte bara mättar, utan också väcker sinnena. Vårt team är
          dedikerat till att ge varje gäst den bästa servicen, och vi strävar
          efter att göra varje måltid till en oförglömlig upplevelse.
        </p>
        <p className="text-xl text-gray-800 mb-6">
          Oavsett om du är här för en avslappnad middag med nära och kära eller
          firar en stor händelse, erbjuder vi en elegant och inbjudande atmosfär
          tillsammans med en meny som är noggrant utvald för att tillfredsställa
          varje smak. Vi tror på att skapa en plats där god mat, bra sällskap
          och exceptionell service går hand i hand.
        </p>
        <div className="">
          <a
            href="#contact"
            className="inline-block text-sm bg-primary text-black py-2 px-6 md:py-3 md:px-8 rounded-sm font-semibold transition duration-300 hover:bg-transparent border border-black"
          >
            Kontakta oss
          </a>
        </div>
      </div>
    </section>
  );
}
