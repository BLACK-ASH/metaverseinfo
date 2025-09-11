import Script from "next/script"

export const metadata = {
  title: 'Metaverse Info - User Cart',
  description: 'Metaverse Info - User Cart',
}
const layout = ({ children }) => {
  return (
    <div className="container overflow-hidden box-border mx-auto px-4 md:p-6 ">{children}

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

    </div>
  )
}

export default layout