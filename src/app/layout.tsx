import Navigation from "@/components/navigation/Navigation";
import "./globals.css";
import type { Metadata, NextApiRequest } from "next";
import { EB_Garamond } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { HelmetProvider } from 'react-helmet-async';
import helmetCsp from 'helmet-csp';
import Helmet from 'react-helmet';
import { NextApiResponse } from 'next';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set the appropriate CORS headers to allow requests only from trusted domains
  res.setHeader('Access-Control-Allow-Origin', 'https://your-trusted-domain.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Add the HTTP Strict Transport Security (HSTS) header
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Set the X-Content-Type-Options header
  res.setHeader('X-Content-Type-Options', 'nosniff');


  // Handle your API logic here

  // Example: Return a JSON response
  res.status(200).json({ message: 'API response' });
}


const Garamond = EB_Garamond({ subsets: ["latin"] });
const cspPolicy = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'https://your-trusted-script-domain.com'],
    styleSrc: ["'self'", 'https://your-trusted-style-domain.com'],
    frameAncestors: ["'self'", 'https://your-trusted-domain.com'], // Allow framing from the same origin and trusted domain
    // Add more directives for other resource types
  },
};


export const metadata: Metadata = {
  title: "Tranquil Paradise: Whispers of Sporting Elegance",
  description: "Tranquil Paradise: Whispers of Sporting Elegance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Convert your CSP policy object into a string
  const cspPolicyString = Object.entries(cspPolicy.directives)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');

  return (
    <html lang="en">
      <head>
        <Helmet>
          <meta http-equiv="Content-Security-Policy" content={cspPolicyString} />
          {/* Other meta tags or scripts as needed */}
        </Helmet>
      </head>
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}