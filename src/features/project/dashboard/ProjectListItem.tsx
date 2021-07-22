import React   from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {format} from 'date-fns'
import ProjectListItemAttendees from "./ProjectListItemAttendees";
import { IProject } from "../../../app/models/project";
const ProjectListItem: React.FC<{ project: IProject }> = ({ project }) => {
  const host =project.joins.filter(x=>x.isHost)[0]
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item key={project.id}>
            <Item.Image size="tiny" circular src={host.image || "/assets/user.png"} style={{marginBottom:3}} />
            <Item.Content>
              <Item.Header ><Link to={`/projects/${project.id}`}>{project.title}</Link></Item.Header>
              <Item.Meta> {format(project.date,'h:mm a')}</Item.Meta>
              <Item.Description>Created by <Link to={`/profile/${host.username}`}> {host.displayName}</Link> - Level {project.level} </Item.Description>
              {project.isHost &&
              <Item.Description>
                <Label
                basic
                color='orange'
                content='You are teamlead this project'
                />
              </Item.Description> 
              }
                {project.isGoing &&
              <Item.Description>
                <Label
                basic
                color='green'
                content='You are employee to this project'
                />
              </Item.Description>
              }
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      {/* <Segment style={{ background: 'red' }}>
        <Icon name="cog"  /> {project.level}
        <div></div>
      </Segment> */}
      <Segment secondary><ProjectListItemAttendees joins={project.joins}/></Segment>
      <Segment clearing>
        <span>{project.description}</span>
        <Button
          as={Link}
          to={`/projects/${project.id}`}
          content="View"
          floated="right"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};
export default ProjectListItem;
