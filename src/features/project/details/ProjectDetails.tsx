import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { RouteComponentProps } from "react-router";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ProjectDetailedHeader from "./ProjectDetailedHeader";
import ProjectDetailedSideBar from "./ProjectDetailedSideBar";
import ProjectDetailedInfo from "./ProjectDetailedInfo";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProjectDetailedChart from "./ProjectDetailedChart";

interface DetailParams {
  id: string;
}
const ProjectDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { project, loadProject, loadingInitial } = rootStore.projectStore;
  useEffect(() => {
    loadProject(match.params.id);
  }, [loadProject, match.params.id]);
  if (loadingInitial)
    return <LoadingComponent content="Loanding..." />;
  if (!project)
    return <h2>Project not found</h2>
  return (
    <Grid>
      <Grid.Column width={10}>
        <ProjectDetailedHeader project={project} />
        <ProjectDetailedInfo project={project} />
        <ProjectDetailedChart  project={project} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ProjectDetailedSideBar joins={project.joins} />
      </Grid.Column>
    </Grid>
    
  );
};
export default observer(ProjectDetails);
