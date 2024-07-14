'use client'
import ProfileDetails from "@/components/morecomponents/profiledetails";
import withAuth from "@/lib/PrivateRoute";

function Profile() {
    return (
        <ProfileDetails />
    )
}
export default withAuth(Profile);