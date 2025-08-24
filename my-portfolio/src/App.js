"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Define a function to generate a placeholder image URL
const getPlaceholderUrl = (text, width, height, isDark) => {
    const darkColor = "264653" // Dark blue-green
    const darkTextColor = "e9c46a" // Gold
    const lightColor = "e9c46a" // Gold
    const lightTextColor = "2a9d8f" // Teal

    const bgColor = isDark ? darkColor : lightColor
    const textColor = isDark ? darkTextColor : lightTextColor

    return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(
        text
    )}`
}

// SVG Icons for theme toggle
const SunIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
    </svg>
)

const MoonIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
    </svg>
)

// Data for content, can be switched for different languages
const content = {
    en: {
        home: {
            title: "Hello, I'm Shahab.",
            subtitle: "A freelance Motion Designer & UI/UX Designer based in Berlin.",
            ctaButton: "Get in Touch",
            scrollHint: "Scroll down for more",
        },
        about: {
            title: "About Me",
            text: "I specialize in creating compelling visual stories through animation and video. With extensive experience in motion graphics and a strong foundation in video production, I bring concepts to life with creativity and technical precision.",
        },
        skills: {
            title: "Skills & Expertise",
            // Sub-skills for UI/UX and Motion Design
            uiux: {
                title: "UI/UX Design",
                list: [
                    "User Research & Analysis",
                    "Wireframing & Prototyping",
                    "Usability Testing",
                    "Figma & Adobe XD",
                    "Interaction Design",
                ],
            },
            motion: {
                title: "Motion Design",
                list: [
                    "2D/3D Animation",
                    "Video Editing & Compositing",
                    "Visual Effects (VFX)",
                    "After Effects & Cinema 4D",
                    "Storyboarding & Concepts",
                ],
            },
        },
        expertise: {
            title: "Expertise",
            items: [
                {
                    icon: "M17 21h-2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2zM7 21H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2z",
                    title: "UI/UX Design",
                    description:
                        "Crafting intuitive and engaging user interfaces that provide seamless experiences. From user flows to interactive prototypes, I focus on creating designs that are both beautiful and functional.",
                },
                {
                    icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
                    title: "Motion Design",
                    description:
                        "Adding life and dynamic energy to brands and stories through animation. My expertise spans from logo animations and explainers to character animation and visual effects.",
                },
                {
                    icon: "M10 17L4 12 10 7",
                    title: "Webflow Development",
                    description:
                        "Turning design visions into reality with clean, responsive, and functional websites. Using Webflow, I build custom sites that are easy to manage and perform flawlessly on any device.",
                },
            ],
        },
        projects: {
            title: "My projects",
            cta: "View all projects on Behance",
        },
        contact: {
            title: "Let's Talk",
            subtitle: "Interested in a collaboration? Feel free to reach out!",
            button: "Let's Connect",
        },
        // Navigation and footer content
        nav: {
            home: "Home",
            about: "About",
            skills: "Skills",
            expertise: "Expertise",
            projects: "Projects",
            contact: "Contact",
        },
        footer: {
            text: "Designed and Developed by Shahab Fotouhian",
        },
    },
    de: {
        home: {
            title: "Hallo, ich bin Shahab.",
            subtitle: "Ein freiberuflicher Motion Designer & UI/UX Designer in Berlin.",
            ctaButton: "Kontakt aufnehmen",
            scrollHint: "Nach unten scrollen",
        },
        about: {
            title: "Über mich",
            text: "Ich bin darauf spezialisiert, fesselnde visuelle Geschichten durch Animation und Video zu erschaffen. Mit umfassender Erfahrung in Motion Graphics und einer soliden Grundlage in der Videoproduktion erwecke ich Konzepte mit Kreativität und technischer Präzision zum Leben.",
        },
        skills: {
            title: "Fähigkeiten & Expertise",
            uiux: {
                title: "UI/UX Design",
                list: [
                    "Nutzerforschung & -analyse",
                    "Wireframing & Prototyping",
                    "Usability-Tests",
                    "Figma & Adobe XD",
                    "Interaktionsdesign",
                ],
            },
            motion: {
                title: "Motion Design",
                list: [
                    "2D/3D-Animation",
                    "Videobearbeitung & Compositing",
                    "Visuelle Effekte (VFX)",
                    "After Effects & Cinema 4D",
                    "Storyboarding & Konzepte",
                ],
            },
        },
        expertise: {
            title: "Fachgebiete",
            items: [
                {
                    icon: "M17 21h-2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2zM7 21H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2z",
                    title: "UI/UX Design",
                    description:
                        "Entwicklung intuitiver und ansprechender Benutzeroberflächen, die nahtlose Erlebnisse bieten. Von User Flows bis zu interaktiven Prototypen konzentriere ich mich auf die Schaffung von Designs, die sowohl schön als auch funktional sind.",
                },
                {
                    icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
                    title: "Motion Design",
                    description:
                        "Durch Animationen verleihe ich Marken und Geschichten Leben und dynamische Energie. Meine Expertise reicht von Logo-Animationen und Erklärvideos bis hin zu Charakteranimationen und visuellen Effekten.",
                },
                {
                    icon: "M10 17L4 12 10 7",
                    title: "Webflow Entwicklung",
                    description:
                        "Ich setze Designvisionen in die Realität um, mit sauberen, responsiven und funktionalen Websites. Mit Webflow baue ich maßgeschneiderte Websites, die einfach zu verwalten sind und auf jedem Gerät einwandfrei funktionieren.",
                },
            ],
        },
        projects: {
            title: "Meine Projekte",
            cta: "Alle Projekte auf Behance ansehen",
        },
        contact: {
            title: "Lass uns reden",
            subtitle:
                "Interessiert an einer Zusammenarbeit? Zögere nicht, mich zu kontaktieren!",
            button: "Verbinden wir uns",
        },
        nav: {
            home: "Startseite",
            about: "Über mich",
            skills: "Fähigkeiten",
            expertise: "Expertise",
            projects: "Projekte",
            contact: "Kontakt",
        },
        footer: {
            text: "Entworfen und entwickelt von Shahab Fotouhian",
        },
    },
}

// Data for all 16 projects with placeholder YouTube video IDs
const projectsData = [
    {
        id: "project-1",
        title: "Digital Nomad",
        youtubeId: "dQw4w9WgXcQ",
    },
    {
        id: "project-2",
        title: "City Explorer",
        youtubeId: "2n9M_C60EGA",
    },
    {
        id: "project-3",
        title: "Aura Meditation",
        youtubeId: "c34t_4_g-iM",
    },
    {
        id: "project-4",
        title: "Synthwave Visuals",
        youtubeId: "y1T1B4_nE30",
    },
    {
        id: "project-5",
        title: "Abstract Flow",
        youtubeId: "V_J7T8zFfWk",
    },
    {
        id: "project-6",
        title: "Product Showcase",
        youtubeId: "Fj1-s5z7E60",
    },
    {
        id: "project-7",
        title: "Coffee App UI",
        youtubeId: "T8L04L-1t9w",
    },
    {
        id: "project-8",
        title: "Corporate Explainer",
        youtubeId: "k-f5qM0vN2s",
    },
    {
        id: "project-9",
        title: "Fitness App",
        youtubeId: "5423fA-uXbQ",
    },
    {
        id: "project-10",
        title: "Space Exploration",
        youtubeId: "e9fP6p727vQ",
    },
    {
        id: "project-11",
        title: "E-commerce Website",
        youtubeId: "6m7aU4K0534",
    },
    {
        id: "project-12",
        title: "Data Visualization",
        youtubeId: "p573D5P3D8s",
    },
    {
        id: "project-13",
        title: "Gaming UI",
        youtubeId: "9bZkp7q19f0",
    },
    {
        id: "project-14",
        title: "Character Animation",
        youtubeId: "y8I5Hq2z6X4",
    },
    {
        id: "project-15",
        title: "Brand Film",
        youtubeId: "j6Jp60wYtT8",
    },
    {
        id: "project-16",
        title: "Iconography Set",
        youtubeId: "b85z7r0B96c",
    },
]

// Theme colors for light and dark mode
const themeColors = {
    dark: {
        bodyBg: "bg-stone-900",
        text: "text-stone-100",
        primary: "#e9c46a",
        secondary: "#2a9d8f",
        cardBg: "bg-stone-800",
        buttonBg: "bg-stone-100",
        buttonText: "text-stone-900",
        navHover: "#e9c46a",
        gradientStart: "#1c1917", // near-black for gradient
        gradientEnd: "#292524", // darker gray
        cardGradient: "bg-gradient-to-br from-stone-800 to-stone-900"
    },
    light: {
        bodyBg: "bg-stone-100",
        text: "text-stone-900",
        primary: "#e9c46a",
        secondary: "#2a9d8f",
        cardBg: "bg-white",
        buttonBg: "bg-stone-900",
        buttonText: "text-stone-100",
        navHover: "#2a9d8f",
        gradientStart: "#fafaf9", // near-white for gradient
        gradientEnd: "#f5f5f4", // lighter gray
        cardGradient: "bg-gradient-to-br from-white to-gray-50"
    },
}

// Social Icons Component
const SocialIcons = ({ isDark }) => {
    const iconColor = isDark ? themeColors.dark.text : themeColors.light.text
    const socialLinks = [
        {
            name: "Behance",
            href: "https://www.behance.net/shahabfotouhian",
            path: "M16 22.028v-2.18h-1.64c-2.31 0-3.37-.92-3.37-2.92v-2.22h5.68c.55 0 1.05-.18 1.45-.52.4-.34.61-.83.61-1.42s-.21-1.08-.61-1.42a2.38 2.38 0 00-1.45-.52h-5.68v-2.24c0-2.35 1.08-3.4 3.39-3.4h1.62V3.972h-1.62c-2.78 0-4.63 1.3-4.63 4.09v2.24H5.98c-1.39 0-2.25.92-2.25 2.58s.86 2.58 2.25 2.58h5.68v2.22c0 2.21-1.85 3.55-4.65 3.55H3.72V22.028z"
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/shahab-fotouhian/",
            path: "M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 21v-8a4 4 0 0 1 8 0v8a4 4 0 0 1-8 0zM12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/shahab.studio/",
            path: "M18.784 3.016a5.523 5.523 0 011.233 1.233c.52.52.926 1.108 1.233 1.764a5.523 5.523 0 010 6.642 5.523 5.523 0 01-1.233 1.764 5.523 5.523 0 01-1.764 1.233 5.523 5.523 0 01-6.642 0 5.523 5.523 0 01-1.764-1.233 5.523 5.523 0 01-1.233-1.764 5.523 5.523 0 010-6.642 5.523 5.523 0 011.233-1.764 5.523 5.523 0 011.764-1.233 5.523 5.523 0 016.642 0z"
        },
    ]

    return (
        <div className="flex justify-center space-x-6 mt-4">
            {socialLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                >
                    <motion.svg
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-8 h-8 opacity-75 transition-opacity hover:opacity-100"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isDark ? themeColors.dark.text : themeColors.light.text}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {/* Placeholder for real paths, or use the actual paths for each icon */}
                        <path d={link.path} />
                    </motion.svg>
                </a>
            ))}
        </div>
    )
}

// Video Modal Component
const VideoModal = ({ youtubeId, onClose }) => {
    const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
            <div
                className="absolute inset-0 backdrop-blur-md bg-black bg-opacity-80"
                onClick={onClose}
            ></div>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative z-[101] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[102] text-white text-3xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
                    aria-label="Close video player"
                >
                    &times;
                </button>
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={youtubeUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </motion.div>
        </motion.div>
    )
}

// Main React Component for the Portfolio Website
export default function Portfolio() {
    const [isDark, setIsDark] = useState(true)
    const [lang, setLang] = useState("en")
    const [visibleProjects, setVisibleProjects] = useState(4)
    const [activeSection, setActiveSection] = useState("home")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalVideoId, setModalVideoId] = useState(null)
    const sectionRefs = {
        home: useRef(null),
        about: useRef(null),
        skills: useRef(null),
        expertise: useRef(null),
        projects: useRef(null),
        contact: useRef(null),
    }

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    const switchLang = () => {
        setLang(lang === "en" ? "de" : "en")
    }

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: "smooth" })
        }
    }

    const handleVideoClick = (youtubeId) => {
        setModalVideoId(youtubeId)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setModalVideoId(null)
    }

    const showMoreVideos = () => {
        setVisibleProjects(projectsData.length)
    }

    const showLessVideos = () => {
        setVisibleProjects(4)
    }

    useEffect(() => {
        const handleScroll = () => {
            const pageYOffset = window.pageYOffset
            let newActiveSection = "home"
            const sections = Object.keys(sectionRefs)
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sectionRefs[sections[i]].current
                if (section) {
                    const sectionTop = section.offsetTop
                    if (pageYOffset >= sectionTop - 100) {
                        newActiveSection = sections[i]
                        break
                    }
                }
            }
            setActiveSection(newActiveSection)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const theme = isDark ? themeColors.dark : themeColors.light

    return (
        <div
            className={`min-h-screen font-inter transition-colors duration-300 ${theme.bodyBg} ${theme.text}`}
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            {/* Navigation Bar */}
            <nav className="fixed top-0 z-50 w-full p-4 md:p-6 bg-transparent">
                <div className="container mx-auto flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg md:text-xl font-bold rounded-lg p-2 bg-black bg-opacity-30 backdrop-blur-md"
                    >
                        SF.
                    </motion.div>
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-6 rounded-full px-6 py-2 bg-black bg-opacity-30 backdrop-blur-md">
                            {Object.keys(content[lang].nav).map((key) => (
                                <span
                                    key={key}
                                    className={`relative cursor-pointer transition-colors duration-300 hover:text-white ${
                                        activeSection === key
                                            ? "text-white"
                                            : ""
                                    }`}
                                    style={{
                                        color: isDark ? themeColors.dark.navHover : themeColors.light.navHover
                                    }}
                                    onClick={() => scrollToSection(key)}
                                >
                                    {content[lang].nav[key]}
                                    {activeSection === key && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute bottom-[-4px] left-0 right-0 h-0.5"
                                            style={{
                                                backgroundColor: isDark ? themeColors.dark.navHover : themeColors.light.navHover
                                            }}
                                        />
                                    )}
                                </span>
                            ))}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={switchLang}
                            className="bg-black bg-opacity-30 backdrop-blur-md text-sm md:text-base px-3 py-1 md:px-4 md:py-2 rounded-full font-semibold"
                        >
                            {lang.toUpperCase()}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="text-xl md:text-2xl bg-black bg-opacity-30 backdrop-blur-md p-2 rounded-full"
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Main Content Sections */}
            <main>
                {/* Home Section */}
                <section
                    id="home"
                    ref={sectionRefs.home}
                    className="relative flex items-center justify-center min-h-screen text-center overflow-hidden"
                >
                    <div className="absolute inset-0 z-0">
                        {/* Dynamic background based on theme */}
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${getPlaceholderUrl(
                                    "Hero Video",
                                    1920,
                                    1080,
                                    isDark
                                )})`,
                            }}
                        />
                    </div>
                    <div className="relative z-10 p-4 md:p-8 bg-black bg-opacity-40 backdrop-blur-sm rounded-xl max-w-lg md:max-w-xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-bold"
                        >
                            {content[lang].home.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-4 text-lg md:text-2xl font-light"
                        >
                            {content[lang].home.subtitle}
                        </motion.p>
                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            href="#contact"
                            className="mt-6 inline-block text-lg md:text-xl font-semibold px-6 py-3 rounded-full transition-all duration-300 transform"
                            style={{
                                backgroundColor: theme.primary,
                                color: isDark ? theme.buttonText : "#fff"
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {content[lang].home.ctaButton}
                        </motion.a>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="absolute bottom-8 text-center text-sm md:text-base font-light opacity-75"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mx-auto mb-2 animate-bounce"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                        {content[lang].home.scrollHint}
                    </motion.div>
                </section>

                {/* About Section */}
                <section
                    id="about"
                    ref={sectionRefs.about}
                    className={`py-16 md:py-24 ${isDark ? themeColors.dark.cardGradient : themeColors.light.cardGradient}`}
                >
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-center mb-8"
                        >
                            {content[lang].about.title}
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-center"
                        >
                            <p>{content[lang].about.text}</p>
                        </motion.div>
                    </div>
                </section>

                {/* Skills Section */}
                <section
                    id="skills"
                    ref={sectionRefs.skills}
                    className={`py-16 md:py-24 ${theme.bodyBg}`}
                >
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-center mb-12"
                        >
                            {content[lang].skills.title}
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {/* UI/UX Skills Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className={`${isDark ? themeColors.dark.cardGradient : themeColors.light.cardGradient} p-6 md:p-8 rounded-xl shadow-lg border border-white/5 dark:border-stone-700/50`}
                            >
                                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center">
                                    {content[lang].skills.uiux.title}
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
                                    {content[lang].skills.uiux.list.map(
                                        (skill, index) => (
                                            <li key={index}>{skill}</li>
                                        )
                                    )}
                                </ul>
                            </motion.div>

                            {/* Motion Design Skills Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className={`${isDark ? themeColors.dark.cardGradient : themeColors.light.cardGradient} p-6 md:p-8 rounded-xl shadow-lg border border-white/5 dark:border-stone-700/50`}
                            >
                                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center">
                                    {content[lang].skills.motion.title}
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
                                    {content[lang].skills.motion.list.map(
                                        (skill, index) => (
                                            <li key={index}>{skill}</li>
                                        )
                                    )}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Expertise Section */}
                <section
                    id="expertise"
                    ref={sectionRefs.expertise}
                    className={`py-16 md:py-24 ${isDark ? themeColors.dark.cardGradient : themeColors.light.cardGradient}`}
                >
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-center mb-12"
                        >
                            {content[lang].expertise.title}
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {content[lang].expertise.items.map(
                                (item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.2 * index,
                                        }}
                                        viewport={{ once: true }}
                                        className="text-center p-6 md:p-8 rounded-xl bg-white/5 dark:bg-stone-800/50 shadow-md transition-shadow hover:shadow-xl"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-4 p-3 rounded-full bg-yellow-400/20 flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke={
                                                    theme.primary
                                                }
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-10 h-10"
                                            >
                                                <path d={item.icon} />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-semibold mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm md:text-base opacity-80">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section
                    id="projects"
                    ref={sectionRefs.projects}
                    className={`py-16 md:py-24 ${theme.bodyBg}`}
                >
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-center mb-12"
                        >
                            {content[lang].projects.title}
                        </motion.h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                            <AnimatePresence>
                                {projectsData.slice(0, visibleProjects).map((project) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.1,
                                        }}
                                        className={`${isDark ? themeColors.dark.cardGradient : themeColors.light.cardGradient} p-4 md:p-6 rounded-2xl shadow-lg border border-white/5 dark:border-stone-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer`}
                                        onClick={() => handleVideoClick(project.youtubeId)}
                                    >
                                        {/* Placeholder thumbnail with project title */}
                                        <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 relative group">
                                            <img
                                                src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`}
                                                alt={`Thumbnail for ${project.title}`}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-center">
                                            {project.title}
                                        </h3>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        {projectsData.length > 4 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="text-center mt-12"
                            >
                                {visibleProjects < projectsData.length ? (
                                    <button
                                        onClick={showMoreVideos}
                                        className="inline-flex items-center text-lg md:text-xl font-semibold px-6 py-3 rounded-full transition-all duration-300 transform"
                                        style={{
                                            backgroundColor: theme.primary,
                                            color: isDark ? theme.buttonText : "#fff"
                                        }}
                                    >
                                        Show More Videos
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        onClick={showLessVideos}
                                        className="inline-flex items-center text-lg md:text-xl font-semibold px-6 py-3 rounded-full transition-all duration-300 transform"
                                        style={{
                                            backgroundColor: theme.primary,
                                            color: isDark ? theme.buttonText : "#fff"
                                        }}
                                    >
                                        Show Less Videos
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Contact Section */}
                <section
                    id="contact"
                    ref={sectionRefs.contact}
                    className={`py-16 md:py-24 ${isDark ? themeColors.dark.cardGradient : themeColors.light.cardGradient}`}
                >
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold mb-4"
                        >
                            {content[lang].contact.title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-lg md:text-xl font-light mb-8"
                        >
                            {content[lang].contact.subtitle}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8"
                        >
                            <a
                                href="mailto:s.fotouhian@gmail.com"
                                className="inline-block text-lg md:text-xl font-semibold px-8 py-4 rounded-full transition-all duration-300 transform"
                                style={{
                                    backgroundColor: theme.primary,
                                    color: isDark ? theme.buttonText : "#fff"
                                }}
                            >
                                {content[lang].contact.button}
                            </a>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer
                className={`py-8 md:py-12 text-center ${theme.bodyBg}`}
            >
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-sm md:text-base opacity-75"
                >
                    {content[lang].footer.text}
                </motion.p>
                <div className="mt-4 flex flex-col items-center">
                    <a
                        href="tel:+4917634425050"
                        className="text-sm md:text-base opacity-75 hover:underline"
                    >
                        +49 176 34 42 5050
                    </a>
                    <a
                        href="mailto:s.fotouhian@gmail.com"
                        className="text-sm md:text-base opacity-75 hover:underline"
                    >
                        s.fotouhian@gmail.com
                    </a>
                </div>
                <SocialIcons isDark={isDark} />
            </footer>
            
            <AnimatePresence>
                {isModalOpen && (
                    <VideoModal
                        youtubeId={modalVideoId}
                        onClose={handleCloseModal}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
