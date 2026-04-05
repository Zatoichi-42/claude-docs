import '../styles/globals.css';

export const metadata = {
  title: 'Claude Code Docs — C9PG',
  description: 'Claude Code onboarding for real teams by Cloud9 Payment Gateway',
};

const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('cc-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = stored || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch(e) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
