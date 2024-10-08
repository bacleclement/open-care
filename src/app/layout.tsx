"use client";

import "./globals.css";
import ClientSideLayout from '@/components/Layout/ClientSideLayout';
import {MetadataComponent} from '@/app/MetadataComponent';

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
    <head>
      <MetadataComponent/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <meta name="viewport" content="initial-scale=1, width=device-width"/>
      <title>Open Care</title>
    </head>
    <body>
    <ClientSideLayout>{children}</ClientSideLayout>
    </body>
    </html>
  );
}
