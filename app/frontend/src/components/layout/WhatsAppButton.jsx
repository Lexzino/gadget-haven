"import { MessageCircle } from \"lucide-react\";
import { motion } from \"framer-motion\";

const WHATSAPP_LINK = \"https://wa.me/2349076087744?text=Hi%20Gadget%20Haven%2C%20I%27d%20like%20to%20get%20a%20price%20quote%20please\";

export const WhatsAppButton = () => {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target=\"_blank\"
      rel=\"noopener noreferrer\"
      className=\"fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#128C7E] transition-colors whatsapp-btn\"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: \"spring\", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-testid=\"floating-whatsapp-btn\"
    >
      <MessageCircle className=\"w-6 h-6\" />
      <span className=\"hidden sm:inline font-bold text-sm\">Chat with us</span>
    </motion.a>
  );
};

export default WhatsAppButton;
"