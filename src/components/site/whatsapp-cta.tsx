import { MessageCircle } from "lucide-react";

export function WhatsAppCta() {
  return (
    <a
      href="https://wa.me/6282235769474?text=Hi%20Hafizh%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform hover:-translate-y-0.5 hover:shadow-xl motion-reduce:transition-none"
    >
      <MessageCircle className="size-6 fill-current" />
    </a>
  );
}