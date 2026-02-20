"import { useState } from \"react\";
import { motion } from \"framer-motion\";
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Send
} from \"lucide-react\";
import { Button } from \"../components/ui/button\";
import { Card, CardContent } from \"../components/ui/card\";
import { Input } from \"../components/ui/input\";
import { Label } from \"../components/ui/label\";
import { Textarea } from \"../components/ui/textarea\";
import { toast } from \"sonner\";
import axios from \"axios\";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const WHATSAPP_LINK = \"https://wa.me/2349076087744?text=Hi%20Gadget%20Haven%2C%20I%27d%20like%20to%20get%20in%20touch.\";
const PHONE_NUMBER = \"09076087744\";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const socialLinks = [
  { 
    name: \"Instagram\", 
    handle: \"@gadgethavenabuja\",
    url: \"https://instagram.com/gadgethavenabuja\",
    color: \"bg-gradient-to-br from-purple-500 to-pink-500\"
  },
  { 
    name: \"X (Twitter)\", 
    handle: \"@thegadgethaven_\",
    url: \"https://twitter.com/thegadgethaven_\",
    color: \"bg-black\"
  },
  { 
    name: \"TikTok\", 
    handle: \"@thegadgethaven_\",
    url: \"https://tiktok.com/@thegadgethaven_\",
    color: \"bg-gradient-to-br from-gray-900 to-gray-700\"
  },
];

