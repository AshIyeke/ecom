"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/store/AuthContext"
import { useGetProfileQuery, useUpdateProfileMutation } from "@/store/api/profileApi"
import { Loader2, Save, User, MapPin, CreditCard, Phone, Mail, CheckCircle2, AlertCircle } from "lucide-react"

export default function ProfilePage() {
  const { data: profile, isLoading } = useGetProfileQuery()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-zinc-400" size={40} />
        <p className="text-zinc-500 font-medium animate-pulse">Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 transition-colors">Profile Settings</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Manage your personal information and addresses.</p>
      </div>

      <ProfileForm profile={profile} key={profile?.id || 'new'} />
    </div>
  )
}

function ProfileForm({ profile }: { profile: any }) {
  const { user } = useAuth()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    shipping_address: profile?.shipping_address || "",
    billing_address: profile?.billing_address || "",
    phone: profile?.phone || "",
    city: profile?.city || ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(false)
    setError(null)

    try {
      await updateProfile(formData).unwrap()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      console.error("Failed to update profile:", err)
      setError(err.data || "Failed to update profile. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl border border-green-100 dark:border-green-900/30 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={20} />
          <p className="text-sm font-bold">Profile updated successfully!</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/30 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={20} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Info */}
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
          <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <User size={16} /> Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 flex-1">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Email Address</label>
              <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-500 cursor-not-allowed">
                <Mail size={16} />
                <span className="text-sm font-medium">{user?.email}</span>
              </div>
              <p className="text-[10px] text-zinc-400 italic">Email cannot be changed.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="full_name" className="text-xs font-black uppercase tracking-widest text-zinc-400">Full Name</label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 outline-hidden transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-zinc-400">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 outline-hidden transition-all"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Addresses */}
        <div className="space-y-8">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <MapPin size={16} /> Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="shipping_address" className="text-xs font-black uppercase tracking-widest text-zinc-400">Address</label>
                <textarea
                  id="shipping_address"
                  name="shipping_address"
                  rows={2}
                  value={formData.shipping_address}
                  onChange={handleChange}
                  placeholder="Enter your shipping address"
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 outline-hidden transition-all resize-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="city" className="text-xs font-black uppercase tracking-widest text-zinc-400">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 outline-hidden transition-all"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <CreditCard size={16} /> Billing Address
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="billing_address" className="text-xs font-black uppercase tracking-widest text-zinc-400">Address</label>
                <textarea
                  id="billing_address"
                  name="billing_address"
                  rows={2}
                  value={formData.billing_address}
                  onChange={handleChange}
                  placeholder="Enter your billing address"
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 outline-hidden transition-all resize-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, billing_address: prev.shipping_address }))}
                className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest"
              >
                Same as shipping address
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg active:scale-[0.98]"
        >
          {isUpdating ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Saving Changes...
            </>
          ) : (
            <>
              <Save size={20} />
              Save Profile
            </>
          )}
        </button>
      </div>
    </form>
  )
}
