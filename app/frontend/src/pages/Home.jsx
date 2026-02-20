"import { useEffect, useState } from \"react\";
import { Link } from \"react-router-dom\";
import { motion } from \"framer-motion\";
import { 
  Phone, 
  MessageCircle, 
  Smartphone, 
  Laptop, 
  Headphones, 
  RefreshCw,
  Wrench,
  ShoppingBag,
  ArrowRight,
  Star,
  CheckCircle,
  Shield,
  Clock,
  BadgeCheck
} from \"lucide-react\";
import { Button } from \"../components/ui/button\";
import { Card, CardContent } from \"../components/ui/card\";
import axios from \"axios\";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const WHATSAPP_LINK = \"https://wa.me/2349076087744?text=Hi%20Gadget%20Haven%2C%20I%27d%20like%20to%20get%20a%20price%20quote%20please\";
const PHONE_NUMBER = \"09076087744\";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  initial: \"hidden\",
  whileInView: \"show\",
  viewport: { once: true },
  variants: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
};

const staggerItem = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }
};

const services = [
  { icon: Smartphone, title: \"Phones\", desc: \"Latest & UK Used\", link: \"/shop?category=iPhones\" },
  { icon: Laptop, title: \"Laptops\", desc: \"MacBooks & More\", link: \"/shop?category=Laptops\" },
  { icon: Headphones, title: \"Accessories\", desc: \"AirPods, Watches\", link: \"/shop?category=Accessories\" },
  { icon: RefreshCw, title: \"UK Used\", desc: \"Verified Quality\", link: \"/shop?category=UK%20Used\" },
];

const howItWorks = [
  { step: \"01\", title: \"Bring or Send\", desc: \"Visit our store or send device details via WhatsApp\" },
  { step: \"02\", title: \"Get Quote\", desc: \"Receive a fair price quote within minutes\" },
  { step: \"03\", title: \"Deal Done\", desc: \"Swap, sell, or get your device repaired\" },
  { step: \"04\", title: \"Pick Up\", desc: \"Collect your device or payment same day\" },
];

const trustPoints = [
  { icon: Shield, text: \"Verified Devices\" },
  { icon: Clock, text: \"Same Day Service\" },
  { icon: BadgeCheck, text: \"Fair Pricing\" },
  { icon: CheckCircle, text: \"Quality Guaranteed\" },
];

export const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testimonialsRes, productsRes] = await Promise.all([
          axios.get(`${API}/testimonials`),
          axios.get(`${API}/products`)
        ]);
        setTestimonials(testimonialsRes.data);
        setFeaturedProducts(productsRes.data.slice(0, 4));
      } catch (error) {
        console.error(\"Error fetching data:\", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className=\"min-h-screen bg-white\">
      {/* Hero Section */}
      <section className=\"relative min-h-[90vh] flex items-center overflow-hidden pt-20\" data-testid=\"hero-section\">
        <div className=\"hero-glow\" />
        <div className=\"container-custom relative z-10\">
          <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center\">
            {/* Hero Content */}
            <motion.div 
              className=\"text-center lg:text-left\"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                className=\"inline-block px-4 py-2 bg-[#FF3B30]/10 text-[#FF3B30] rounded-full text-sm font-bold mb-6\"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                #1 Trusted Gadget Store in Abuja
              </motion.span>
              
              <h1 className=\"text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#111111] mb-6 leading-[0.95]\">
                Phones, Gadgets & Accessories
              </h1>
              
              <div className=\"flex flex-wrap justify-center lg:justify-start gap-3 mb-6\">
                {[\"We Buy\", \"We Sell\", \"We Swap\", \"We Fix\"].map((service, i) => (
                  <span 
                    key={service}
                    className={`px-4 py-2 rounded-full font-bold text-sm ${
                      i === 0 ? \"bg-[#FF3B30] text-white\" : \"bg-[#F5F5F7] text-[#111111]\"
                    }`}
                  >
                    {service}
                  </span>
                ))}
              </div>
              
              <p className=\"text-lg md:text-xl text-[#666666] mb-8 max-w-lg mx-auto lg:mx-0\">
                Your trusted gadget hub at New Banex Plaza. Fair prices, quality devices, and expert repairs.
              </p>
              
              <div className=\"flex flex-col sm:flex-row gap-4 justify-center lg:justify-start\">
                <a href={`tel:${PHONE_NUMBER}`} data-testid=\"hero-call-btn\">
                  <Button className=\"btn-primary w-full sm:w-auto flex items-center gap-2 text-base\">
                    <Phone className=\"w-5 h-5\" />
                    Call {PHONE_NUMBER}
                  </Button>
                </a>
                <a href={WHATSAPP_LINK} target=\"_blank\" rel=\"noopener noreferrer\" data-testid=\"hero-whatsapp-btn\">
                  <Button className=\"btn-secondary w-full sm:w-auto flex items-center gap-2 text-base\">
                    <MessageCircle className=\"w-5 h-5\" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              className=\"relative\"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className=\"relative aspect-square max-w-lg mx-auto\">
                <div className=\"absolute inset-0 bg-gradient-to-br from-[#FF3B30]/20 to-transparent rounded-3xl\" />
                <img
                  src=\"https://images.unsplash.com/photo-1695822958645-b2b058159215?w=600&h=600&fit=crop\"
                  alt=\"Latest iPhone\"
                  className=\"w-full h-full object-cover rounded-3xl floating-element\"
                />
                {/* Floating Badge */}
                <motion.div 
                  className=\"absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4\"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className=\"flex items-center gap-3\">
                    <div className=\"w-12 h-12 bg-[#FF3B30] rounded-xl flex items-center justify-center\">
                      <CheckCircle className=\"w-6 h-6 text-white\" />
                    </div>
                    <div>
                      <p className=\"font-bold text-[#111111]\">100+ Reviews</p>
                      <div className=\"flex items-center gap-1\">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className=\"w-4 h-4 fill-yellow-400 text-yellow-400\" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className=\"py-8 bg-[#F5F5F7]\" data-testid=\"trust-section\">
        <div className=\"container-custom\">
          <div className=\"flex flex-wrap justify-center gap-6 md:gap-12\">
            {trustPoints.map((point, i) => (
              <motion.div 
                key={point.text}
                className=\"flex items-center gap-2 text-[#111111]\"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <point.icon className=\"w-5 h-5 text-[#FF3B30]\" />
                <span className=\"font-medium text-sm\">{point.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className=\"section-padding\" data-testid=\"services-section\">
        <div className=\"container-custom\">
          <motion.div className=\"text-center mb-12\" {...fadeUp}>
            <h2 className=\"text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] mb-4\">
              What We Offer
            </h2>
            <p className=\"text-[#666666] text-lg max-w-2xl mx-auto\">
              From buying and selling to repairs and swaps — we've got all your gadget needs covered.
            </p>
          </motion.div>

          <motion.div 
            className=\"grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6\"
            {...staggerContainer}
          >
            {services.map((service) => (
              <motion.div key={service.title} {...staggerItem}>
                <Link to={service.link}>
                  <Card className=\"group h-full bg-white border-2 border-transparent hover:border-[#FF3B30] transition-all duration-300 cursor-pointer card-hover\" data-testid={`service-card-${service.title.toLowerCase()}`}>
                    <CardContent className=\"p-6 text-center\">
                      <div className=\"w-16 h-16 mx-auto mb-4 bg-[#F5F5F7] rounded-2xl flex items-center justify-center group-hover:bg-[#FF3B30] transition-colors\">
                        <service.icon className=\"w-8 h-8 text-[#111111] group-hover:text-white transition-colors\" />
                      </div>
                      <h3 className=\"font-bold text-lg text-[#111111] mb-1\">{service.title}</h3>
                      <p className=\"text-sm text-[#666666]\">{service.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className=\"section-padding bg-[#111111]\" data-testid=\"how-it-works-section\">
        <div className=\"container-custom\">
          <motion.div className=\"text-center mb-12\" {...fadeUp}>
            <span className=\"text-[#FF3B30] font-bold text-sm uppercase tracking-widest mb-4 block\">
              Simple Process
            </span>
            <h2 className=\"text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4\">
              How It Works
            </h2>
            <p className=\"text-gray-400 text-lg max-w-2xl mx-auto\">
              Four simple steps to buy, sell, swap, or fix your device
            </p>
          </motion.div>

          <motion.div 
            className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6\"
            {...staggerContainer}
          >
            {howItWorks.map((item, i) => (
              <motion.div key={item.step} {...staggerItem}>
                <div className=\"relative p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#FF3B30]/50 transition-colors\" data-testid={`step-${item.step}`}>
                  <span className=\"text-6xl font-bold text-[#FF3B30]/20 absolute top-4 right-4\">
                    {item.step}
                  </span>
                  <div className=\"relative z-10\">
                    <h3 className=\"font-bold text-xl text-white mb-2\">{item.title}</h3>
                    <p className=\"text-gray-400\">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* UK Used Phones Highlight */}
      <section className=\"section-padding\" data-testid=\"uk-used-section\">
        <div className=\"container-custom\">
          <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-12 items-center\">
            <motion.div {...fadeUp}>
              <span className=\"inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6\">
                <BadgeCheck className=\"w-4 h-4\" />
                Verified Quality
              </span>
              <h2 className=\"text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] mb-6\">
                Premium UK Used Phones
              </h2>
              <p className=\"text-[#666666] text-lg mb-6 leading-relaxed\">
                Get authentic UK used devices at unbeatable prices. Every phone is thoroughly tested, verified, and comes with accurate battery health information.
              </p>
              <ul className=\"space-y-4 mb-8\">
                {[\"100% Authentic Devices\", \"Battery Health Verified\", \"30-Day Warranty\", \"Best Market Prices\"].map((item) => (
                  <li key={item} className=\"flex items-center gap-3\">
                    <CheckCircle className=\"w-5 h-5 text-[#FF3B30]\" />
                    <span className=\"text-[#111111] font-medium\">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to=\"/shop?category=UK%20Used\" data-testid=\"uk-used-cta\">
                <Button className=\"btn-primary flex items-center gap-2\">
                  Browse UK Used Phones
                  <ArrowRight className=\"w-5 h-5\" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className=\"relative\"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className=\"grid grid-cols-2 gap-4\">
                <img
                  src=\"https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=300&h=400&fit=crop\"
                  alt=\"UK Used iPhone\"
                  className=\"rounded-2xl object-cover h-64 w-full\"
                />
                <img
                  src=\"https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=300&h=400&fit=crop\"
                  alt=\"UK Used Phone\"
                  className=\"rounded-2xl object-cover h-64 w-full mt-8\"
                />
              </div>
              {/* Price Badge */}
              <div className=\"absolute -bottom-4 -right-4 bg-[#FF3B30] text-white rounded-2xl px-6 py-4 shadow-xl\">
                <p className=\"text-sm font-medium opacity-80\">Starting from</p>
                <p className=\"text-2xl font-bold\">₦280,000</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Repairs Section */}
      <section className=\"section-padding bg-[#F5F5F7]\" data-testid=\"repairs-section\">
        <div className=\"container-custom\">
          <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-12 items-center\">
            <motion.div 
              className=\"order-2 lg:order-1\"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src=\"https://images.unsplash.com/photo-1576613109753-27804de2cba8?w=600&h=500&fit=crop\"
                alt=\"Phone Repair\"
                className=\"rounded-2xl object-cover w-full h-[400px]\"
              />
            </motion.div>
            
            <motion.div className=\"order-1 lg:order-2\" {...fadeUp}>
              <span className=\"inline-flex items-center gap-2 px-4 py-2 bg-[#FF3B30]/10 text-[#FF3B30] rounded-full text-sm font-bold mb-6\">
                <Wrench className=\"w-4 h-4\" />
                Expert Repairs
              </span>
              <h2 className=\"text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] mb-6\">
                We Fix It Right
              </h2>
              <p className=\"text-[#666666] text-lg mb-6 leading-relaxed\">
                From cracked screens to battery issues, our expert technicians will have your device working like new in no time.
              </p>
              <div className=\"grid grid-cols-2 gap-4 mb-8\">
                {[
                  { name: \"Screen Repair\", price: \"from ₦25,000\" },
                  { name: \"Battery Change\", price: \"from ₦15,000\" },
                  { name: \"Charging Port\", price: \"from ₦10,000\" },
                  { name: \"Software Fix\", price: \"from ₦5,000\" },
                ].map((service) => (
                  <div key={service.name} className=\"bg-white rounded-xl p-4\">
                    <p className=\"font-bold text-[#111111]\">{service.name}</p>
                    <p className=\"text-sm text-[#FF3B30] font-medium\">{service.price}</p>
                  </div>
                ))}
              </div>
              <Link to=\"/repairs\" data-testid=\"repairs-cta\">
                <Button className=\"btn-primary flex items-center gap-2\">
                  Book a Repair
                  <ArrowRight className=\"w-5 h-5\" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Swap/Trade-In Section */}
      <section className=\"section-padding\" data-testid=\"swap-section\">
        <div className=\"container-custom\">
          <div className=\"bg-gradient-to-br from-[#111111] to-[#222222] rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden\">
            <div className=\"absolute top-0 right-0 w-1/2 h-full opacity-10\">
              <img
                src=\"https://images.unsplash.com/photo-1622556498246-755f44ca76f3?w=600&h=600&fit=crop\"
                alt=\"\"
                className=\"w-full h-full object-cover\"
              />
            </div>
            <div className=\"relative z-10 max-w-2xl\">
              <motion.div {...fadeUp}>
                <span className=\"inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-bold mb-6\">
                  <RefreshCw className=\"w-4 h-4\" />
                  Trade-In Program
                </span>
                <h2 className=\"text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6\">
                  Upgrade Your Device Today
                </h2>
                <p className=\"text-gray-300 text-lg mb-8 leading-relaxed\">
                  Trade in your old phone and get instant value towards a new device. No hassle, fair pricing, same-day deals.
                </p>
                <div className=\"flex flex-col sm:flex-row gap-4\">
                  <Link to=\"/swap\" data-testid=\"swap-cta\">
                    <Button className=\"btn-primary flex items-center gap-2\">
                      Start a Swap
                      <ArrowRight className=\"w-5 h-5\" />
                    </Button>
                  </Link>
                  <Link to=\"/sell\" data-testid=\"sell-cta\">
                    <Button className=\"bg-white text-[#111111] hover:bg-gray-100 rounded-full px-8 py-4 font-bold flex items-center gap-2\">
                      Sell Your Device
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className=\"section-padding bg-[#F5F5F7]\" data-testid=\"featured-products-section\">
          <div className=\"container-custom\">
            <motion.div className=\"flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4\" {...fadeUp}>
              <div>
                <h2 className=\"text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] mb-4\">
                  Featured Devices
                </h2>
                <p className=\"text-[#666666] text-lg\">
                  Hot picks from our latest collection
                </p>
              </div>
              <Link to=\"/shop\" data-testid=\"view-all-products\">
                <Button className=\"btn-outline flex items-center gap-2\">
                  View All
                  <ArrowRight className=\"w-5 h-5\" />
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              className=\"grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6\"
              {...staggerContainer}
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} {...staggerItem}>
                  <Card className=\"group bg-white border-0 overflow-hidden card-hover product-card\" data-testid={`product-card-${product.id}`}>
                    <div className=\"aspect-square overflow-hidden bg-[#F5F5F7]\">
                      <img
                        src={product.image}
                        alt={product.name}
                        className=\"w-full h-full object-cover product-card-image\"
                      />
                    </div>
                    <CardContent className=\"p-4\">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold mb-2 ${
                        product.condition.includes(\"UK Used\") ? \"badge-uk-used text-white\" : \"badge-new text-white\"
                      }`}>
                        {product.condition}
                      </span>
                      <h3 className=\"font-bold text-[#111111] mb-1 line-clamp-1\">{product.name}</h3>
                      {product.storage && (
                        <p className=\"text-sm text-[#666666] mb-2\">{product.storage}</p>
                      )}
                      <p className=\"text-[#FF3B30] font-bold text-lg\">{product.price}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className=\"section-padding\" data-testid=\"testimonials-section\">
          <div className=\"container-custom\">
            <motion.div className=\"text-center mb-12\" {...fadeUp}>
              <h2 className=\"text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] mb-4\">
                What Our Customers Say
              </h2>
              <p className=\"text-[#666666] text-lg\">
                Don't just take our word for it
              </p>
            </motion.div>

            <motion.div 
              className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\"
              {...staggerContainer}
            >
              {testimonials.slice(0, 6).map((testimonial) => (
                <motion.div key={testimonial.id} {...staggerItem}>
                  <Card className=\"h-full bg-white border border-gray-100 testimonial-card relative\" data-testid={`testimonial-${testimonial.id}`}>
                    <CardContent className=\"p-6\">
                      <div className=\"flex items-center gap-1 mb-4\">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className=\"w-5 h-5 fill-yellow-400 text-yellow-400\" />
                        ))}
                      </div>
                      <p className=\"text-[#666666] mb-6 leading-relaxed\">\"{testimonial.text}\"</p>
                      <div className=\"flex items-center justify-between\">
                        <div>
                          <p className=\"font-bold text-[#111111]\">{testimonial.name}</p>
                          <p className=\"text-sm text-[#FF3B30]\">{testimonial.device}</p>
                        </div>
                        <CheckCircle className=\"w-6 h-6 text-green-500\" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className=\"section-padding bg-[#FF3B30]\" data-testid=\"final-cta-section\">
        <div className=\"container-custom text-center\">
          <motion.div {...fadeUp}>
            <h2 className=\"text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6\">
              Ready to Get Started?
            </h2>
            <p className=\"text-white/80 text-lg max-w-2xl mx-auto mb-8\">
              Visit our store at New Banex Plaza or reach out via WhatsApp for instant quotes and support.
            </p>
            <div className=\"flex flex-col sm:flex-row gap-4 justify-center\">
              <a href={`tel:${PHONE_NUMBER}`} data-testid=\"final-call-btn\">
                <Button className=\"bg-white text-[#FF3B30] hover:bg-gray-100 rounded-full px-8 py-4 font-bold flex items-center gap-2 w-full sm:w-auto\">
                  <Phone className=\"w-5 h-5\" />
                  Call Now
                </Button>
              </a>
              <a href={WHATSAPP_LINK} target=\"_blank\" rel=\"noopener noreferrer\" data-testid=\"final-whatsapp-btn\">
                <Button className=\"bg-[#111111] text-white hover:bg-black rounded-full px-8 py-4 font-bold flex items-center gap-2 w-full sm:w-auto\">
                  <MessageCircle className=\"w-5 h-5\" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
"