import { FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneIcon } from '@/components/icons';
import { site } from '@/lib/site';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-left">
          <a href={site.phoneHref} className="topbar-item">
            <PhoneIcon />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="topbar-item">
            <MailIcon />
            {site.email}
          </a>
        </div>
        <div className="topbar-right">
          <span className="topbar-live">
            <span className="topbar-live-dot" />
            Pronto intervento h24
          </span>
          <div className="topbar-divider" />
          <a href={site.social.facebook} className="topbar-soc" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <div className="topbar-divider" />
          <a href={site.social.instagram} className="topbar-soc" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <div className="topbar-divider" />
          <a href={site.social.linkedin} className="topbar-soc" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
