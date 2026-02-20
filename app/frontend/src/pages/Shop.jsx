"import { useEffect, useState } from \"react\";
import { useSearchParams } from \"react-router-dom\";
import { motion } from \"framer-motion\";
import { Search, Filter, MessageCircle, X, ShoppingBag } from \"lucide-react\";
import { Button } from \"../components/ui/button\";
import { Card, CardContent } from \"../components/ui/card\";
import { Input } from \"../components/ui/input\";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from \"../components/ui/dialog\";
import { Label } from \"../components/ui/label\";
import { toast } from \"sonner\";
import axios from \"axios\";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const WHATSAPP_LINK = \"https://wa.me/2349076087744?text=\";

const staggerContainer = {
  initial: \"hidden\",
  animate: \"show\",
  variants: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  }
};

const staggerItem = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }
};

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(\"\");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get(\"category\") || \"All\");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteForm, setQuoteForm] = useState({ name: \"\", phone: \"\", email: \"\", message: \"\" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${API}/products`, { params: { category: selectedCategory !== \"All\" ? selectedCategory : undefined } }),
          axios.get(`${API}/categories`)
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error(\"Error fetching products:\", error);
        toast.error(\"Failed to load products\");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === \"All\") {
      searchParams.delete(\"category\");
    } else {
      searchParams.set(\"category\", category);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setSubmitting(true);
    try {
      await axios.post(`${API}/price-quote`, {
        product_name: selectedProduct.name,
        product_category: selectedProduct.category,
        ...quoteForm
      });
      toast.success(\"Quote request submitted! We'll contact you shortly.\");
      setSelectedProduct(null);
      setQuoteForm({ name: \"\", phone: \"\", email: \"\", message: \"\" });
    } catch (error) {
      console.error(\"Error submitting quote:\", error);
      toast.error(\"Failed to submit request. Please try again.\");
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsAppQuote = (product) => {
    const message = `Hi Gadget Haven, I'm interested in the ${product.name} (${product.storage || \"\"} - ${product.condition}). Please share the latest price and availability.`;
    window.open(`${WHATSAPP_LINK}${encodeURIComponent(message)}`, \"_blank\");
  };

  return (
    <main className=\"min-h-screen bg-white pt-20\">
      {/* Hero */}
      <section className=\"bg-[#F5F5F7] py-12 md:py-16\" data-testid=\"shop-hero\">
        <div className=\"container-custom\">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=\"text-center max-w-3xl mx-auto\"
          >
            <h1 className=\"text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-4\">
              Shop Gadgets
            </h1>
            <p className=\"text-[#666666] text-lg mb-8\">
              Browse our collection of phones, laptops, and accessories. All devices are quality-tested.
            </p>

            {/* Search Bar */}
            <div className=\"relative max-w-md mx-auto\">
              <Search className=\"absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400\" />
              <Input
                type=\"text\"
                placeholder=\"Search products...\"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=\"pl-12 pr-4 py-6 rounded-full border-2 border-gray-200 focus:border-[#FF3B30] text-base\"
                data-testid=\"search-input\"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories & Products */}
      <section className=\"section-padding\" data-testid=\"products-section\">
        <div className=\"container-custom\">
          {/* Category Tabs */}
          <div className=\"flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide\">
            <Filter className=\"w-5 h-5 text-gray-400 flex-shrink-0\" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? \"bg-[#FF3B30] text-white\"
                    : \"bg-[#F5F5F7] text-[#111111] hover:bg-gray-200\"
                }`}
                data-testid={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className=\"flex items-center justify-center py-20\">
              <div className=\"loader\" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className=\"text-center py-20\">
              <ShoppingBag className=\"w-16 h-16 text-gray-300 mx-auto mb-4\" />
              <h3 className=\"text-xl font-bold text-[#111111] mb-2\">No products found</h3>
              <p className=\"text-[#666666]\">Try adjusting your search or filter</p>
            </div>
          ) : (
            <motion.div
              className=\"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6\"
              {...staggerContainer}
              key={selectedCategory + searchTerm}
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} {...staggerItem}>
                  <Card className=\"group bg-white border border-gray-100 overflow-hidden card-hover product-card h-full\" data-testid={`shop-product-${product.id}`}>
                    <div className=\"aspect-square overflow-hidden bg-[#F5F5F7] relative\">
                      <img
                        src={product.image}
                        alt={product.name}
                        className=\"w-full h-full object-cover product-card-image\"
                      />
                      {/* Quick WhatsApp */}
                      <button
                        onClick={() => openWhatsAppQuote(product)}
                        className=\"absolute top-3 right-3 w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-[#128C7E]\"
                        aria-label=\"Quick WhatsApp\"
                        data-testid={`quick-whatsapp-${product.id}`}
                      >
                        <MessageCircle className=\"w-5 h-5\" />
                      </button>
                    </div>
                    <CardContent className=\"p-4\">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold mb-2 ${
                        product.condition.includes(\"UK Used\") ? \"badge-uk-used text-white\" : \"badge-new text-white\"
                      }`}>
                        {product.condition}
                      </span>
                      <h3 className=\"font-bold text-[#111111] mb-1 line-clamp-2\">{product.name}</h3>
                      {product.storage && (
                        <p className=\"text-sm text-[#666666] mb-2\">{product.storage}</p>
                      )}
                      <p className=\"text-[#FF3B30] font-bold text-lg mb-3\">{product.price}</p>
                      <Button
                        onClick={() => setSelectedProduct(product)}
                        className=\"w-full btn-primary text-sm py-2\"
                        data-testid={`request-quote-${product.id}`}
                      >
                        Request Quote
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Quote Request Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className=\"sm:max-w-md\" data-testid=\"quote-modal\">
          <DialogHeader>
            <DialogTitle className=\"text-xl font-bold\">Request Price Quote</DialogTitle>
            <DialogDescription>
              Get the latest price for {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className=\"flex items-center gap-4 p-4 bg-[#F5F5F7] rounded-xl mb-4\">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className=\"w-16 h-16 object-cover rounded-lg\"
              />
              <div>
                <h4 className=\"font-bold text-[#111111]\">{selectedProduct.name}</h4>
                <p className=\"text-sm text-[#666666]\">{selectedProduct.storage} • {selectedProduct.condition}</p>
                <p className=\"text-[#FF3B30] font-bold\">{selectedProduct.price}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleQuoteSubmit} className=\"space-y-4\">
            <div>
              <Label htmlFor=\"name\">Your Name *</Label>
              <Input
                id=\"name\"
                value={quoteForm.name}
                onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                required
                className=\"mt-1\"
                data-testid=\"quote-name-input\"
              />
            </div>
            <div>
              <Label htmlFor=\"phone\">Phone Number *</Label>
              <Input
                id=\"phone\"
                type=\"tel\"
                value={quoteForm.phone}
                onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                required
                className=\"mt-1\"
                placeholder=\"e.g., 08012345678\"
                data-testid=\"quote-phone-input\"
              />
            </div>
            <div>
              <Label htmlFor=\"email\">Email (Optional)</Label>
              <Input
                id=\"email\"
                type=\"email\"
                value={quoteForm.email}
                onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                className=\"mt-1\"
                data-testid=\"quote-email-input\"
              />
            </div>
            <div>
              <Label htmlFor=\"message\">Additional Message</Label>
              <Input
                id=\"message\"
                value={quoteForm.message}
                onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                className=\"mt-1\"
                placeholder=\"Any specific questions?\"
                data-testid=\"quote-message-input\"
              />
            </div>

            <div className=\"flex gap-3 pt-2\">
              <Button
                type=\"button\"
                variant=\"outline\"
                onClick={() => selectedProduct && openWhatsAppQuote(selectedProduct)}
                className=\"flex-1 flex items-center justify-center gap-2\"
                data-testid=\"quote-whatsapp-btn\"
              >
                <MessageCircle className=\"w-4 h-4\" />
                WhatsApp
              </Button>
              <Button
                type=\"submit\"
                disabled={submitting}
                className=\"flex-1 btn-primary\"
                data-testid=\"quote-submit-btn\"
              >
                {submitting ? \"Submitting...\" : \"Submit Request\"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Shop;
"