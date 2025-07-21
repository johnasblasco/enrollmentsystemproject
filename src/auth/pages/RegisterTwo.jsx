import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterTwo = () => {
    const navigate = useNavigate()
    const [registerData, setRegisterData] = useState({})

    // name
    const [surname, setSurname] = useState('')
    const [givenName, setGivenName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [suffix, setSuffix] = useState('')

    // birth
    const [dob, setDob] = useState('')
    const [pob, setPob] = useState('')

    // other selects
    const [gender, setGender] = useState('')
    const [civilStatus, setCivilStatus] = useState('')
    const [indigenous, setIndigenous] = useState('')
    const [pwd, setPwd] = useState('')
    const [houseStreet, setHouseStreet] = useState('')

    // location
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [barangay, setBarangay] = useState('')

    // contact
    const [nationality, setNationality] = useState('')
    const [religion, setReligion] = useState('')
    const [ethnic, setEthnic] = useState('')
    const [tel, setTel] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')

    // yes/no
    const [is4ps, setIs4ps] = useState('')
    const [vaccinated, setVaccinated] = useState('')
    const [isIp, setIsIp] = useState('')

    // collections
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [barangays, setBarangays] = useState([])

    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedCity, setSelectedCity] = useState('')

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
        if (!selectedProvince) {
            setCities([])
            return
        }
        const fetchCities = async () => {
            try {
                const response = await axios.get(
                    `https://psgc.gitlab.io/api/provinces/${selectedProvince}/cities-municipalities/`
                )
                setCities(response.data)
            } catch (error) {
                console.error('Error fetching cities:', error)
            }
        }
        fetchCities()
    }, [selectedProvince])

    // fetch barangays
    useEffect(() => {
        if (!selectedCity) {
            setBarangays([])
            return
        }
        const fetchBarangays = async () => {
            try {
                const response = await axios.get(
                    `https://psgc.gitlab.io/api/cities-municipalities/${selectedCity}/barangays/`
                )
                setBarangays(response.data)
            } catch (error) {
                console.error('Error fetching barangays:', error)
            }
        }
        fetchBarangays()
    }, [selectedCity])

    // submit
    const handleNext = () => {
        console.log("CLICKED!");
        const payload = {
            surname,
            givenName,
            middleName,
            suffix,
            dob,
            pob,
            gender,
            civilStatus,
            indigenous,
            pwd,
            houseStreet,
            province: selectedProvince,
            city: selectedCity,
            barangay,
            nationality,
            religion,
            ethnic,
            tel,
            mobile,
            email,
            is4ps,
            vaccinated,
            isIp,
        }

        console.log('Submitted Payload:', payload)
        setRegisterData(payload)
        // navigate('/next-page') // optional
    }

    return (
        <div>
            <section className="flex flex-col gap-4 justify-center items-center py-16">
                <form className="w-full max-w-4xl border border-gray-200 rounded-lg p-10 bg-white shadow-md space-y-6">
                    <h2 className="text-2xl font-semibold text-center text-blue-900">
                        Personal Information
                    </h2>

                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <InputWithLabel label="Surname" required value={surname} onChange={e => setSurname(e.target.value)} />
                        <InputWithLabel label="Given name" required value={givenName} onChange={e => setGivenName(e.target.value)} />
                        <InputWithLabel label="Middle name" value={middleName} onChange={e => setMiddleName(e.target.value)} />
                        <InputWithLabel label="Suffix" value={suffix} onChange={e => setSuffix(e.target.value)} />
                    </div>

                    {/* DOB / POB */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputWithLabel label="Date of Birth" type="date" required value={dob} onChange={e => setDob(e.target.value)} />
                        <InputWithLabel label="Place of Birth" required value={pob} onChange={e => setPob(e.target.value)} />
                    </div>

                    {/* Selects */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <SelectWithLabel label="Gender" required value={gender} onChange={e => setGender(e.target.value)} options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                        ]} />
                        <SelectWithLabel label="Civil Status" required value={civilStatus} onChange={e => setCivilStatus(e.target.value)} options={[
                            { value: 'single', label: 'Single' },
                            { value: 'married', label: 'Married' },
                            { value: 'widowed', label: 'Widowed' },
                            { value: 'separated', label: 'Separated' },
                            { value: 'divorced', label: 'Divorced' },
                        ]} />
                        <SelectWithLabel label="Indigenous Community" value={indigenous} onChange={e => setIndigenous(e.target.value)} options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                        ]} />
                        <SelectWithLabel label="PWD" value={pwd} onChange={e => setPwd(e.target.value)} options={[
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
                            value={houseStreet}
                            onChange={e => setHouseStreet(e.target.value)}
                            className={`w-full border rounded p-2 ${!houseStreet ? 'border-red-500' : 'border-gray-300'}`}
                        />
                    </div>

                    {/* Province City Barangay */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectWithLabel label="Province" required value={selectedProvince} onChange={e => {
                            setSelectedProvince(e.target.value)
                            setSelectedCity('')
                            setBarangay('')
                        }} options={provinces.map(p => ({ value: p.code, label: p.name }))} />
                        <SelectWithLabel label="City" required value={selectedCity} onChange={e => {
                            setSelectedCity(e.target.value)
                            setBarangay('')
                        }} options={cities.map(c => ({ value: c.code, label: c.name }))} />
                        <SelectWithLabel label="Barangay" required value={barangay} onChange={e => setBarangay(e.target.value)} options={barangays.map(b => ({ value: b.code, label: b.name }))} />
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectWithLabel label="Nationality" value={nationality} onChange={e => setNationality(e.target.value)} options={[
                            { value: 'Filipino', label: 'Filipino' },
                            { value: 'Other', label: 'Other' },
                        ]} />
                        <SelectWithLabel label="Religion" value={religion} onChange={e => setReligion(e.target.value)} options={[
                            { value: 'Catholic', label: 'Catholic' },
                            { value: 'Protestant', label: 'Protestant' },
                            { value: 'Muslim', label: 'Muslim' },
                            { value: 'Other', label: 'Other' },
                        ]} />
                        <SelectWithLabel label="Ethnic Affiliation" value={ethnic} onChange={e => setEthnic(e.target.value)} options={[
                            { value: 'Aeta', label: 'Aeta' },
                            { value: 'Bontoc', label: 'Bontoc' },
                            { value: 'Bicolano', label: 'Bicolano' },
                            { value: 'Bilang', label: 'Bilang' },
                        ]} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputWithLabel label="Telephone Number" value={tel} onChange={e => setTel(e.target.value)} />
                        <InputWithLabel label="Mobile Number" required value={mobile} onChange={e => setMobile(e.target.value)} />
                        <InputWithLabel label="Email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    {/* Yes/No */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectWithLabel label="Are you a member of 4Ps?" value={is4ps} onChange={e => setIs4ps(e.target.value)} options={[
                            { value: 'Yes', label: 'Yes' },
                            { value: 'No', label: 'No' },
                        ]} />
                        <SelectWithLabel label="Vaccination Status" value={vaccinated} onChange={e => setVaccinated(e.target.value)} options={[
                            { value: 'Yes', label: 'Yes' },
                            { value: 'No', label: 'No' },
                        ]} />
                        <SelectWithLabel label="IP / Indigenous group?" value={isIp} onChange={e => setIsIp(e.target.value)} options={[
                            { value: 'Yes', label: 'Yes' },
                            { value: 'No', label: 'No' },
                        ]} />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between pt-4 w-full">
                        <Link to="/" className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400">
                            Previous
                        </Link>
                        <Link
                            type="button"
                            onClick={handleNext}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Next
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
