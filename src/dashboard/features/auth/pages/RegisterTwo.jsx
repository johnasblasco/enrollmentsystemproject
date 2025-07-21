import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const RegisterTwo = () => {



    // name
    const [surname, setSurname] = useState('');
    const [givenName, setGivenName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [suffix, setSuffix] = useState('');

    // birth
    const [dob, setDob] = useState('');
    const [pob, setPob] = useState('');

    // other selects
    const [gender, setGender] = useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [indigenous, setIndigenous] = useState('');
    const [pwd, setPwd] = useState('');
    const [houseStreet, setHouseStreet] = useState('');

    // from your province/city logic
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [barangay, setBarangay] = useState('');

    // contact
    const [nationality, setNationality] = useState('');
    const [religion, setReligion] = useState('');
    const [ethnic, setEthnic] = useState('');
    const [tel, setTel] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');

    // yes/no
    const [is4ps, setIs4ps] = useState('');
    const [vaccinated, setVaccinated] = useState('');
    const [isIp, setIsIp] = useState('');



    // API CALLS COLLECTIONS
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [selectedProvince, setSelectedProvince] = useState('')
    const [barangays, setBarangays] = useState([])
    const [selectedCity, setSelectedCity] = useState('')


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


    const handleNext = () => {
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
            province,
            city,
            barangay,
            nationality,
            religion,
            ethnic,
            tel,
            mobile,
            email,
            is4ps,
            vaccinated,
            isIp
        };

        setRegisterData(prev => ({ ...prev, ...payload })); // merge with step one data
        console.log(registerData)
        navigate('/dashboard'); // or next step
    };

    return (
        <div>
            <section className="flex flex-col gap-4 justify-center items-center py-16">
                <form className="w-full max-w-4xl border border-gray-200 rounded-lg p-10 bg-white shadow-md space-y-6">

                    <h2 className="text-2xl font-semibold text-center text-blue-900">
                        Personal Information
                    </h2>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <InputWithLabel label="Surname" required
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                        />
                        <InputWithLabel label="Given name" required />
                        <InputWithLabel label="Middle name" />
                        <InputWithLabel label="Suffix" />
                    </div>

                    {/* Date of Birth and Place of Birth */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputWithLabel label="Date of Birth" type="date" required />
                        <InputWithLabel label="Place of Birth" required />
                    </div>

                    {/* Gender, Civil Status, Indigenous, Disability */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <SelectWithLabel label="Gender" required />
                        <SelectWithLabel label="Civil Status" required />
                        <SelectWithLabel label="Indigenous Community" />
                        <SelectWithLabel label="PWD" />
                    </div>

                    {/* Address Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            House No., Street, Barangay
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded p-2 border-red-500"
                        />
                    </div>

                    {/* Province and City */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectWithLabel
                            label="Province"
                            required
                            options={provinces.map((p) => ({
                                value: p.code,
                                label: p.name
                            }))}
                            onChange={(e) => {
                                setSelectedProvince(e.target.value)
                                setCities([])
                            }}
                        />
                        <SelectWithLabel
                            label="City"
                            required
                            options={cities.map((c) => ({
                                value: c.code,
                                label: c.name
                            }))}
                            onChange={(e) => {
                                setSelectedCity(e.target.value)
                                setBarangays([])
                            }}
                        />
                        <SelectWithLabel
                            label="Barangay"
                            required
                            options={barangays.map((b) => ({
                                value: b.code,
                                label: b.name
                            }))}
                        />
                    </div>


                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <SelectWithLabel
                            label="Nationality"
                            options={[
                                { value: 'Filipino', label: 'Filipino' },
                                { value: 'Other', label: 'Other' },
                            ]}
                        />
                        <SelectWithLabel label="Religion"
                            options={[
                                { value: 'Catholic', label: 'Catholic' },
                                { value: 'Protestant', label: 'Protestant' },
                                { value: 'Muslim', label: 'Muslim' },
                                { value: 'Other', label: 'Other' },
                            ]}
                        />
                        <SelectWithLabel label="Ethnic Affiliation"
                            options={[
                                { value: 'Aeta', label: 'Aeta' },
                                { value: 'Bontoc', label: 'Bontoc' },
                                { value: 'Bicolano', label: 'Bicolano' },
                                { value: 'Bilang', label: 'Bilang' },
                                { value: 'Bontoc', label: 'Bontoc' },
                            ]}

                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputWithLabel label="Telephone Number" />
                        <InputWithLabel label="Mobile Number" required />
                        <InputWithLabel label="Email" type="email" required />
                    </div>

                    {/* Yes/No Questions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectWithLabel label="Are you a member of 4Ps?"
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]}
                        />
                        <SelectWithLabel label="Vaccination Status"
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]} />
                        <SelectWithLabel label="IP / Indigenous group?"
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' },
                            ]} />
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-4 w-full">
                        <Link to="/register" className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400">
                            Previous
                        </Link>
                        <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Next
                        </Link>
                    </div>
                </form>
            </section>
        </div >
    )
}

const InputWithLabel = ({ label, type = 'text', required = false, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className={`mt-1 block w-full border rounded p-2 ${required ? 'border-red-500' : 'border-gray-300'}`}
            placeholder={type === 'text' ? `Enter ${label.toLowerCase()}` : ''}
        />
    </div>
);


const SelectWithLabel = ({ label, required = false, options = [], value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            value={value}
            onChange={onChange}
            className={`mt-1 block w-full border rounded p-2 bg-white ${required ? 'border-red-500' : 'border-gray-300'}`}
        >
            <option value="">-- Please select --</option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);


export default RegisterTwo
