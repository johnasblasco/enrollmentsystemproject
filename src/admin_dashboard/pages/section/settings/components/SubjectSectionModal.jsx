import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const SubjectSectionModal = ({
    open,
    setOpen,
    onSubmit,
    defaultValues = {},
}) => {
    const [formData, setFormData] = useState({
        subject_code: "",
        subject_name: "",
        units: "",
    })

    useEffect(() => {
        if (defaultValues) {
            setFormData({
                subject_code: defaultValues.subject_code || "",
                subject_name: defaultValues.subject_name || "",
                units: defaultValues.units || "",
            })
        }
    }, [defaultValues])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        onSubmit(formData)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {defaultValues?.id ? "Edit Subject" : "Add Subject"}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="subject_code">Subject Code</Label>
                        <Input
                            id="subject_code"
                            name="subject_code"
                            value={formData.subject_code}
                            onChange={handleChange}
                            placeholder="e.g. CS101"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="subject_name">Subject Name</Label>
                        <Input
                            id="subject_name"
                            name="subject_name"
                            value={formData.subject_name}
                            onChange={handleChange}
                            placeholder="e.g. Introduction to Programming"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="units">Units</Label>
                        <Input
                            id="units"
                            name="units"
                            type="number"
                            value={formData.units}
                            onChange={handleChange}
                            placeholder="e.g. 3"
                        />
                    </div>
                </div>
                <DialogFooter className="pt-4">
                    <Button onClick={handleSubmit}>
                        {defaultValues?.id ? "Update" : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SubjectSectionModal
