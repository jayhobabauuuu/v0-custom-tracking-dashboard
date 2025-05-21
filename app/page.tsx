"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle, XCircle, Search, ArrowRight, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function TrackingChecker() {
  const [upiId, setUpiId] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)
  const [results, setResults] = useState<null | {
    install: boolean
    register: boolean
    deposit: boolean
    trading: boolean
  }>(null)

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (!upiId.trim()) return

    setIsChecking(true)
    setShowResults(false)

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock data - in a real app, this would come from your backend
      const mockResults = {
        install: true,
        register: true,
        deposit: Math.random() > 0.3, // Randomly true or false for demo
        trading: Math.random() > 0.6, // Randomly true or false for demo
      }

      setResults(mockResults)
      setIsChecking(false)

      // Calculate overall progress
      const completedCount = Object.values(mockResults).filter(Boolean).length
      const totalCount = Object.values(mockResults).length
      setOverallProgress(Math.round((completedCount / totalCount) * 100))

      setTimeout(() => {
        setShowResults(true)
      }, 300)
    }, 1500)
  }

  const resetForm = () => {
    setShowResults(false)
    setTimeout(() => {
      setUpiId("")
      setResults(null)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md mx-auto relative">
        <div className="text-center mb-8 mt-10">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 mb-3">
            Event Tracker
          </h1>
          <p className="text-indigo-700 text-lg">Track your journey milestones</p>
        </div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white backdrop-blur-lg bg-opacity-80 rounded-3xl shadow-2xl p-8 mb-8 border border-indigo-50">
                <form onSubmit={handleCheck}>
                  <div className="relative mb-6">
                    <label htmlFor="upi-input" className="block text-sm font-medium text-indigo-700 mb-2 ml-1">
                      UPI ID
                    </label>
                    <div className="relative">
                      <input
                        id="upi-input"
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter your UPI ID"
                        className="w-full px-5 py-4 text-lg rounded-2xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white bg-opacity-80 backdrop-blur-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <div className="text-indigo-400">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-indigo-500 mt-2 ml-1">Enter the UPI ID associated with your account</p>
                  </div>
                  <button
                    type="submit"
                    disabled={isChecking || !upiId.trim()}
                    className={`w-full py-4 px-6 rounded-2xl text-lg font-semibold transition-all shadow-lg flex items-center justify-center ${
                      !upiId.trim()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                    }`}
                  >
                    {isChecking ? (
                      <div className="flex items-center">
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Checking...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Search className="mr-2 h-5 w-5" />
                        Check Progress
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white backdrop-blur-lg bg-opacity-80 rounded-3xl shadow-2xl p-8 mb-8 border border-indigo-50">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-indigo-900">Your Progress</h2>
                  <button
                    onClick={resetForm}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center text-sm font-medium"
                  >
                    <RefreshCw className="mr-1 h-4 w-4" />
                    New Check
                  </button>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-indigo-700">Overall Completion</span>
                    <span className="text-sm font-bold text-indigo-900">{overallProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-indigo-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${overallProgress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>

                <div className="space-y-4">
                  {results && (
                    <>
                      <EventCard
                        title="Install & Open"
                        description="App installation and first open"
                        completed={results.install}
                        delay={0.1}
                      />

                      <EventCard
                        title="Registration"
                        description="Account creation completed"
                        completed={results.register}
                        delay={0.2}
                      />

                      <EventCard
                        title="Deposit"
                        description="First deposit made"
                        completed={results.deposit}
                        delay={0.3}
                      />

                      <EventCard
                        title="Trading"
                        description="First trade completed"
                        completed={results.trading}
                        delay={0.4}
                      />
                    </>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-indigo-100">
                  <div className="text-center">
                    <p className="text-indigo-700 mb-2">Checked for UPI ID</p>
                    <p className="text-lg font-medium text-indigo-900 bg-indigo-50 py-2 px-4 rounded-lg inline-block">
                      {upiId}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips section */}
        <div className="bg-white backdrop-blur-lg bg-opacity-80 rounded-3xl shadow-lg p-6 border border-indigo-50">
          <h3 className="font-bold text-indigo-900 mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                clipRule="evenodd"
              />
            </svg>
            Tips to Complete Your Journey
          </h3>
          <ul className="space-y-2 text-sm text-indigo-800">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Complete your KYC to unlock deposit features</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Use code WELCOME50 for 50% off on your first trade</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Refer friends to earn bonus rewards</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

interface EventCardProps {
  title: string
  description: string
  completed: boolean
  delay: number
}

function EventCard({ title, description, completed, delay }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-2xl overflow-hidden shadow-md transition-all hover:shadow-lg ${
        completed ? "bg-gradient-to-r from-emerald-50 to-teal-50" : "bg-gradient-to-r from-red-50 to-orange-50"
      }`}
    >
      <div className="flex items-center p-4">
        <div className="mr-4">
          {completed ? (
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500 rounded-full opacity-10 animate-pulse"></div>
              <div className="absolute inset-0 bg-emerald-500 rounded-full opacity-10 transform scale-75 animate-ping"></div>
              <div className="relative bg-white rounded-full p-2 shadow-md">
                <CheckCircle className="w-8 h-8 text-emerald-500 drop-shadow-md" />
              </div>
            </div>
          ) : (
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 bg-red-500 rounded-full opacity-10"></div>
              <div className="relative bg-white rounded-full p-2 shadow-md">
                <XCircle className="w-8 h-8 text-red-500 drop-shadow-md" />
              </div>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
        <div className="ml-2">
          {completed ? (
            <span className="text-emerald-600 font-medium bg-emerald-100 py-1 px-3 rounded-full text-sm">
              Completed
            </span>
          ) : (
            <span className="text-red-600 font-medium bg-red-100 py-1 px-3 rounded-full text-sm">Pending</span>
          )}
        </div>
      </div>
      {completed && (
        <div className="bg-emerald-100 px-4 py-2 text-xs text-emerald-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Completed on {new Date().toLocaleDateString()}
        </div>
      )}
      {!completed && (
        <div className="bg-red-100 px-4 py-2 text-xs text-red-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Action required to complete this step
        </div>
      )}
    </motion.div>
  )
}
