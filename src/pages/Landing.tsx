import { AnimatePresence, motion, MotionConfig, useScroll } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Braces,
  CheckCircle2,
  Download,
  Github,
  Heart,
  Hexagon,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Radio,
  Server,
  Sparkles,
  Sun,
  Terminal,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* ---------------------------------- i18n ---------------------------------- */

type Lang = "en" | "id";
type Localized = string | { en: string; id: string };

const resolve = (v: Localized, lang: Lang): string =>
  typeof v === "string" ? v : v[lang];

const EN_STRINGS = {
  "nav.work": "Work",
  "nav.about": "About",
  "nav.experience": "Experience",
  "nav.skills": "Skills",
  "nav.contact": "Contact",
  "nav.hire": "Hire me",
  "hero.badge": "Available for new projects",
  "hero.lede":
    "I'm Hafizh — an Information Technology graduate with hands-on experience in troubleshooting, installing, and configuring systems: across IoT projects, application development, and field operations.",
  "hero.cta1": "View my work",
  "hero.cta2": "Get in touch",
  "hero.stat1": "Years experience",
  "hero.stat2": "Projects built",
  "hero.stat3": "Roles held",
  "hero.status": "Open to work",
  "marquee.title": "Technologies I work with every day",
  "proj.eyebrow": "Selected work",
  "proj.title": "Projects I'm proud of",
  "proj.desc":
    "Projects I've worked on — from procurement websites and radiation monitoring systems to mobile apps.",
  "proj.live": "Live demo",
  "proj.source": "Source",
  "proj.more": "View more on GitHub",
  "about.eyebrow": "About",
  "about.title": "Two sides that complete each other.",
  "about.p1":
    "I started my career hands-on in the field, handling hardware, networking, and user support across projects ranging from IoT to construction. That's where I learned to document work in a structured way and coordinate across teams to resolve technical issues.",
  "about.p2":
    "On the other side, I also build software: from local-government administration systems with Laravel, internal dashboards with Symfony, to Android mobile apps. This combination makes me comfortable in roles that need fast troubleshooting as well as deeper technical understanding.",
  "about.edu": "Education",
  "about.edu1": "Associate's Degree in Information Technology — Politeknik Negeri Madiun",
  "about.edu2": "2021–2024 · GPA 3.67/4.00 · MSIB Batch 6",
  "about.resume": "Résumé",
  "about.location": "East Java, Indonesia",
  "exp.eyebrow": "Career",
  "exp.title": "Where I've worked",
  "exp.desc":
    "A track record of shipping meaningful products and raising the bar for the teams around me.",
  "skills.eyebrow": "Toolbox",
  "skills.title": "A stack that ships",
  "skills.desc":
    "Deep, working knowledge across the whole delivery path — not just résumé keywords.",
  "contact.badge": "Get in touch",
  "contact.title":
    "Open to IT Support/Helpdesk roles as well as software project collaboration.",
  "contact.desc":
    "Tell me what you need — from device, network, and system troubleshooting to building applications. I'm happy to help.",
  "contact.resume": "Download résumé",
  "footer.tag":
    "Software engineer crafting fast, reliable, and beautiful digital products from East Java, Indonesia.",
  "footer.navigate": "Navigate",
  "footer.connect": "Connect",
  "footer.colophon": "Colophon",
  "footer.rights": "All rights reserved.",
  "footer.love": "Designed & built with",
  "footer.in": "in East Java, Indonesia",
} as const;

