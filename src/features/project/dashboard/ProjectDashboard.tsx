import React, { useEffect, useState } from "react";
import { Button, Grid, Loader } from "semantic-ui-react";
import ProjectList from "./ProjectList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { useContext } from "react";

import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import ProjectFilters from "./ProjectFilters";
import ProjectItemPlaceholder from "./ProjectItemPlaceholder";

const ProjectDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadProjects, loadingInitial, page, totalPage, setPage } =
    rootStore.projectStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const handleGelNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadProjects().then(() => setLoadingNext(false));
  };
  useEffect(() => {
    loadProjects();
   
  }, [loadProjects]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && page ===0 ? <ProjectItemPlaceholder/>:(
           <InfiniteScroll
           pageStart={0}
           loadMore={handleGelNext}
           hasMore={!loadingNext && page + 1 < totalPage}
           initialLoad={false}
         >
           <ProjectList />
         </InfiniteScroll>
        )}
       
      </Grid.Column>
      <Grid.Column width={6}>
        <ProjectFilters />
      </Grid.Column>
      <Grid.Column width={6}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};
export default observer(ProjectDashboard);
