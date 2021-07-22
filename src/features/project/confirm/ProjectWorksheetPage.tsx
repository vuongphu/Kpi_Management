import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Segment,
  Button,
  Header,
  Icon,
  Checkbox,
  Table,
  CheckboxProps,
  Form,
  Grid,
} from "semantic-ui-react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Select } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";


import { history } from "../../../index";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { IWorksheet } from "../../../app/models/worksheet";
import { format } from "date-fns";
import ProjectWorksheetTable from "./ProjectWorksheetTable";
import ProjectWorksheetFilter from "./ProjectWorksheetFilter";
import ProjectWorksheetSumary from "./ProjectWorksheetSumary";
interface DetailParams {
  id: string;
}
const ProjectWorksheetPage: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { worksheetBy, worksheetRegistry,clearWorksheet,projectSelectedByLead,setProjectSelectedByLead,setRoleSelectedByLead,roleSelected, loadWorkSheets, worksheetArray, deleteWorksheet } = rootStore.worksheetStore;
  const [listItem, setListItem] = useState<string[]>([]);
  const {user}=rootStore.userStore;
  const [stateAll, setStateAll] = useState({ checked: false });
  const [Worksheets, setWorksheets] = useState<IWorksheet[]>([]);
  //   setWorksheets(worksheetBy)
  const checkboxChangeHandler = (
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {
    if (data.checked) setListItem([...listItem, String(data.name)]);
    else setListItem(listItem.filter((item) => item != (data.name)));
  };
  const toggle = (
    e: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {
    setStateAll((prevState) => ({ checked: !prevState.checked }));
  };
  const back = () => {
    history.goBack()
  }
  useEffect(() => {
    clearWorksheet();
    if (match.params.id != undefined) {
      setProjectSelectedByLead(match.params.id)
    }
    if (user?.role != 'Manager' && user?.role != 'Teamlead' )
    {
      history.push("/projects")
    }
  
  }, [match.params.id]);

  return (
    <Grid>
    <Grid.Column width={14}>
        <ProjectWorksheetFilter id ={match.params.id == null ?projectSelectedByLead:match.params.id }/>
      </Grid.Column>
      <Grid.Column width={10}>
        <ProjectWorksheetTable />
      </Grid.Column>
      <Grid.Column width={4}>
      <ProjectWorksheetSumary/>
      </Grid.Column>
      
    </Grid>
  );
};

export default observer(ProjectWorksheetPage);
