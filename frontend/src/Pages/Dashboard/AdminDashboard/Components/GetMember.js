import React, { useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { Dropdown } from 'semantic-ui-react'
import '../../MemberDashboard/MemberDashboard.css'

function GetMember() {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/"

    const [allMembersOptions, setAllMembersOptions] = useState(null)
    const [memberId, setMemberId] = useState(null)
    const [memberDetails, setMemberDetails] = useState(null)

    //Fetch Members
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "api/readers")
                setAllMembersOptions(response.data.map((member) => (
                    { value: `${member?._id}`, text: `${member?.name} [${member?.email}]` }
                )))
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])


    useEffect(() => {
        const getMemberDetails = async () => {
            if(memberId !== null){
                try {
                    const response = await axios.get(API_URL + "api/readers/" + memberId)
                    setMemberDetails(response.data)
                }
                catch (err) {
                    console.log("Error in fetching the member details")
                }
            }
        }
        getMemberDetails()
    }, [API_URL, memberId])


    return (
        <div>
            <div className='semanticdropdown getmember-dropdown'>
                <Dropdown
                    placeholder='Select Member'
                    fluid
                    search
                    selection
                    value={memberId}
                    options={allMembersOptions}
                    onChange={(event, data) => setMemberId(data.value)}
                />
            </div>
            <div style={memberId === null ? { display: "none" } : {}}>
                <div className="member-profile-content" id="profile@member" style={memberId === null ? { display: "none" } : {}}>
                    <div className="user-details-topbar">
                        <img className="user-profileimage" src="./assets/images/Profile.png" alt=""></img>
                        <div className="user-info">
                            <p className="user-name">{memberDetails?.name}</p>
                            <p className="user-email">{memberDetails?.email}</p>
                            <p className="user-phone">{memberDetails?.phone}</p>
                            <p className="user-id">{memberDetails?._id}</p>
                        </div>
                    </div>
                    <div className="user-details-specific">
                        <div className="specific-left">
                            <p style={{ fontSize: "18px" }}>
                                <b>Status</b> : {memberDetails?.status}
                            </p>
                            <p style={{ fontSize: "18px" }}>
                                <b>Member since</b> : {memberDetails?.membershipDate ? memberDetails.membershipDate.slice(0,10) : ""}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetMember
