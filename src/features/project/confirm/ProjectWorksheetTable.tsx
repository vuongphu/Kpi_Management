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
  Popup,
  Grid,
} from "semantic-ui-react";

import { history } from "../../../index";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { IWorksheet } from "../../../app/models/worksheet";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const ProjectTable: React.FC = ({
 
}) => {
  const rootStore = useContext(RootStoreContext);
  const { worksheetBy,loadingInitial, worksheetArray,editWorksheetByHost,roleSelectedByLead,projectSelectedByLead,submitting } = rootStore.worksheetStore;
  const [listItem, setListItem] = useState<string[]>([]);
  const [stateAll, setStateAll] = useState({ checked: false });
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

    

    if (stateAll.checked === true) {
      let b = worksheetBy.filter((x) => !x.confirm).map((it, i) => it.id);
      setListItem(b);
    } else {
      setListItem([]);
    }
  }, [stateAll]);

  return (
    <Fragment>
       <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>   Record Wait Confirm</Header>
      </Segment>
      <Segment attached loading={loadingInitial}>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Checkbox
                onClick={(e, key) => {
                  toggle(e, key);
                }}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Stt</Table.HeaderCell>
            <Table.HeaderCell>Display Name</Table.HeaderCell>
            <Table.HeaderCell>Productivity</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Note</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {worksheetArray.map(
            (it, i) =>
              !it.confirm && (
                <Table.Row key={it.id}  onClick={() => console.log(it.id
                )}>
                  <Table.Cell>
                    <Checkbox
                      name={it.id.toString()}
                      key={it.id}
                      onClick={(e, key) => {
                        
                      }}
                      onChange={checkboxChangeHandler}
                      checked={listItem.includes(it.id)}
                    />
                  </Table.Cell>
                  <Table.Cell>{i}</Table.Cell>
                  <Table.Cell>{it.displayName}</Table.Cell>
                  <Table.Cell>{it.productivity}</Table.Cell>
                  <Table.Cell>{format(it.day, "dd/MM/YYYY")}</Table.Cell>
                  <Table.Cell>{format(it.hour, "HH:mm")}</Table.Cell>
                  <Table.Cell>{it.note}</Table.Cell>
                </Table.Row>
              )
          )}
        </Table.Body>
      </Table>
      <Grid>
      <Grid.Column width={16}>
      <Button floated="right" positive content="Submit" loading={submitting} disabled ={listItem.length ==0} onClick={()=>editWorksheetByHost(listItem,roleSelectedByLead,projectSelectedByLead).then().finally(()=> setListItem([]))}></Button>
      <Button floated="right" content="Cancel" onClick={back}></Button>
              </Grid.Column>
     </Grid>
      
      </Segment>
   
    </Fragment>
  );
};

export default observer(ProjectTable);
