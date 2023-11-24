import ButtonScrollTop from "@/components/ButtonScrollTop";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";


export default function RootLayout({ children }) {
  return (
    <section className="flex flex-col min-h-screen">
      <ButtonScrollTop />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </section>
  )
}