import { useState, useEffect, useRef, useCallback } from "react";
{/* Ambient glowing background */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">

  {/* Pink glow */}
  <div
    className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-30"
    style={{
      background: "radial-gradient(circle, rgba(245,143,189,.45), transparent 70%)",
      animation: "glowFloat 8s ease-in-out infinite",
    }}
  />

  {/* Lavender glow */}
  <div
    className="absolute top-1/3 -right-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-25"
    style={{
      background: "radial-gradient(circle, rgba(201,160,234,.5), transparent 70%)",
      animation: "glowFloat 10s ease-in-out infinite reverse",
    }}
  />

  {/* Soft center glow */}
  <div
    className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-20"
    style={{
      background: "radial-gradient(circle, rgba(145,183,238,.45), transparent 70%)",
      animation: "glowPulse 7s ease-in-out infinite",
    }}
  />

</div>

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-scale");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ─── PARALLAX HOOK ────────────────────────────────────────────────────────────
function useParallax(ref: React.RefObject<HTMLElement | null>, speed: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = () => {
      const rect = el.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top) * speed;
      (el as HTMLElement).style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, [speed]);
}

// ─── BOTANICAL SVGs ───────────────────────────────────────────────────────────

// Thin branch with small leaves
function BotanicBranch({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="100" height="130" viewBox="0 0 100 130" fill="none">
      <path d="M50 120 Q50 80 52 40 Q54 10 56 8" stroke="#d4a0b8" strokeWidth="1.2" strokeLinecap="round" opacity=".45" />
      <ellipse cx="42" cy="52" rx="11" ry="6" fill="#f5dce8" opacity=".5" transform="rotate(-30 42 52)" />
      <ellipse cx="60" cy="68" rx="11" ry="6" fill="#dce8f5" opacity=".5" transform="rotate(25 60 68)" />
      <ellipse cx="40" cy="82" rx="9" ry="5" fill="#ece0f5" opacity=".45" transform="rotate(-20 40 82)" />
      <ellipse cx="62" cy="38" rx="8" ry="5" fill="#f5dce8" opacity=".4" transform="rotate(18 62 38)" />
      <circle cx="56" cy="9" r="3.5" fill="#d4a0b8" opacity=".4" />
    </svg>
  );
}

// Five-petal blossom
function Blossom({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="80" height="80" viewBox="0 0 80 80" fill="none">
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <ellipse key={i} cx="40" cy="22" rx="7" ry="14" fill="#f9d8e8" opacity=".55"
          transform={`rotate(${deg} 40 40)`} />
      ))}
      <circle cx="40" cy="40" r="7" fill="#e8b0c8" opacity=".7" />
      <circle cx="40" cy="40" r="3.5" fill="#d08ca8" opacity=".8" />
    </svg>
  );
}

// Floating petal
function Petal({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="28" height="36" viewBox="0 0 28 36" fill="none">
      <path d="M14 2 Q22 10 20 22 Q16 32 14 34 Q12 32 8 22 Q6 10 14 2Z" fill="#f5d0e4" opacity=".6" />
    </svg>
  );
}

