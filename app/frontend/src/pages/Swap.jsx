"import { useState } from \"react\";
import { motion } from \"framer-motion\";
import { 
  RefreshCw, 
  CheckCircle, 
  ArrowRight,
  MessageCircle,
  ArrowLeftRight,
  Smartphone,
  TrendingUp
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

const swapBenefits = [
  { icon: ArrowLeftRight, title: \"Instant Trade-In\", desc: \"Get value for your old device towards a new one\" },
  { icon: TrendingUp, title: \"Best Value\", desc: \"Fair market rates on your device\" },
  { icon: RefreshCw, title: \"Wide Selection\", desc: \"Choose from our range of devices\" },
];

export const Swap = () => {
  const [formData, setFormData] = useState({
    current_device_type: \"\",
    current_model: \"\",
    current_condition: \"\",
    desired_device: \"\",
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
    
    if (!formData.current_device_type || !formData.current_model || !formData.current_condition || !formData.desired_device || !formData.name || !formData.phone) {
      toast.error(\"Please fill in all required fields\");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/swap-request`, formData);
      setSubmitted(true);
      toast.success(\"Your swap request has been submitted!\");
    } catch (error) {
      console.error(\"Error submitting swap request:\", error);
      toast.error(\"Failed to submit request. Please try again.\");
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsAppSwap = () => {
    const message = `Hi Gadget Haven, I want to swap my device:

Current Device: ${formData.current_device_type} ${formData.current_model}
Condition: ${formData.current_condition}
Desired Device: ${formData.desired_device}

Please let me know the swap options.`;
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
                Swap Request Submitted!
              </h1>
              <p className=\"text-[#666666] text-lg mb-8\">
                We've received your swap request. Our team will contact you with available options.
              </p>
              <div className=\"flex flex-col sm:flex-row gap-4 justify-center\">
                <Button onClick={() => setSubmitted(false)} className=\"btn-outline\">
                  Submit Another
                </Button>
                <a href={WHATSAPP_LINK + encodeURIComponent(\"Hi, I just submitted a swap request and would like to follow up.\")} target=\"_blank\" rel=\"noopener noreferrer\">
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
      <section className=\"bg-gradient-to-br from-[#FF3B30] to-[#D72F26] py-16 md:py-20\" data-testid=\"swap-hero\">
        <div className=\"container-custom\">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=\"text-center max-w-3xl mx-auto\"
          >
            <span className=\"inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full text-sm font-bold mb-6\">
              <RefreshCw className=\"w-4 h-4\" />
              Trade-In Program
            </span>
            <h1 className=\"text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4\">
              Swap Your Device
            </h1>
            <p className=\"text-white/80 text-lg\">
              Trade in your old device and upgrade to something better. Get instant value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className=\"py-12 bg-[#F5F5F7]\" data-testid=\"swap-benefits\">
        <div className=\"container-custom\">
          <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
            {swapBenefits.map((benefit, i) => (
              <motion.div 
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className=\"bg-white border-0 h-full\">
                  <CardContent className=\"p-6 text-center\">
                    <div className=\"w-14 h-14 bg-[#FF3B30]/10 rounded-2xl flex items-center justify-center mx-auto mb-4\">
                      <benefit.icon className=\"w-7 h-7 text-[#FF3B30]\" />
                    </div>
                    <h3 className=\"font-bold text-lg text-[#111111] mb-2\">{benefit.title}</h3>
                    <p className=\"text-[#666666]\">{benefit.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className=\"section-padding\" data-testid=\"swap-form-section\">
        <div className=\"container-custom\">
          <div className=\"grid grid-cols-1 lg:grid-cols-5 gap-12\">
            {/* Form */}
            <motion.div className=\"lg:col-span-3\" {...fadeUp}>
              <Card className=\"border-0 shadow-xl\">
                <CardContent className=\"p-6 md:p-8\">
                  <h2 className=\"text-2xl font-bold text-[#111111] mb-2\">Swap Details</h2>
                  <p className=\"text-[#666666] mb-6\">Tell us what you have and what you want</p>

                  <form onSubmit={handleSubmit} className=\"space-y-6\" data-testid=\"swap-form\">
                    {/* Current Device */}
                    <div className=\"bg-[#F5F5F7] rounded-2xl p-5 space-y-4\">
                      <h3 className=\"font-bold text-[#111111] flex items-center gap-2\">
                        <Smartphone className=\"w-5 h-5 text-[#FF3B30]\" />
                        Your Current Device
                      </h3>
                      <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                        <div>
                          <Label htmlFor=\"current_device_type\">Device Type *</Label>
                          <Select value={formData.current_device_type} onValueChange={(v) => handleChange(\"current_device_type\", v)}>
                            <SelectTrigger className=\"mt-1 bg-white\" data-testid=\"current-device-type-select\">
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
                          <Label htmlFor=\"current_model\">Model *</Label>
                          <Input
                            id=\"current_model\"
                            value={formData.current_model}
                            onChange={(e) => handleChange(\"current_model\", e.target.value)}
                            placeholder=\"e.g., iPhone 13\"
                            className=\"mt-1 bg-white\"
                            required
                            data-testid=\"current-model-input\"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor=\"current_condition\">Condition *</Label>
                        <Select value={formData.current_condition} onValueChange={(v) => handleChange(\"current_condition\", v)}>
                          <SelectTrigger className=\"mt-1 bg-white\" data-testid=\"current-condition-select\">
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

                    {/* Arrow */}
                    <div className=\"flex justify-center\">
                      <div className=\"w-12 h-12 bg-[#FF3B30] rounded-full flex items-center justify-center\">
                        <ArrowLeftRight className=\"w-6 h-6 text-white\" />
                      </div>
                    </div>

                    {/* Desired Device */}
                    <div className=\"bg-green-50 rounded-2xl p-5\">
                      <h3 className=\"font-bold text-[#111111] flex items-center gap-2 mb-4\">
                        <TrendingUp className=\"w-5 h-5 text-green-600\" />
                        What You Want
                      </h3>
                      <div>
                        <Label htmlFor=\"desired_device\">Desired Device *</Label>
                        <Input
                          id=\"desired_device\"
                          value={formData.desired_device}
                          onChange={(e) => handleChange(\"desired_device\", e.target.value)}
                          placeholder=\"e.g., iPhone 15 Pro Max 256GB\"
                          className=\"mt-1 bg-white\"
                          required
                          data-testid=\"desired-device-input\"
                        />
                        <p className=\"text-sm text-[#666666] mt-2\">
                          Be specific with model, storage, and color preference if any
                        </p>
                      </div>
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
                          data-testid=\"swap-name-input\"
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
                          data-testid=\"swap-phone-input\"
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
                        data-testid=\"swap-email-input\"
                      />
                    </div>

                    <div>
                      <Label htmlFor=\"additional_info\">Additional Info (optional)</Label>
                      <Textarea
                        id=\"additional_info\"
                        value={formData.additional_info}
                        onChange={(e) => handleChange(\"additional_info\", e.target.value)}
                        placeholder=\"Any other details or questions?\"
                        className=\"mt-1\"
                        rows={3}
                        data-testid=\"swap-additional-info-input\"
                      />
                    </div>

                    <div className=\"flex flex-col sm:flex-row gap-4 pt-2\">
                      <Button
                        type=\"button\"
                        onClick={openWhatsAppSwap}
                        className=\"flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-6 py-4 font-bold flex items-center justify-center gap-2\"
                        data-testid=\"swap-whatsapp-btn\"
                      >
                        <MessageCircle className=\"w-5 h-5\" />
                        Discuss via WhatsApp
                      </Button>
                      <Button
                        type=\"submit\"
                        disabled={submitting}
                        className=\"flex-1 btn-primary\"
                        data-testid=\"swap-submit-btn\"
                      >
                        {submitting ? \"Submitting...\" : \"Submit Swap Request\"}
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
              <div className=\"sticky top-24 space-y-6\">
                <Card className=\"bg-[#F5F5F7] border-0\">
                  <CardContent className=\"p-6\">
                    <h3 className=\"font-bold text-lg text-[#111111] mb-4\">How Swap Works</h3>
                    <ol className=\"space-y-4\">
                      {[
                        \"Tell us what you have and what you want\",
                        \"We assess your device value\",
                        \"Pay the difference (or get cash back!)\",
                        \"Walk out with your new device\"
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

                <Card className=\"bg-gradient-to-br from-[#111111] to-[#222222] text-white\">
                  <CardContent className=\"p-6\">
                    <RefreshCw className=\"w-10 h-10 text-[#FF3B30] mb-4\" />
                    <h3 className=\"font-bold text-lg mb-2\">Popular Swaps</h3>
                    <ul className=\"space-y-2 text-gray-300 text-sm\">
                      <li>• iPhone 13 → iPhone 15</li>
                      <li>• Samsung S22 → S24 Ultra</li>
                      <li>• iPhone 12 → iPhone 14 Pro</li>
                      <li>• MacBook Air M1 → M3</li>
                    </ul>
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

export default Swap;
"