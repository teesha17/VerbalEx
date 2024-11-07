'use client'

import { useState } from 'react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Placeholder for registration logic
    console.log('Registration attempted with:', { name, email, password, address })
    // Replace this with actual registration logic
    const response = { success: true }
    alert(response.success ? 'Registration successful' : 'Registration failed')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Register</h2>
        <p className="text-center text-gray-600 mb-6">Create your account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-300 to-blue-300 hover:from-green-400 hover:to-blue-400 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
