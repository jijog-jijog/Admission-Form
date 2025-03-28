import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowLeft, Calendar, Users, MapPin, Mail, PenSquare } from "lucide-react"

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

export default function ServerSubmittedDetails() {
  const [submissions, setSubmissions] = useState<FormData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/submissions')
        if (!response.ok) {
          throw new Error('Failed to fetch submissions')
        }
        const data = await response.json()
        // Sort submissions by submission date, newest first
        const sortedData = data.sort((a: FormData, b: FormData) => 
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        )
        setSubmissions(sortedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-teal-400 p-4 md:p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading submissions...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-teal-400 p-4 md:p-8 flex items-center justify-center">
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-teal-400 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Server Submitted Details</h1>
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
                    <h2 className="text-xl font-semibold mb-2">
                      {submission.firstName} {submission.lastName}
                    </h2>
                    <p className="text-sm opacity-80">Department: {submission.class}</p>
                  </div>
                </div>

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
      </div>
    </div>
  )
} 