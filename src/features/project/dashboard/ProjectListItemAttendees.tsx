import React, { useState } from 'react'
import { List, Image, Popup, Accordion, Icon } from 'semantic-ui-react'
import { IJoin } from '../../../app/models/project';
interface IProps {
    joins: IJoin[]
}
const ProjectListItemAttendees: React.FC<IProps> = ({ joins }) => {
    const [state, setstate] = useState<string | number | undefined>(1);
    return (
        <Accordion>
            <Accordion.Title
                active={state === 0}
                index={0}
                onClick={(e, d) => {
                    setstate(d.index === state ? -1 : d.index)
                }}
            >
                <Icon name='dropdown' />
                Users Joined : {joins.length}
            </Accordion.Title>
            <Accordion.Content active={state===0}>
                <List horizontal>
                    {joins.map(joins => (
                        <List.Item key={joins.username}>
                            <Popup header={joins.username}
                                trigger={
                                    <Image size='mini' circular src={joins.image || '/assets/user.png'} />
                                }
                            />
                        </List.Item>
                    ))}
                </List>
            </Accordion.Content>

        </Accordion>
    )
}
export default ProjectListItemAttendees