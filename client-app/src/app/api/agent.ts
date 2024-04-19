import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { ActivityFormValues, IActivity } from '../models/activity';
import { router } from '../router/Routes';
import { store } from '../stores/store';
import { IUser, IUserFormValues } from '../models/user';
import { IPhoto, IProfile, IUserActivity } from '../models/profile';
import { PaginatedResult } from '../models/pagination';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401: 
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
})



const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
  list: (params: URLSearchParams) => axios.get<PaginatedResult<IActivity[]>>(`/activities`, { params })
    .then(responseBody),
  details: (id: string) => requests.get<IActivity>(`/activities/${id}`),
  create: (activity: ActivityFormValues) => requests.post<void>(`/activities`, activity),
  update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
  attend: (id: string) => requests.post<void>(`/activities/${id}/attend`,{})
}

const Account = {
    current:()=> requests.get<IUser>('/account'),
    login:(user:IUserFormValues)=> requests.post<IUser>('account/login',user),
    register:(user:IUserFormValues)=> requests.post<IUser>('account/register',user)
}

const Profiles ={
    get: (username: string) => requests.get<IProfile>(`/profiles/${username}`),
    uploadPhoto: (file: any)=>{
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<IPhoto>('photos', formData,{
            headers:{'Content-Type': 'multipart/form-data'}
        })

    },
    setMainPhoto: (id: string) => axios.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => axios.delete(`/photos/${id}`),
    updateProfile: (profile: Partial<IProfile>) => requests.put('/profiles',profile),
    updateFollowing:(username:string) => requests.post(`/follow/${username}`, {}),
    listFollowings:(username:string, predicate: string) => requests
        .get<IProfile[]>(`/follow/${username}?predicate=${predicate}`),
    listActivities: (username: string, predicate: string) =>
        requests.get<IUserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)
}

const agent = {
  Activities,
  Account,
  Profiles
}

export default agent;
