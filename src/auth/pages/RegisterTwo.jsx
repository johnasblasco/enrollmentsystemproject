import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert2'

import { AdmissionContext } from '@/globalContexts/AdmissionContext'

const RegisterTwo = () => {
    const navigate = useNavigate()

    const { admissionData, setAdmissionData } = useContext(AdmissionContext)

    // collections
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [barangays, setBarangays] = useState([])

    // get selected province, city, barangay codes
    const [selectedProvinceCode, setSelectedProvinceCode] = useState('');
    const [selectedCityCode, setSelectedCityCode] = useState('');
    const [selectedBarangayCode, setSelectedBarangayCode] = useState('');

    // fetch provinces
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://psgc.gitlab.io/api/provinces/')
                setProvinces(response.data)
            } catch (error) {
                console.error('Error fetching provinces:', error)
            }
        }
        fetchProvinces()
    }, [])

    // fetch cities
    useEffect(() => {
        if (!selectedProvinceCode) {
            setCities([])
            return
        }
        const fetchCities = async () => {
            try {
                const response = await axios.get(
                    `https://psgc.gitlab.io/api/provinces/${selectedProvinceCode}/cities-municipalities/`
                )
                setCities(response.data)
            } catch (error) {
                console.error('Error fetching cities:', error)
            }
        }
        fetchCities()
    }, [selectedProvinceCode])

    // fetch barangays
    useEffect(() => {
        if (!selectedCityCode) {
            setBarangays([])
            return
        }
        const fetchBarangays = async () => {
            try {
                const response = await axios.get(
                    `https://psgc.gitlab.io/api/cities-municipalities/${selectedCityCode}/barangays/`
                )
                setBarangays(response.data)
            } catch (error) {
                console.error('Error fetching barangays:', error)
            }
        }
        fetchBarangays()
    }, [selectedCityCode])
    // submit
    const handleNext = () => {
        console.log("CLICKED!");
        console.log('Submitted Payload:', admissionData);
        const token = localStorage.getItem("token");

        axios.post(
            'https://server.laravel.bpc-bsis4d.com/public/api/applyadmission',
            admissionData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // if sending files!
                },
            }
        )
            .then(() => {
                swal.fire({
                    title: "Success!",
                    text: "Your admission data has been submitted.",
                    icon: "success",
                    confirmButtonText: "OK"
                });
                navigate('/', { replace: true }) // redirect to admission page

            })
            .catch((error) => {
                console.error("Submission failed:", error.response?.data || error.message);
                swal.fire({
                    title: "Error!",
                    text: "Email already exists or submission failed.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            });
    }



    return (
        <div>
            <section className="flex flex-col gap-4 justify-center items-center py-16">
                <form className="w-full max-w-4xl border border-gray-200 rounded-lg p-10 bg-white shadow-md space-y-6">
                    <h1 className="text-3xl my-4 font-semibold text-center text-purple-600">
                        Personal Information
                    </h1>

                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <InputWithLabel label="Surname" required value={admissionData.surname} onChange={e => setAdmissionData(p => ({ ...p, surname: e.target.value }))} />
                        <InputWithLabel label="Given name" required value={admissionData.given_name} onChange={e => setAdmissionData(p => ({ ...p, given_name: e.target.value }))} />
                        <InputWithLabel label="Middle name" value={admissionData.middle_name} onChange={e => setAdmissionData(p => ({ ...p, middle_name: e.target.value }))} />
                        <InputWithLabel label="Suffix" value={admissionData.suffix} onChange={e => setAdmissionData(p => ({ ...p, suffix: e.target.value }))} />
                    </div>

                    {/* DOB / POB */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputWithLabel label="Date of Birth" type="date" required value={admissionData.date_of_birth} onChange={e => setAdmissionData(p => ({ ...p, date_of_birth: e.target.value }))} />
                        <InputWithLabel label="Place of Birth" required value={admissionData.place_of_birth} onChange={e => setAdmissionData(p => ({ ...p, place_of_birth: e.target.value }))} />
                    </div>

                    {/* Selects */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <SelectWithLabel label="Gender" required value={admissionData.gender} onChange={e => setAdmissionData(p => ({ ...p, gender: e.target.value }))} options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                        ]} />
                        <SelectWithLabel label="Civil Status" required value={admissionData.civil_status} onChange={e => setAdmissionData(p => ({ ...p, civil_status: e.target.value }))} options={[
                            { value: 'single', label: 'Single' },
                            { value: 'married', label: 'Married' },
                            { value: 'widowed', label: 'Widowed' },
                            { value: 'separated', label: 'Separated' },
                            { value: 'divorced', label: 'Divorced' },
                        ]} />
                        <SelectWithLabel label="Indigenous Community" value={admissionData.is_indigenous} onChange={e => setAdmissionData(p => ({ ...p, is_indigenous: e.target.value }))} options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                        ]} />
                        <SelectWithLabel label="PWD" value={admissionData.is_insurance_member} onChange={e => setAdmissionData(p => ({ ...p, is_insurance_member: e.target.value }))} options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                        ]} />
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            House No., Street, Barangay
                        </label>
                        <input
                            type="text"
                            value={admissionData.street_address}
                            onChange={e => setAdmissionData(p => ({ ...p, street_address: e.target.value }))}
                            className={`w-full border rounded p-2 ${!admissionData.street_address ? 'border-red-500' : 'border-gray-300'}`}
                        />
                    </div>

                    {/* Province City Barangay */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectWithLabel
                            label="Province"
                            required
                            value={selectedProvinceCode}
                            onChange={e => {
                                const selected = provinces.find(p => p.code === e.target.value)
                                setSelectedProvinceCode(e.target.value)
                                setSelectedCityCode('')
                                setAdmissionData(p => ({
                                    ...p,
                                    province: selected ? selected.name : '',
                                    city: '',
                                    barangay: ''
                                }))
                            }}
                            options={provinces.map(p => ({ value: p.code, label: p.name }))}
                        />
                        <SelectWithLabel
                            label="City"
                            required
                            value={selectedCityCode}
                            onChange={e => {
                                const selected = cities.find(c => c.code === e.target.value)
                                setSelectedCityCode(e.target.value)
                                setAdmissionData(p => ({
                                    ...p,
                                    city: selected ? selected.name : '',
                                    barangay: ''
                                }))
                            }}
                            options={cities.map(c => ({ value: c.code, label: c.name }))}
                        />
                        <SelectWithLabel
                            label="Barangay"
                            required
                            value={selectedBarangayCode}
                            onChange={e => {
                                const selected = barangays.find(b => b.code === e.target.value)
                                setSelectedBarangayCode(e.target.value)
                                setAdmissionData(p => ({
                                    ...p,
                                    barangay: selected ? selected.name : ''
                                }))
                            }}
                            options={barangays.map(b => ({ value: b.code, label: b.name }))}
                        />
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectWithLabel label="Nationality" value={admissionData.nationality} onChange={e => setAdmissionData(p => ({ ...p, nationality: e.target.value }))} options={[
                            { value: 'Filipino', label: 'Filipino' },
                            { value: 'Other', label: 'Other' },
                        ]} />
                        <SelectWithLabel label="Religion" value={admissionData.religion} onChange={e => setAdmissionData(p => ({ ...p, religion: e.target.value }))} options={[
                            { value: 'Catholic', label: 'Catholic' },
                            { value: 'Christian', label: 'Christian' },
                            { value: 'Protestant', label: 'Protestant' },
                            { value: 'Muslim', label: 'Muslim' },
                            { value: 'Buddhist', label: 'Buddhist' },
                            { value: 'Hindu', label: 'Hindu' },
                            { value: 'Atheist', label: 'Atheist' },
                            { value: 'Agnostic', label: 'Agnostic' },
                            { value: 'None', label: 'None' },
                            { value: 'Other', label: 'Other' },
                        ]} />
                        <SelectWithLabel label="Ethnic Affiliation" value={admissionData.ethnic_affiliation} onChange={e => setAdmissionData(p => ({ ...p, ethnic_affiliation: e.target.value }))} options={[
                            { value: 'Aeta', label: 'Aeta' },
                            { value: 'Bontoc', label: 'Bontoc' },
                            { value: 'Bicolano', label: 'Bicolano' },
                            { value: 'Bilang', label: 'Bilang' },
                            { value: 'Cagayan', label: 'Cagayan' },
                            { value: 'Igorot', label: 'Igorot' },
                            { value: 'Ilocano', label: 'Ilocano' },
                            { value: 'Ilonggo', label: 'Ilonggo' },
                            { value: 'Kapampangan', label: 'Kapampangan' },
                            { value: 'Kinaray-a', label: 'Kinaray-a' },
                            { value: 'Maranao', label: 'Maranao' },
                            { value: 'Pangasinense', label: 'Pangasinense' },
                            { value: 'Tagalog', label: 'Tagalog' },
                            { value: 'None', label: 'None' },
                        ]} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputWithLabel label="Telephone Number" value={admissionData.telephone_number} onChange={e => setAdmissionData(p => ({ ...p, telephone_number: e.target.value }))} />
                        <InputWithLabel label="Mobile Number" required value={admissionData.mobile_number} onChange={e => setAdmissionData(p => ({ ...p, mobile_number: e.target.value }))} />
                        <InputWithLabel label="Email" type="email" required value={admissionData.email} onChange={e => setAdmissionData(p => ({ ...p, email: e.target.value }))} />
                    </div>

                    {/* Yes/No */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectWithLabel label="Are you a member of 4Ps?" value={admissionData.is_4ps_member} onChange={e => setAdmissionData(p => ({ ...p, is_4ps_member: e.target.value }))} options={[
                            { value: 'Yes', label: 'Yes' },
                            { value: 'No', label: 'No' },
                        ]} />
                        <SelectWithLabel label="Vaccination Status" value={admissionData.is_vaccinated} onChange={e => setAdmissionData(p => ({ ...p, is_vaccinated: e.target.value }))} options={[
                            { value: 'Yes', label: 'Yes' },
                            { value: 'No', label: 'No' },
                        ]} />
                        <SelectWithLabel label="IP / Indigenous group?" value={admissionData.is_ip} onChange={e => setAdmissionData(p => ({ ...p, is_ip: e.target.value }))} options={[
                            { value: 'Yes', label: 'Yes' },
                            { value: 'No', label: 'No' },
                        ]} />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between pt-4 w-full">
                        <Link to="/register" className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400">
                            Previous
                        </Link>
                        <Link
                            type="button"
                            onClick={handleNext}
                            className="hover: cursor-pointer px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Submit
                        </Link>
                    </div>
                </form>
            </section>
        </div>
    )
}

// ✅ fixed InputWithLabel
const InputWithLabel = ({ label, type = 'text', required = false, value, onChange }) => {
    const isError = required && !value
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`mt-1 block w-full border rounded p-2 ${isError ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={type === 'text' ? `Enter ${label.toLowerCase()}` : ''}
            />
        </div>
    )
}

// ✅ fixed SelectWithLabel
const SelectWithLabel = ({ label, required = false, options = [], value, onChange }) => {
    const isError = required && !value
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                value={value}
                onChange={onChange}
                className={`mt-1 block w-full border rounded p-2 bg-white ${isError ? 'border-red-500' : 'border-gray-300'}`}
            >
                <option value="">-- Please select --</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default RegisterTwo