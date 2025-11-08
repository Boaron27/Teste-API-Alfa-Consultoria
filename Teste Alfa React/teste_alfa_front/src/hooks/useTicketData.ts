import axios, {type AxiosPromise} from "axios"
import type {TicketData} from "../interface/TicketData.ts";
import { useQuery} from "@tanstack/react-query";


const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise <TicketData[]> => {
    const response = axios.get(API_URL + '/ticket')
    return response
}

export function useTicketData(){
    const query = useQuery({
        queryFn : fetchData,
        queryKey : ['tickt-data'],
        retry : 2
    })

    return {
        ...query,
        data : query.data?.data
    }
}