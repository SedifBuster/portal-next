import { ZnoLog } from "@prisma/client";
import { ZnoTable } from "./components/table/znoTable";

export
  default function Zno(
) {


  
      async function onFetchData(url: string): Promise<ZnoLog[]> {
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

      async function onPostData(url: string, postData: BodyInit): Promise<number> {
        "use server"
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
          });
    
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
          const data = await response.json()
    
          return data;
        } catch (error) {
          console.error('Error fetching data:', error)
          throw Error;
        }
      }

      async function onPatchZno(url: string, zno: ZnoLog) {
        'use server'
        try {
          const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(zno)
          });
    
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
          const data = await response.json()
    
          return data
        } catch (error) {
          console.log('Error fetching data', error)
          throw error
        }
      }

  return (
    <main className="flex justify-center">
      <ZnoTable onFetchData={onFetchData} onPostData={onPostData} onPatchZno={onPatchZno}/>
    </main>
  )
}