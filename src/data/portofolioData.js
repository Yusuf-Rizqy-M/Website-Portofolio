//education
import sd1 from "../assets/education/sd1.png";
import sd2 from "../assets/education/sd2.png";
import sd3 from "../assets/education/sd3.png";

import mpls from "../assets/education/mpls.png";
import mpls2 from "../assets/education/mpls2.jpeg";
import mpls3 from "../assets/education/mpls3.png";
import mpls4 from "../assets/education/mpls4.jpeg";
import mpls5 from "../assets/education/mpls5.png";
import mpls6 from "../assets/education/mpls6.png";
import mpls7 from "../assets/education/mpls7.png";
import mpls8 from "../assets/education/mpls8.png";

import class11_1 from "../assets/education/class11.png";
import class11_2 from "../assets/education/class11_1.jpeg";
import class11_3 from "../assets/education/class11_2.jpeg";
import class11_4 from "../assets/education/class11_3.jpeg";
import class11_5 from "../assets/education/class11_4.jpeg";
import class11_6 from "../assets/education/class11_5.jpeg";
import class11_7 from "../assets/education/class11_6.png";
import class11_8 from "../assets/education/class11_7.png";
import class11_9 from "../assets/education/class11_8.png";
import class11_10 from "../assets/education/class11_9.png";
import class11_11 from "../assets/education/class11_10.png";
import class11_12 from "../assets/education/class11_11.jpg";

import class12_1 from "../assets/education/class12.png";
import class12_2 from "../assets/education/class12_1.jpg";
import class12_3 from "../assets/education/class12_2.jpeg";
import class12_4 from "../assets/education/class12_3.jpeg";
import class12_5 from "../assets/education/class12_4.png";
import class12_6 from "../assets/education/class12_5.png";
import class12_7 from "../assets/education/class12_6.jpeg";
import class12_8 from "../assets/education/class12_7.png";
import class12_9 from "../assets/education/class12_8.png";
import class12_10 from "../assets/education/class12_9.png";
import class12_11 from "../assets/education/class12_10.png";

import ub1 from "../assets/education/ub1.png";
import ub2 from "../assets/education/ub2.png";
import ub3 from "../assets/education/ub3.png";
import ub4 from "../assets/education/ub4.png";

//school
import smp1kudus from "../assets/school/smpsatukudus.jpg";
import smkrus from "../assets/school/smkrus.jpg";
import ub from "../assets/school/ub.png";

//sertif
import skilvul from "../assets/certificate/ligadigitalnasional.png";
import dicodingfundamental from "../assets/certificate/dicodingfundamental.png";
import dicodingjavascript from "../assets/certificate/dicodingjs.png";
import dicodingflutter from "../assets/certificate/dicodingflutter.png";
import dicodingfrontend from "../assets/certificate/dicodingfrontend.png";
import dicodingai from "../assets/certificate/dicodingai.png";
import toefl from "../assets/certificate/toefl.png";
import techcomfest from "../assets/certificate/techcomfest.png";
import bankjateng from "../assets/certificate/bankjateng.jpg";
import mia from "../assets/certificate/mia.png";

//hobby
import fishing from "../assets/interest/fishing.png";
import game from "../assets/interest/game.png";
import jogging from "../assets/interest/jogging.png";
import music from "../assets/interest/music.png";
import raising from "../assets/interest/raising.png";

//project
import umkmwongkudus from "../assets/project/umkmwongkudus.png";
import uks from "../assets/project/uks.png";
import bankjatengsyariah from "../assets/project/bankjateng.png";
import chamartin from "../assets/project/chamartin.png";


