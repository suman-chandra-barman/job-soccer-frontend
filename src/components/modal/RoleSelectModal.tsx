"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronDown } from "lucide-react"

const candidateRoles = [
  "Professional Player",
  "Amateur Player",
  "High School Player",
  "College Player",
  "Staff on The field",
  "Office Staff",
]

const employerRoles = ["Club ( professional & amateur)", "Academy", "High School", "College [University", "Agent"]

interface RoleSelectProps {
  value?: string
  onValueChange?: (value: string) => void
}

export default function RoleSelect({ value, onValueChange }: RoleSelectProps) {
  const [open, setOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(value || "")

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    onValueChange?.(role)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-left font-normal bg-transparent"
          onClick={() => setOpen(true)}
        >
          {selectedRole || "Select your role"}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md border-2">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-left">Select Role</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Candidates Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Candidates</h3>
            <RadioGroup value={selectedRole} onValueChange={handleRoleSelect}>
              {candidateRoles.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <RadioGroupItem value={role} id={role} className="border-gray-300 text-blue-600" />
                  <Label htmlFor={role} className="text-gray-700 cursor-pointer font-normal">
                    {role}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Employers Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Employers</h3>
            <RadioGroup value={selectedRole} onValueChange={handleRoleSelect}>
              {employerRoles.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <RadioGroupItem value={role} id={role} className="border-gray-300 text-blue-600" />
                  <Label htmlFor={role} className="text-gray-700 cursor-pointer font-normal">
                    {role}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
