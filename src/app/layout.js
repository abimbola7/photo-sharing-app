import { 
  Inter, 
  Julius_Sans_One,
  Montserrat,
  Merriweather,
  Ubuntu
 } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './(components)/ui/theme-provider'
import Header from './(components)/header'
import { AuthProvider } from './(providers)/authProvider';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

// export const julius = Julius_Sans_One({ subsets: ['latin'], weight: ['400'] })
const merriweather = Merriweather({ 
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap'
})

const ubuntu = Ubuntu({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
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
      className={`${ubuntu.className}`}
      >
        <AuthProvider>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          > 
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            // transition: Bounce
            />
            <Header />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
