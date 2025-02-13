

import { ZhusJournal } from "./components/zhusJournal";

export interface IZhus {
  id: number
  department: string
  name: string
  date: Date | string
  place: string
  event: string
  circs: string
  gauge: string
  note: string
  liable: string
  cause: string
  comment: null | string
}

export interface IFArray {
  department: string,
  logs: IZhus[]
}

export
default function Table(
) {

  async function onFetchData(url: string): Promise<IZhus[]> {
    'use server'
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()

      return data;
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error;
    }
  }

  async function onPatchComment(url: string, commentWithId: {id: number, comment: string}) {
    'use server'
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentWithId)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()

      return data
    } catch (error) {
      console.log('Error fetching data', error)
      throw error
    }
  }

  return <ZhusJournal onFetchData={onFetchData} onPatchComment={onPatchComment}/>
}