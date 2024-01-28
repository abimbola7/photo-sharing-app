import { 
  Inter, 
  Julius_Sans_One,
  Montserrat,
  Merriweather
 } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './(components)/ui/theme-provider'
import Header from './(components)/header'
import { AuthProvider } from './(providers)/authProvider';


const inter = Inter({ subsets: ['latin'] })

// export const julius = Julius_Sans_One({ subsets: ['latin'], weight: ['400'] })
const merriweather = Merriweather({ 
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap'
})


export const metadata = {
  title: 'artnook',
  description: 'Share your artworks',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
      className={`${merriweather.className}`}
      >
        <AuthProvider>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          > 
            <Header />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
