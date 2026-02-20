"import { useState, useEffect } from \"react\";
import { Link, useLocation } from \"react-router-dom\";
import { motion, AnimatePresence } from \"framer-motion\";
import { Phone, MessageCircle, Menu, X, ChevronDown } from \"lucide-react\";
import { Button } from \"../ui/button\";

const WHATSAPP_LINK = \"https://wa.me/2349076087744?text=Hi%20Gadget%20Haven%2C%20I%27d%20like%20to%20get%20a%20price%20quote%20please\";
const PHONE_NUMBER = \"09076087744\";

const navLinks = [
  { name: \"Home\", path: \"/\" },
  { name: \"Shop\", path: \"/shop\" },
  { 
    name: \"Services\", 
    path: \"#\",
    dropdown: [
      { name: \"Sell Your Device\", path: \"/sell\" },
      { name: \"Swap Device\", path: \"/swap\" },
      { name: \"Repairs\", path: \"/repairs\" },
    ]
  },
  { name: \"Contact\", path: \"/contact\" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener(\"scroll\", handleScroll);
    return () => window.removeEventListener(\"scroll\", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      <header
        data-testid=\"main-header\"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? \"bg-white/95 backdrop-blur-md shadow-lg\" : \"bg-white\"
        }`}
      >
        <div className=\"container-custom\">
          <div className=\"flex items-center justify-between h-16 md:h-20\">
            {/* Logo */}
            <Link to=\"/\" className=\"flex items-center gap-2\" data-testid=\"logo-link\">
              <div className=\"w-10 h-10 bg-[#FF3B30] rounded-xl flex items-center justify-center\">
                <span className=\"text-white font-bold text-lg font-['Outfit']\">GH</span>
              </div>
              <div className=\"hidden sm:block\">
                <span className=\"font-['Outfit'] font-bold text-lg text-[#111111]\">GADGET</span>
                <span className=\"font-['Outfit'] font-bold text-lg text-[#FF3B30] ml-1\">HAVEN</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className=\"hidden lg:flex items-center gap-8\" data-testid=\"desktop-nav\">
              {navLinks.map((link) => (
                <div key={link.name} className=\"relative\">
                  {link.dropdown ? (
                    <button
                      className={`flex items-center gap-1 font-medium text-sm transition-colors hover:text-[#FF3B30] ${
                        link.dropdown.some(d => d.path === location.pathname) ? \"text-[#FF3B30]\" : \"text-[#111111]\"
                      }`}
                      onMouseEnter={() => setActiveDropdown(link.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      data-testid={`nav-${link.name.toLowerCase()}`}
                    >
                      {link.name}
                      <ChevronDown className=\"w-4 h-4\" />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`font-medium text-sm transition-colors hover:text-[#FF3B30] ${
                        location.pathname === link.path ? \"text-[#FF3B30]\" : \"text-[#111111]\"
                      }`}
                      data-testid={`nav-${link.name.toLowerCase()}`}
                    >
                      {link.name}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className=\"absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden\"
                          onMouseEnter={() => setActiveDropdown(link.name)}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className={`block px-4 py-3 text-sm font-medium transition-colors hover:bg-[#F5F5F7] hover:text-[#FF3B30] ${
                                location.pathname === item.path ? \"text-[#FF3B30] bg-[#F5F5F7]\" : \"text-[#111111]\"
                              }`}
                              data-testid={`dropdown-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className=\"flex items-center gap-2 md:gap-3\">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className=\"hidden md:flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-200 hover:border-[#111111] transition-colors\"
                data-testid=\"header-call-btn\"
              >
                <Phone className=\"w-4 h-4\" />
                <span className=\"font-medium text-sm\">{PHONE_NUMBER}</span>
              </a>
              <a
                href={WHATSAPP_LINK}
                target=\"_blank\"
                rel=\"noopener noreferrer\"
                data-testid=\"header-whatsapp-btn\"
              >
                <Button className=\"bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-4 md:px-6 py-2 md:py-3 font-bold text-sm\">
                  <MessageCircle className=\"w-4 h-4 md:mr-2\" />
                  <span className=\"hidden md:inline\">WhatsApp</span>
                </Button>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className=\"lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors\"
                data-testid=\"mobile-menu-toggle\"
              >
                {isMobileMenuOpen ? <X className=\"w-6 h-6\" /> : <Menu className=\"w-6 h-6\" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=\"fixed inset-0 z-40 lg:hidden\"
            data-testid=\"mobile-menu\"
          >
            <div
              className=\"absolute inset-0 bg-black/50 mobile-menu-overlay\"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: \"100%\" }}
              animate={{ x: 0 }}
              exit={{ x: \"100%\" }}
              transition={{ type: \"tween\", duration: 0.3 }}
              className=\"absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-2xl\"
            >
              <div className=\"flex flex-col h-full pt-20 px-6 pb-6\">
                <nav className=\"flex-1 space-y-2\">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      {link.dropdown ? (
                        <>
                          <div className=\"py-3 font-semibold text-[#111111] text-lg\">
                            {link.name}
                          </div>
                          <div className=\"pl-4 space-y-1\">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                className={`block py-2 font-medium transition-colors hover:text-[#FF3B30] ${
                                  location.pathname === item.path ? \"text-[#FF3B30]\" : \"text-[#666666]\"
                                }`}
                                data-testid={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        <Link
                          to={link.path}
                          className={`block py-3 font-semibold text-lg transition-colors hover:text-[#FF3B30] ${
                            location.pathname === link.path ? \"text-[#FF3B30]\" : \"text-[#111111]\"
                          }`}
                          data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className=\"space-y-3 pt-6 border-t border-gray-200\">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className=\"flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-[#111111] font-bold\"
                    data-testid=\"mobile-call-btn\"
                  >
                    <Phone className=\"w-5 h-5\" />
                    Call {PHONE_NUMBER}
                  </a>
                  <a
                    href={WHATSAPP_LINK}
                    target=\"_blank\"
                    rel=\"noopener noreferrer\"
                    className=\"flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#25D366] text-white font-bold\"
                    data-testid=\"mobile-whatsapp-btn\"
                  >
                    <MessageCircle className=\"w-5 h-5\" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
"