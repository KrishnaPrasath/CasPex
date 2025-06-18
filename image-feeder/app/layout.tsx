import "../styles/globals.css"

export const metadata = {
    title: 'Image Feeder',
    description: 'A Next.js app for browsing images',
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="bg-gray-50 text-gray-900">
        <div className="w-full p-4 bg-yellow text-center">Rick and Morty Characters</div>
          <main className="p-4">{children}</main>
        </body>
      </html>
    );
  };
