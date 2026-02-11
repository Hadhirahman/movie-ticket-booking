
import "./globals.css";

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
