import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import CreateUserForm from './CreateUserForm'
import EmployeeList from './EmployeeList'

const EmployeeContent : React.FC<RouteComponentProps> = ({
    history,
  }) => {
    const rootStore = useContext(RootStoreContext);
    const { getListUser,userManager,loading,createUser,deleteUser,editing,setEdit,userEdit } = rootStore.userStore
    const {user}=rootStore.userStore;
    useEffect(() => {
        getListUser()
        if (user?.role != 'Manager' && user?.role != 'Teamlead' )
        {
          history.push("/projects")
        }
    }, [getListUser])
    return (
        <Fragment>
             <Grid>
            <Grid.Column width={10}>
            <CreateUserForm createUserx={createUser} loading={loading}/>
            <EmployeeList userManager={userManager} loading={loading} deleteUser={deleteUser}
            editing={editing} setEdit={setEdit} userEdit={userEdit}/>
            </Grid.Column>
            </Grid>
        </Fragment>
    )
}
export default observer(EmployeeContent)