const ID_STRINGS: Record<keyof typeof EN_STRINGS, string> = {
  "nav.work": "Karya",
  "nav.about": "Tentang",
  "nav.experience": "Pengalaman",
  "nav.skills": "Skill",
  "nav.contact": "Kontak",
  "nav.hire": "Hubungi Saya",
  "hero.badge": "Terbuka untuk peluang baru",
  "hero.lede":
    "Lulusan D3 Teknologi Informasi dengan pengalaman langsung menangani troubleshooting, instalasi, dan konfigurasi sistem: dari proyek IoT, pengembangan aplikasi, sampai operasional lapangan.",
  "hero.cta1": "Lihat karyaku",
  "hero.cta2": "Hubungi saya",
  "hero.stat1": "Tahun pengalaman",
  "hero.stat2": "Proyek dikerjakan",
  "hero.stat3": "Peran profesional",
  "hero.status": "Terbuka untuk kerja",
  "marquee.title": "Teknologi yang saya pakai setiap hari",
  "proj.eyebrow": "Karya pilihan",
  "proj.title": "Proyek pilihan",
  "proj.desc":
    "Proyek yang pernah dikerjakan — dari web procurement, sistem monitoring radiasi, sampai aplikasi mobile.",
  "proj.live": "Demo langsung",
  "proj.source": "Sumber",
  "proj.more": "Lihat lainnya di GitHub",
  "about.eyebrow": "Tentang",
  "about.title": "Dua sisi yang saling melengkapi.",
  "about.p1":
    "Saya memulai karier dengan tangan langsung di lapangan, menangani hardware, jaringan, dan dukungan pengguna di berbagai proyek — mulai dari IoT hingga konstruksi. Dari situ saya terbiasa mendokumentasikan pekerjaan secara terstruktur dan berkoordinasi lintas tim untuk menyelesaikan masalah teknis.",
  "about.p2":
    "Di sisi lain, saya juga membangun software: dari sistem administrasi pemerintah daerah dengan Laravel, dashboard internal dengan Symfony, sampai aplikasi mobile Android. Kombinasi ini membuat saya nyaman berada di posisi yang butuh troubleshooting cepat sekaligus pemahaman teknis yang lebih dalam.",
  "about.edu": "Pendidikan",
  "about.edu1": "D3 Teknologi Informasi — Politeknik Negeri Madiun",
  "about.edu2": "2021–2024 · IPK 3.67/4.00 · MSIB Batch 6",
  "about.resume": "Resume",
  "about.location": "Jawa Timur, Indonesia",
  "exp.eyebrow": "Karier",
  "exp.title": "Riwayat kerja",
  "exp.desc":
    "Urut dari yang terbaru: kombinasi peran operasional/IT support dan pengembangan software.",
  "skills.eyebrow": "Perangkat",
  "skills.title": "Kemampuan",
  "skills.desc":
    "Pengetahuan kerja yang mendalam di seluruh jalur pengiriman — bukan sekadar kata kunci di resume.",
  "contact.badge": "Hubungi Saya",
  "contact.title":
    "Terbuka untuk peran IT Support/Helpdesk maupun kolaborasi proyek software.",
  "contact.desc":
    "Ceritakan kebutuhanmu — dari troubleshooting perangkat, jaringan, dan sistem, sampai membangun aplikasi. Saya siap membantu.",
  "contact.resume": "Unduh resume",
  "footer.tag":
    "Software engineer yang membuat produk digital cepat, andal, dan indah dari Jawa Timur, Indonesia.",
  "footer.navigate": "Navigasi",
  "footer.connect": "Kontak",
  "footer.colophon": "Kolofon",
  "footer.rights": "Hak cipta dilindungi.",
  "footer.love": "Dirancang & dibangun dengan",
  "footer.in": "di Jawa Timur, Indonesia",
};

const STRINGS = { en: EN_STRINGS, id: ID_STRINGS };
type I18nKey = keyof typeof EN_STRINGS;

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: I18nKey) => string;
  pick: (v: Localized) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (key) => STRINGS.en[key],
  pick: (v) => resolve(v, "en"),
});

function useI18n() {
  return useContext(I18nContext);
}

/* ---------------------------------- data ---------------------------------- */

