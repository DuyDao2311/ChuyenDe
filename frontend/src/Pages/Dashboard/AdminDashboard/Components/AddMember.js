import React, { useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { Dropdown } from 'semantic-ui-react'

function AddMember() {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/"
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [status, setStatus] = useState("ACTIVE")
    const [recentAddedMembers, setRecentAddedMembers] = useState([])

    const statusOptions = [
        { value: 'ACTIVE', text: 'ACTIVE' },
        { value: 'INACTIVE', text: 'INACTIVE' }
    ]

    //Add a Member
    const addMember = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const readerData = {
            name,
            email,
            phone,
            status
        }
        try {
            const response = await axios.post(API_URL + "api/readers", readerData)
            setRecentAddedMembers([response.data, ...recentAddedMembers].slice(0,5))
            setName("")
            setEmail("")
            setPhone("")
            setStatus("ACTIVE")
            alert("Member Added")
        }
        catch (err) {
            console.log(err)
            alert("Không thể thêm member")
        }
        setIsLoading(false)
    }

    //Fetch Members
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "api/readers")
                const recentMembers = await response.data.slice(0, 5)
                setRecentAddedMembers(recentMembers)
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])

    return (
        <div>
            <p className="dashboard-option-title">Add a Member</p>
            <div className="dashboard-title-line"></div>
            <form className="addmember-form" onSubmit={addMember}>
                <label className="addmember-form-label" htmlFor="name">Full Name<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" name="name" value={name} required onChange={(e) => setName(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="email">Email<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="email" value={email} required onChange={(e) => setEmail(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="phone">Phone</label><br />
                <input className="addmember-form-input" type="text" value={phone} onChange={(e) => setPhone(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="status">Status</label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Status'
                        fluid
                        selection
                        value={status}
                        options={statusOptions}
                        onChange={(event, data) => setStatus(data.value)}
                    />
                </div>

                <input className="addmember-submit" type="submit" value="SUBMIT" disabled={isLoading} ></input>

            </form>
            <p className="dashboard-option-title">Recent Members</p>
            <div className="dashboard-title-line"></div>
            <table className='admindashboard-table'>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                </tr>
                {
                    recentAddedMembers.map((member, index) => {
                        return (
                            <tr key={member._id || index}>
                                <td>{index + 1}</td>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.status}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default AddMember
