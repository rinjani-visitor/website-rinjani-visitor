import NextTopLoader from "nextjs-toploader";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
// const poppins = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Rinjani Visitor",
  description:
    "Welcome to Rinjani Visitor, the gateway to the breathtaking beauty of nature, the wisdom of local culture, and the wonders of Mount Rinjani in Senaru! Rinjani Visitor is an application that offers a variety of products such as homestay, Mount Rinjani Trip, and culture trip. With Rinjani Visitor, you can easily order packages and enjoy the beauty of Indonesian nature in depth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className} suppressContentEditableWarning={true}>
        <NextTopLoader showSpinner={false} color="#166534" />
        {children}
      </body>
    </html>
  );
}
