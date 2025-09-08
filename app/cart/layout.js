import Script from "next/script"

export const metadata = {
  title: 'Metaverse Info - User Cart',
  description: 'Metaverse Info - User Cart',
}
const layout = ({ children }) => {
  return (
    <div>{children}

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

    </div>
  )
}

export default layout