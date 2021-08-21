import 'tailwindcss/tailwind.css'
import '../styles/global.css'

import ProgressBar from '@badrap/bar-of-progress'
import router from 'next/router'

const progress = new ProgressBar({
  size: 4,
  color: '#FE595E',
  className: 'z-50',
  delay: 100,
})

router.events.on('routeChangeStart', progress.start)
router.events.on('routeChangeComplete', progress.finish)
router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
