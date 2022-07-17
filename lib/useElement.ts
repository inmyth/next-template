import useSWR from 'swr'
import fetchJson from './fetchJson'
import {Element} from '../pages/api/element'

export default function useElement(element: string) {    
  return useSWR<Element>('/api/element/?element=' + element, fetchJson)
}