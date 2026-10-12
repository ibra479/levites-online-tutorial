
import "./globals.css";

export const metadata = {
  title: "Levites Online Tutorial | Your Journey to 300+",
  description:
    "Register for Levites Online Tutorial and take the next step towards your UTME goals and dream university.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
