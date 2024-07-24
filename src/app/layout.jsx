import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout({ children })  {
  return (
    <html lang="en">
      <body >
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
