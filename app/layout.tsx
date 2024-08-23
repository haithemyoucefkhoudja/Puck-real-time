import "./app.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const color = 'red'
  
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
