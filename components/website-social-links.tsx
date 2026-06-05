import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13.5 9H15.5V6.5H13.5C11.84 6.5 10.5 7.84 10.5 9.5V11H8.5V13.5H10.5V19.5H13V13.5H15L15.5 11H13V9.75C13 9.34 13.22 9 13.5 9Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect height="18" rx="5" ry="5" width="18" x="3" y="3" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export type WebsiteSocialLink = {
  href: string;
  ariaLabel: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const WHATSAPP_HREF = "https://example.com/whatsapp";

export const WEBSITE_SOCIAL_LINKS_WITH_ICONS: readonly WebsiteSocialLink[] = [
  {
    href: "https://www.facebook.com/pt.sublime/",
    ariaLabel: "Facebook Sublime",
    Icon: FacebookIcon,
  },
  {
    href: "https://www.instagram.com/sublimeportugal/",
    ariaLabel: "Instagram Sublime",
    Icon: InstagramIcon,
  },
  {
    href: "https://www.linkedin.com/in/jose-ferramenta-17979569/",
    ariaLabel: "LinkedIn Sublime",
    Icon: LinkedinIcon,
  },
  {
    href: WHATSAPP_HREF,
    ariaLabel: "WhatsApp (ligação de exemplo)",
    Icon: MessageCircle,
  },
] as const;

const LINK_VARIANT_CLASS = {
  dark: "inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  light:
    "inline-flex size-9 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
} as const;

type WebsiteSocialLinksProps = {
  variant?: keyof typeof LINK_VARIANT_CLASS;
  className?: string;
  includeWhatsApp?: boolean;
};

export function WebsiteSocialLinks({
  variant = "light",
  className,
  includeWhatsApp = true,
}: WebsiteSocialLinksProps) {
  const links = includeWhatsApp
    ? WEBSITE_SOCIAL_LINKS_WITH_ICONS
    : WEBSITE_SOCIAL_LINKS_WITH_ICONS.filter(
        (item) => item.href !== WHATSAPP_HREF
      );

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map(({ href, ariaLabel, Icon }) => (
        <li key={href}>
          <a
            aria-label={ariaLabel}
            className={LINK_VARIANT_CLASS[variant]}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon aria-hidden className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
