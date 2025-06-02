import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import PropTypes from "prop-types";
import "./App.css";
import maPhoto from "./PhotoSaber.jpg";
import robotImg from "./Images/Robot.jpg";
import centraleImg from "./Images/Nucleaire.jpg";
import educationImg from "./Images/education.jpg";
import domotiqueImg from "./Images/Domotique.jpg";
import novaImg from "./Images/Novaelectric.jpg";
import Arbitre from "./Images/Arbitre.jpg";


import "./i18n";
import { useTranslation } from "react-i18next";



// Constants
const SECTIONS = [
  { id: "hero", label: "Accueil" },
  { id: "about", label: "À propos" },
  { id: "projects", label: "Projets" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "Contact" }
];


const SKILLS = [
  {
    category: "Électrotechnique",
    items: ["Conception électrique", "Automatisme industriel", "?"]
  },
  {
    category: "Développement",
    items: ["Programmation C / C++", "Systèmes embarqués", "Développement Web (HTML/CSS)"]
  },
  {
    category: "Gestion",
    items: ["Gestion de projet", "Abitre de football FFF", "Documentation technique"]
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "Site Domotique HTML/CSS",
    description: "Développement d’un site Web pour contrôler les stores d’un logement intelligent avec une interface intuitive et des mises à jour en temps réel.",
    tags: ["Web", "Domotique", "HTML/CSS"],
    image: domotiqueImg
  },
  {
    id: 2,
    title: "Robot suiveur de ligne",
    description: "Conception d’un robot suiveur de ligne avec détection d’obstacles et régulation de vitesse selon l'inclinaison, programmation en C.",
    tags: ["Robotique", "Systèmes embarqués", "C"],
    image: robotImg
  },
  {
    id: 3,
    title: "Arbitre de football FFF",
    description: "Supervision, application des règles, gestion des conflits et analyse du jeu pour garantir le bon déroulement des rencontres jusqu’au niveau régional.",
    tags: ["Sport", "Responsabilité", "Rigueur"],
    image: Arbitre 
  },
  {
    id: 4,
    title: "Réparation électronique – Novelectrique",
    description: "Diagnostic de pannes et réparation de cartes électroniques d’ascenseurs avec tests de sécurité. Stage de technicien.",
    tags: ["Électronique", "Stage", "Réparation"],
    image: novaImg
  },
  {
    id: 5,
    title: "Supervision chantier – Centrale nucléaire",
    description: "Supervision du remplacement de transformateurs et production de documents électriques validés. Respect strict des normes de sécurité EDF.",
    tags: ["Nucléaire", "Documentation", "Gestion"],
    image: centraleImg
  },
  {
    id: 6,
    title: "Projet de micro-hydroélectricité à Bali",
    description: "Étude et mise en place artisanale d’un système de production électrique à partir d’un fleuve privé à Bali. Choix d’un alternateur adapté pour un micro-barrage, utilisation de matériaux simples comme des tuyaux en PVC. Objectif : alimenter l’éclairage nocturne d’un site isolé.",
    tags: ["Électrotechnique", "Énergies renouvelables", "Projet international"]
  }
];



const EDUCATION = [
  {
    id: 1,
    date: "2023 - 2026",
    institution: "ENSAM Aix-en-Provence",
    degree: "Apprentissage – Ingénieur en Électrotechnique",
    details: "Spécialisation en systèmes embarqués et automatisme industriel. Alternance chez Schneider Electric."
  },
  {
    id: 2,
    date: "2022 - 2023",
    institution: "Lycée du Rempart, Marseille",
    degree: "CPGE ATS",
    details: "Classe Préparatoire aux Grandes Écoles, Adaptation Technicien Supérieur. Option génie électrique."
  },
  {
    id: 3,
    date: "2020 - 2022",
    institution: "IUT Université Napoléon III, Nice",
    degree: "DUT GEII",
    details: "Diplôme Universitaire de Technologie en Génie Électrique et Informatique Industrielle. Projets en automatisme et robotique."
  },
  {
    id: 4,
    date: "2017 - 2020",
    institution: "Lycée René Goscinny, Nice",
    degree: "Baccalauréat STI2D",
    details: "Baccalauréat Sciences et Technologies de l'Industrie et du Développement Durable. Option SIN (Systèmes d'Information et Numérique). Mention Bien."
  }
];

