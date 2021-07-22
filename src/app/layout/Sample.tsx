import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Segment,
  Button,
  Header,
  Icon,
  Checkbox,
  Table,
  CheckboxProps,
  Form ,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Select } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { RootStoreContext } from "../stores/rootStore";
import { IWorksheet, WorksheetFormValues } from './../models/worksheet';
import { history } from "./../../index";
import TextInput from "../common/form/TextInput";

import { observer } from "mobx-react-lite";




const LoginForm = ({ id}: { id: string }) => {

  
  const rootStore = useContext(RootStoreContext);
  const { openModal,closeModal } = rootStore.modelStore;

  const { worksheet,loadWorksheet,editWorksheet ,loadWorkSheets,loading} = rootStore.worksheetStore;

  const [state, setstate] = useState<IWorksheet>(); 
  const [activity, setActivity] = useState(new WorksheetFormValues());

  useEffect(() => {
    loadWorksheet(id).then((activity) => setActivity(new WorksheetFormValues(activity))).finally(() => console.log("done"));
    
  }, [loadWorksheet, id]);

    // useEffect(() => {
    //   loadWorksheet(id)
    //   .then((activity:IWorksheet) => setActivity(new WorksheetValues(activity)))
    // }, [loadWorksheet,id]);
    const handleFinalFormSubmit = (values: any) => {
      const { ...activity } = values;
      editWorksheet(activity,"op","1213");
      closeModal()
    };
    return (
      <Segment clearing>
      <FinalForm
      initialValues={activity}
      onSubmit={handleFinalFormSubmit}
      render={({handleSubmit}) => (
        <Form onSubmit={handleSubmit} loading={loading}>
         
        
          <Field
            name="title"
            placeholder="Title"
            value={activity.id}
            component={TextInput}
          />
           <Field
            name="assigned"
            placeholder="Assigned"
            value={activity.note}
            component={TextInput}
          />
           <Field
            name="code"
            placeholder="Code"
            value={String(activity.productivity)}
            component={TextInput}
          />
          
          
          
         
          <Button
           
            disabled={loading}
            floated="right"
            positive
            type="submit"
            content="Submit"
          />
          <Button
            onClick={closeModal}
            
            disabled={loading}
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>

      )}
    />
            </Segment>
    )
    

};
const Sample = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal,closeModal } = rootStore.modelStore;
  const { worksheetBy,worksheetRegistry ,loadWorkSheets,worksheetArray,deleteWorksheet} = rootStore.worksheetStore;
  const [listItem, setListItem] = useState<string[]>([]);
  const [state, setstate] = useState({ checked: false });
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
  const getAll = () => {
    // 
    // 
    // 
    
    
    
  };
 
  const toggle = (
    e: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {
    setStateAll((prevState) => ({ checked: !prevState.checked }));
  };
  const back=()=>{
    history.goBack()
  }
  useEffect(() => {
    
    // 
    // 
    // loadWorksheet(id).then((activity) => setActivity(new WorksheetValues(activity))).finally(() => console.log("done"));

    if (worksheetArray.length==0){
      loadWorkSheets("1","2")
    }
   
  //  const portfolio: IWorksheet[] = worksheetBy
  //   
  //  setWorksheets(portfolio)

  //  setWorksheets([...Worksheets,portfolio[0]]);
  //  let b = worksheetBy.map((it) => it.id);
  //  worksheetBy.forEach(x=>XMLDocument)
    // setWorksheets(b);
 
    if (stateAll.checked === true) {
      let b = worksheetBy.filter((x) => !x.confirm).map((it, i) => it.id);
      setListItem(b);
    } else {
      setListItem([]);
    }

  }, [stateAll,loadWorkSheets]);

  return (
    <Fragment>
      <Checkbox label="Make my profile visible" />
      <Checkbox label="Make my profile visible" />
      <Checkbox label="Make my profile visible" />
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
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>CONFIRM</Table.HeaderCell>
            <Table.HeaderCell>EVENT</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {worksheetArray.map(
            (it, i) =>
              !it.confirm && (
                <Table.Row key={it.id} positive onClick={ ()=>console.log(it.id
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
                  <Table.Cell>{it.id}</Table.Cell>
                  <Table.Cell>{it.productivity}</Table.Cell>
                  <Table.Cell>{it.confirm}</Table.Cell>

                  <Table.Cell>
                    {" "}
                    <Button
                      onClick={() => openModal(<LoginForm id={it.id}/>)}
                      to="/login"
                      size="medium"
                      content="Edit"
                    />
                     <Button
                      onClick={() => deleteWorksheet(it.id,"op","123")}
                      to="/login"
                      size="medium"
                      content="Delete"
                    />
                  </Table.Cell>
                </Table.Row>
              )
          )}
        </Table.Body>
      </Table>

      <Button floated="right" content="Submit" onClick={getAll}></Button>
      <Button floated="right" content="Cancel" onClick={back}></Button>
    </Fragment>
  );
};

export default observer(Sample);
