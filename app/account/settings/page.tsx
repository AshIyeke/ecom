"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Account Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage how you receive alerts and updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <p className="font-medium">Order Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates about your order status via email.</p>
            </div>
            <div className="text-sm font-medium text-green-600">Enabled</div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <p className="font-medium">Newsletter</p>
              <p className="text-sm text-muted-foreground">Stay up to date with our latest products and offers.</p>
            </div>
            <div className="text-sm font-medium text-muted-foreground">Disabled</div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="text-red-500">
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Actions here cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Delete Account
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
