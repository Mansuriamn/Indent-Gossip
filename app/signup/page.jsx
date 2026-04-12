
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  })
  const [step, setStep] = useState(1)
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
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

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSendOTP = () => {
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate sending OTP
    setOtpSent(true)
  }

  const verifyOTP = () => {
    if (!formData.otp.trim()) {
      setErrors({ otp: "Please enter the OTP" })
      return
    }

    // Simulate OTP verification (in a real app, this would verify with backend)
    if (formData.otp === "123456") {
      setOtpVerified(true)
      setStep(2)
    } else {
      setErrors({ otp: "Invalid OTP. Please try again." })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors= {}

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate signup success
    router.push("/verification")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Join our community and start sharing content</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                      />
                      {errors.username && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.username}
                        </p>
                      )}
                    </div>

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

                    {otpSent && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="otp">Verification Code</Label>
                          <Button type="button" variant="link" size="sm" onClick={handleSendOTP} className="p-0 h-auto">
                            Resend Code
                          </Button>
                        </div>
                        <Input
                          id="otp"
                          name="otp"
                          value={formData.otp}
                          onChange={handleChange}
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                        />
                        {errors.otp && (
                          <p className="text-sm text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.otp}
                          </p>
                        )}
                        {otpVerified && (
                          <p className="text-sm text-green-500 flex items-center mt-1">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Email verified successfully
                          </p>
                        )}
                      </div>
                    )}

                    {!otpSent ? (
                      <Button type="button" className="w-full" onClick={handleSendOTP}>
                        Verify Email
                      </Button>
                    ) : !otpVerified ? (
                      <Button type="button" className="w-full" onClick={verifyOTP}>
                        Verify Code
                      </Button>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Create Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                      />
                      {errors.password && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