const EXPERIENCE = [
  {
    id: 1,
    date: "2023 - Présent",
    company: "Schneider Electric",
    position: "Apprenti Ingénieur Électrotechnique",
    details: [
      "Conception de systèmes électriques pour bâtiments intelligents",
      "Développement de solutions d'automatisme industriel",
      "Participation à des projets R&D sur les réseaux électriques intelligents"
    ]
  },
  {
    id: 2,
    date: "2022 (3 mois)",
    company: "Novelectrique",
    position: "Stagiaire Technicien Électronique",
    details: [
      "Diagnostic et réparation de cartes électroniques pour ascenseurs",
      "Tests de sécurité et validation des systèmes",
      "Rédaction de rapports techniques"
    ]
  },
  {
    id: 3,
    date: "2021 (2 mois)",
    company: "EDF - Centrale Nucléaire de Tricastin",
    position: "Assistant Ingénieur",
    details: [
      "Suivi du remplacement des transformateurs de puissance",
      "Vérification des documents techniques",
      "Participation aux réunions de coordination"
    ]
  },
  {
    id: 4,
    date: "2023 (3 mois)",
    company: "Projet indépendant – Bali, Indonésie",
    position: "Stagiaire Ingénieur Électrotechnique",
    details: [
      "Étude et réalisation artisanale d’un micro-barrage pour produire de l’électricité à partir d’un fleuve privé",
      "Sélection d’un alternateur adapté à l’environnement local et optimisation du rendement énergétique",
      "Mise en place d’un système d’éclairage autonome avec matériaux simples (tuyaux en PVC, turbine, batteries)",
      "Conception d’un site web de présentation du projet"
    ]
  }
];


// Memoized components
const NavItem = memo(({ section, activeSection, scrollToSection }) => (
  <li
    onClick={() => scrollToSection(section.id)}
    className={activeSection === section.id ? "active" : ""}
    aria-current={activeSection === section.id ? "page" : undefined}
  >
    {section.label}
  </li>
));

const ProjectCard = memo(({ project }) => (
  <div className="project-card">
    {project.image && (
      <img src={project.image} alt={project.title} className="project-image" />
    )}
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <div className="project-tags">
      {project.tags.map((tag, i) => (
        <span key={i}>{tag}</span>
      ))}
    </div>
  </div>
));


const EducationItem = memo(({ item }) => (
  <div className="cv-item">
    <div className="cv-date">{item.date}</div>
    <h3>{item.institution}</h3>
    <p className="degree">{item.degree}</p>
    {item.details && <p className="details">{item.details}</p>}
  </div>
));

const ExperienceItem = memo(({ experience }) => (
  <div className="cv-item experience">
    <div className="cv-date">{experience.date}</div>
    <h3>{experience.company}</h3>
    <p className="position">{experience.position}</p>
    <ul className="details">
      {experience.details.map((detail, i) => (
        <li key={i}>{detail}</li>
      ))}
    </ul>
  </div>
));

// PropTypes
NavItem.propTypes = {
  section: PropTypes.object.isRequired,
  activeSection: PropTypes.string.isRequired,
  scrollToSection: PropTypes.func.isRequired
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
};

EducationItem.propTypes = {
  item: PropTypes.object.isRequired
};

ExperienceItem.propTypes = {
  experience: PropTypes.object.isRequired
};

// Custom hooks
const useScrollVisibility = (setShowTopBtn) => {
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setShowTopBtn]);
};

const useIntersectionObserver = (setActiveSection) => {
  const sectionsRef = useRef([]);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -50px 0px" }
    );

    observerRef.current = observer;
    const currentSections = sectionsRef.current;

    currentSections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      currentSections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [setActiveSection]);

  return useCallback((el, index) => {
    sectionsRef.current[index] = el;
  }, []);
};

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  return { formData, handleInputChange, resetForm };
};