const NAV_LINKS = [
  { label: { en: "Work", id: "Karya" }, href: "#work" },
  { label: { en: "About", id: "Tentang" }, href: "#about" },
  { label: { en: "Experience", id: "Pengalaman" }, href: "#experience" },
  { label: { en: "Skills", id: "Skill" }, href: "#skills" },
  { label: { en: "Contact", id: "Kontak" }, href: "#contact" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/hafizhsul", label: "GitHub" },
  { icon: MessageCircle, href: "https://wa.me/6282235769474", label: "WhatsApp" },
  { icon: Linkedin, href: "https://linkedin.com/in/hafizhsulthan", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hafizhbachtiyar123@gmail.com", label: "Email" },
];

const TECH = [
  "PHP",
  "Laravel",
  "Symfony",
  "Kotlin",
  "Flutter",
  "JavaScript",
  "C++",
  "Android",
  "MySQL",
  "IoT",
  "Advantech",
  "Git",
];

const FILTERS = ["All", "Full-stack", "Frontend", "Backend", "Mobile", "Open source"] as const;
type Filter = (typeof FILTERS)[number];

interface Project {
  id: string;
  title: string;
  category: Exclude<Filter, "All">;
  year: string;
  description: Localized;
  tags: string[];
  url: string;
  icon: LucideIcon;
  chip: string;
  gradient: string;
  image?: string;
  links: { live?: string; source: string };
}

const PROJECTS: Project[] = [
  {
    id: "inka-eprocurement",
    title: "INKA — e-Procurement",
    category: "Full-stack",
    year: "2023",
    description: {
      en: "Online procurement website handling 50+ vendor accounts including user access resolution.",
      id: "Website procurement online, menangani 50+ akun vendor termasuk resolusi akses pengguna.",
    },
    tags: ["Laravel", "Symfony", "e-Procurement"],
    url: "inka-eprocurement",
    icon: Server,
    chip: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    gradient: "from-sky-500/15 via-sky-500/5 to-transparent",
    image: "/inka/Screenshot_20260803_110422.png",
    links: { source: "https://github.com/hafizhsul" },
  },
  {
    id: "monitorrad",
    title: "MonitorRad",
    category: "Full-stack",
    year: "2024",
    description: {
      en: "B3 radiation monitoring website with Telegram bot early warning system.",
      id: "Website monitoring radiasi B3 dengan sistem early warning via Telegram bot.",
    },
    tags: ["Laravel", "Telegram Bot", "IoT"],
    url: "github.com/hafizhsul/MonitorRad",
    icon: Radio,
    chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    image: "/radmonitor/preview.png",
    links: { source: "https://github.com/hafizhsul/MonitorRad" },
  },
  {
    id: "stuntzilla",
    title: "StuntZilla",
    category: "Mobile",
    year: "2024",
    description: {
      en: "Mobile app for stunting symptom detection.",
      id: "Aplikasi mobile untuk deteksi gejala stunting.",
    },
    tags: ["Kotlin", "Android"],
    url: "stuntzilla",
    icon: Heart,
    chip: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    gradient: "from-indigo-500/15 via-indigo-500/5 to-transparent",
    image: "/stuntzilla/preview.png",
    links: { source: "https://github.com/hafizhsul" },
  },
  {
    id: "intervalfit",
    title: "IntervalFit",
    category: "Mobile",
    year: "2025",
    description: {
      en: "Quick-setup interval timer with auto voice countdown for hands-free workouts.",
      id: "Interval timer cepat setup, mudah dibaca saat olahraga, dengan voice countdown otomatis.",
    },
    tags: ["Flutter", "Dart"],
    url: "intervalfit",
    icon: Activity,
    chip: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    gradient: "from-rose-500/15 via-rose-500/5 to-transparent",
    image: "/intervalfit/preview.png",
    links: { source: "https://github.com/hafizhsul" },
  },
];

const EXPERIENCE = [
  {
    period: { en: "Dec 2024 – Jul 2025", id: "Des 2024 – Jul 2025" },
    role: { en: "Logistics Staff", id: "Staf Logistik" },
    company: "CV Pramita Adhipramana",
    location: { en: "Berau, East Kalimantan", id: "Berau, Kalimantan Timur" },
    points: [
      {
        en: "Handled procurement, recording, and distribution of materials for two PT. Marina Bara Lestari construction projects in Segah District, Berau Regency.",
        id: "Mengelola pengadaan, pencatatan, dan distribusi material untuk dua proyek konstruksi PT. Marina Bara Lestari di Kecamatan Segah, Kabupaten Berau.",
      },
      {
        en: "Conducted regular monitoring of equipment/material availability and condition to support smooth project operations.",
        id: "Monitoring rutin ketersediaan dan kondisi peralatan/material untuk kelancaran operasional proyek.",
      },
      {
        en: "Coordinated with field teams and management to ensure timely logistics documentation and reporting.",
        id: "Koordinasi dengan tim lapangan dan manajemen untuk dokumentasi serta pelaporan logistik tepat waktu.",
      },
      {
        en: "Provided basic IT support on-site, including troubleshooting field office computers/printers and daily network issues.",
        id: "Memberikan dukungan IT dasar on-site, termasuk troubleshooting komputer/printer kantor lapangan dan isu jaringan harian.",
      },
    ],
    tags: [
      { en: "Logistics", id: "Logistik" },
      "IT Support",
      { en: "Team Coordination", id: "Koordinasi Tim" },
    ],
  },
  {
    period: { en: "May – Sep 2024", id: "Mei – Sep 2024" },
    role: "Software Developer Team",
    company: "Eforel InnoWorks",
    location: "Remote",
    points: [
      {
        en: "Integrated hardware and software systems for an IoT project, including building a monitoring dashboard using Advantech tools.",
        id: "Mengintegrasikan sistem hardware & software untuk proyek IoT, termasuk membangun dashboard monitoring dengan tools Advantech.",
      },
      {
        en: "Performed troubleshooting and device configuration to develop IoT-based solutions and optimize the monitoring system.",
        id: "Troubleshooting dan konfigurasi perangkat untuk mengembangkan solusi berbasis IoT dan optimasi sistem monitoring.",
      },
    ],
    tags: ["IoT", "Advantech", "Dashboard"],
  },
  {
    period: "Feb – Jul 2024",
    role: "Mobile Development Cohort",
    company: "Bangkit Academy",
    location: "Remote",
    points: [
      {
        en: "Completed an intensive bootcamp focused on enhancing Android development skills.",
        id: "Menyelesaikan bootcamp intensif untuk memperdalam skill pengembangan Android.",
      },
      {
        en: "Worked in a team to build StuntZilla, a mobile app for detecting stunting symptoms.",
        id: "Bekerja dalam tim membangun StuntZilla, aplikasi mobile untuk deteksi gejala stunting.",
      },
    ],
    tags: ["Android", "Kotlin", "Mobile"],
  },
  {
    period: "Jun 2023 – Jan 2024",
    role: "Freelance Fullstack Developer",
    company: "Remote",
    location: { en: "East Java, Indonesia", id: "Jawa Timur, Indonesia" },
    points: [
      {
        en: "Developed the Simag website for Kominfo Ngawi using Laravel to manage administrative tasks.",
        id: "Mengembangkan website Simag untuk Kominfo Ngawi menggunakan Laravel untuk manajemen tugas administratif.",
      },
      {
        en: "Built an e-Ticketing system for Kominfo Ngawi using Laravel to manage events and user data.",
        id: "Membangun sistem e-Ticketing untuk Kominfo Ngawi menggunakan Laravel untuk manajemen event dan data pengguna.",
      },
    ],
    tags: ["Laravel", "PHP", "Web"],
  },
  {
    period: "Jun – Nov 2023",
    role: "Software Engineer Intern",
    company: "PT Industri Kereta Api (Persero)",
    location: { en: "Madiun, East Java", id: "Madiun, Jawa Timur" },
    points: [
      {
        en: "Developed the INKA-CSIRT website dashboard for article management using Laravel.",
        id: "Mengembangkan dashboard website INKA-CSIRT untuk manajemen artikel menggunakan Laravel.",
      },
      {
        en: "Enhanced and maintained features on the INKA e-Procurement website using Symfony, handling 50+ vendor accounts including resolving user access issues.",
        id: "Enhance & maintain fitur website e-Procurement INKA dengan Symfony, menangani 50+ akun vendor termasuk resolusi isu akses pengguna.",
      },
      {
        en: "Collaborated with the IT team on feature development to reach target users.",
        id: "Berkolaborasi dengan tim IT untuk pengembangan fitur guna mencapai target pengguna.",
      },
    ],
    tags: ["Laravel", "Symfony", "e-Procurement"],
  },
];

const SKILL_GROUPS = [
  {
    title: "Technical Support",
    icon: Wrench,
    blurb: {
      en: "Hands-on support from hardware and networks to users.",
      id: "Dukungan langsung dari hardware, jaringan, sampai pengguna.",
    },
    tags: [
      { en: "Hardware & software troubleshooting", id: "Troubleshooting hardware & software" },
      { en: "Application installation", id: "Instalasi aplikasi" },
      { en: "System configuration", id: "Konfigurasi sistem" },
      "Remote support",
      { en: "Basic computer networking", id: "Jaringan komputer dasar" },
    ],
  },
  {
    title: { en: "Programming Languages", id: "Bahasa Pemrograman" },
    icon: Braces,
    blurb: {
      en: "Languages used to build applications.",
      id: "Bahasa yang dipakai untuk membangun aplikasi.",
    },
    tags: ["PHP", "Kotlin", "JavaScript", "C++"],
  },
  {
    title: { en: "Tools & Systems", id: "Tools & Sistem" },
    icon: Server,
    blurb: {
      en: "Frameworks and tools used across projects.",
      id: "Framework dan alat yang dipakai di proyek.",
    },
    tags: ["Laravel", "Symfony", "Advantech Monitoring", "Android", "Flutter"],
  },
  {
    title: "Soft Skills",
    icon: Heart,
    blurb: {
      en: "How I work and communicate in teams.",
      id: "Cara bekerja dan berkomunikasi dalam tim.",
    },
    tags: [
      { en: "Team collaboration", id: "Kolaborasi tim" },
      { en: "User communication", id: "Komunikasi pengguna" },
      { en: "Critical thinking", id: "Berpikir kritis" },
      { en: "Time management", id: "Manajemen waktu" },
      "Problem solving",
    ],
  },
];

const FACTS = [
  {
    icon: MapPin,
    label: { en: "Location", id: "Lokasi" },
    value: { en: "East Java, Indonesia", id: "Jawa Timur, Indonesia" },
  },
  { icon: Mail, label: "Email", value: "hafizhbachtiyar123@gmail.com" },
  { icon: Braces, label: { en: "Focus", id: "Fokus" }, value: "IT Support & Software Dev" },
  {
    icon: Sparkles,
    label: { en: "Education", id: "Pendidikan" },
    value: { en: "Associate's Degree in IT", id: "D3 Teknologi Informasi" },
  },
];

const VALUES = [
  {
    en: "Hands-on field experience: hardware, networking, user support",
    id: "Pengalaman langsung di lapangan: hardware, jaringan, dukungan pengguna",
  },
  {
    en: "Building software: Laravel, Symfony, to Android apps",
    id: "Membangun software: Laravel, Symfony, sampai aplikasi Android",
  },
  {
    en: "Structured documentation & cross-team coordination",
    id: "Dokumentasi terstruktur & koordinasi lintas tim",
  },
  {
    en: "Fast troubleshooting + deeper technical understanding",
    id: "Troubleshooting cepat + pemahaman teknis yang lebih dalam",
  },
];

/* ------------------------------- tiny helpers ------------------------------ */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        <span className="h-px w-6 bg-primary/40" />
        {eyebrow}
        <span className="h-px w-6 bg-primary/40" />
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </Reveal>
  );
}

