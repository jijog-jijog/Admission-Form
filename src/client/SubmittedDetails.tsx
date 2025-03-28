import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowLeft, X, Calendar, Users, MapPin, Mail, PenSquare, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormData {
  id: number
  firstName: string
  lastName: string
  class: string
  birthDate: string
  parentFirstName: string
  parentLastName: string
  streetAddress: string
  city: string
  country: string
  email: string
  signature: string
  submittedAt: string
}

export default function SubmittedDetails() {
  const [submissions, setSubmissions] = useState<FormData[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editFormData, setEditFormData] = useState<FormData | null>(null)

  useEffect(() => {
    const loadSubmissions = () => {
      try {
        const savedData = localStorage.getItem('admissionFormData')
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          // Sort submissions by submission date, newest first
          const sortedData = parsedData.sort((a: FormData, b: FormData) => 
            new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
          )
          setSubmissions(sortedData)
        }
      } catch (error) {
        console.error('Error loading submissions:', error)
        setSubmissions([])
      }
    }

    loadSubmissions()
  }, [])

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all submissions?')) {
      localStorage.removeItem('admissionFormData')
      setSubmissions([])
    }
  }

  const handleDeleteSubmission = (id: number) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      const updatedSubmissions = submissions.filter(submission => submission.id !== id)
      localStorage.setItem('admissionFormData', JSON.stringify(updatedSubmissions))
      setSubmissions(updatedSubmissions)
    }
  }

  const handleEditClick = (submission: FormData) => {
    setEditingId(submission.id)
    setEditFormData(submission)
  }

  const handleEditSubmit = (id: number) => {
    if (!editFormData) return

    const updatedSubmissions = submissions.map(submission => 
      submission.id === id ? editFormData : submission
    )

    localStorage.setItem('admissionFormData', JSON.stringify(updatedSubmissions))
    setSubmissions(updatedSubmissions)
    setEditingId(null)
    setEditFormData(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditFormData(null)
  }

  const handleEditChange = (field: keyof FormData, value: string) => {
    if (!editFormData) return
    setEditFormData({ ...editFormData, [field]: value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-teal-400 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Submitted Admission Details</h1>
          <Link to="/">
            <Button className="bg-white/20 hover:bg-white/30 text-white border-2 border-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Form
            </Button>
          </Link>
        </div>

        {submissions.length > 0 ? (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white hover:bg-white/20 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {editingId === submission.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label className="text-white">First Name</Label>
                            <Input
                              value={editFormData?.firstName || ''}
                              onChange={(e) => handleEditChange('firstName', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Last Name</Label>
                            <Input
                              value={editFormData?.lastName || ''}
                              onChange={(e) => handleEditChange('lastName', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Department</Label>
                          <Select
                            value={editFormData?.class || ''}
                            onValueChange={(value) => handleEditChange('class', value)}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CSE">CSE</SelectItem>
                              <SelectItem value="ECE">ECE</SelectItem>
                              <SelectItem value="EEE">EEE</SelectItem>
                              <SelectItem value="CIVIL">CIVIL</SelectItem>
                              <SelectItem value="MECH">MECH</SelectItem>
                              <SelectItem value="MBA">MBA</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Birth Date</Label>
                          <Input
                            type="date"
                            value={editFormData?.birthDate || ''}
                            onChange={(e) => handleEditChange('birthDate', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label className="text-white">Parent First Name</Label>
                            <Input
                              value={editFormData?.parentFirstName || ''}
                              onChange={(e) => handleEditChange('parentFirstName', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Parent Last Name</Label>
                            <Input
                              value={editFormData?.parentLastName || ''}
                              onChange={(e) => handleEditChange('parentLastName', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Street Address</Label>
                          <Input
                            value={editFormData?.streetAddress || ''}
                            onChange={(e) => handleEditChange('streetAddress', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label className="text-white">City</Label>
                            <Input
                              value={editFormData?.city || ''}
                              onChange={(e) => handleEditChange('city', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Country</Label>
                            <Input
                              value={editFormData?.country || ''}
                              onChange={(e) => handleEditChange('country', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Email</Label>
                          <Input
                            type="email"
                            value={editFormData?.email || ''}
                            onChange={(e) => handleEditChange('email', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Digital Signature</Label>
                          <Input
                            value={editFormData?.signature || ''}
                            onChange={(e) => handleEditChange('signature', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={() => handleEditSubmit(submission.id)}
                            className="bg-white/20 hover:bg-white/30 text-white"
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </Button>
                          <Button
                            onClick={handleEditCancel}
                            variant="destructive"
                            className="bg-red-500/20 hover:bg-red-500/30 text-white"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-xl font-semibold mb-2">
                          {submission.firstName} {submission.lastName}
                        </h2>
                        <p className="text-sm opacity-80">Department: {submission.class}</p>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {editingId !== submission.id && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-blue-400"
                        onClick={() => handleEditClick(submission)}
                      >
                        <PenSquare className="h-5 w-5" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-red-400"
                      onClick={() => handleDeleteSubmission(submission.id)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {editingId !== submission.id && (
                  <>
                    <div className="space-y-2">
                      <p className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Birth Date: {submission.birthDate}
                      </p>
                      <p className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        Parent: {submission.parentFirstName} {submission.parentLastName}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        Address: {submission.streetAddress}, {submission.city}, {submission.country}
                      </p>
                      <p className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Email: {submission.email}
                      </p>
                    </div>
                    {submission.signature && (
                      <p className="mt-4 text-sm opacity-80">
                        Signature: {submission.signature}
                      </p>
                    )}
                    <p className="mt-4 text-xs opacity-60">
                      Submitted on: {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
            <div className="flex flex-col items-center">
              <PenSquare className="h-12 w-12 text-white/50 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No Submitted Details Found</h2>
              <p className="text-white/80 mb-6">Please submit the admission form first.</p>
              <Link to="/">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-2 border-white">
                  Go to Admission Form
                </Button>
              </Link>
            </div>
          </div>
        )}

        {submissions.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="destructive"
              onClick={handleClearData}
              className="bg-red-500/20 hover:bg-red-500/30 text-white border-2 border-red-500"
            >
              Clear All Data
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 