// Main App component
const App = () => {
  const { t, i18n } = useTranslation(); // ← pour la traduction

  const [activeSection, setActiveSection] = useState("hero");
  const [showTopBtn, setShowTopBtn] = useState(false);
  const setSectionRef = useIntersectionObserver(setActiveSection);
  const { formData, handleInputChange, resetForm } = useForm({ 
    name: "", 
    email: "", 
    message: "" 
  });

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };


  useScrollVisibility(setShowTopBtn);

 const scrollToSection = useCallback((id) => {
  const el = document.getElementById(id);
  if (el) {
    // 100px correspond à la hauteur de votre navbar + un peu de marge
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(`Merci pour votre message, ${formData.name} ! Je vous répondrai dès que possible.`);
    resetForm();
  }, [formData, resetForm]);

  return (
    <div className="App">
      <nav className="navbar">
        <ul>
          {SECTIONS.map((section) => (
  <NavItem 
    key={section.id}
    section={{ ...section, label: t(`nav.${section.id}`) }}
    activeSection={activeSection}
    scrollToSection={scrollToSection}
  />
))}

        </ul>
        <div className="language-switcher">
  <button 
    className={`lang-btn ${i18n.language === "fr" ? "active" : ""}`} 
    onClick={() => changeLanguage("fr")}
    aria-label="Français"
  >
    FR
  </button>
  <button 
    className={`lang-btn ${i18n.language === "en" ? "active" : ""}`} 
    onClick={() => changeLanguage("en")}
    aria-label="English"
  >
    EN
  </button>
</div>




      </nav>

{/* Section Hero améliorée */}
<section 
  id="hero" 
  className="hero section" 
  ref={(el) => setSectionRef(el, 0)}
  aria-labelledby="hero-heading"
>
  <div className="hero-content">
    <div className="hero-text">
      <h1 id="hero-heading">{t("hero.title")}</h1>
      <h2>{t("hero.subtitle")}</h2>
      <div className="hero-buttons">
        <button 
          className="cta-button" 
          onClick={() => scrollToSection("contact")}
          aria-label={t("hero.contactBtn")}
        >
          {t("hero.contactBtn")}
        </button>
        <button 
          className="cta-button secondary" 
          onClick={() => scrollToSection("projects")}
          aria-label={t("hero.projectsBtn")}
        >
          {t("hero.projectsBtn")}
        </button>
      </div>
    </div>
    <div className="hero-image">
      <img 
        src={maPhoto} 
        alt="Saber Bajjou" 
        loading="eager" 
        width="400"
        height="500"
        decoding="async"
      />
    </div>
  </div>
</section>


      {/* Section À propos */}
      <section 
  id="about" 
  className="section about-section" 
  ref={(el) => setSectionRef(el, 1)}
  aria-labelledby="about-heading"
>
  <div className="section-container about-layout">
    <div className="about-text-block">
      <h2 id="about-heading">À propos de moi</h2>
      <p>
        🎓 Étudiant en ingénierie <strong>électrotechnique</strong> à l'<strong>ENSAM Aix-en-Provence</strong>, je me spécialise en <em>systèmes embarqués</em> et <em>automatisme industriel</em>.
      </p>
      <p>
        🚀 Passionné par l'innovation technologique, je combine rigueur, curiosité et créativité pour relever des défis complexes.
      </p>
      <p>
        📅 <strong>Disponible pour un stage de 3 mois à partir de mai 2025</strong>
      </p>

      <div className="skills-container">
        <h3>🛠️ Compétences techniques</h3>
        <div className="skills-grid">
          {SKILLS.map((skillCategory, index) => (
            <div className="skill-category" key={index}>
              <h4>{skillCategory.category}</h4>
              <ul className="skills-list">
                {skillCategory.items.map((skill, i) => (
                  <li key={i}>✔️ {skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Section Projets */}
      <section 
        id="projects" 
        className="section projects-section" 
        ref={(el) => setSectionRef(el, 2)}
        aria-labelledby="projects-heading"
      >
        <div className="section-container">
          <h2 id="projects-heading">Mes Projets</h2>
          <div className="projects-grid">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Section CV */}
     <section 
  id="cv" 
  className="section cv-section" 
  ref={(el) => setSectionRef(el, 3)}
  aria-labelledby="cv-heading"
>
  <div className="section-container cv-container">

    <div className="cv-image">
      <img src={educationImg} alt="Illustration éducation" />
    </div>

    <div className="cv-content">
      <h2 id="cv-heading">Mon Parcours</h2>

      <div className="cv-section-group">
        <h3>Formation</h3>
        <div className="cv-timeline">
          {EDUCATION.map((item) => (
            <EducationItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="cv-section-group">
        <h3>Expérience Professionnelle</h3>
        <div className="cv-timeline">
          {EXPERIENCE.map((experience) => (
            <ExperienceItem key={experience.id} experience={experience} />
          ))}
        </div>
      </div>

      <a 
        href="/CV_Saber_Bajjou.pdf" 
        download 
        className="cv-download-button"
        aria-label="Télécharger mon CV"
      >
        Télécharger mon CV complet
      </a>
    </div> {/* ← FIN cv-content */}

  </div> {/* ← FIN cv-container */}
</section>


      {/* Section Contact */}
      <section 
        id="contact" 
        className="section contact-section" 
        ref={(el) => setSectionRef(el, 4)}
        aria-labelledby="contact-heading"
      >
        <div className="section-container">
          <h2 id="contact-heading">Contactez-moi</h2>
          <div className="contact-content">
            <div className="contact-info">
              <p>Disponible pour des opportunités passionnantes en électrotechnique et systèmes embarqués.</p>
              <div className="contact-methods">
                <p><span role="img" aria-label="Email">✉️</span> bajjou622</p>
                <p><span role="img" aria-label="Localisation">📍</span> Nice, France</p>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Votre nom" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Votre email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message"
                  placeholder="Votre message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleInputChange}
                  required 
                  aria-required="true"
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Envoyer le message</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Saber Bajjou. Tous droits réservés.</p>
      </footer>

      {showTopBtn && (
        <button 
          className="top-button" 
          onClick={scrollToTop} 
          aria-label="Retour en haut"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default App;