// Tiny line-art flower
function LineFlower({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
    >
      {/* flower glow */}
      <circle
        cx="36"
        cy="36"
        r="15"
        fill="url(#flowerGlow)"
        opacity="0.35"
      />

      {/* soft petals */}
      <g stroke="#d08ca8" strokeWidth="1" opacity="0.65">
        <path d="M36 34 C28 28 26 19 31 15 C35 12 40 15 40 20 C40 26 37 30 36 34Z" />
        <path d="M38 35 C42 26 50 21 54 25 C58 28 56 34 52 37 C47 41 42 39 38 35Z" />
        <path d="M38 38 C47 40 52 47 49 51 C46 55 40 53 37 49 C34 45 35 41 38 38Z" />
        <path d="M35 38 C33 47 27 53 22 50 C18 47 20 41 24 38 C28 35 32 36 35 38Z" />
        <path d="M34 35 C25 35 18 30 20 25 C22 20 28 21 32 24 C36 27 36 31 34 35Z" />
      </g>

      {/* inner flower */}
      <g stroke="#c87090" strokeWidth="0.8" opacity="0.7">
        <path d="M36 34 C32 29 33 25 36 24 C39 25 40 29 36 34Z" />
        <path d="M38 35 C43 31 46 33 46 36 C44 39 40 39 38 35Z" />
        <path d="M38 38 C41 42 39 45 36 45 C34 42 35 39 38 38Z" />
        <path d="M35 38 C31 42 28 40 28 37 C30 34 33 35 35 38Z" />
        <path d="M34 35 C30 33 29 30 31 28 C34 28 36 31 34 35Z" />
      </g>

      {/* center */}
      <circle cx="36" cy="36" r="3.5" fill="#e3a7bd" opacity="0.8" />
      <circle cx="36" cy="36" r="1.5" fill="#c87090" />

      {/* tiny botanical dots */}
      <circle cx="36" cy="9" r="1" fill="#c87090" opacity="0.5" />
      <circle cx="58" cy="36" r="1" fill="#b99adb" opacity="0.5" />
      <circle cx="36" cy="63" r="1" fill="#91b7ee" opacity="0.5" />
      <circle cx="14" cy="36" r="1" fill="#c87090" opacity="0.5" />

      <defs>
        <radialGradient id="flowerGlow">
          <stop offset="0%" stopColor="#e7b3d0" />
          <stop offset="100%" stopColor="#c9a0ea" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// Tiny leaf cluster
function LeafCluster({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="70" height="70" viewBox="0 0 70 70" fill="none">
      <path d="M35 60 Q20 45 22 28 Q24 12 35 10 Q46 12 48 28 Q50 45 35 60Z" fill="#dce8f0" opacity=".4" />
      <path d="M35 60 Q18 40 25 25 Q30 14 35 10" stroke="#a0b8c8" strokeWidth=".8" opacity=".35" />
      <path d="M35 60 Q52 40 45 25 Q40 14 35 10" stroke="#a0b8c8" strokeWidth=".8" opacity=".35" />
      <path d="M22 38 Q28 28 35 26" stroke="#a0b8c8" strokeWidth=".7" strokeLinecap="round" opacity=".3" />
      <path d="M48 38 Q42 28 35 26" stroke="#a0b8c8" strokeWidth=".7" strokeLinecap="round" opacity=".3" />
    </svg>
  );
}

// Dot-grid technical accent
function DotGrid({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="72" height="72" viewBox="0 0 72 72" fill="none" opacity=".18">
      {[0,1,2,3].map(r => [0,1,2,3].map(c => (
        <circle key={`${r}-${c}`} cx={9 + c*18} cy={9 + r*18} r="1.4" fill="#9090c0" />
      )))}
    </svg>
  );
}

// Thin horizontal rule with nodes
function TechLine({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="120" height="16" viewBox="0 0 120 16" fill="none" opacity=".22">
      <line x1="0" y1="8" x2="120" y2="8" stroke="#9090c0" strokeWidth=".8" />
      {[20,60,100].map(x => <circle key={x} cx={x} cy={8} r="2" fill="#9090c0" />)}
    </svg>
  );
}

// Sparkle cluster
function Sparkles({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="52" height="52" viewBox="0 0 52 52" fill="none">
      {[[8,8],[44,10],[18,42],[46,44],[26,4],[4,28]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="1.4" fill="#c87090" opacity={.28 + i*.06} />
          <path d={`M${x} ${y-5} L${x} ${y+5}M${x-5} ${y} L${x+5} ${y}`}
            stroke="#c87090" strokeWidth=".5" opacity=".18" />
        </g>
      ))}
    </svg>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id:1, title:"Smart Cane", subtitle:"IoT Assistive Device",
    period:"June 2026", category:"IoT · Proximity Detector",
    description:"IoT-based smart cane using ESP32 and ultrasonic sensors to help visually impaired people detect obstacles and improve mobility safety.",
    overview:"Developed an IoT-based Smart Cane prototype using ESP32 and an HC-SR04 ultrasonic sensor to detect obstacles based on distance and provide real-time alerts through LED and buzzer indicators.",
    purpose:"To develop an assistive technology prototype that helps visually impaired users detect nearby obstacles and navigate their surroundings more safely.",
    contribution:"Contributed to hardware assembly, ESP32 programming, HC-SR04 sensor integration, distance data collection, and implementation of the obstacle detection system.",
    impl:"Built the system using ESP32 and an HC-SR04 ultrasonic sensor to measure the distance between the user and surrounding obstacles. The detected distance is classified into Near, Medium, and Far categories, with LED and buzzer indicators providing automatic alerts based on the detected distance.",
    Result:"Successfully developed and tested a functional Smart Cane prototype capable of detecting nearby obstacles in real time and providing automatic alerts based on distance.",
    tech:["ESP32","C++","Ultrasonic","Arduino IDE","IoT","Edge Impulse"],
    outcome:"Successfully developed and tested a functional Smart Cane prototype capable of detecting nearby obstacles in real time and providing automatic alerts based on distance.",
    color:"from-rose-50 to-pink-50", accent:"#ff015e",
    imgId:"1573511860145-5a20d5c3e097",
  },
  {
    id:2, title:"ESP32 Non-Invasive Glucose Prototype", subtitle:"IoT",
    period:"Sep 2025", category:"IoT · Prototype",
    description:"Automated virtualized mail server deployment  using Ansible, Postfix, Dovecot, and Roundcube Webmail on Ubuntu Server.",
    overview:"Developed an ESP32-based non-invasive blood glucose monitoring prototype using a MAX30105 sensor to explore optical-based glucose measurement.",
    purpose:"To develop a prototype for monitoring glucose-related measurements using a non-invasive approach and explore the potential of IoT-based health monitoring.",
    contribution:"Contributed to hardware assembly, ESP32 programming, MAX30105 sensor integration, and data collection for the prototype.",
    impl:"Built the prototype using ESP32 and MAX30105 to collect optical sensor data. The sensor readings were processed by the ESP32 and used as the basis for developing a non-invasive glucose monitoring concept.",
    Result:"Successfully developed a functional prototype capable of collecting and processing sensor data through ESP32 for further exploration of non-invasive glucose monitoring.",
    tech:["ESP32","LM2956","MAX30105","Blood Glucose Sensor","Mobile Application","Arduino IDE","IoT"],
    outcome:"Functional prototype for collecting and processing optical sensor data using ESP32.",
    color:"from-blue-50 to-indigo-50", accent:"#7a9cd4",
    imgId:"1518770660439-4636190af475",
  },
  {
    id:3, title:"LAN Network Design and Physical Implementation Project — UKL", subtitle:"Network Engineering",
    period:"June 2025", category:"Networking · Linux",
    description:"Hands-on networking project: IPv4 subnetting, VLAN configuration with MikroTik and Ruijie switches, Linux web server, and HTTPS.",
    overview:"A LAN network design and physical implementation project completed as part of the TJAT Ujian Kenaikan Level 2025 at SMK Telkom Sidoarjo. The project covered network topology design using Cisco Packet Tracer and its implementation into a physical network using UTP cables, switches, wireless routers, and end-user devices.",
    purpose:"To develop practical skills in LAN network design, IP addressing, subnetting, physical network implementation, and connectivity troubleshooting.",
    contribution:"Designed the LAN topology in Cisco Packet Tracer, prepared the IP addressing and subnetting scheme, installed and organized UTP cables, connected network devices, and performed connectivity testing using ICMP ping.",
    impl:"The network topology was first designed and simulated using Cisco Packet Tracer before being implemented into a physical network. The implementation involved switches, wireless routers, UTP cables, and end-user devices, followed by IP address configuration and connectivity testing.",
    tech:["Cisco Packet Tracer","UTP Cabling","Switching","Wireless Router","IPv4","Subnetting","ICMP Ping"],
    outcome:"Successfully implemented the designed LAN infrastructure with working device-to-device communication. Connectivity was verified through ICMP ping testing to ensure the network operated as expected.",
    color:"from-violet-50 to-purple-50", accent:"#9a7ad4",
    imgId:"1558494949-ef010cbdcc31",
  },
  {
    id:4, title:"Linux Mail Server Deployment", subtitle:"LINUX",
    period:"July 2026", category:"Linux · Server Admin",
    description:"Non-invasive blood glucose monitoring prototype using ESP32 and MAX30105 sensor with real-time health data display.",
    overview:"Deployed and configured a local mail server using Ubuntu Server, Postfix, Dovecot, and Roundcube Webmail. The project covered email sending and receiving, webmail access, local user management, and mail communication within a local network.",
    purpose:"To develop practical Linux system administration skills through the deployment, configuration, troubleshooting, and testing of a functional local mail server.",
    contribution:"Installed and configured Ubuntu Server, Postfix as the SMTP service, Dovecot for IMAP, and Roundcube Webmail for browser-based email access. Created and managed local mail users, configured supporting services, and tested email communication between users.",
    impl:"Built the mail server environment on Ubuntu Server using Postfix for SMTP, Dovecot for IMAP, and Roundcube with Apache2, PHP, and MariaDB for webmail access. Configuration and troubleshooting were performed through the Linux CLI, followed by email communication testing within the local network.",
    tech:["Ubuntu Server","Postfix","Dovecot","Roundcube","Apache2","PHP","MariaDB","Linux CLI"],
    outcome:"Successfully deployed a functional local mail server that enabled users to send, receive, and access emails through Roundcube Webmail within the local network.",
    color:"from-rose-50 to-pink-50", accent:"#741ae3",
    imgId:"1576671081837-49e5a28ec53a",
  },
  {
    id:5, title:"LAMP Stack Deployment & Configuration", subtitle:"LINUX",
    period:"July 2026", category:"Linux · SysAdmin",
    description:"Complete LAN infrastructure for TJAT Ujian Kenaikan Level 2025 — topology in Cisco Packet Tracer and full physical implementation.",
    overview:"Deployed and configured a LAMP (Linux, Apache, MariaDB, PHP) environment on Ubuntu Server to host a PHP-based web application connected to a MariaDB database.",
    purpose:"To develop practical Linux system administration skills through web server deployment, database management, PHP integration, and application connectivity testing.",
    contribution:"Installed and configured Apache2, PHP, and MariaDB on Ubuntu Server, created and managed the database, connected the PHP application to MariaDB, and tested database connectivity through the web interface.",
    impl:"Set up Ubuntu Server as the hosting environment with Apache2 as the web server. Installed PHP and MariaDB, configured the database and PHP application, then connected the application to MariaDB and verified its functionality through a simple inventory-based web interface.",
    tech:["Ubuntu Server","Apache2","PHP","MariaDB","HTML","SQL"],
    outcome:"Successfully deployed a functional LAMP Stack environment with a PHP web application connected to MariaDB and accessible through the web server.",
    color:"from-teal-50 to-cyan-50", accent:"#ff0bda",
    imgId:"1544197150-8658a1be3c88",
  },
  {
    id:6, title:"Home Network Infrastructure", subtitle:"Cisco",
    period:"July 2026", category:"Cisco · Infrastructure",
    description:"Simulated the design and configuration of a home network infrastructure using Cisco Packet Tracer 8.2.2, connecting wired and wireless devices through a router, switch, and wireless access point.",
    overview:"Video demonstration covering the complete LAN implementation workflow from Cisco Packet Tracer design through physical network deployment and testing.",
    purpose:"To develop practical skills in home network design, IP addressing, DHCP configuration, wireless networking, and connectivity testing.",
    contribution:"Designed the network topology, configured router interfaces and DHCP, configured the switch and wireless access point, assigned network settings, and performed connectivity testing across connected devices.",
    impl:"The network was designed and simulated using Cisco Packet Tracer 8.2.2. The implementation included Router R1, Switch SW1, Wireless Access Point AP1, PC, laptop, smartphone, and printer, with DHCP allocation, wireless SSID and security configuration, and network connectivity testing.",
    tech:["Cisco Packet Tracer","IPv4","DHCP","Wireless","Networking"],
    outcome:"Successfully configured a functional home network where wired and wireless devices could obtain IP addresses through DHCP and communicate with each other.",
    color:"from-amber-50 to-orange-50", accent:"#018065",
    imgId:"1516321497487-e288fb19713f",
  },
  {
    id:7, title:"VLAN & Inter-VLAN Routing", subtitle:"Cisco",
    period:"2024 – 2025", category:"Cisco · Infrastructure",
    description:"Collection of Cisco networking projects: Home Network Infrastructure and VLAN with Inter-VLAN Routing.",
    overview:"A Cisco networking simulation focused on VLAN segmentation and Inter-VLAN Routing using the Router-on-a-Stick approach in Cisco Packet Tracer.",
    purpose:"To develop practical skills in VLAN configuration, trunking, subnet segmentation, and routing between different VLAN networks.",
    contribution:"Designed the VLAN topology, configured VLANs and access ports, established trunk connections, configured router sub-interfaces, and verified communication between VLANs.",
    impl:"The network was simulated using Cisco Packet Tracer with VLAN segmentation, 802.1Q trunking, router sub-interfaces, and default gateway configuration to enable communication between different VLANs.",
    tech:["Cisco Packet Tracer","VLAN","802.1Q Trunking","Inter-VLAN Routing","Router-on-a-Stick","IPv4"],
    outcome:"Successfully configured Inter-VLAN Routing, allowing devices in different VLANs to communicate through the router.",
    color:"from-sky-50 to-blue-50", accent:"#7aacd4",
    imgId:"1545987796-60df6d8b7a54",
  },
  {
    id:8, title:"Linux Server & Web Service Deployment", subtitle:"LINUX",
    period:"Nov 2025", category:"Linux · Web Server · System Administration",
    description:"Linux sysadmin project collection: Mail Server (Postfix/Dovecot/Roundcube), LAMP Stack, and the WIRE HOUSE Inventory Management System.",
    overview:"A collection of Linux server administration projects covering server setup, service configuration, web and mail server deployment, troubleshooting, and system documentation.",
    purpose:"To develop practical Linux system administration skills through hands-on server deployment and service configuration.",
    contribution:"Configured and administered Ubuntu Server environments, deployed mail and web services, configured LAMP stack applications, and developed the WIRE HOUSE inventory system using PHP and MySQL.",
    impl:"Ubuntu Server deployed in a virtualized environment. Postfix, Dovecot, and Roundcube were configured for mail services, while Apache, PHP, and MariaDB were used for web application deployment. The WIRE HOUSE inventory system was developed using PHP and MySQL.",
    tech:["VirtualBox","Linux","Postfix","Dovecot","Apache","Roundcube","PHP","MariaDB","MySQL","Ubuntu Server"],
    outcome:"Successfully deployed and configured multiple Linux-based services, with an ongoing inventory management system serving as a practical application of server and web administration skills.",
    color:"from-violet-50 to-purple-50", accent:"#00e9e9",
    imgId:"1629654297299-c96aede71fbb",
  },
  {
    id:9, title:"Cisco Network Infrastructure & Configuration", subtitle:"Cisco",
    period:"Jan 2026", category:"Cisco · Infrastructure",
    description:"Cisco network engineering collection: home networks, VLANs, inter-VLAN routing, DHCP, wireless networking, and systematic troubleshooting.",
    overview:"A comprehensive portfolio of Cisco network infrastructure projects spanning home, branch, and small-enterprise scenarios.",
    purpose:"To demonstrate end-to-end network administration capabilities through practical network design, configuration, and connectivity testing.",
    contribution:"Designed network topologies, configured VLANs and DHCP, planned IPv4 addressing, established wireless connectivity, and performed network troubleshooting and verification.",
    impl:"Built and simulated network infrastructures using Cisco Packet Tracer, including VLAN segmentation, DHCP configuration, wireless access, WAN connectivity, and routing between network segments.",
    tech:["Cisco Packet Tracer","DHCP","VLAN","Wireless","IPv4","Troubleshooting","Routing"],
    outcome:"Successfully implemented functional network infrastructures with verified connectivity across multiple network segments.",
    color:"from-green-50 to-emerald-50", accent:"#30470e",
    imgId:"1597436985543-5cb34e74a9be",
  },
];

const CERTIFICATES = [
  {
    id: 1,
    title: "Smart Solution with IoT Competition 2025 Participant",
    org: "Universitas Mercu Buana",
    date: "Sep 2025",
    color: "#7AACD4",
    image: "/erikaIOT.png"
  },
  {
    id: 2,
    title: "NETCOMP 4.0 Networking Competition Participant",
    org: "Universitas Gadjah Mada",
    date: "Jan 2026",
    color: "#9A7AD4",
    image: "/netcomerika.png",
  },
  {
    id: 3,
    title: "Docker Fundamental",
    org: "Btech Academy",
    date: "Mar 2026",
    color: "#1BA0D7",
    image: "/dockerfundamental.png"
  },
  {
    id: 4,
    title: "Linux System Administration",
    org: "Btech Academy",
    date: "Feb 2026",
    color: "#C87090",
    image: "/certificate-LinuxsysAd.png"
  },
  {
    id: 5,
    title: "Automation with Ansible II: Ansible Tower (DO409)",
    org: "Btech Academy",
    date: "Mar 2026",
    color: "#E14949",
    image: "/certificate-AnsibleII.png",
  },
  {
    id: 6,
    title: "Own Your Cloud Journey with OpenStack",
    org: "ID-Networkers (IDN.ID)",
    date: "Oct 2025",
    color: "#EE3124",
    image: "/openurcloud.png",
  },
  {
    id: 7,
    title: "Jaringan Komputer Dasar",
    org: "ID-Networkers (IDN.ID)",
    date: "Aug 2025",
    color: "#1BA0D7",
    image: "/jaringandasar.png",
  },
  {
    id: 8,
    title: "Cisco dasar",
    org: "ID-Networkers (IDN.ID)",
    date: "Sep 2025",
    color: "#1BA0D7",
    image: "/ciscodasar.png",
  },
  {
    id: 9,
    title: "Belajar Linux dari Nol",
    org: "Btech Academy",
    date: "Feb 2026",
    color: "#1BA0D7",
    image: "/belajarlinudarinol.png",
  },
  {
    id: 10,
    title: "Preparation Course for Azure AI Fundamentals (AI-900)",
    org: "Microsoft",
    date: "Aug 2025",
    color: "#EE0000",
    image: "/azureAIfundamental.png",
  },
];

const SKILLS = [
  { name:"Linux", image:"/linux.jpg", sub:"Bash · Server · CLI" },
  { name:"Networking", image:"/networking.jpg", sub:"TCP/IP · VLAN · DNS" },
  { name:"MikroTik", image:"/mikrotik.jpg", sub:"RouterOS · Firewall · Routing" },
  { name:"Cisco", image:"/cisco.jpg", sub:"IOS · Packet Tracer · Routing" },
  { name:"Ubuntu", image:"/ubuntu.jpg", sub:"Server · LTS · CLI" },
  { name:"GitHub", image:"/github.jpg", sub:"Git · Repository · Version Control" },
  { name:"Virtual Box", image:"/virtualbox.jpg", sub:"VM · Virtualization · Networking" },
  { name:"Xampp", image:"/Xampp.jpg", sub:"Apache · MySQL · PHP" },
];

const ACTIVITIES = [
  {
    id: 1,
    title: "Pre-Internship Trainee",
    org: "KB-TK Islam Al Wafa & PKBM Al Wafa",
    date: "Apr-May 2026",
    type: "Internship",
    image: "/webPKL.jpg",
    color: "#9A7AD4",
    description:
      "Team project at KB-TK Islam Al Wafa and PKBM Al Wafa that transformed manual attendance into an automated card-based system with WhatsApp notifications for parents.\n\nRoles:\n• AI Team: Backend & frontend development\n• NSA Team: Deployment & Ngrok accessibility\n• SMS Team: Social media & UI design support",
  },

  {
    id: 2,
    title: "AI Education Volunteer",
    org: "AI Education Volunteer – Skomda Mengajar",
    date: "Feb 2026",
    type: "Education",
    image: "/pkl-AI.png",
    color: "#9A7AD4",
    description:
      "Participated in SYC, an educational volunteering program at SMP Negeri 1 Candi Sidoarjo, by introducing basic programming concepts through HTML and CSS and assisting students in creating simple web pages."
  },

  {
    id: 3,
    title: "Programming Basic Education Volunteer",
    org: "AI Education Volunteer – Skomda Mengajar",
    date: "Feb 2025",
    type: "Education",
    image: "/pkl-PROGRAMING.png",
    color: "#9A7AD4",
    description:
      "Participated in Skomda Mengajar, an educational program introducing basic Artificial Intelligence concepts to students at SMP Negeri 1 Sidoarjo through hands-on learning with Google Teachable Machine.",
  },
];
// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["HOME","ABOUT","PROJECTS","SKILLS","ACTIVITIES","CERTIFICATES","CONTACT"];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-white/92 backdrop-blur-md shadow-sm shadow-pink-100/40 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="font-serif text-xl font-semibold text-[#3a2030] tracking-wide">
          ҽɾყƙαα<span className="text-[#c87090]">.</span>
        </a>
        <div className="hidden md:flex gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
        <button className="md:hidden text-[#5c3d54]" onClick={() => setOpen(!open)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open
              ? <><path d="M4 4L18 18M4 18L18 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>
              : <><line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="3" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>
            }
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white/96 px-6 py-4 flex flex-col gap-4 border-t border-pink-100/60">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" onClick={() => setOpen(false)}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [hovered, setHovered] = useState(false);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);
  const floralRef = useRef<HTMLDivElement>(null);

  useParallax(glowRef1 as React.RefObject<HTMLElement>, 0.06);
  useParallax(glowRef2 as React.RefObject<HTMLElement>, -0.04);
  useParallax(floralRef as React.RefObject<HTMLElement>, 0.08);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white pt-24 pb-20">
      {/* Very subtle tinted gradient wash — nearly white */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf8fc] via-white to-[#f6f9fe] pointer-events-none" />

      {/* Ambient glows */}
      <div ref={glowRef1} className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#fce8f0]/50 to-[#e8f0fc]/30 blur-3xl animate-glow-drift pointer-events-none" />
      <div ref={glowRef2} className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-bl from-[#ece4f8]/30 to-transparent blur-3xl animate-glow-drift pointer-events-none" style={{ animationDelay:"3s" }} />

      {/* Botanical decorations */}
      <div ref={floralRef} className="absolute top-20 right-12 pointer-events-none">
        <BotanicBranch className="animate-float-slow opacity-70" />
      </div>
      <div className="absolute bottom-24 left-8 pointer-events-none">
        <Blossom className="animate-float-medium opacity-60" />
      </div>
      <div className="absolute top-32 left-16 pointer-events-none">
        <Sparkles className="animate-float-slow opacity-55" style={{ animationDelay:"1s" }} />
      </div>
      <div className="absolute bottom-40 right-10 pointer-events-none">
        <DotGrid className="opacity-70" />
      </div>
      <div className="absolute top-1/2 left-4 pointer-events-none">
        <TechLine className="rotate-90 opacity-50" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center">
        {/* ── Text ── */}
        <div className="order-2 md:order-1">
          {/* Pill label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce8f0]/70 border border-[#e8b0c8]/30 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c87090] animate-shimmer" />
            <span className="text-[.64rem] tracking-[.16em] font-medium text-[#a05878] uppercase">Network System Administrator</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-text-[2.8rem] sm:text-[3.4rem] md:text-[5rem] font-bold text-[#1e1624] leading-[1.02] mb-2">
            Hi, I'm
          </h1>
          <h1 className="font-serif text-[3.8rem] md:text-[5rem] font-bold leading-[1.02] mb-6">
            <span className="bg-gradient-to-r from-[#b05878] via-[#c87090] to-[#7a78c4] bg-clip-text text-transparent">Eryka</span>
          </h1>

          {/* Identity tags */}
          <div className="space-y-0.5 mb-6">
            <p className="text-[.72rem] tracking-[.18em] text-[#9a7a8a] uppercase font-medium">SMK Telkom Sidoarjo</p>
            <p className="text-[.72rem] tracking-[.18em] text-[#9a7a8a] uppercase font-medium">Teknik Jaringan Akses Telekomunikasi</p>
          </div>

          <p className="text-[#5c4460] leading-relaxed mb-7 max-w-md text-[.93rem]">
            Focused on <span className="text-[#b05878] font-medium">network system administration</span>, Linux server management, infrastructure configuration, and systematic network troubleshooting — building real skills through hands-on technical projects.
          </p>

          {/* Principle */}
          <p className="font-serif italic text-[#c87090] text-lg tracking-wide mb-8">
            Learn. Build. Grow.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a href="#projects"
              className="btn-primary px-7 py-3 rounded-full bg-gradient-to-r from-[#b05878] to-[#c87090] text-white text-[.72rem] tracking-[.12em] uppercase font-medium shadow-lg shadow-[#c87090]/25">
              View My Projects
            </a>
           <a
  href="/CV-Eryka-Ayudya.pdf"
  download
  className="btn-outline px-7 py-3 rounded-full border border-[#c87090]/35 text-[#b05878] text-[.72rem] tracking-[.12em] uppercase font-medium"
>
  Download CV
</a>
          </div>
        </div>

        {/* ── Photo ── */}
        <div className="order-1 md:order-2 flex justify-center items-center relative">
          {/* Glow layers */}
          <div className={`absolute w-72 h-72 rounded-full transition-all duration-700 animate-glow-drift bg-gradient-to-br from-[#fce8f0]/60 to-[#e8ecfc]/40 blur-2xl pointer-events-none ${hovered ? "scale-115 opacity-80" : "opacity-50"}`} />
          <div className={`absolute w-60 h-60 rounded-full transition-all duration-700 animate-glow-drift bg-gradient-to-bl from-[#ece8fc]/40 to-transparent blur-2xl pointer-events-none ${hovered ? "scale-110 opacity-60" : "opacity-35"}`} style={{ animationDelay:"2s" }} />

          {/* Decorative ring */}
          <svg className="absolute w-[340px] h-[340px] animate-float-slow opacity-20 pointer-events-none" viewBox="0 0 300 300" fill="none">
            <circle cx="150" cy="150" r="125" stroke="#c87090" strokeWidth=".6" strokeDasharray="5 9" />
            <circle cx="150" cy="150" r="140" stroke="#7a9cd4" strokeWidth=".4" strokeDasharray="3 14" />
          </svg>

          {/* Floating botanical near photo */}
          <LineFlower className="absolute -top-6 -right-6 animate-petal opacity-50 pointer-events-none" />
          <Petal className="absolute -bottom-4 -left-4 animate-petal opacity-45 pointer-events-none" style={{ animationDelay:"3s" }} />

          {/* Photo */}
          <div
            className="relative z-10"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className={`photo-frame w-60 h-72 md:w-68 md:h-80 overflow-hidden shadow-2xl shadow-[#c87090]/20 transition-all duration-700 ${hovered ? "rotate-0 scale-105" : "-rotate-2"}`}
              style={{ width: "clamp(220px, 30vw, 280px)", height: "clamp(270px, 38vw, 340px)" }}>
              <img
                src="./erika.jpg"
                alt="Eryka Ayudya — Network System Administrator"
                className="w-full h-full object-cover"
                style={{ filter: hovered ? "brightness(1.05) saturate(1.08)" : "brightness(1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fce8f0]/15 to-transparent pointer-events-none" />
            </div>

            {/* Tag */}
            <div className={`absolute -bottom-5 -right-5 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2.5 shadow-lg shadow-pink-100/70 border border-[#f5e0ec]/60 transition-all duration-500 ${hovered ? "translate-x-1 translate-y-1" : ""}`}>
              <p className="text-[.58rem] text-[#a05878] tracking-widest uppercase font-medium">Open to</p>
              <p className="text-[.75rem] text-[#3a2030] font-semibold">Collaboration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave transition — very pale blush */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full h-16" fill="#fdf4f8">
          <path d="M0,35 C360,65 720,5 1080,35 C1260,50 1380,20 1440,30 L1440,70 L0,70 Z" />
        </svg>
      </div>
    </section>
  );
}

// ─── ABOUT (editorial / open) ─────────────────────────────────────────────────

function About() {
  const branchRef = useRef<HTMLDivElement>(null);
  useParallax(branchRef as React.RefObject<HTMLElement>, -0.07);

  return (
    <section id="about" className="relative bg-[#fdf4f8] py-24 overflow-hidden">
      <div ref={branchRef} className="absolute top-8 right-10 pointer-events-none">
        <BotanicBranch className="animate-float-slow opacity-50" />
      </div>
      <DotGrid className="absolute bottom-10 left-8 pointer-events-none opacity-60" />
      <TechLine className="absolute top-16 left-1/2 pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Editorial intro — open layout, no cards */}
        className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-16 items-start"
          {/* Left column */}
          <div>
            <p className="reveal text-[.62rem] tracking-[.2em] uppercase text-[#a07888] mb-4 font-medium">Who I Am</p>
            <h2 className="reveal font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#1e1624] leading-[1.05] mb-8" style={{ transitionDelay:".1s" }}>
              Get to<br /><em className="text-[#c87090] not-italic">Know Me</em>
            </h2>
            <p className="reveal text-[#5c4460] text-[.93rem] leading-relaxed max-w-xs" style={{ transitionDelay:".2s" }}>
              I'm learning and developing skills in <span className="font-medium text-[#1e1624]">Network System Administration</span> — building hands-on experience through real infrastructure projects, Linux server work, and systematic network configuration.
            </p>
          </div>

    {/* Center divider with neon floral */}
<div className="hidden md:flex flex-col items-center pt-16">

  {/* Neon line - top */}
  <div className="relative w-px h-16 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e8b0c8]/50 to-transparent" />

    <div
      className="absolute left-1/2 -translate-x-1/2 w-[3px] h-10 rounded-full"
      style={{
        background:
          "linear-gradient(to bottom, transparent, #f58fbd, #c9a0ea, transparent)",
        boxShadow:
          "0 0 6px #f58fbd, 0 0 14px rgba(201,160,234,.8)",
        animation: "neonTravel 3s ease-in-out infinite",
      }}
    />
  </div>

  {/* Flower + Neon Glow */}
  <div className="relative my-3 w-14 h-14 flex items-center justify-center">

    {/* Glow */}
    <div
      className="absolute -inset-4 rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(circle, rgba(245,143,189,.4), rgba(201,160,234,.25), transparent 70%)",
        filter: "blur(7px)",
        animation: "neonFlowerPulse 2.4s ease-in-out infinite",
      }}
    />

    {/* Flower */}
    <div
  className="relative z-10 w-10 h-10 flex items-center justify-center"
  style={{
  animation: "none",
}}
>
  {/* Glowing diamond */}
  <div
    className="w-6 h-6 rotate-45 border border-[#c9a0ea]"
    style={{
      boxShadow:
        "0 0 6px rgba(245,143,189,.7), 0 0 16px rgba(201,160,234,.6)",
      background:
        "linear-gradient(135deg, rgba(245,143,189,.08), rgba(201,160,234,.08))",
        boxShadow:
  "0 0 4px rgba(245,143,189,.5), 0 0 10px rgba(201,160,234,.45)",
    }}
  />
</div>

  </div>

  {/* Neon line - bottom */}
  <div className="relative w-px h-16 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#b0c8e8]/50 to-transparent" />

    <div
      className="absolute left-1/2 -translate-x-1/2 w-[3px] h-10 rounded-full"
      style={{
        background:
          "linear-gradient(to bottom, transparent, #c9a0ea, #91b7ee, transparent)",
        boxShadow:
          "0 0 6px #c9a0ea, 0 0 14px rgba(145,183,238,.8)",
        animation: "neonTravel 3s ease-in-out infinite",
        animationDelay: "1.5s",
      }}
    />
  </div>

</div>
          {/* Right column — identity labels */}
          <div className="space-y-6 pt-2">
            {[
              { label:"School", value:"SMK Telkom Sidoarjo", color:"#c87090" },
              { label:"Program", value:"Teknik Jaringan Akses Telekomunikasi", color:"#7a9cd4" },
              { label:"Focus", value:"Network System Administration", color:"#9a7ad4" },
            ].map((item, i) => (
              <div key={item.label} className="reveal" style={{ transitionDelay:`${.15 + i*.12}s` }}>
                <p className="text-[.6rem] tracking-[.18em] uppercase font-medium mb-0.5" style={{ color: item.color }}>{item.label}</p>
                <p className="font-serif text-lg font-semibold text-[#1e1624] leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interest line */}
        <div className="reveal mt-16 pt-10 border-t border-[#f0dce8]/60 flex flex-wrap gap-6 items-center" style={{ transitionDelay:".3s" }}>
          <span className="text-[.6rem] tracking-[.2em] uppercase text-[#a07888] font-medium">Interests</span>
          {["Networking","Linux Servers","Infrastructure","Cisco","MikroTik","Troubleshooting"].map(t => (
            <span key={t} className="text-[.8rem] text-[#5c4460] font-medium border-b border-[#e8b0c8]/50 pb-px hover:border-[#c87090] hover:text-[#c87090] transition-colors duration-200 cursor-default">{t}</span>
          ))}
        </div>
      </div>

      {/* Wave out */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-14" fill="white">
          <path d="M0,20 C480,55 960,5 1440,28 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10" onClick={onClose}>
      <div className="absolute inset-0 bg-[#1e1624]/55 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl shadow-[#c87090]/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{ animation: "reveal-up .4s ease-out both" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`h-52 bg-gradient-to-br ${project.color} rounded-t-3xl relative overflow-hidden`}>

          {project.id === 3 ? (
            <video
              controls
             playsInline
    src="/UKL.mp4"
    className="absolute inset-0 w-full h-full object-contain bg-black z-10"
            />
          ) : (
            <img
              src={
                project.id === 1
                  ? "/smartcane.png"
                  : project.id === 2
                  ? "/glucose.png"
                   :  project.id === 4
                  ? "/mailserver.png"
                  : project.id === 5
                  ? "/LAMPSTACK.png"
                  : project.id === 6
                  ? "/Home-Network-infrastructure.png"
                  : project.id === 7
                  ? "/IntervlanRouting.png"
                  : project.id === 8
                  ? "/Linuxweb.png"
                  : project.id === 9
                  ? "/ciscoIT.png"
                  : `https://images.unsplash.com/photo-${project.imgId}?w=800&h=320&fit=crop&auto=format`
              }
              alt={project.title}
              className="absolute inset-0 w-full h-full object-contain opacity-80"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />

          <div className="absolute bottom-5 left-6 right-12">
            <span className="inline-block text-[.6rem] tracking-[.15em] uppercase font-medium px-2.5 py-1 rounded-full bg-white/40 backdrop-blur-sm text-[#1e1624] mb-2">
              {project.category}
            </span>

            <h2 className="font-serif text-2xl font-bold text-[#1e1624] leading-tight">
              {project.title}
            </h2>

            <p className="text-[.73rem] text-[#5c4460] mt-0.5">
              {project.period}
            </p>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-[#5c4460] text-lg transition-colors"
          >
            ×
          </button>

        </div>

        {/* Body */}
        {/* Body */}
        <div className="p-6 space-y-5">
          {[
            { label:"Overview", text: project.overview },
            { label:"Purpose", text: project.purpose },
            { label:"My Contribution", text: project.contribution },
            { label:"Implementation", text: project.impl },
            { label:"Result", text: project.outcome },
          ].map(s => (
            <div key={s.label}>
              <h4 className="text-[.63rem] tracking-[.15em] uppercase font-semibold text-[#c87090] mb-1.5">{s.label}</h4>
              <p className="text-[#3a2840] text-[.88rem] leading-relaxed">{s.text}</p>
            </div>
          ))}

          {/* Tech tags */}
          <div>
            <h4 className="text-[.63rem] tracking-[.15em] uppercase font-semibold text-[#c87090] mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-full bg-[#fce8f0] text-[#a05878] text-[.68rem] font-medium border border-[#e8c0d0]/35">{t}</span>
              ))}
            </div>
          </div>

          <a href="https://github.com/erikaayudyaa" target="_blank" rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c87090]/35 text-[#b05878] text-[.72rem] tracking-wider uppercase font-medium hover:bg-[#fce8f0] transition-colors duration-200">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function Projects() {
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);
  const leafRef = useRef<HTMLDivElement>(null);
  useParallax(leafRef as React.RefObject<HTMLElement>, -0.05);

  return (
    <section id="projects" className="relative bg-white py-24 overflow-hidden">
      {/* Subtle tinted wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#faf6fe]/40 to-white pointer-events-none" />

      <div ref={leafRef} className="absolute top-16 right-6 pointer-events-none">
        <LeafCluster className="animate-float-slow opacity-40" />
      </div>
      <Sparkles className="absolute bottom-20 left-10 animate-float-medium opacity-45 pointer-events-none" style={{ animationDelay:"2s" }} />
      <DotGrid className="absolute top-12 left-8 pointer-events-none opacity-50" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="reveal text-[.62rem] tracking-[.2em] uppercase text-[#a07888] mb-3 font-medium">Portfolio</p>
          <h2 className="reveal font-serif text-5xl md:text-6xl font-bold text-[#1e1624]" style={{ transitionDelay:".1s" }}>Selected Works</h2>
          <div className="reveal mt-3 w-20 h-[1.5px] bg-gradient-to-r from-[#c87090] to-[#7a9cd4]" style={{ transitionDelay:".2s" }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="proj-card reveal reveal-scale group text-left rounded-3xl overflow-hidden border border-[#f0e0ec]/60 shadow-sm bg-white cursor-pointer"
              style={{ transitionDelay:`${.1 + i * .07}s` }}
            >
              {/* Image strip */}
              <div className={`h-28 sm:h-40 bg-gradient-to-br ${p.color} relative overflow-hidden`}>
             <img
             src={
             p.id === 1
             ? "/smartcane.png"
              : p.id === 2
               ? "/glucose.png"
                : p.id === 3
                ? "/UKL.jpg"
                : p.id === 4
                ? "/mailserver.png"
                : p.id === 5
                ? "/LAMPSTACK.png"
                : p.id === 6
                ? "/Home-Network-infrastructure.png"
                : p.id === 7
                ? "/IntervlanRouting.png"
                : p.id === 8
                ? "/Linuxweb.png"
                : p.id === 9
                ? "/ciscoIT.png"
               : `https://images.unsplash.com/photo-${p.imgId}?w=420&h=200&fit=crop&auto=format`
  }
  alt={p.title}
className={`absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-100 transition-opacity duration-500 ${
  p.id === 3 ? "object-[center_65%]" : "object-center"
}`}
/>
                <div className="absolute inset-0 bg-gradient-to-t from-white/15 to-transparent" />
                <span className="absolute top-3 left-3 text-[.6rem] tracking-[.12em] uppercase font-medium px-2 py-0.5 rounded-full bg-white/65 backdrop-blur-sm" style={{ color: p.accent }}>
                  {p.category}
                </span>
                <span className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-xs text-[#5c4460] opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
              {/* Content */}
              <div className="p-3 sm:p-5">
                <h3 className="font-serif font-semibold text-[#1e1624] text-[.8rem] sm:text-[.95rem] leading-snug mb-1">{p.title}</h3>
                <p className="text-[.63rem] text-[#9a7a8a] mb-2">{p.period}</p>
                <p className="text-[#5c4460] text-[.8rem] leading-relaxed line-clamp-2">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.tech.slice(0,3).map(t => (
                    <span key={t} className="text-[.58rem] px-2 py-0.5 rounded-full bg-[#fce8f0]/70 text-[#a05878] border border-[#e8c0d0]/30">{t}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-14" fill="#f4f8fe">
          <path d="M0,38 C360,8 720,55 1080,22 C1260,6 1380,48 1440,32 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}

// ─── SKILLS (compact circle icons) ───────────────────────────────────────────

function Skills() {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const blossomRef = useRef<HTMLDivElement>(null);
  useParallax(blossomRef as React.RefObject<HTMLElement>, 0.06);

  return (
    <section id="skills" className="relative bg-[#f4f8fe] py-20 overflow-hidden">
      <div ref={blossomRef} className="absolute top-8 right-12 pointer-events-none">
        <Blossom className="animate-float-medium opacity-45" />
      </div>
      <Petal className="absolute bottom-12 left-10 animate-petal opacity-40 pointer-events-none" style={{ animationDelay:"4s" }} />
      <TechLine className="absolute bottom-16 right-1/3 pointer-events-none opacity-40" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="reveal text-[.62rem] tracking-[.2em] uppercase text-[#7a8aaa] mb-3 font-medium">Stack</p>
        <h2 className="reveal font-serif text-5xl md:text-6xl font-bold text-[#1e1624] mb-3" style={{ transitionDelay:".1s" }}>Technical Skills</h2>
        <p className="reveal text-[#6a7090] text-[.88rem] max-w-sm mx-auto mb-12" style={{ transitionDelay:".2s" }}>
          Focused on Network System Administration, built through real projects and hands-on labs.
        </p>

        {/* Circular icons — editorial cluster */}
        <div className="reveal flex flex-wrap justify-center gap-6 md:gap-8" style={{ transitionDelay:".25s" }}>
          {SKILLS.map((s, i) => (
            <div
              key={s.name}
              className="relative flex flex-col items-center gap-2 cursor-default"
              onMouseEnter={() => setTooltip(s.name)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Circle */}
              <div
                className="skill-circle w-16 h-16 rounded-full bg-white shadow-sm shadow-[#c87090]/10 border border-[#f0e0ec]/60 flex items-center justify-center text-2xl"
                style={{ animationDelay:`${i * .12}s` }}
              >
                <img
               src={s.image}
                alt={s.name}
                  className="w-9 h-9 object-contain"
                  />
              </div>
              <span className="text-[.62rem] text-[#7a6880] tracking-wide font-medium">{s.name}</span>

              {/* Tooltip */}
              {tooltip === s.name && (
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1e1624] text-white text-[.6rem] tracking-wide px-2.5 py-1 rounded-full pointer-events-none"
                  style={{ animation:"fade-in .15s ease" }}>
                  {s.sub}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Small tech pill row */}
        <div className="reveal mt-10 flex flex-wrap justify-center gap-2" style={{ transitionDelay:".35s" }}>
          {["RouterOS","Cisco Packet Tracer","Postfix","Dovecot","Apache","Roundcube","VirtualBox","UTP Cabling","IPv4","VLAN","DHCP","HTTPS"].map(t => (
            <span key={t} className="px-3 py-1 rounded-full bg-white/70 text-[#4a5870] text-[.68rem] font-medium border border-[#ccd8ec]/50 hover:border-[#7a9cd4]/50 hover:text-[#5a78b4] transition-all duration-200">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-14" fill="white">
          <path d="M0,18 C480,54 960,3 1440,28 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}

// ─── ACTIVITIES ───────────────────────────────────────────────────────────────

function Activities() {
  const [expanded, setExpanded] =
    useState<typeof ACTIVITIES[0] | null>(null);

  return (
    <section
      id="activities"
      className="relative bg-white py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f8f4fd]/50 to-white pointer-events-none" />

      <Sparkles className="absolute top-12 right-10 animate-float-medium opacity-40 pointer-events-none" />
      <DotGrid className="absolute bottom-12 left-8 pointer-events-none opacity-45" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-14">
          <p className="reveal text-[.62rem] tracking-[.2em] uppercase text-[#9a7a8a] mb-3 font-medium">
            Experience
          </p>

          <h2
            className="reveal font-serif text-5xl md:text-6xl font-bold text-[#1e1624]"
            style={{ transitionDelay: ".1s" }}
          >
            Activities & Experience
          </h2>

          <div
            className="reveal mt-3 w-20 h-[1.5px] bg-gradient-to-r from-[#9A7AD4] to-[#C87090]"
            style={{ transitionDelay: ".2s" }}
          />
        </div>

        {/* Activity cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {ACTIVITIES.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setExpanded(a)}
              className="reveal reveal-scale group text-left rounded-3xl overflow-hidden border border-[#f0e0ec]/60 shadow-sm bg-white cursor-pointer hover:shadow-md transition-all duration-300"
              style={{ transitionDelay: `${.1 + i * .07}s` }}
            >

              {/* Image */}
              <div
                className="h-28 sm:h-40 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${a.color}18, ${a.color}06)`
                }}
              >
                <img
                  src={a.image}
                  alt={a.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <span
                  className="absolute top-3 left-3 text-[.6rem] tracking-[.12em] uppercase font-medium px-2.5 py-1 rounded-full bg-white/75 backdrop-blur-sm"
                  style={{ color: a.color }}
                >
                  {a.type}
                </span>

                <span className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-xs text-[#5c4460] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  →
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif font-semibold text-[#1e1624] text-[.95rem] leading-snug mb-1">
                  {a.title}
                </h3>

                <p className="text-[.63rem] text-[#9a7a8a] mb-1">
                  {a.org}
                </p>

                <p
                  className="text-[.6rem] font-semibold"
                  style={{ color: a.color }}
                >
                  {a.date}
                </p>
              </div>

            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setExpanded(null)}
        >
          <div className="absolute inset-0 bg-[#1e1624]/60 backdrop-blur-md" />

          <div
            className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ animation: "reveal-up .35s ease-out both" }}
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setExpanded(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#9a7a8a] text-lg hover:bg-[#fce8f0] transition-colors"
            >
              ×
            </button>

            {/* Large Image */}
            <div className="w-full bg-[#faf8fc] flex items-center justify-center p-5 md:p-8">
              <img
                src={expanded.image}
                alt={expanded.title}
                className="max-w-full max-h-[55vh] object-contain rounded-xl shadow-md"
              />
            </div>

            {/* Info */}
            <div className="px-6 py-6 text-center border-t border-[#eee5f5]">
              <p
                className="text-[.6rem] uppercase tracking-[.15em] font-medium mb-2"
                style={{ color: expanded.color }}
              >
                {expanded.type}
              </p>

              <h3 className="font-serif text-2xl font-bold text-[#1e1624]">
                {expanded.title}
              </h3>

              <p className="text-sm text-[#9a7a8a] mt-1">
                {expanded.org}
              </p>

              <p className="text-xs text-[#6a5c70] mt-1">
                {expanded.date}
                <p className="text-sm text-[#5c4460] leading-relaxed mt-4 max-w-2xl mx-auto text-left">
  {expanded.description}
</p>
              </p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────

function Certificates() {
  const [expanded, setExpanded] = useState<typeof CERTIFICATES[0] | null>(null);
  const leafRef2 = useRef<HTMLDivElement>(null);
  useParallax(leafRef2 as React.RefObject<HTMLElement>, -0.06);

  return (
    <section id="certificates" className="relative bg-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#fdf4f8]/30 to-white pointer-events-none" />

      <div ref={leafRef2} className="absolute top-10 left-8 pointer-events-none">
        <BotanicBranch className="animate-float-slow opacity-35 -scale-x-100" />
      </div>
      <Sparkles className="absolute bottom-16 right-10 animate-float-medium opacity-45 pointer-events-none" />
      <DotGrid className="absolute top-10 right-8 pointer-events-none opacity-45" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="reveal text-[.62rem] tracking-[.2em] uppercase text-[#a07888] mb-3 font-medium">Credentials</p>
          <h2 className="reveal font-serif text-5xl md:text-6xl font-bold text-[#1e1624]" style={{ transitionDelay:".1s" }}>My Certificates</h2>
          <div className="reveal mt-3 w-20 h-[1.5px] bg-gradient-to-r from-[#c87090] to-[#7a9cd4]" style={{ transitionDelay:".2s" }} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CERTIFICATES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setExpanded(c)}
              className="cert-card reveal reveal-scale group text-left bg-white rounded-3xl border border-[#f0e0ec]/60 overflow-hidden shadow-sm cursor-pointer"
              style={{ transitionDelay:`${.1 + i * .06}s` }}
            >
              {/* Certificate Preview */}
<div
  className="h-44 relative overflow-hidden"
  style={{
    background: `linear-gradient(135deg, ${c.color}14, ${c.color}06)`
  }}
>
  {c.image && (
    <img
      src={c.image}
      alt={c.title}
      className="absolute inset-0 w-full h-full object-cover"
    />
  )}
</div>
              <div className="p-4">
                <h4 className="font-serif font-semibold text-[#1e1624] text-[.83rem] leading-snug mb-1 line-clamp-2">{c.title}</h4>
                <p className="text-[.63rem] text-[#9a7a8a] mb-0.5">{c.org}</p>
                {c.date && <p className="text-[.6rem] font-semibold" style={{ color: c.color }}>{c.date}</p>}
              </div>
            </button>
          ))}
        </div>
      </div>

    {/* Certificate expanded */}
{expanded && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    onClick={() => setExpanded(null)}
  >
    {/* Background */}
    <div className="absolute inset-0 bg-[#1e1624]/70 backdrop-blur-md" />

    {/* Modal */}
    <div 
    className="relative z-10 w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
      style={{ animation: "reveal-up .35s ease-out both" }}
      onClick={(e) => e.stopPropagation()}
    >

      {/* Close button */}
      <button
        onClick={() => setExpanded(null)}
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#a05878] text-lg hover:bg-[#fce8f0] transition-colors"
      >
        ×
      </button>

      {/* BIG CERTIFICATE IMAGE */}
     <div className="w-full max-h-[65vh] bg-[#faf7f9] flex items-center justify-center p-4 md:p-6 overflow-auto">
        {expanded.image ? (
          <img
            src={expanded.image}
            alt={expanded.title}
            className="max-w-full max-h-[55vh] object-contain rounded-xl shadow-lg"
          />
        ) : (
          <div className="py-24 text-center text-[#9a7a8a]">
            Certificate image not available
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="px-6 py-5 text-center border-t border-[#f0e0ec]">
        <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1e1624] leading-snug">
          {expanded.title}
        </h3>

        <p className="text-sm text-[#9a7a8a] mt-1">
          {expanded.org}
        </p>

        <p
          className="text-xs font-semibold mt-1"
          style={{ color: expanded.color }}
        >
          Issued {expanded.date}
        </p>
      </div>

    </div>
  </div>
)}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-14" fill="#fdf4f8">
          <path d="M0,28 C240,4 480,56 720,28 C960,4 1200,52 1440,22 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

const CONTACTS = [
  {
    label:"Email", value:"erikaayudya179@gmail.com",
    href:"mailto:erikaayudya179@gmail.com", color:"#EA4335",
    icon:<svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
  },
  {
    label:"LinkedIn", value:"erykaayudya",
    href:"https://linkedin.com/in/erykaayudya", color:"#0A66C2",
    icon:<svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label:"GitHub", value:"erikaayudyaa",
    href:"https://github.com/erikaayudyaa", color:"#24292e",
    icon:<svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  },
  {
    label:"Instagram", value:"@erikaaarn",
    href:"https://instagram.com/erikaaarn", color:"#E1306C",
    icon:<svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
];

function Contact() {
  const blossomRef2 = useRef<HTMLDivElement>(null);
  useParallax(blossomRef2 as React.RefObject<HTMLElement>, 0.05);

  return (
    <section id="contact" className="relative bg-[#fdf4f8] py-28 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-pink-100/40 blur-3xl animate-glow-drift pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-blue-100/30 blur-3xl animate-glow-drift pointer-events-none" style={{ animationDelay:"4s" }} />

      <div ref={blossomRef2} className="absolute top-10 right-8 pointer-events-none">
        <Blossom className="animate-float-slow opacity-50" />
      </div>
      <BotanicBranch className="absolute bottom-10 left-6 animate-float-medium opacity-35 pointer-events-none" />
      <Petal className="absolute top-1/2 right-4 animate-petal opacity-40 pointer-events-none" style={{ animationDelay:"2s" }} />
      <LineFlower className="absolute bottom-1/3 left-1/4 animate-float-slow opacity-30 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <p className="reveal text-[.62rem] tracking-[.2em] uppercase text-[#a07888] mb-3 font-medium">Say Hello</p>
        <h2 className="reveal font-serif text-5xl md:text-6xl font-bold text-[#1e1624] mb-5" style={{ transitionDelay:".1s" }}>
          Let's Connect
        </h2>
        <p className="reveal text-[#5c4460] text-[.93rem] max-w-sm mx-auto mb-14 leading-relaxed" style={{ transitionDelay:".2s" }}>
          Open to collaboration, technical projects, networking opportunities, and learning experiences. Reach out — I'd love to connect.
        </p>

        {/* Organic floating pills */}
      <div className="reveal flex flex-wrap justify-center items-center gap-3 w-full mx-auto" style={{ transitionDelay:".3s" }}>
          {CONTACTS.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`contact-pill flex items-center gap-3 px-3 sm:px-5 py-3 rounded-full bg-white/85 backdrop-blur-sm border border-white/80 shadow-sm ${i % 3 === 1 ? "mt-2" : i % 3 === 2 ? "-mt-1" : ""}`}
            >
              <span style={{ color: c.color }}>{c.icon}</span>
              <div className="text-left">
                <p className="text-[.58rem] text-[#a07888] uppercase tracking-widest font-medium">{c.label}</p>
                <p className="text-[.76rem] text-[#1e1624] font-medium">{c.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Principle */}
        <div className="reveal mt-16 pt-8 border-t border-[#e8c0d0]/35" style={{ transitionDelay:".4s" }}>
          <p className="font-serif italic text-[#c87090] text-lg tracking-wide">Learn. Build. Grow.</p>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#1e1624] py-8 px-6 text-center">
      <p className="font-serif text-white/40 text-sm">
        Eryka Ayudya Putri Susanto <span className="text-[#c87090]/50">·</span> Network System Administrator
      </p>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  useReveal();

  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Activities />
      <Certificates />
      <Contact />
      <Footer />

      {/* ☁️ Soft cloud effect */}
      <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[180px] rounded-[50%] bg-white/45 blur-3xl" />

        <div className="absolute -top-14 left-[15%] w-[350px] h-[120px] rounded-full bg-[#f8f1fb]/40 blur-3xl" />

        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[750px] h-[180px] rounded-[50%] bg-white/45 blur-3xl" />

        <div className="absolute -bottom-14 right-[10%] w-[350px] h-[120px] rounded-full bg-[#fdf3f8]/40 blur-3xl" />
      </div>
    </div>
  );
} 