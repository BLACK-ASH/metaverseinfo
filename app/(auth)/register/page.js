import { RegisterForm } from '@/components/register-form'
import React from 'react'

const RegisterPage = () => {
  return (
    <div
      className="bg-background flex min-h-[calc(100vh-160px)] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage