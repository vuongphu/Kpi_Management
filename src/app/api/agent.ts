import { IProfile, IPhoto } from './../models/profile';
import axios, { AxiosResponse } from 'axios';
import { setTimeout } from 'timers';

import { history } from '../..'
import { toast } from 'react-toastify';

import { IUser, IUserFormValues, IUserManager } from './../models/user';
import { IProject } from '../models/project';
import { IProjectEnvelope } from './../models/project';
import { IWorksheet, IWorksheetSumary } from './../models/worksheet';
import { addHours, format } from 'date-fns';
import { ISumaryBarChart } from '../models/statistic';
const qs = require('qs')

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
}, error => {
    return Promise.reject(error);
})
axios.interceptors.response.use(undefined, error => {
    if(error.response == undefined)
    {
        throw error.response;
    }
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error-make sure API is Running');
    }
    const { status, data, config,headers } = error.response;
    if (status === 404) {
        history.push('/notfound');
        // throw error.response;
    }
    if (status === 401 && headers['www-authenticate'].includes('Bearer error="invalid_token", error_description="The token expired at')) {
        window.localStorage.removeItem('jwt');
        history.push("/")
        toast.info('You seesion has expired,please login again')
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound');
    }
    if (status === 500) {
        toast.error('🦄 Server Error');
    }
 
    throw error.response;

})
const reponseBody = (reponseBody: AxiosResponse) => reponseBody.data;
const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then().then(reponseBody),
    post: (url: string, body: {}) => axios.post(url, body).then().then(reponseBody),
    put: (url: string, body: {}) => axios.put(url, body).then().then(reponseBody),
    del: (url: string) => axios.delete(url).then().then(reponseBody),
    postForm: (url: string, file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post(url, formData,
            {
                headers: { 'Content-type': 'multipart/form-data' }
            }).then(reponseBody);
    }

}

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user),
    list: (): Promise<IUserManager[]> => requests.get('/user/list'),
    create: (user: IUserFormValues): Promise<IUserManager> => requests.post(`/user/create`, user),
    delete: (username: string) => requests.del(`/user/${username}`),
    update: (user: Partial<IUserFormValues>) => requests.put(`/user`, user),
}
const Profiles = {
    get: (username: string): Promise<IProfile> => requests.get(`/profiles/${username}`),
    uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setmain`, {}),
    deletePhoto: (id: string) => requests.del(`/photos/${id}`),
    updateProfile: (profile: Partial<IProfile>) => requests.put(`/profiles`, profile),
    follow: (username: string) => requests.post(`/profiles/${username}/follow`, {}),
    unfollow: (username: string) => requests.del(`/profiles/${username}/follow`),
    listFollowings: (username: string, predicate: string) => requests.get(`/profiles/${username}/follow?predicate=${predicate}`),
    listActivities: (username: string, predicate: string) => requests.get(`/profiles/${username}/activities?predicate=${predicate}`),
    listProjects: (username: string, predicate: string) => requests.get(`/profiles/${username}/projects?predicate=${predicate}`)
}
const Projects = {
    list: (params: URLSearchParams): Promise<IProjectEnvelope> =>
        axios.get('/projects', { params: params }).then(sleep(1000)).then(reponseBody),
    detail: (id: string) => requests.get(`/projects/${id}`),
    create: (project: IProject) => requests.post('/projects', project),
    update: (project: IProject) => requests.put(`/projects/${project.id}`, project),
    delete: (id: String) => requests.del(`/projects/${id}`),
    join: (id: String) => requests.post(`/projects/${id}/join`, {}),
    unjoin: (id: String) => requests.del(`/projects/${id}/join`)
}
const Worksheets = {
    listProjectsJoined: () => requests.get(`/worksheets/projects/joined`),
    listProjectsLead: () => requests.get(`/worksheets/projects/lead`),
    list: (id: string, role: string): Promise<IWorksheet[]> => requests.get(`/worksheets/${id}/joined?role=${role}`),
    listForLead: (id: string, role: string): Promise<IWorksheet[]> => requests.get(`/worksheets/${id}/lead?role=${role}`),
    create: (worksheet: IWorksheet, role: string, projectId: string) => requests.post(`/worksheets`, { ...worksheet, role, projectId }),
    update: (worksheet: IWorksheet, role: string, projectId: string) => requests.put(`/worksheets/${worksheet.id}/joined`, { ...worksheet, role, projectId }),
    updateByLead: (ids: string[], role: string, projectId: string, confirm: boolean) => requests.put(`/worksheets/lead`, { ids, role, projectId, confirm }),
    delete: (id: String, role: string, projectId: string) => requests.del(`/worksheets/${id}/option?role=${role}&projectId=${projectId}`),
    sumary: (): Promise<IWorksheetSumary[]> => requests.get(`/worksheets/sumary`),
}
const Statistics = {
    listProjects: () => requests.get(`/statistics/projects`),
    // list:(id:string,role:string,fromDay:Date,toDay:Date): Promise<IWorksheet[]>=>requests.get(`/statistics/${id}/joined?role=${role}`),
    list: (params: URLSearchParams): Promise<IWorksheet[]> =>
        axios.get('/statistics', { params: params }).then(sleep(1000)).then(reponseBody),
    barchart:  (id: string, role: string,time:number): Promise<ISumaryBarChart[]> => requests.get(`/statistics/${id}/option?role=${role}&time=${time}`),

}
export default {
    Statistics,
    Worksheets,
    User,
    Profiles,
    Projects
}