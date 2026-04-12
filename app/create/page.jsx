"use client"

import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../src/context/AuthContext"

import { Button } from "../../src/components/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../src/components/Card"
import { Textarea } from "../../src/components/Textarea"
import { Input } from "../../src/components/Input"
import { ImageIcon, X, AlertCircle } from "lucide-react"

const Label = ({ children, htmlFor, className = "" }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}>
    {children}
  </label>
);

const Badge = ({ children, variant = "secondary", className = "" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
    variant === "secondary" ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800"
  } ${className}`}>
    {children}
  </span>
);

export default function CreatePost() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [content, setContent] = useState("")
  const [tags, setTags] = useState([])
  const [currentTag, setCurrentTag] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleContentChange = (e) => {
    setContent(e.target.value)
    if (error) setError(null)
  }

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault()
      addTag()
    }
  }

  const addTag = () => {
    const trimmedTag = currentTag.trim()
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB")
        return
      }
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file))
      if (error) setError(null)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
      setImagePreview(null)
    }
  }

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError("Please enter some content for your post")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          content,
          tags,
          image: "", // In a real app, you'd upload the image to S3/Cloudinary first
        }),
      })

      if (res.ok) {
        navigate("/feed")
      } else {
        const data = await res.json()
        setError(data.message || "Failed to create post")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={handleContentChange}
                className="min-h-[150px]"
              />
              <p className="text-sm text-gray-500 text-right">{content.length}/500 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (optional, max 5)</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Add tags (press Enter)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  disabled={tags.length >= 5}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTag}
                  disabled={!currentTag.trim() || tags.length >= 5}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Add Image (optional)</Label>
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="max-h-[300px] rounded-md object-contain" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Label htmlFor="file-upload" className="cursor-pointer text-indigo-600 hover:text-indigo-500">
                      <span>Upload an image</span>
                      <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </Label>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-4">
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Posting..." : "Post"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
