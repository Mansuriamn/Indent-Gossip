"use client"


import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  })
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (step === 1) {
    
const newErrors = {};


      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      }

      if (!formData.password.trim()) {
        newErrors.password = "Password is required"
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      // Simulate successful login and OTP sent
      setStep(2)
    } else {
      // Verify OTP
      if (!formData.otp.trim()) {
        setErrors({ otp: "Please enter the OTP" })
        return
      }

      // Simulate OTP verification (in a real app, this would verify with backend)
      if (formData.otp === "123456") {
        // Redirect to verification page after successful login
        router.push("/verification")
      } else {
        setErrors({ otp: "Invalid OTP. Please try again." })
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <Button variant="link" className="p-0 h-auto">
                        Forgot password?
                      </Button>
                    </div>

                    <Button type="submit" className="w-full">
                      Continue
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="otp">Verification Code</Label>
                        <Button type="button" variant="link" size="sm" className="p-0 h-auto">
                          Resend Code
                        </Button>
                      </div>
                      <Input
                        id="otp"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="Enter 6-digit code sent to your email"
                        maxLength={6}
                      />
                      {errors.otp && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.otp}
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full">
                      Verify & Log In
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
