import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

import { IProject } from "../../../app/models/project";
import { level } from './../../../app/common/options/levelOption';
const projectImageStyle = {
  filter: "brightness(30%)",
};
const projectImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};
const ProjectDetailedHeader: React.FC<{ project: IProject }> = ({
  project,
}) => {
  const root = useContext(RootStoreContext);
  const { joinProject, cancelJoin, loading ,deleteProject} = root.projectStore;
  const host = project.joins.filter(x => x.isHost)[0]
  const bgColor =() => {
   
    if (project.level == "Hard")
    {
      return "indianred"
    }
    else if (project.level == "Normal")
    {
      return "white"
    }
    else 
    {
      return "green"
    }
    
  };
  return (
    <Segment.Group  style={{ background: bgColor() }}>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Segment basic >
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={project.title}
                />
                <p> {format(project.date, "eeee do MMMM")}</p>
                <p>
                  Created by <Link to={`/profile/${host.username}`}><strong>{host.displayName}</strong></Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {project.isHost ? (
          <Button.Group floated="right">
              <Button
              onClick={(e,d)=>{deleteProject(e,project.id)}}
              color="red"
            >
              Delete
            </Button>
            <Button.Or />
            <Button
              as={Link}
              to={`/confirm/${project.id}`}
              color="blue"
            >
              Confirm
            </Button>
            <Button.Or />
            <Button
              as={Link}
              to={`/manage/${project.id}`}
              color="orange"
            >
              Edit Detail
            </Button>
          </Button.Group>
        ) : 
          <Button disabled={project.isGoing} loading={loading} color="teal" onClick={joinProject}>{project.isGoing ?"Joined Project":"Join Project"}</Button>
        }
      </Segment>
    </Segment.Group>
  );
};
export default observer(ProjectDetailedHeader);
