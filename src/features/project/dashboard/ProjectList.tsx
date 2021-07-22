import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Item, Label } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProjectListItem from "./ProjectListItem";
const ProjectList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {projectsByDate}=rootStore.projectStore;

  return (
    <Fragment>
      {projectsByDate.map(([group, projects], index) => (
        
        <Fragment key={group}>
          <Label key={group} size="large" color="blue">
            {format(group,'eeee do MMMM')}
          </Label>
          <Item.Group divided>
            {projects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};
export default observer(ProjectList);
