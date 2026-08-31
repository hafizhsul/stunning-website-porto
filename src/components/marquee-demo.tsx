import type { ComponentType } from "react";
import {
  SiAndroid,
  SiCplusplus,
  SiFlutter,
  SiFramer,
  SiGit,
  SiJavascript,
  SiKotlin,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiReact,
  SiSymfony,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { Cpu, Server } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

type Logo = {
  name: string;
  Icon: ComponentType<{ className?: string; color?: string }>;
  color: string;
};

const LOGOS: Logo[] = [
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
  { name: "Symfony", Icon: SiSymfony, color: "#767676" }, // brand #000 vanilla on dark
  { name: "Kotlin", Icon: SiKotlin, color: "#7F52FF" },
  { name: "Flutter", Icon: SiFlutter, color: "#02569B" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "C++", Icon: SiCplusplus, color: "#00599C" },
  { name: "Android", Icon: SiAndroid, color: "#3DDC84" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "IoT", Icon: Cpu, color: "#64748B" }, // no brand logo
  { name: "Advantech", Icon: Server, color: "#64748B" }, // no brand logo
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Vite", Icon: SiVite, color: "#646CFF" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Framer Motion", Icon: SiFramer, color: "#0055FF" },
];

export function MarqueeDemo({ className }: { className?: string }) {
  return (
    <Marquee className={className}>
      {LOGOS.map(({ name, Icon, color }) => (
        <Icon
          key={name}
          aria-label={name}
          color={color}
          className="mx-8 h-9 w-9 shrink-0"
        />
      ))}
    </Marquee>
  );
}