/* ---------------------------------- theme ---------------------------------- */

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }, [theme]);

  return {
    theme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="grid size-9 place-items-center rounded-md border bg-card text-muted-foreground transition-colors hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid place-items-center"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/* ------------------------------ parallax bg ------------------------------- */

function ParallaxBackground() {
  useEffect(() => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax-speed]"),
    );
    if (reduceMotion || items.length === 0) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const scrolled = window.scrollY;
      items.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax-speed") ?? "0");
        el.style.transform = el.classList.contains("watermark")
          ? `rotate(-15deg) translateY(${scrolled * speed}px)`
          : `translateY(${scrolled * speed}px)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="parallax-container" aria-hidden="true">
      <div className="px-item watermark" data-parallax-speed="0.15">
        01001000 01010011 01000010 &gt;_ INIT SYSTEM... OK. LOADING MODULES...
        DONE. AWAITING INPUT... 01010011
      </div>
      <span
        className="px-item glyph"
        data-parallax-speed="-0.12"
        style={{ top: "25%", left: "8%" }}
      >
        &gt;_
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="0.25"
        style={{ top: "45%", left: "88%" }}
      >
        {"{}"}
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="-0.18"
        style={{ top: "70%", left: "12%" }}
      >
        {"/>"}
      </span>
      <span
        className="px-item glyph"
        data-parallax-speed="0.1"
        style={{ top: "85%", left: "82%" }}
      >
        {"()"}
      </span>
    </div>
  );
}

/* ---------------------------------- navbar --------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("work");
  const { scrollYProgress } = useScroll();
  const { lang, setLang, t, pick } = useI18n();

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const pos = window.scrollY + 140;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      }
      setActive(current || ids[0]);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-transform group-hover:-rotate-3">
            HSB
          </span>
          <span className="hidden sm:block">Hafizh Sulthan Bachtiyar</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                active === link.href.slice(1)
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {pick(link.label)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Language"
            className="flex items-center gap-0.5 rounded-md border bg-card p-0.5"
          >
            {(["en", "id"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  "rounded px-2 py-1 text-xs font-semibold uppercase transition-colors",
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contact">{t("nav.hire")}</a>
          </Button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-md border bg-card text-foreground md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-primary/60"
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                >
                  {pick(link.label)}
                </a>
              ))}
              <Separator className="my-2" />
              <div className="flex items-center gap-2">
                <Button asChild size="sm" className="flex-1">
                  <a href="#contact" onClick={() => setMenuOpen(false)}>
                    {t("nav.hire")}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ----------------------------------- hero ---------------------------------- */

function TechChip({
  icon: Icon,
  label,
  detail,
  iconClass,
  className,
}: {
  icon: LucideIcon;
  label: string;
  detail: string;
  iconClass: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute z-20 flex items-center gap-2.5 rounded-xl border bg-card/90 px-3 py-2 shadow-lg shadow-primary/10 backdrop-blur",
        className,
      )}
    >
      <span className={cn("grid size-8 place-items-center rounded-lg", iconClass)}>
        <Icon className="size-4" />
      </span>
      <span className="text-left">
        <span className="block text-xs font-semibold leading-none">{label}</span>
        <span className="mt-1 block text-[10px] text-muted-foreground">{detail}</span>
      </span>
    </div>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pb-24">
      {/* background grid + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black_25%,transparent_100%)]" />
      <div className="pointer-events-none absolute -top-44 left-1/2 -z-10 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge
            variant="secondary"
            className="mb-6 gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {t("hero.badge")}
          </Badge>

          <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.1rem]">
            Software engineer crafting{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="text-primary">digital products</span>
              <svg
                className="absolute -bottom-2 left-0 h-2.5 w-full text-primary"
                viewBox="0 0 220 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M3 9C60 3 160 3 217 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            </span>{" "}
            people love to use.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("hero.lede")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#work">
                {t("hero.cta1")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">
                {t("hero.cta2")}
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-1.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-md text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
              >
                <s.icon className="size-[18px]" />
              </a>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-6 sm:gap-8">
            {[
              { value: "3+", label: t("hero.stat1") },
              { value: "4+", label: t("hero.stat2") },
              { value: "5+", label: t("hero.stat3") },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6 sm:gap-8">
                {i > 0 && <Separator orientation="vertical" className="h-10" />}
                <div>
                  <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md pb-10 lg:max-w-none"
        >
          {/* code card */}
          <div className="relative overflow-hidden rounded-2xl border bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur">
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
              <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <Terminal className="size-3.5" />
                developer.ts
              </span>
            </div>
            <div className="p-5 font-mono text-[13px] leading-7 sm:p-6">
              <p>
                <span className="text-muted-foreground">// hello, world 👋</span>
              </p>
              <p>
                <span className="text-violet-500 dark:text-violet-400">const</span>{" "}
                <span className="text-sky-600 dark:text-sky-400">developer</span>{" "}
                <span className="text-foreground/70">=</span>{" "}
                <span className="text-foreground/70">{"{"}</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-600 dark:text-sky-400">name</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  "Hafizh Sulthan Bachtiyar"
                </span>
                <span className="text-foreground/70">,</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-600 dark:text-sky-400">role</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  "IT Support & Software Developer"
                </span>
                <span className="text-foreground/70">,</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-600 dark:text-sky-400">location</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  "Jawa Timur, Indonesia"
                </span>
                <span className="text-foreground/70">,</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-600 dark:text-sky-400">stack</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-foreground/70">[</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  "PHP"
                </span>
                <span className="text-foreground/70">,</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">"Laravel"</span>
                <span className="text-foreground/70">,</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">"Kotlin"</span>
                <span className="text-foreground/70">]</span>
                <span className="text-foreground/70">,</span>
              </p>
              <p className="pl-4">
                <span className="text-sky-600 dark:text-sky-400">openToWork</span>
                <span className="text-foreground/70">:</span>{" "}
                <span className="text-amber-600 dark:text-amber-400">true</span>
                <span className="text-foreground/70">,</span>
              </p>
              <p>
                <span className="text-foreground/70">{"};"}</span>
              </p>
              <p className="mt-1">
                <span className="text-violet-500 dark:text-violet-400">await</span>{" "}
                <span className="text-sky-600 dark:text-sky-400">developer</span>
                <span className="text-foreground/70">.</span>
                <span className="text-sky-600 dark:text-sky-400">ship</span>
                <span className="text-foreground/70">(</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  "nextProduct"
                </span>
                <span className="text-foreground/70">)</span>
                <span className="text-foreground/70">;</span>
                <span className="animate-caret ml-1 inline-block h-4 w-[7px] translate-y-[3px] bg-primary" />
              </p>
            </div>
          </div>

          <TechChip
            icon={Braces}
            label="PHP"
            detail="Backend"
            iconClass="bg-sky-500/15 text-sky-600 dark:text-sky-400"
            className="-right-3 -top-5 animate-float sm:-right-6"
          />
          <TechChip
            icon={Atom}
            label="Laravel"
            detail="Framework"
            iconClass="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
            className="-left-3 top-1/3 hidden animate-float-delay sm:flex lg:-left-8"
          />
          <TechChip
            icon={Hexagon}
            label="Kotlin"
            detail="Android"
            iconClass="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
            className="-bottom-4 right-12 hidden animate-float-delay md:flex"
          />

          {/* overlapping profile card */}
          <div className="absolute -bottom-1 left-2 flex items-center gap-3 rounded-2xl border bg-card p-3.5 shadow-xl shadow-primary/10 sm:-left-4">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-sm font-bold text-primary-foreground">
              HSB
            </span>
            <span>
              <span className="block text-sm font-semibold leading-none">Hafizh Sulthan Bachtiyar</span>
              <span className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {t("hero.status")}
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------- marquee --------------------------------- */

function Marquee() {
  const { t } = useI18n();
  return (
    <section className="border-y bg-muted/40 py-10">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {t("marquee.title")}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((half) => (
            <div
              key={half}
              aria-hidden={half === 1}
              className="flex shrink-0 items-center gap-12 pr-12"
            >
              {TECH.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-12 text-sm font-medium text-foreground/60"
                >
                  <span className="whitespace-nowrap">{t}</span>
                  <span className="size-1.5 rounded-full bg-primary/30" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- projects -------------------------------- */

function ProjectPreview({
  icon: Icon,
  gradient,
  image,
}: {
  icon: LucideIcon;
  gradient: string;
  image?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br",
        gradient,
      )}
    >
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}
      {/* subtle dark gradient so the image stays legible and the badge pops */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 text-foreground opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:18px_18px]" />
      <motion.div
        whileHover={{ scale: 1.1, rotate: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 grid size-16 place-items-center rounded-2xl border border-background/50 bg-background/90 shadow-xl shadow-black/25 backdrop-blur"
      >
        <Icon className="size-7" />
      </motion.div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t, pick } = useI18n();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="border-b border-border/70">
        <div className="flex items-center gap-1.5 bg-muted/40 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="ml-2 truncate rounded-md border bg-card px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            {project.url}
          </span>
        </div>
        <ProjectPreview
          icon={project.icon}
          gradient={project.gradient}
          image={project.image}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className={cn("rounded-full border", project.chip)}>
            {project.category}
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {pick(project.description)}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-4 border-t pt-4">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
            >
              {t("proj.live")}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          <a
            href={project.links.source}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-4" />
            {t("proj.source")}
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = PROJECTS.filter(
    (p) => filter === "All" || p.category === filter,
  );

  return (
    <section id="work" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("proj.eyebrow")}
          title={t("proj.title")}
          description={t("proj.desc")}
        />

        <Reveal className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                filter === f
                  ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12 text-center">
          <Button asChild variant="outline">
            <a href="https://github.com/hafizhsul" target="_blank" rel="noreferrer">
              {t("proj.more")}
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------- about --------------------------------- */

function About() {
  const { t, pick } = useI18n();
  return (
    <section id="about" className="border-t bg-muted/30 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-transparent blur-xl" />
            <div className="relative rounded-3xl border bg-card p-6 shadow-xl shadow-primary/5">
              <div className="flex items-start justify-between gap-3">
                <img
                  src="/portrait.jpg"
                  alt="Hafizh Sulthan Bachtiyar"
                  className="size-20 rounded-2xl border object-cover shadow-md"
                />
                <Badge className="gap-1.5 rounded-full">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  {t("hero.status")}
                </Badge>
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold tracking-tight">Hafizh Sulthan Bachtiyar</h3>
                <p className="text-sm text-muted-foreground">IT Support & Software Developer</p>
              </div>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0 text-foreground/50" />
                  {t("about.location")}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0 text-foreground/50" />
                  hafizhbachtiyar123@gmail.com
                </p>
              </div>
              <Separator className="my-5" />
              <div className="flex items-center gap-2">
                {SOCIALS.slice(0, 3).map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-9 shrink-0 place-items-center rounded-md border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  >
                    <s.icon className="size-4" />
                  </a>
                ))}
                <Button asChild variant="outline" size="sm" className="ml-auto">
                  <a href="/resume.pdf" download>
                    <Download className="size-4" />
                    {t("about.resume")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-6 bg-primary/40" />
              {t("about.eyebrow")}
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("about.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              {t("about.p1")}
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {t("about.p2")}
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-6">
            <div className="rounded-xl border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("about.edu")}
              </p>
              <p className="mt-1.5 text-sm font-medium">{t("about.edu1")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("about.edu2")}</p>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="mt-8 grid gap-4 sm:grid-cols-2">
            {FACTS.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border bg-card p-3.5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="size-4" />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">
                    {pick(f.label)}
                  </span>
                  <span className="block text-sm font-medium">{pick(f.value)}</span>
                </span>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {VALUES.map((v, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 className="size-4 shrink-0 text-primary" />
                  {pick(v)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- experience ------------------------------- */

function Experience() {
  const { t, pick } = useI18n();
  return (
    <section id="experience" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("exp.eyebrow")}
          title={t("exp.title")}
          description={t("exp.desc")}
        />

        <div className="mx-auto max-w-3xl">
          <ol className="relative space-y-10 border-l border-border/70 pl-8">
            {EXPERIENCE.map((job, i) => (
              <li key={job.company} className="relative">
                <span className="absolute -left-11 top-8 grid size-6 place-items-center rounded-full border bg-background shadow-sm">
                  <span className="size-2 rounded-full bg-primary" />
                </span>
                <Reveal delay={i * 0.06}>
                <div className="group rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-xs font-medium text-primary">
                      {pick(job.period)}
                    </span>
                    <span className="text-xs text-muted-foreground">{pick(job.location)}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">
                    {pick(job.role)}
                    <span className="text-muted-foreground"> · {job.company}</span>
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {job.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/50" />
                        {pick(point)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {pick(tag)}
                      </span>
                    ))}
                  </div>
                </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- skills --------------------------------- */

function Skills() {
  const { t, pick } = useI18n();
  return (
    <section id="skills" className="border-t bg-muted/30 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("skills.eyebrow")}
          title={t("skills.title")}
          description={t("skills.desc")}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="group h-full rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <group.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  {pick(group.title)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {pick(group.blurb)}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {pick(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- contact --------------------------------- */

function Contact() {
  const { t } = useI18n();
  return (
    <section id="contact" className="pb-24 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-16 text-center shadow-xl shadow-primary/5 sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:44px_44px] opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />

            <div className="relative">
              <Badge variant="secondary" className="mb-6 gap-2 rounded-full px-3.5 py-1.5">
                <Sparkles className="size-3.5 text-primary" />
                {t("contact.badge")}
              </Badge>
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                {t("contact.title")}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                {t("contact.desc")}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg">
                  <a href="mailto:hafizhbachtiyar123@gmail.com">
                    <Mail className="size-4" />
                    hafizhbachtiyar123@gmail.com
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="/resume.pdf" download>
                    <Download className="size-4" />
                    {t("contact.resume")}
                  </a>
                </Button>
              </div>
              <div className="mt-9 flex items-center justify-center gap-1.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-md border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  >
                    <s.icon className="size-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- footer --------------------------------- */

function Footer() {
  const { t, pick } = useI18n();
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                HSB
              </span>
              Hafizh Sulthan Bachtiyar
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("footer.tag")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("footer.navigate")}
              </p>
              <ul className="mt-3 space-y-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-foreground/70 transition-colors hover:text-primary"
                    >
                      {pick(l.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("footer.connect")}
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href="mailto:hafizhbachtiyar123@gmail.com"
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/hafizhsul"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/hafizhsulthan"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("footer.colophon")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                Built with React, Tailwind CSS & Framer Motion. Set in Inter and
                JetBrains Mono.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hafizh Sulthan Bachtiyar. {t("footer.rights")}</p>
          <p className="flex items-center gap-1.5">
            {t("footer.love")}
            <Heart className="size-3.5 fill-primary text-primary" />
            {t("footer.in")}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- landing -------------------------------- */

export default function Landing() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem("lang") === "id" ? "id" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <I18nContext.Provider
      value={{
        lang,
        setLang,
        t: (key) => STRINGS[lang][key],
        pick: (v) => resolve(v, lang),
      }}
    >
      <MotionConfig reducedMotion="user">
        <div className="isolate min-h-screen bg-background text-foreground antialiased">
          <ParallaxBackground />
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <Projects />
            <About />
            <Experience />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </I18nContext.Provider>
  );
}
