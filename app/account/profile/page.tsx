"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/store/AuthContext"

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Email Address</label>
            <div className="p-2 border rounded bg-muted text-muted-foreground">{user?.email}</div>
          </div>
          <p className="text-xs text-muted-foreground italic">Email change is currently disabled.</p>
        </CardContent>
      </Card>
    </div>
  )
}
