import React from 'react'
import { Tab } from 'semantic-ui-react'
import ProfileActivities from './ProfileActivities'
import ProfileDescription from './ProfileDescription'
import ProfilePhotos from './ProfilePhotos'
const panes = [
    { menuItem: 'About', render: () => <ProfileDescription /> },
    { menuItem: 'Photos', render: () => <ProfilePhotos /> },
    { menuItem: 'Projects', render: () => <ProfileActivities/> },
]
interface IProps {
    setActiveTab: (activeIndex: any) => void
}
const ProfileContent: React.FC<IProps> = ({ setActiveTab }) => {
    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e,data)=>setActiveTab(data.activeIndex)}
        >
        </Tab>
    )
}
export default ProfileContent
