"import { Link } from \"react-router-dom\";
import { Phone, MapPin, Mail } from \"lucide-react\";

const WHATSAPP_LINK = \"https://wa.me/2349076087744?text=Hi%20Gadget%20Haven%2C%20I%27d%20like%20to%20get%20a%20price%20quote%20please\";
const PHONE_NUMBER = \"09076087744\";

const footerLinks = {
  services: [
    { name: \"Buy Phones\", path: \"/shop\" },
    { name: \"Sell Your Device\", path: \"/sell\" },
    { name: \"Swap Device\", path: \"/swap\" },
    { name: \"Repairs\", path: \"/repairs\" },
  ],
  categories: [
    { name: \"iPhones\", path: \"/shop?category=iPhones\" },
    { name: \"Samsung\", path: \"/shop?category=Samsung\" },
    { name: \"UK Used Phones\", path: \"/shop?category=UK%20Used\" },
    { name: \"Accessories\", path: \"/shop?category=Accessories\" },
    { name: \"Laptops\", path: \"/shop?category=Laptops\" },
  ],
  company: [
    { name: \"About Us\", path: \"/contact\" },
    { name: \"Contact\", path: \"/contact\" },
    { name: \"Visit Store\", path: \"/contact\" },
  ],
};

const socialLinks = [
  { 
    name: \"Instagram\", 
    url: \"https://instagram.com/gadgethavenabuja\",
    icon: (
      <svg viewBox=\"0 0 24 24\" className=\"w-5 h-5 fill-current\">
        <path d=\"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z\"/>
      </svg>
    )
  },
  { 
    name: \"Twitter\", 
    url: \"https://twitter.com/thegadgethaven_\",
    icon: (
      <svg viewBox=\"0 0 24 24\" className=\"w-5 h-5 fill-current\">
        <path d=\"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z\"/>
      </svg>
    )
  },
  { 
    name: \"TikTok\", 
    url: \"https://tiktok.com/@thegadgethaven_\",
    icon: (
      <svg viewBox=\"0 0 24 24\" className=\"w-5 h-5 fill-current\">
        <path d=\"M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z\"/>
      </svg>
    )
  },
  { 
    name: \"WhatsApp\", 
    url: WHATSAPP_LINK,
    icon: (
      <svg viewBox=\"0 0 24 24\" className=\"w-5 h-5 fill-current\">
        <path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z\"/>
      </svg>
    )
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=\"bg-[#111111] text-white\" data-testid=\"main-footer\">
      <div className=\"container-custom py-16 md:py-20\">
        {/* Top Section */}
        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12\">
          {/* Brand */}
          <div className=\"lg:col-span-2\">
            <Link to=\"/\" className=\"flex items-center gap-2 mb-6\">
              <div className=\"w-12 h-12 bg-[#FF3B30] rounded-xl flex items-center justify-center\">
                <span className=\"text-white font-bold text-xl font-['Outfit']\">GH</span>
              </div>
              <div>
                <span className=\"font-['Outfit'] font-bold text-xl text-white\">GADGET</span>
                <span className=\"font-['Outfit'] font-bold text-xl text-[#FF3B30] ml-1\">HAVEN</span>
              </div>
            </Link>
            <p className=\"text-gray-400 mb-6 max-w-sm leading-relaxed\">
              Your trusted gadget hub at New Banex Plaza, Abuja. We buy, sell, swap, and fix all kinds of phones, gadgets, and accessories.
            </p>
            
            {/* Contact Info */}
            <div className=\"space-y-3\">
              <a 
                href={`tel:${PHONE_NUMBER}`}
                className=\"flex items-center gap-3 text-gray-300 hover:text-[#FF3B30] transition-colors\"
                data-testid=\"footer-phone\"
              >
                <Phone className=\"w-5 h-5\" />
                <span>{PHONE_NUMBER}</span>
              </a>
              <div className=\"flex items-center gap-3 text-gray-300\">
                <MapPin className=\"w-5 h-5 flex-shrink-0\" />
                <span>Shop A53A, New Banex Plaza, Abuja</span>
              </div>
              <a 
                href=\"mailto:hello@gadgethavenabuja.com\"
                className=\"flex items-center gap-3 text-gray-300 hover:text-[#FF3B30] transition-colors\"
                data-testid=\"footer-email\"
              >
                <Mail className=\"w-5 h-5\" />
                <span>hello@gadgethavenabuja.com</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className=\"font-['Outfit'] font-bold text-lg mb-5\">Services</h4>
            <ul className=\"space-y-3\">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className=\"text-gray-400 hover:text-[#FF3B30] transition-colors footer-link\"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className=\"font-['Outfit'] font-bold text-lg mb-5\">Categories</h4>
            <ul className=\"space-y-3\">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className=\"text-gray-400 hover:text-[#FF3B30] transition-colors footer-link\"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className=\"font-['Outfit'] font-bold text-lg mb-5\">Company</h4>
            <ul className=\"space-y-3\">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className=\"text-gray-400 hover:text-[#FF3B30] transition-colors footer-link\"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className=\"mt-6\">
              <h4 className=\"font-['Outfit'] font-bold text-lg mb-4\">Follow Us</h4>
              <div className=\"flex items-center gap-4\">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target=\"_blank\"
                    rel=\"noopener noreferrer\"
                    className=\"w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF3B30] transition-all social-icon\"
                    aria-label={social.name}
                    data-testid={`social-${social.name.toLowerCase()}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className=\"h-px bg-white/10 mb-8\" />

        {/* Bottom Section */}
        <div className=\"flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm\">
          <p>© {currentYear} Gadget Haven. BN: 7476158. All rights reserved.</p>
          <p>Built with trust for Abuja's gadget lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"