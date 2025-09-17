import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export interface RegistrationData {
  name: string;
  school: string;
  phoneNumber: string;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onSubmit: (data: RegistrationData) => void;
}

export default function RegistrationModal({ isOpen, onSubmit }: RegistrationModalProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    school: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Partial<RegistrationData>>({});

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<RegistrationData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.school.trim()) {
      newErrors.school = "School is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" aria-describedby="registration-description">
        <Card className="border-0 shadow-none">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-center text-xl font-semibold text-foreground">
              Welcome to Quiz App
            </DialogTitle>
            <p id="registration-description" className="text-center text-sm text-muted-foreground mt-2">
              Please provide your information to get started
            </p>
          </DialogHeader>
          
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  data-testid="input-name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive" data-testid="error-name">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="school" className="text-sm font-medium">
                  School <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="school"
                  data-testid="input-school"
                  placeholder="Enter your school name"
                  value={formData.school}
                  onChange={(e) => handleInputChange("school", e.target.value)}
                  className={errors.school ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.school && (
                  <p className="text-sm text-destructive" data-testid="error-school">
                    {errors.school}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  data-testid="input-phone"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className={errors.phoneNumber ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-destructive" data-testid="error-phone">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                data-testid="button-register"
                className="w-full mt-6"
                size="lg"
              >
                Start Quiz
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}