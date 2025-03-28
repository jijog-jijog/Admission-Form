"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"

export default function SchoolAdmissionForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    class: "",
    birthDate: "",
    parentFirstName: "",
    parentLastName: "",
    streetAddress: "",
    city: "",
    country: "",
    email: "",
    signature: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.class || !formData.birthDate || 
        !formData.parentFirstName || !formData.parentLastName || !formData.streetAddress || 
        !formData.city || !formData.country || !formData.email) {
      alert('Please fill in all required fields')
      return
    }

    try {
      // Create a new submission with a unique ID
      const newSubmission = {
        id: Date.now(),
        ...formData,
        submittedAt: new Date().toISOString()
      }

      // Get existing submissions
      const savedData = localStorage.getItem('admissionFormData')
      let submissions = []
      
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          // Ensure we have an array
          submissions = Array.isArray(parsedData) ? parsedData : []
        } catch (error) {
          console.error('Error parsing saved data:', error)
          submissions = []
        }
      }

      // Add new submission
      submissions = [...submissions, newSubmission]

      // Save to localStorage
      localStorage.setItem('admissionFormData', JSON.stringify(submissions))

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        class: "",
        birthDate: "",
        parentFirstName: "",
        parentLastName: "",
        streetAddress: "",
        city: "",
        country: "",
        email: "",
        signature: "",
      })

      alert('Form submitted successfully!')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting the form. Please try again.')
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-cyan-500 to-teal-400">
      <div className="w-full max-w-5xl overflow-hidden rounded-lg shadow-lg">
        <div className="relative flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="w-full md:w-3/5 p-6 md:p-10">
            <h1 className="text-3xl font-bold mb-2 text-white">
              College Admission Form
            </h1>
            <p className="mb-6 text-sm text-white/90">
              College Admission Forms are processed within 48 hours. You will receive an email confirmation when we
              process your application.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Your Name *
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    className={`${formData.firstName ? 'bg-white text-gray-900' : 'bg-white/10 text-white'} border-white/20 placeholder:text-white/50`}
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    className={`${formData.lastName ? 'bg-white text-gray-900' : 'bg-white/10 text-white'} border-white/20 placeholder:text-white/50`}
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="class" className="text-white">
                  Department you want to apply for *
                </Label>
                <Select onValueChange={(value) => setFormData({ ...formData, class: value })} value={formData.class} required>
                  <SelectTrigger className={`${formData.class ? 'bg-white text-gray-900' : 'bg-white/10 text-white'} border-white/20`}>
                    <SelectValue placeholder="Please select" className={formData.class ? 'text-gray-900' : 'text-white'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSE" className="text-gray-900">CSE</SelectItem>
                    <SelectItem value="ECE" className="text-gray-900">ECE</SelectItem>
                    <SelectItem value="EEE" className="text-gray-900">EEE</SelectItem>
                    <SelectItem value="CIVIL" className="text-gray-900">CIVIL</SelectItem>
                    <SelectItem value="MECH" className="text-gray-900">MECH</SelectItem>
                    <SelectItem value="MBA" className="text-gray-900">MBA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="birthDate" className="text-white">
                    Student's birth date *
                  </Label>
                  <span className="text-white/80 text-sm">Select Date</span>
                </div>
                <Input
                  id="birthDate"
                  type="date"
                  className={`${formData.birthDate ? 'bg-white text-gray-900' : 'bg-white/10 text-white'} border-white/20 cursor-pointer`}
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentName" className="text-white">
                  Parent/Guardian Name *
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    id="parentFirstName"
                    placeholder="First Name"
                    className={`${formData.parentFirstName ? 'bg-white text-gray-900' : 'bg-white/10 text-white'} border-white/20 placeholder:text-white/50`}
                    value={formData.parentFirstName}
                    onChange={(e) => setFormData({ ...formData, parentFirstName: e.target.value })}
                    required
                  />
                  <Input
                    id="parentLastName"
                    placeholder="Last Name"
                    className={`${formData.parentLastName ? 'bg-white text-gray-900' : 'bg-white/10 text-white'} border-white/20 placeholder:text-white/50`}
                    value={formData.parentLastName}
                    onChange={(e) => setFormData({ ...formData, parentLastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-white">
                  Shipping Address *
                </Label>
                <Input
                  id="streetAddress"
                  placeholder="Street Address"
                  className={`${formData.streetAddress ? 'bg-white text-gray-900' : 'bg-white/10 text-white'} border-white/20 mb-3 placeholder:text-white/50`}
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    id="city"
                    placeholder="City"
                    className={`${formData.city ? 'bg-white text-gray-900' : 'bg-white/10 text-white'} border-white/20 placeholder:text-white/50`}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                  <Input
                    id="country"
                    placeholder="Country"
                    className={`${formData.country ? 'bg-white text-gray-900' : 'bg-white/10 text-white'} border-white/20 placeholder:text-white/50`}
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  className={`${formData.email ? 'bg-white text-gray-900' : 'bg-white/10 text-white'} border-white/20 placeholder:text-white/50`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <p className="text-xs mt-1 text-white/80">Your admission confirmation will be sent via email.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signature" className="text-white">
                  Digital Signature
                </Label>
                <Input
                  id="signature"
                  className={`${formData.signature ? 'bg-white text-gray-900' : 'bg-white/10 text-white'} border-white/20 placeholder:text-white/50`}
                  value={formData.signature}
                  onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <Button
                  type="submit"
                  className="bg-white/20 hover:bg-white/30 text-white font-medium px-8 border border-white/30"
                >
                  SUBMIT FORM
                </Button>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/submitted-details" className="w-full">
                    <Button
                      type="button"
                      className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30"
                    >
                      View Local Details
                    </Button>
                  </Link>
                  <Link to="/server-submitted-details" className="w-full">
                    <Button
                      type="button"
                      className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30"
                    >
                      View Server Details
                    </Button>
                  </Link>
                </div>
              </div>
            </form>
          </div>

          {/* Decorative Pattern Section */}
          <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-cyan-500 to-teal-400 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-10 right-0 w-32 h-64 bg-yellow-300 rounded-l-full opacity-70 transform rotate-12"></div>
              <div className="absolute top-40 right-10 w-40 h-40 bg-pink-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-20 right-0 w-60 h-20 bg-blue-300 rounded-l-full opacity-70 transform -rotate-12"></div>
              <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-white rounded-full opacity-20"></div>
              <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-white rounded-full opacity-20"></div>

              {/* Pattern elements */}
              <div
                className="absolute top-1/2 right-10 w-32 h-32 bg-yellow-200 opacity-60"
                style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
              ></div>
              <div className="absolute bottom-10 right-20 w-40 h-20 bg-red-400 rounded-full opacity-60 transform rotate-45"></div>
              <div
                className="absolute top-20 right-1/3 w-24 h-24 bg-blue-200 opacity-70"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 10px)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

