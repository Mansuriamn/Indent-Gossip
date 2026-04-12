
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

export default function Verification() {
  const router = useRouter()
  const [usePuzzle, setUsePuzzle] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [isRobotChecked, setIsRobotChecked] = useState(false)
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0 })
  const [targetPosition, setTargetPosition] = useState({ x: 200, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (usePuzzle && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw target
        ctx.fillStyle = "green"
        ctx.beginPath()
        ctx.arc(targetPosition.x, targetPosition.y, 20, 0, Math.PI * 2)
        ctx.fill()

        // Draw arrow
        ctx.fillStyle = "blue"
        ctx.beginPath()
        ctx.moveTo(arrowPosition.x, arrowPosition.y)
        ctx.lineTo(arrowPosition.x - 15, arrowPosition.y + 10)
        ctx.lineTo(arrowPosition.x - 15, arrowPosition.y - 10)
        ctx.closePath()
        ctx.fill()

        // Check if arrow is close to target
        const distance = Math.sqrt(
          Math.pow(arrowPosition.x - targetPosition.x, 2) + Math.pow(arrowPosition.y - targetPosition.y, 2),
        )

        if (distance < 30) {
          setIsVerified(true)
        }
      }
    }
  }, [arrowPosition, targetPosition, usePuzzle])

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (isDragging && canvasRef.current) {
      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      setArrowPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleRobotCheckChange = (checked) => {
    setIsRobotChecked(checked)
    if (checked) {
      // Simulate verification delay
      setTimeout(() => {
        setIsVerified(true)
      }, 1500)
    } else {
      setIsVerified(false)
    }
  }

  const handleContinue = () => {
    // Redirect to feed after verification
    router.push("/feed")
  }

  const toggleVerificationMethod = () => {
    setUsePuzzle(!usePuzzle)
    setIsVerified(false)
    setIsRobotChecked(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Human Verification</CardTitle>
            <CardDescription>Complete the verification to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {usePuzzle ? (
                <div className="space-y-4">
                  <p className="text-sm">Drag the arrow toward the green circle</p>
                  <div className="border rounded-md overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={200}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      className="w-full cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-2 py-4">
                  <Checkbox id="robot" checked={isRobotChecked} onCheckedChange={handleRobotCheckChange} />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="robot"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I'm not a robot
                    </Label>
                  </div>
                </div>
              )}

              {isVerified && (
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md text-green-600 dark:text-green-400 text-sm">
                  Verification successful! You can continue.
                </div>
              )}

              <Button type="button" variant="outline" size="sm" onClick={toggleVerificationMethod} className="w-full">
                {usePuzzle ? "Use checkbox verification instead" : "Use puzzle verification instead"}
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleContinue} disabled={!isVerified} className="w-full">
              Continue to App
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
