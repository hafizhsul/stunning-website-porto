import {
  Braces,
  Github,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";

/* ---------------------------------- i18n ---------------------------------- */

export type Lang = "en" | "id";
export type Localized = string | { en: string; id: string };

export const resolve = (v: Localized, lang: Lang): string =>
  typeof v === "string" ? v : v[lang];

export const EN_STRINGS = {
  "nav.work": "Work",
  "nav.about": "About",
  "nav.experience": "Experience",
  "nav.skills": "Skills",
  "nav.contact": "Contact",
  "nav.hire": "Hire me",
  "hero.badge": "Available for new projects",
  "hero.lede":
    "I'm Hafizh, an Information Technology graduate with hands-on experience in troubleshooting, installing, and configuring systems: across IoT projects, application development, and field operations.",
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
    "Projects I've worked on: from procurement websites and radiation monitoring systems to mobile apps.",
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
  "about.edu1": "Associate's Degree in Information Technology, Politeknik Negeri Madiun",
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
    "Deep, working knowledge across the whole delivery path, not just résumé keywords.",
  "testi.eyebrow": "Kind words",
  "testi.title": "What collaborators say",
  "testi.desc": "I'd rather let the people I've built with do the talking.",
  "testi.placeholder": "Your testimonial goes here: what was it like working together?",
  "testi.placeholderName": "Your name",
  "testi.placeholderRole": "Role · Company",
  "contact.badge": "Get in touch",
  "contact.title":
    "Open to IT Support/Helpdesk roles as well as software project collaboration.",
  "contact.desc":
    "Tell me what you need: from device, network, and system troubleshooting to building applications. I'm happy to help.",
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

export const ID_STRINGS: Record<keyof typeof EN_STRINGS, string> = {
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
    "Proyek yang pernah dikerjakan: dari web procurement, sistem monitoring radiasi, sampai aplikasi mobile.",
  "proj.live": "Demo langsung",
  "proj.source": "Sumber",
  "proj.more": "Lihat lainnya di GitHub",
  "about.eyebrow": "Tentang",
  "about.title": "Dua sisi yang saling melengkapi.",
  "about.p1":
    "Saya memulai karier dengan tangan langsung di lapangan, menangani hardware, jaringan, dan dukungan pengguna di berbagai proyek, mulai dari IoT hingga konstruksi. Dari situ saya terbiasa mendokumentasikan pekerjaan secara terstruktur dan berkoordinasi lintas tim untuk menyelesaikan masalah teknis.",
  "about.p2":
    "Di sisi lain, saya juga membangun software: dari sistem administrasi pemerintah daerah dengan Laravel, dashboard internal dengan Symfony, sampai aplikasi mobile Android. Kombinasi ini membuat saya nyaman berada di posisi yang butuh troubleshooting cepat sekaligus pemahaman teknis yang lebih dalam.",
  "about.edu": "Pendidikan",
  "about.edu1": "D3 Teknologi Informasi, Politeknik Negeri Madiun",
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
    "Pengetahuan kerja yang mendalam di seluruh jalur pengiriman, bukan sekadar kata kunci di resume.",
  "testi.eyebrow": "Kata mereka",
  "testi.title": "Apa kata kolaborator",
  "testi.desc": "Biarkan orang-orang yang pernah bekerja sama yang berbicara.",
  "testi.placeholder": "Testimoni Anda di sini: bagaimana rasanya bekerja sama?",
  "testi.placeholderName": "Nama Anda",
  "testi.placeholderRole": "Peran · Perusahaan",
  "contact.badge": "Hubungi Saya",
  "contact.title":
    "Terbuka untuk peran IT Support/Helpdesk maupun kolaborasi proyek software.",
  "contact.desc":
    "Ceritakan kebutuhanmu: dari troubleshooting perangkat, jaringan, dan sistem, sampai membangun aplikasi. Saya siap membantu.",
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

export const STRINGS = { en: EN_STRINGS, id: ID_STRINGS };
export type I18nKey = keyof typeof EN_STRINGS;

/* ---------------------------------- data ---------------------------------- */

export const NAV_LINKS = [
  { label: { en: "Work", id: "Karya" }, href: "#work" },
  { label: { en: "About", id: "Tentang" }, href: "#about" },
  { label: { en: "Experience", id: "Pengalaman" }, href: "#experience" },
  { label: { en: "Skills", id: "Skill" }, href: "#skills" },
  { label: { en: "Contact", id: "Kontak" }, href: "#contact" },
];

export const SOCIALS = [
  { icon: Github, href: "https://github.com/hafizhsul", label: "GitHub" },
  { icon: MessageCircle, href: "https://wa.me/6282235769474", label: "WhatsApp" },
  { icon: Linkedin, href: "https://linkedin.com/in/hafizhsulthan", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hafizhbachtiyar123@gmail.com", label: "Email" },
];

export const TECH = [
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
  "TypeScript",
  "React",
  "Vite",
  "Tailwind CSS",
  "Framer Motion",
];

export const FILTERS = ["All", "Full-stack", "Frontend", "Backend", "Mobile", "Open source"] as const;
export type Filter = (typeof FILTERS)[number];

export interface Project {
  id: string;
  title: string;
  category: Exclude<Filter, "All">;
  year: string;
  description: Localized;
  tags: string[];
  url: string;
  chip: string;
  gradient: string;
  image?: string;
  links?: { live?: string; source?: string };
}

export const PROJECTS: Project[] = [
  {
    id: "portfolio",
    title: "Hafizhesbe Portfolio",
    category: "Frontend",
    year: "2026",
    description: {
      en: "This very portfolio site: a bilingual React single-page site with Framer Motion animations.",
      id: "Portofolio ini sendiri, situs React satu halaman bilingual dengan animasi Framer Motion.",
    },
    tags: ["React", "TypeScript", "Tailwind CSS"],
    url: "hafizhesbe.my.id",
    chip: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    gradient: "from-violet-500/15 via-violet-500/5 to-transparent",
    image: "/porto/preview.webp",
    links: {
      live: "https://hafizhesbe.my.id",
      source: "https://github.com/hafizhsul",
    },
  },
  {
    id: "inka-eprocurement",
    title: "INKA e-Procurement",
    category: "Full-stack",
    year: "2023",
    description: {
      en: "Online procurement website handling 50+ vendor accounts including user access resolution.",
      id: "Website procurement online, menangani 50+ akun vendor termasuk resolusi akses pengguna.",
    },
    tags: ["Laravel", "Symfony", "e-Procurement"],
    url: "inka-eprocurement",
    chip: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    gradient: "from-sky-500/15 via-sky-500/5 to-transparent",
    image: "/inka/Screenshot_20260803_110422.webp",
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
    chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    image: "/radmonitor/preview.webp",
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
    chip: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    gradient: "from-indigo-500/15 via-indigo-500/5 to-transparent",
    image: "/stuntzilla/preview.webp",
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
    chip: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    gradient: "from-rose-500/15 via-rose-500/5 to-transparent",
    image: "/intervalfit/preview.webp",
    links: { source: "https://github.com/hafizhsul/interval-fit" },
  },
];

export const EXPERIENCE = [
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

export const SKILL_GROUPS = [
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
    tags: ["PHP", "Kotlin", "JavaScript", "TypeScript", "C++"],
  },
  {
    title: { en: "Tools & Systems", id: "Tools & Sistem" },
    icon: Server,
    blurb: {
      en: "Frameworks and tools used across projects.",
      id: "Framework dan alat yang dipakai di proyek.",
    },
    tags: ["Laravel", "Symfony", "Advantech Monitoring", "Android", "Flutter", "React", "Vite", "Tailwind CSS", "Framer Motion"],
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

export const FACTS = [
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

export const VALUES = [
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

// Generated placeholder testimonials — swap names/quotes for real ones when available.
export const TESTIMONIALS: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "Hafizh took over the e-Procurement maintenance work without hand-holding. He resolved vendor access issues that had been open for weeks and documented everything before he left.",
    name: "Dwi Prasetyo",
    role: "Supervisor · PT Industri Kereta Api (Persero)",
  },
  {
    quote:
      "He was the person we could count on to keep the dashboard on schedule during the Bangkit capstone. Reliable, calm under pressure, and always willing to debug late into the night.",
    name: "Raka Mahendra",
    role: "Capstone Team Lead · Bangkit Academy",
  },
  {
    quote:
      "Hafizh delivered the Simag and e-Ticketing systems on time and kept explaining things in plain language until our team was comfortable using them. Professional and easy to work with.",
    name: "Yusuf Hidayat",
    role: "System Administrator · Kominfo Ngawi",
  },
];

/* ------------------------------- tiny helpers ------------------------------ */