export const calculateAge = (birthDateString) => {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const profile = {
  name: "Yusuf Rizqy Mubarok",
  title: "Full-stack Developer",
  age: calculateAge("2008-06-28"),
  location: "Kudus, Jawa Tengah",
  school: "SMK Raden Umar Said Kudus",
  desc: "Hello, I'm Yusuf, a Computer Engineering student at Universitas Brawijaya. Passionate about crafting scalable solutions across the entire development stack. I specialize in building modern web applications using JavaScript & TypeScript ecosystems, implementing robust backend architectures, and creating stunning user interfaces with React. Currently based in Kudus, Indonesia 🇮🇩. \n\nAs a Computer Engineering student, I balance my academic studies with real-world project experience and participation in various competitions. I have grown in a dynamic environment where innovation drives progress, and I am currently collaborating with my partner to build IT solutions together. My ability to manage both research and development projects has helped me develop strong time management and problem-solving skills.\n",
  interests: [
    { name: "Raising", image: raising },
    { name: "Jogging", image: jogging },
    { name: "Games", image: game },
    { name: "Music", image: music },
    { name: "Fishing", image: fishing },
  ],
  skillCategories: [
    {
      title: "Frontend",
      skills: [
        {
          name: "HTML5",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        },
        {
          name: "CSS3",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "ReactJS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        {
          name: "Tailwind",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        },
        {
          name: "Bootstrap",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        },
      ],
    },
    {
      title: "Backend",
      skills: [
        {
          name: "PHP",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        },
        {
          name: "Laravel",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
        },
        {
          name: "MySQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        },
        {
          name: "Node.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Express",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        },
      ],
    },
    {
      title: "Mobile",
      skills: [
        {
          name: "Flutter",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        },
        {
          name: "Dart",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
        },
        {
          name: "Firebase",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        },
        {
          name: "Android",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        },
        {
          name: "Android Studio",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
        },
      ],
    },
    {
      title: "Tools",
      skills: [
        {
          name: "Git",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        },
        {
          name: "VS Code",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        },
        {
          name: "Figma",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        },
        {
          name: "Postman",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
        },
        {
          name: "XAMPP",
          icon: "https://www.apachefriends.org/images/xampp-logo-ac950edf.svg",
        },
      ],
    },
  ],
};

export const educationData = [
  {
    id: 1,
    school: "SD 1 Barongan",
    subtitle: "Elementary School",
    period: "2014",
    desc: "Completed elementary education at SD 1 Barongan Kudus.",
    image:
      "https://cdn.antaranews.com/cache/1200x800/2020/08/13/sdn-barongan.jpg",
    details: [
      {
        title: "Class 1 - 6",
        year: "2014 - 2020",
        desc: "The early stage of basic education focused on character building and foundational literacy skills.",
        gallery: [sd1, sd2, sd3],
      },
    ],
  },
  {
    id: 2,
    school: "SMP 1 Kudus",
    subtitle: "Junior High School",
    period: "2020",
    desc: "Completed junior high school education at SMP 1 Kudus.",
    image: smp1kudus,
    details: [
      {
        title: "Class 7",
        year: "2020 - 2021",
        desc: "Adapting to the middle school environment and strengthening the fundamentals of science and general knowledge.",
        gallery: [
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
        ],
      },
      {
        title: "Class 8",
        year: "2021 - 2022",
        desc: "Developing interest in school organizations and improving critical thinking skills.",
        gallery: [
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
        ],
      },
      {
        title: "Class 9",
        year: "2022 - 2023",
        desc: "Focused on preparing for final exams and consolidating personal interests and talents.",
        gallery: [
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
        ],
      },
    ],
  },
  {
    id: 3,
    school: "SMK Raden Umar Said Kudus",
    subtitle: "Senior High School",
    period: "2023",
    desc: "Graduated from SMK Raden Umar Said Kudus, specializing in Software Engineering.",
    image: smkrus,
    details: [
      {
        title: "Class 10",
        year: "2023 - 2024",
        desc: "Introduction to school. Learned C, Java, and C++ for the first time, explored UI/UX design with Figma, and developed web and mobile applications.",
        gallery: [mpls, mpls2, mpls3, mpls4, mpls5, mpls6, mpls7, mpls8],
      },
      {
        title: "Class 11",
        year: "2024 - 2025",
        desc: "Developed web applications using Laravel APIs and React. Actively participated in extracurricular activities and improved technical skills in SQL, IoT, and Flutter.",
        gallery: [
          class11_1,
          class11_2,
          class11_3,
          class11_4,
          class11_5,
          class11_6,
          class11_7,
          class11_8,
          class11_9,
          class11_10,
          class11_11,
          class11_12,
        ],
      },
      {
        title: "Class 12",
        year: "2025 - 2026",
        desc: "Focused on an internship at Esoftplay and participated in programming competitions. Started a content clipper account for education.",
        gallery: [
          class12_1,
          class12_2,
          class12_3,
          class12_4,
          class12_5,
          class12_6,
          class12_7,
          class12_8,
          class12_9,
          class12_10,
          class12_11,
        ],
      },
    ],
  },
  {
    id: 4,
    school: "Universitas Brawijaya",
    subtitle: "University",
    period: "2026",
    desc: "Pursuing a degree in Computer Engineering.",
    image: ub,
    details: [
      {
        title: "Year 1 (Semester 1 - 2)",
        year: "2026 - 2027",
        desc: "Introduction to Computer Engineering. Focusing on basic programming, calculus, discrete mathematics, and basic physics.",
        gallery: [ub1, ub2, ub3, ub4],
      },
      {
        title: "Year 2 (Semester 3 - 4)",
        year: "2027 - 2028",
        desc: "Deepening core concepts. Learning digital systems, computer architecture, data structures, and object-oriented programming.",
        gallery: [
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
        ],
      },
      {
        title: "Year 3 (Semester 5 - 6)",
        year: "2028 - 2029",
        desc: "Advanced topics and practical experience. Exploring operating systems, computer networks, microcontrollers, and preparing for internship (PKL).",
        gallery: [
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
        ],
      },
      {
        title: "Year 4 (Semester 7 - 8)",
        year: "2029 - 2030",
        desc: "Final stages of study. Focusing on elective courses, professional ethics, and completing the Final Project (Skripsi / Undergraduate Thesis).",
        gallery: [
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
          "https://placehold.co/600x400",
        ],
      },
    ],
  },
];

export const projects = [
  {
    title: "Web App UMKM Wong Kudus",
    tech: ["Laravel", "Tailwind", "MySQL", "React"],
    desc: "Web yang dibuat dengan tujuan untuk mengikuti lomba di UPNVJ dan berhasil meraih sertifikat finalist",
    image: umkmwongkudus,
    link: "https://umkm-wong-kudus.vercel.app/",
    github1: "https://github.com/Choiranam/umkm-wong-kudus",
    github2: "https://github.com/Yusuf-Rizqy-M/Backend_Wong_Kudus_UMKM",
    date: "2025-10-16",
    type: "website"
  },
  {
    title: "E-Branch Bank Jateng Syariah",
    tech: ["Laravel", "Tailwind", "MySQL", "AI-Integration"],
    desc: "Web layanan perbankan syariah digital.",
    image: bankjatengsyariah,
    link: "https://github.com/andhikaeka3333333/bank_jateng",
    date: "2025-05-04",
    type: "website"
  },
  {
    title: "Web App UKS SMK RUS",
    tech: ["Laravel", "Tailwind", "MySQL", "React"],
    desc: "Web yang dibuat dengan tujuan untuk operational UKS SMK RUS Internal dengan fokus untuk tugas akhir",
    image: uks,
    link: "",
    github1: "https://github.com/Yusuf-Rizqy-M/Frontend-Unit-Kesehatan-Sekolah",
    github2: "https://github.com/Yusuf-Rizqy-M/Backend-Unit-Kesehatan-Sekolah",
    date: "2025-04-01",
    type: "website"
  },
  {
    title: "Web App Chamartin",
    tech: ["Laravel", "Tailwind", "MySQL"],
    desc: "Website yang dibuat dengan tujuan membuat website pembelajaran coding yang diadakan oleh polines tahun 2024",
    image: chamartin,
    link: "",
    github1: "https://github.com/andhikaeka3333333/course_chamartin",
    date: "2024-11-10",
  },
];

export const certificates = [
  {
    name: "Web Course Skilvul",
    desc: "Active as a participant in Liga Digital Nasional",
    issuer: "Skilvul",
    year: "2024",
    image: skilvul,
  },
  {
    name: "Web Course Dicoding, Fundamentals of Web Development",
    desc: "Certificate as a student",
    issuer: "Dicoding Indonesia",
    year: "2024",
    image: dicodingfundamental,
  },
  {
    name: "Web Course Dicoding, JavaScript Programming",
    desc: "Certificate as a student",
    issuer: "Dicoding Indonesia",
    year: "2024",
    image: dicodingjavascript,
  },
  {
    name: "Web Course Dicoding, Introduction to Flutter Development",
    desc: "Certificate as a student",
    issuer: "Dicoding Indonesia",
    year: "2024",
    image: dicodingflutter,
  },
  {
    name: "Web Course Dicoding, Front-End Web Development",
    desc: "Certificate as a student",
    issuer: "Dicoding Indonesia",
    year: "2024",
    image: dicodingfrontend,
  },
  {
    name: "Web Course Dicoding, Artifical Intelligence",
    desc: "Certificate as a student",
    issuer: "Dicoding Indonesia",
    year: "2024",
    image: dicodingai,
  },
  {
    name: "TOEFL SIMULATION REPORT",
    desc: "Certificate simulation TOEFL",
    issuer: "Lembaga Bahasa",
    year: "2024",
    image: toefl,
  },
  {
    name: "Web Competition Techomfest",
    desc: "Certificate as a participant",
    issuer: "Politeknik Negeri Semarang",
    year: "2025",
    image: techcomfest,
  },
  {
    name: "Web Competition by Bank Jateng",
    desc: "Certificate as a participant",
    issuer: "Bank Jateng",
    year: "2025",
    image: bankjateng,
  },
  {
    name: "Web Competition by UPNVJ, MIA 2025",
    desc: "Certificate as a finalist",
    issuer: "UPN Veteran Jakarta",
    year: "2026",
    image: mia,
  },
];

export const internship = [
  {
    company: "PT Esoftplay Software Inc",
    role: "Web Developer",
    period: "Oktober 2025 - Maret 2026",
    description:
      "Developing a web application to support the company's internal internship program.",
  },
];

export const contact = {
  info: [
    {
      name: "Email",
      value: "yusufhabib290@gmail.com",
      link: null,
      icon: "https://cdn-icons-png.flaticon.com/128/646/646094.png",
    },
    {
      name: "Phone",
      value: "+6285786673009",
      link: null,
      icon: "https://cdn-icons-png.flaticon.com/128/126/126509.png",
    },
    {
      name: "Github",
      value: "@YusufRizqyM",
      link: "https://github.com/Yusuf-Rizqy-M",
      icon: "https://cdn-icons-png.flaticon.com/128/2111/2111432.png",
    },
    {
      name: "Instagram",
      value: "@s0urfphyu",
      link: "https://instagram.com/s0urfphyu",
      icon: "https://cdn-icons-png.flaticon.com/128/1384/1384031.png",
    },
    {
      name: "Discord",
      value: "evavvfy",
      link: null,
      icon: "https://cdn-icons-png.flaticon.com/128/4945/4945914.png",
    },
    {
      name: "Linkedin",
      value: "Yusuf Rizqy Mubarok",
      link: "https://linkedin.com/in/yusuf-rizqy-mubarok",
      icon: "https://cdn-icons-png.flaticon.com/128/1384/1384014.png",
    },
    {
      name: "Steam",
      value: "@evavvfy",
      link: "https://steamcommunity.com/id/evavvfy",
      icon: "https://cdn-icons-png.flaticon.com/128/15455/15455888.png",
    },
    {
      name: "Riot Games",
      value: "@evavvfy#0128",
      link: null,
      icon: "https://img.icons8.com/?size=128&id=ld4oxG9uNT5V&format=png",
    },
    {
      name: "Tiktok",
      value: "@s0urfphyu",
      link: "https://tiktok.com/@s0urfphyu",
      icon: "https://cdn-icons-png.flaticon.com/128/3046/3046120.png",
    },
  ],

  additional: [
    {
      title: "Location",
      desc: "Based in Kudus, Indonesia, and currently studying in Malang at Universitas Brawijaya for college.",
    },
    {
      title: "Working Hours",
      desc: "Mon-Sat, 08.00 - 21.00",
    },
    {
      title: "Quick Response",
      desc: "I typically respond within 24 hours during working days. For urgent matters, please reach out via phone or Discord.",
    },
  ],
};
