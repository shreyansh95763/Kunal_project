import Link from "next/link";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { CONTACT, ROUTES } from "@/lib/site";

/** Icon in a gold-tinted circle, used for each detail row. */
function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ggdl-gold/15 text-ggdl-gold">
      {children}
    </span>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <IconBadge>{icon}</IconBadge>
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-widest text-ggdl-gold uppercase">
          {label}
        </p>
        <div className="mt-1 text-sm leading-relaxed text-gray-200">{children}</div>
      </div>
    </li>
  );
}

/** Dark contact-details rail that sits alongside the enquiry form. */
export default function ContactInfoPanel() {
  return (
    <aside className="flex h-full flex-col bg-ggdl-blue p-8 text-white md:p-10">
      <h2 className="text-2xl font-bold">
        Contact <span className="text-ggdl-gold">Information</span>
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-300">
        Reach us directly, or send the form and we will come back to you within one
        working day.
      </p>

      <ul className="mt-8 space-y-6">
        {CONTACT.addressLines.length > 0 && (
          <Row icon={<MapPinIcon />} label="Laboratory">
            <address className="not-italic">
              {CONTACT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </Row>
        )}

        {CONTACT.phone && (
          <Row icon={<PhoneIcon />} label="Phone">
            <a href={CONTACT.phoneHref} className="transition hover:text-ggdl-gold">
              {CONTACT.phone}
            </a>
          </Row>
        )}

        {CONTACT.whatsapp && (
          <Row icon={<WhatsAppIcon />} label="WhatsApp">
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-ggdl-gold"
            >
              {CONTACT.whatsapp}
            </a>
          </Row>
        )}

        {CONTACT.email && (
          <Row icon={<MailIcon />} label="Email">
            <a
              href={CONTACT.emailHref}
              className="break-all transition hover:text-ggdl-gold"
            >
              {CONTACT.email}
            </a>
          </Row>
        )}

        <Row icon={<ClockIcon />} label="Opening hours">
          <dl className="space-y-1">
            {CONTACT.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4">
                <dt>{h.days}</dt>
                <dd className="text-gray-400">{h.time}</dd>
              </div>
            ))}
          </dl>
        </Row>
      </ul>

      {/* Deflects report-status questions away from the enquiry form */}
      <div className="mt-auto border-t border-white/10 pt-6">
        <p className="text-sm text-gray-300">
          Checking a certificate you already hold?
        </p>
        <Link
          href={ROUTES.verifyYourReport}
          className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-ggdl-gold transition hover:gap-3"
        >
          Verify your report <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  );
}
