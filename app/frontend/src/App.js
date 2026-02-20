"import \"@/App.css\";
import { BrowserRouter, Routes, Route } from \"react-router-dom\";
import { Toaster } from \"@/components/ui/sonner\";
import { Header, Footer, WhatsAppButton } from \"@/components/layout\";
import { Home, Shop, Sell, Swap, Repairs, Contact } from \"@/pages\";

function App() {
  return (
    <div className=\"App\">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path=\"/\" element={<Home />} />
          <Route path=\"/shop\" element={<Shop />} />
          <Route path=\"/sell\" element={<Sell />} />
          <Route path=\"/swap\" element={<Swap />} />
          <Route path=\"/repairs\" element={<Repairs />} />
          <Route path=\"/contact\" element={<Contact />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
        <Toaster position=\"top-right\" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
"