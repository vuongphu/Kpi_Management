import React, { Fragment, useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import WorksheetTable from "./WorksheetTable";
import WorksheetFilter from "./WorksheetFilter";

const WorkSheetPage = () => {
  const rootStore = useContext(RootStoreContext);
    const {
        clearWorksheet
      } = rootStore.worksheetStore;
      useEffect(() => {
        clearWorksheet()
     }, [clearWorksheet]);
  return (

    
    <Grid>
    <Grid.Column width={14}>
        <WorksheetFilter />
      </Grid.Column>
      <Grid.Column width={14}>
        <WorksheetTable />
      </Grid.Column>
      
    </Grid>
 
  );
};
export default WorkSheetPage;
