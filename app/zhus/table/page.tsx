

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
  const getUrl = 'http://localhost:5020/api/logs'//http://localhost:5025/api/logs/all
  const oldUrl = 'http://192.168.0.148:5100/log'//http://localhost:5100/log

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

  async function onFetchOldData(url: string): Promise<IZhus[]> {
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

  console.log(onFetchOldData(oldUrl))

  return <ZhusJournal onFetchData={onFetchData} onFetchOldData={onFetchOldData} oldUrl={oldUrl} getUrl={getUrl}/>
}
 //const result = await onFetchData('http://localhost:5025/api/logs/all')
/*
 async function fetchData(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response is ok (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the JSON data from the response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
  // Usage example
  const apiUrl = 'https://api.example.com/data'; // Replace with your API URL
  
  fetchData(apiUrl)
    .then(data => console.log('Data received:', data))
    .catch(error => console.error('Error:', error));
*/