const contactInfo = [
  { icon: Phone, title: \"Phone\", value: PHONE_NUMBER, link: `tel:${PHONE_NUMBER}` },
  { icon: Mail, title: \"Email\", value: \"hello@gadgethavenabuja.com\", link: \"mailto:hello@gadgethavenabuja.com\" },
  { icon: MapPin, title: \"Address\", value: \"Shop A53A, New Banex Plaza, Abuja\", link: null },
  { icon: Clock, title: \"Hours\", value: \"Mon - Sat: 9AM - 7PM\", link: null },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: \"\",
    email: \"\",
    phone: \"\",
    message: \"\"
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error(\"Please fill in all fields\");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      toast.success(\"Message sent successfully!\");
    } catch (error) {
      console.error(\"Error submitting contact form:\", error);
      toast.error(\"Failed to send message. Please try again.\");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className=\"min-h-screen bg-white pt-20\">
      {/* Hero */}
      <section className=\"bg-[#F5F5F7] py-16 md:py-20\" data-testid=\"contact-hero\">
        <div className=\"container-custom\">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=\"text-center max-w-3xl mx-auto\"
          >
            <h1 className=\"text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-4\">
              Get In Touch
            </h1>
            <p className=\"text-[#666666] text-lg mb-8\">
              Visit our store, call us, or send a message. We're here to help with all your gadget needs.
            </p>
            <div className=\"flex flex-col sm:flex-row gap-4 justify-center\">
              <a href={`tel:${PHONE_NUMBER}`} data-testid=\"contact-call-btn\">
                <Button className=\"btn-primary w-full sm:w-auto flex items-center gap-2\">
                  <Phone className=\"w-5 h-5\" />
                  Call {PHONE_NUMBER}
                </Button>
              </a>
              <a href={WHATSAPP_LINK} target=\"_blank\" rel=\"noopener noreferrer\" data-testid=\"contact-whatsapp-btn\">
                <Button className=\"btn-secondary w-full sm:w-auto flex items-center gap-2\">
                  <MessageCircle className=\"w-5 h-5\" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className=\"py-12\" data-testid=\"contact-info-section\">
        <div className=\"container-custom\">
          <div className=\"grid grid-cols-2 md:grid-cols-4 gap-4\">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {info.link ? (
                  <a href={info.link} className=\"block\" data-testid={`contact-${info.title.toLowerCase()}`}>
                    <Card className=\"h-full bg-white border border-gray-100 hover:border-[#FF3B30] transition-colors\">
                      <CardContent className=\"p-5 text-center\">
                        <div className=\"w-12 h-12 bg-[#FF3B30]/10 rounded-xl flex items-center justify-center mx-auto mb-3\">
                          <info.icon className=\"w-6 h-6 text-[#FF3B30]\" />
                        </div>
                        <h3 className=\"font-bold text-[#111111] mb-1\">{info.title}</h3>
                        <p className=\"text-sm text-[#666666]\">{info.value}</p>
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Card className=\"h-full bg-white border border-gray-100\" data-testid={`contact-${info.title.toLowerCase()}`}>
                    <CardContent className=\"p-5 text-center\">
                      <div className=\"w-12 h-12 bg-[#FF3B30]/10 rounded-xl flex items-center justify-center mx-auto mb-3\">
                        <info.icon className=\"w-6 h-6 text-[#FF3B30]\" />
                      </div>
                      <h3 className=\"font-bold text-[#111111] mb-1\">{info.title}</h3>
                      <p className=\"text-sm text-[#666666]\">{info.value}</p>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Form Section */}
      <section className=\"section-padding bg-[#F5F5F7]\" data-testid=\"contact-form-section\">
        <div className=\"container-custom\">
          <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-12\">
            {/* Map */}
            <motion.div {...fadeUp}>
              <h2 className=\"text-2xl font-bold text-[#111111] mb-6\">Visit Our Store</h2>
              
              {/* Map Placeholder */}
              <div className=\"relative rounded-2xl overflow-hidden h-80 mb-6 bg-gray-200\" data-testid=\"map-placeholder\">
                <iframe
                  src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.8542!2d7.4899!3d9.0765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDQnMzUuNCJOIDfCsDI5JzIzLjYiRQ!5e0!3m2!1sen!2sng!4v1234567890\"
                  width=\"100%\"
                  height=\"100%\"
                  style={{ border: 0 }}
                  allowFullScreen=\"\"
                  loading=\"lazy\"
                  referrerPolicy=\"no-referrer-when-downgrade\"
                  title=\"Gadget Haven Location\"
                  className=\"rounded-2xl\"
                />
                <div className=\"absolute inset-0 flex items-center justify-center bg-gray-100/80 pointer-events-none\">
                  <div className=\"text-center p-6\">
                    <MapPin className=\"w-12 h-12 text-[#FF3B30] mx-auto mb-3\" />
                    <h3 className=\"font-bold text-[#111111] mb-2\">Shop A53A, New Banex Plaza</h3>
                    <p className=\"text-[#666666] text-sm\">Wuse 2, Abuja, Nigeria</p>
                  </div>
                </div>
              </div>

              <a
                href=\"https://maps.google.com/?q=New+Banex+Plaza+Abuja\"
                target=\"_blank\"
                rel=\"noopener noreferrer\"
                data-testid=\"open-maps-btn\"
              >
                <Button className=\"btn-outline w-full flex items-center justify-center gap-2\">
                  <MapPin className=\"w-5 h-5\" />
                  Open in Google Maps
                </Button>
              </a>

              {/* Social Links */}
              <div className=\"mt-8\">
                <h3 className=\"font-bold text-lg text-[#111111] mb-4\">Follow Us</h3>
                <div className=\"space-y-3\">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target=\"_blank\"
                      rel=\"noopener noreferrer\"
                      className=\"flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#FF3B30] transition-colors\"
                      data-testid={`social-link-${social.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center text-white`}>
                        {social.name[0]}
                      </div>
                      <div>
                        <p className=\"font-bold text-[#111111]\">{social.name}</p>
                        <p className=\"text-sm text-[#666666]\">{social.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className=\"border-0 shadow-xl\">
                <CardContent className=\"p-6 md:p-8\">
                  {submitted ? (
                    <div className=\"text-center py-8\">
                      <div className=\"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4\">
                        <CheckCircle className=\"w-8 h-8 text-green-600\" />
                      </div>
                      <h3 className=\"text-xl font-bold text-[#111111] mb-2\">Message Sent!</h3>
                      <p className=\"text-[#666666] mb-6\">We'll get back to you as soon as possible.</p>
                      <Button onClick={() => { setSubmitted(false); setFormData({ name: \"\", email: \"\", phone: \"\", message: \"\" }); }} className=\"btn-outline\">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className=\"text-2xl font-bold text-[#111111] mb-2\">Send Us a Message</h2>
                      <p className=\"text-[#666666] mb-6\">Have a question? We'd love to hear from you.</p>

                      <form onSubmit={handleSubmit} className=\"space-y-5\" data-testid=\"contact-form\">
                        <div>
                          <Label htmlFor=\"name\">Your Name *</Label>
                          <Input
                            id=\"name\"
                            value={formData.name}
                            onChange={(e) => handleChange(\"name\", e.target.value)}
                            className=\"mt-1\"
                            required
                            data-testid=\"contact-name-input\"
                          />
                        </div>

                        <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                          <div>
                            <Label htmlFor=\"email\">Email *</Label>
                            <Input
                              id=\"email\"
                              type=\"email\"
                              value={formData.email}
                              onChange={(e) => handleChange(\"email\", e.target.value)}
                              className=\"mt-1\"
                              required
                              data-testid=\"contact-email-input\"
                            />
                          </div>
                          <div>
                            <Label htmlFor=\"phone\">Phone *</Label>
                            <Input
                              id=\"phone\"
                              type=\"tel\"
                              value={formData.phone}
                              onChange={(e) => handleChange(\"phone\", e.target.value)}
                              placeholder=\"e.g., 08012345678\"
                              className=\"mt-1\"
                              required
                              data-testid=\"contact-phone-input\"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor=\"message\">Message *</Label>
                          <Textarea
                            id=\"message\"
                            value={formData.message}
                            onChange={(e) => handleChange(\"message\", e.target.value)}
                            placeholder=\"How can we help you?\"
                            className=\"mt-1\"
                            rows={5}
                            required
                            data-testid=\"contact-message-input\"
                          />
                        </div>

                        <div className=\"flex flex-col sm:flex-row gap-4 pt-2\">
                          <a
                            href={WHATSAPP_LINK}
                            target=\"_blank\"
                            rel=\"noopener noreferrer\"
                            className=\"flex-1\"
                          >
                            <Button
                              type=\"button\"
                              className=\"w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-6 py-4 font-bold flex items-center justify-center gap-2\"
                              data-testid=\"contact-form-whatsapp-btn\"
                            >
                              <MessageCircle className=\"w-5 h-5\" />
                              WhatsApp Instead
                            </Button>
                          </a>
                          <Button
                            type=\"submit\"
                            disabled={submitting}
                            className=\"flex-1 btn-primary\"
                            data-testid=\"contact-form-submit-btn\"
                          >
                            {submitting ? \"Sending...\" : \"Send Message\"}
                            <Send className=\"w-5 h-5 ml-2\" />
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Admin Note */}
              <div className=\"mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200\">
                <p className=\"text-sm text-yellow-800\">
                  <strong>Admin Note:</strong> Form submissions are sent to hello@gadgethavenabuja.com. 
                  Update the recipient email in the backend configuration.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
"