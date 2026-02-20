"import { useState, useEffect } from \"react\";
import { motion } from \"framer-motion\";
import { 
  Wrench, 
  CheckCircle, 
  ArrowRight,
  MessageCircle,
  Smartphone,
  Battery,
  Zap,
  Droplets,
  Monitor,
  Settings,
  Clock,
  Shield
} from \"lucide-react\";
import { Button } from \"../components/ui/button\";
import { Card, CardContent } from \"../components/ui/card\";
import { Input } from \"../components/ui/input\";
import { Label } from \"../components/ui/label\";
import { Textarea } from \"../components/ui/textarea\";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from \"../components/ui/select\";
import { toast } from \"sonner\";
import axios from \"axios\";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const WHATSAPP_LINK = \"https://wa.me/2349076087744?text=\";

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

const issueIcons = {
  screen: Monitor,
  battery: Battery,
  charging: Zap,
  water: Droplets,
  software: Settings,
  glass: Smartphone,
};

const deviceTypes = [\"iPhone\", \"Samsung\", \"Pixel\", \"OnePlus\", \"Xiaomi\", \"Other Android\", \"MacBook\", \"Laptop\", \"iPad/Tablet\", \"Apple Watch\", \"Other\"];

export const Repairs = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    device_type: \"\",
    device_model: \"\",
    issue: \"\",
    issue_description: \"\",
    preferred_date: \"\",
    name: \"\",
    phone: \"\",
    email: \"\"
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API}/repair-services`);
        setServices(res.data);
      } catch (error) {
        console.error(\"Error fetching services:\", error);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectService = (service) => {
    setSelectedService(service);
    setFormData(prev => ({ ...prev, issue: service.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.device_type || !formData.device_model || !formData.issue || !formData.name || !formData.phone) {
      toast.error(\"Please fill in all required fields\");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/repair-booking`, formData);
      setSubmitted(true);
      toast.success(\"Your repair booking has been submitted!\");
    } catch (error) {
      console.error(\"Error submitting repair booking:\", error);
      toast.error(\"Failed to submit booking. Please try again.\");
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsAppRepair = () => {
    const message = `Hi Gadget Haven, I need a repair:

Device: ${formData.device_type} ${formData.device_model}
Issue: ${formData.issue}
Details: ${formData.issue_description || \"N/A\"}

Please advise on pricing and availability.`;
    window.open(`${WHATSAPP_LINK}${encodeURIComponent(message)}`, \"_blank\");
  };

  if (submitted) {
    return (
      <main className=\"min-h-screen bg-white pt-20\">
        <section className=\"section-padding\">
          <div className=\"container-custom max-w-2xl\">
            <motion.div 
              className=\"text-center\"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className=\"w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6\">
                <CheckCircle className=\"w-10 h-10 text-green-600\" />
              </div>
              <h1 className=\"text-3xl md:text-4xl font-bold text-[#111111] mb-4\">
                Booking Confirmed!
              </h1>
              <p className=\"text-[#666666] text-lg mb-8\">
                We've received your repair booking. Our team will contact you to confirm the appointment.
              </p>
              <div className=\"flex flex-col sm:flex-row gap-4 justify-center\">
                <Button onClick={() => { setSubmitted(false); setSelectedService(null); }} className=\"btn-outline\">
                  Book Another
                </Button>
                <a href={WHATSAPP_LINK + encodeURIComponent(\"Hi, I just booked a repair and would like to confirm.\")} target=\"_blank\" rel=\"noopener noreferrer\">
                  <Button className=\"btn-primary flex items-center gap-2 w-full\">
                    <MessageCircle className=\"w-5 h-5\" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className=\"min-h-screen bg-white pt-20\">
      {/* Hero */}
      <section className=\"bg-[#111111] py-16 md:py-20 relative overflow-hidden\" data-testid=\"repairs-hero\">
        <div className=\"absolute inset-0 opacity-20\">
          <img
            src=\"https://images.unsplash.com/photo-1576613109753-27804de2cba8?w=1200&h=600&fit=crop\"
            alt=\"\"
            className=\"w-full h-full object-cover\"
          />
        </div>
        <div className=\"container-custom relative z-10\">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=\"text-center max-w-3xl mx-auto\"
          >
            <span className=\"inline-flex items-center gap-2 px-4 py-2 bg-[#FF3B30] text-white rounded-full text-sm font-bold mb-6\">
              <Wrench className=\"w-4 h-4\" />
              Expert Repairs
            </span>
            <h1 className=\"text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4\">
              We Fix It Right
            </h1>
            <p className=\"text-gray-300 text-lg mb-6\">
              Professional repairs for all brands. Screen, battery, charging port, software issues and more.
            </p>
            <div className=\"flex items-center justify-center gap-6 text-gray-400\">
              <div className=\"flex items-center gap-2\">
                <Clock className=\"w-5 h-5 text-[#FF3B30]\" />
                <span>Quick Turnaround</span>
              </div>
              <div className=\"flex items-center gap-2\">
                <Shield className=\"w-5 h-5 text-[#FF3B30]\" />
                <span>Quality Parts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className=\"section-padding bg-[#F5F5F7]\" data-testid=\"repair-services-section\">
        <div className=\"container-custom\">
          <motion.div className=\"text-center mb-12\" {...fadeUp}>
            <h2 className=\"text-3xl md:text-4xl font-bold text-[#111111] mb-4\">
              Our Repair Services
            </h2>
            <p className=\"text-[#666666] text-lg max-w-2xl mx-auto\">
              Select a service to book or contact us for custom repairs
            </p>
          </motion.div>

          <motion.div 
            className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6\"
            {...staggerContainer}
          >
            {services.map((service) => {
              const IconComponent = issueIcons[service.icon] || Wrench;
              const isSelected = selectedService?.id === service.id;
              
              return (
                <motion.div key={service.id} {...staggerItem}>
                  <Card 
                    className={`cursor-pointer transition-all duration-300 repair-card h-full ${
                      isSelected 
                        ? \"border-2 border-[#FF3B30] bg-[#FF3B30]/5\" 
                        : \"border-2 border-transparent bg-white hover:border-gray-200\"
                    }`}
                    onClick={() => selectService(service)}
                    data-testid={`repair-service-${service.id}`}
                  >
                    <CardContent className=\"p-6\">
                      <div className={`repair-icon mb-4 ${isSelected ? \"bg-[#FF3B30] text-white\" : \"\"}`}>
                        <IconComponent className=\"w-7 h-7\" />
                      </div>
                      <h3 className=\"font-bold text-xl text-[#111111] mb-2\">{service.name}</h3>
                      <p className=\"text-[#666666] mb-4\">{service.description}</p>
                      <div className=\"flex items-center justify-between\">
                        <span className=\"text-[#FF3B30] font-bold text-lg\">{service.price_from}</span>
                        {isSelected && (
                          <CheckCircle className=\"w-6 h-6 text-[#FF3B30]\" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p 
            className=\"text-center text-[#666666] mt-8\"
            {...fadeUp}
          >
            * Free diagnosis available (if applicable). Final price depends on device model and damage extent.
          </motion.p>
        </div>
      </section>

      {/* Booking Form */}
      <section className=\"section-padding\" data-testid=\"repair-booking-section\">
        <div className=\"container-custom max-w-3xl\">
          <motion.div {...fadeUp}>
            <Card className=\"border-0 shadow-xl\">
              <CardContent className=\"p-6 md:p-8\">
                <h2 className=\"text-2xl font-bold text-[#111111] mb-2\">Book a Repair</h2>
                <p className=\"text-[#666666] mb-6\">Fill in your device details and we'll get back to you</p>

                <form onSubmit={handleSubmit} className=\"space-y-6\" data-testid=\"repair-form\">
                  <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                    <div>
                      <Label htmlFor=\"device_type\">Device Type *</Label>
                      <Select value={formData.device_type} onValueChange={(v) => handleChange(\"device_type\", v)}>
                        <SelectTrigger className=\"mt-1\" data-testid=\"repair-device-type-select\">
                          <SelectValue placeholder=\"Select type\" />
                        </SelectTrigger>
                        <SelectContent>
                          {deviceTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor=\"device_model\">Device Model *</Label>
                      <Input
                        id=\"device_model\"
                        value={formData.device_model}
                        onChange={(e) => handleChange(\"device_model\", e.target.value)}
                        placeholder=\"e.g., iPhone 14 Pro Max\"
                        className=\"mt-1\"
                        required
                        data-testid=\"repair-device-model-input\"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor=\"issue\">Issue / Service *</Label>
                    <Select value={formData.issue} onValueChange={(v) => handleChange(\"issue\", v)}>
                      <SelectTrigger className=\"mt-1\" data-testid=\"repair-issue-select\">
                        <SelectValue placeholder=\"Select issue\" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map(service => (
                          <SelectItem key={service.id} value={service.name}>{service.name}</SelectItem>
                        ))}
                        <SelectItem value=\"Other\">Other (describe below)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor=\"issue_description\">Describe the Issue</Label>
                    <Textarea
                      id=\"issue_description\"
                      value={formData.issue_description}
                      onChange={(e) => handleChange(\"issue_description\", e.target.value)}
                      placeholder=\"Tell us more about the problem...\"
                      className=\"mt-1\"
                      rows={3}
                      data-testid=\"repair-issue-description-input\"
                    />
                  </div>

                  <div>
                    <Label htmlFor=\"preferred_date\">Preferred Date</Label>
                    <Input
                      id=\"preferred_date\"
                      type=\"date\"
                      value={formData.preferred_date}
                      onChange={(e) => handleChange(\"preferred_date\", e.target.value)}
                      className=\"mt-1\"
                      min={new Date().toISOString().split('T')[0]}
                      data-testid=\"repair-date-input\"
                    />
                  </div>

                  <div className=\"h-px bg-gray-200\" />

                  <h3 className=\"text-lg font-bold text-[#111111]\">Your Contact Info</h3>

                  <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                    <div>
                      <Label htmlFor=\"name\">Your Name *</Label>
                      <Input
                        id=\"name\"
                        value={formData.name}
                        onChange={(e) => handleChange(\"name\", e.target.value)}
                        className=\"mt-1\"
                        required
                        data-testid=\"repair-name-input\"
                      />
                    </div>
                    <div>
                      <Label htmlFor=\"phone\">Phone Number *</Label>
                      <Input
                        id=\"phone\"
                        type=\"tel\"
                        value={formData.phone}
                        onChange={(e) => handleChange(\"phone\", e.target.value)}
                        placeholder=\"e.g., 08012345678\"
                        className=\"mt-1\"
                        required
                        data-testid=\"repair-phone-input\"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor=\"email\">Email (Optional)</Label>
                    <Input
                      id=\"email\"
                      type=\"email\"
                      value={formData.email}
                      onChange={(e) => handleChange(\"email\", e.target.value)}
                      className=\"mt-1\"
                      data-testid=\"repair-email-input\"
                    />
                  </div>

                  <div className=\"flex flex-col sm:flex-row gap-4 pt-2\">
                    <Button
                      type=\"button\"
                      onClick={openWhatsAppRepair}
                      className=\"flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-6 py-4 font-bold flex items-center justify-center gap-2\"
                      data-testid=\"repair-whatsapp-btn\"
                    >
                      <MessageCircle className=\"w-5 h-5\" />
                      Chat on WhatsApp
                    </Button>
                    <Button
                      type=\"submit\"
                      disabled={submitting}
                      className=\"flex-1 btn-primary\"
                      data-testid=\"repair-submit-btn\"
                    >
                      {submitting ? \"Booking...\" : \"Book Repair\"}
                      <ArrowRight className=\"w-5 h-5 ml-2\" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Repairs;
"