"import { useState } from \"react\";
import { motion } from \"framer-motion\";
import { 
  DollarSign, 
  Smartphone, 
  CheckCircle, 
  ArrowRight,
  MessageCircle,
  Shield,
  Zap,
  Clock
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

const deviceTypes = [\"iPhone\", \"Samsung\", \"Pixel\", \"OnePlus\", \"Xiaomi\", \"Other Android\", \"MacBook\", \"Laptop\", \"iPad/Tablet\", \"Apple Watch\", \"Other\"];
const conditions = [\"Excellent - Like New\", \"Good - Minor Scratches\", \"Fair - Visible Wear\", \"Damaged - Cracked/Broken\"];
const storageOptions = [\"32GB\", \"64GB\", \"128GB\", \"256GB\", \"512GB\", \"1TB\", \"Other\"];
const batteryHealthOptions = [\"95-100%\", \"85-94%\", \"75-84%\", \"Below 75%\", \"Unknown\"];

const benefits = [
  { icon: DollarSign, title: \"Fair Pricing\", desc: \"We offer competitive market rates\" },
  { icon: Zap, title: \"Quick Process\", desc: \"Get a quote within minutes\" },
  { icon: Shield, title: \"Safe & Secure\", desc: \"Your data is wiped professionally\" },
  { icon: Clock, title: \"Same Day Payment\", desc: \"Cash or transfer on the spot\" },
];

export const Sell = () => {
  const [formData, setFormData] = useState({
    device_type: \"\",
    model: \"\",
    storage: \"\",
    condition: \"\",
    battery_health: \"\",
    name: \"\",
    email: \"\",
    phone: \"\",
    additional_info: \"\"
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.device_type || !formData.model || !formData.condition || !formData.name || !formData.phone) {
      toast.error(\"Please fill in all required fields\");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/sell-request`, formData);
      setSubmitted(true);
      toast.success(\"Your sell request has been submitted!\");
    } catch (error) {
      console.error(\"Error submitting sell request:\", error);
      toast.error(\"Failed to submit request. Please try again.\");
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsAppSell = () => {
    const message = `Hi Gadget Haven, I want to sell my device:

Device: ${formData.device_type} ${formData.model}
Storage: ${formData.storage}
Condition: ${formData.condition}
Battery Health: ${formData.battery_health || \"Not specified\"}

Please provide a quote.`;
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
                Request Submitted!
              </h1>
              <p className=\"text-[#666666] text-lg mb-8\">
                We've received your sell request. Our team will review and contact you shortly with a quote.
              </p>
              <div className=\"flex flex-col sm:flex-row gap-4 justify-center\">
                <Button onClick={() => setSubmitted(false)} className=\"btn-outline\">
                  Submit Another
                </Button>
                <a href={WHATSAPP_LINK + encodeURIComponent(\"Hi, I just submitted a sell request and would like to follow up.\")} target=\"_blank\" rel=\"noopener noreferrer\">
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
      <section className=\"bg-gradient-to-br from-[#111111] to-[#222222] py-16 md:py-20\" data-testid=\"sell-hero\">
        <div className=\"container-custom\">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=\"text-center max-w-3xl mx-auto\"
          >
            <span className=\"inline-flex items-center gap-2 px-4 py-2 bg-[#FF3B30] text-white rounded-full text-sm font-bold mb-6\">
              <DollarSign className=\"w-4 h-4\" />
              We Buy Devices
            </span>
            <h1 className=\"text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4\">
              Sell Your Device
            </h1>
            <p className=\"text-gray-300 text-lg\">
              Get a fast quote and same-day payment. We buy all brands and conditions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className=\"py-12 bg-[#F5F5F7]\" data-testid=\"sell-benefits\">
        <div className=\"container-custom\">
          <div className=\"grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6\">
            {benefits.map((benefit, i) => (
              <motion.div 
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className=\"flex flex-col items-center text-center p-4\"
              >
                <div className=\"w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm\">
                  <benefit.icon className=\"w-6 h-6 text-[#FF3B30]\" />
                </div>
                <h3 className=\"font-bold text-[#111111] mb-1\">{benefit.title}</h3>
                <p className=\"text-sm text-[#666666]\">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className=\"section-padding\" data-testid=\"sell-form-section\">
        <div className=\"container-custom\">
          <div className=\"grid grid-cols-1 lg:grid-cols-5 gap-12\">
            {/* Form */}
            <motion.div className=\"lg:col-span-3\" {...fadeUp}>
              <Card className=\"border-0 shadow-xl\">
                <CardContent className=\"p-6 md:p-8\">
                  <h2 className=\"text-2xl font-bold text-[#111111] mb-2\">Device Details</h2>
                  <p className=\"text-[#666666] mb-6\">Fill in your device info for a quick quote</p>

                  <form onSubmit={handleSubmit} className=\"space-y-6\" data-testid=\"sell-form\">
                    <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                      <div>
                        <Label htmlFor=\"device_type\">Device Type *</Label>
                        <Select value={formData.device_type} onValueChange={(v) => handleChange(\"device_type\", v)}>
                          <SelectTrigger className=\"mt-1\" data-testid=\"device-type-select\">
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
                        <Label htmlFor=\"model\">Model *</Label>
                        <Input
                          id=\"model\"
                          value={formData.model}
                          onChange={(e) => handleChange(\"model\", e.target.value)}
                          placeholder=\"e.g., iPhone 14 Pro Max\"
                          className=\"mt-1\"
                          required
                          data-testid=\"model-input\"
                        />
                      </div>
                    </div>

                    <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                      <div>
                        <Label htmlFor=\"storage\">Storage</Label>
                        <Select value={formData.storage} onValueChange={(v) => handleChange(\"storage\", v)}>
                          <SelectTrigger className=\"mt-1\" data-testid=\"storage-select\">
                            <SelectValue placeholder=\"Select storage\" />
                          </SelectTrigger>
                          <SelectContent>
                            {storageOptions.map(opt => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor=\"condition\">Condition *</Label>
                        <Select value={formData.condition} onValueChange={(v) => handleChange(\"condition\", v)}>
                          <SelectTrigger className=\"mt-1\" data-testid=\"condition-select\">
                            <SelectValue placeholder=\"Select condition\" />
                          </SelectTrigger>
                          <SelectContent>
                            {conditions.map(cond => (
                              <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor=\"battery_health\">Battery Health (for phones)</Label>
                      <Select value={formData.battery_health} onValueChange={(v) => handleChange(\"battery_health\", v)}>
                        <SelectTrigger className=\"mt-1\" data-testid=\"battery-select\">
                          <SelectValue placeholder=\"Select battery health\" />
                        </SelectTrigger>
                        <SelectContent>
                          {batteryHealthOptions.map(opt => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                          data-testid=\"name-input\"
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
                          data-testid=\"phone-input\"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor=\"email\">Email *</Label>
                      <Input
                        id=\"email\"
                        type=\"email\"
                        value={formData.email}
                        onChange={(e) => handleChange(\"email\", e.target.value)}
                        className=\"mt-1\"
                        required
                        data-testid=\"email-input\"
                      />
                    </div>

                    <div>
                      <Label htmlFor=\"additional_info\">Additional Info (optional)</Label>
                      <Textarea
                        id=\"additional_info\"
                        value={formData.additional_info}
                        onChange={(e) => handleChange(\"additional_info\", e.target.value)}
                        placeholder=\"Any accessories included? Known issues?\"
                        className=\"mt-1\"
                        rows={3}
                        data-testid=\"additional-info-input\"
                      />
                    </div>

                    <div className=\"flex flex-col sm:flex-row gap-4 pt-2\">
                      <Button
                        type=\"button\"
                        onClick={openWhatsAppSell}
                        className=\"flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-6 py-4 font-bold flex items-center justify-center gap-2\"
                        data-testid=\"sell-whatsapp-btn\"
                      >
                        <MessageCircle className=\"w-5 h-5\" />
                        Get Quote via WhatsApp
                      </Button>
                      <Button
                        type=\"submit\"
                        disabled={submitting}
                        className=\"flex-1 btn-primary\"
                        data-testid=\"sell-submit-btn\"
                      >
                        {submitting ? \"Submitting...\" : \"Submit Request\"}
                        <ArrowRight className=\"w-5 h-5 ml-2\" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              className=\"lg:col-span-2\"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className=\"sticky top-24\">
                <Card className=\"bg-[#F5F5F7] border-0 mb-6\">
                  <CardContent className=\"p-6\">
                    <h3 className=\"font-bold text-lg text-[#111111] mb-4\">How It Works</h3>
                    <ol className=\"space-y-4\">
                      {[
                        \"Fill out the form or message us on WhatsApp\",
                        \"We'll review and send you a price quote\",
                        \"Bring your device to our store\",
                        \"Get paid cash or transfer instantly\"
                      ].map((step, i) => (
                        <li key={i} className=\"flex gap-3\">
                          <span className=\"w-6 h-6 bg-[#FF3B30] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0\">
                            {i + 1}
                          </span>
                          <span className=\"text-[#666666]\">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                <Card className=\"border-2 border-[#FF3B30] bg-[#FF3B30]/5\">
                  <CardContent className=\"p-6 text-center\">
                    <Smartphone className=\"w-12 h-12 text-[#FF3B30] mx-auto mb-4\" />
                    <h3 className=\"font-bold text-lg text-[#111111] mb-2\">We Buy All Brands</h3>
                    <p className=\"text-[#666666] text-sm mb-4\">
                      iPhones, Samsung, Pixel, MacBooks, Laptops, Tablets, Watches, and more!
                    </p>
                    <p className=\"text-[#FF3B30] font-bold\">Even damaged devices!</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Sell;
"