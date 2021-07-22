import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { IJoin } from './../../../app/models/project';

interface IProps{
  joins:IJoin[]
  
}
const ProjectDetailedSideBar:React.FC<IProps> = ({joins}) => {
  // const isHost=false;
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {joins.length} {joins.length ===1 ? 'Person':'People'} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {joins.map((join)=>(
             <Item key={join.username} style={{ position: "relative" }}>
             {join.isHost &&<Label
               style={{ position: "absolute" }}
               color="orange"
               ribbon="right"
             >
            Teamlead
             </Label>}
             <Image size="tiny" circular src={join.image || "/assets/user.png"} />
             <Item.Content verticalAlign="middle">

               <Item.Header as="h3">
                 <Link to={`/profile/${join.username}`}>{join.displayName}</Link>
               </Item.Header>
               {join.following &&
                <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>}
              
             </Item.Content>
           </Item>
 
          ))}
         
          
        </List>
      </Segment>
    </Fragment>
  );
};
export default observer(ProjectDetailedSideBar)