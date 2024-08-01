import { TableDash } from "./components/TableDash";

async function onFetchingDashsData() {
  try {
    const response = await fetch('http://localhost:5020/api/dash')
    if (response.status !== 200 && typeof response === typeof 'undefined') throw new Error('Failed to fetch dash data')

    return response.json()
  } catch (error) {
    console.log(error)
  }
}

async function onFetchingDepartmentsData() {
  try {
    const response = await fetch('http://localhost:5020/api/dash/department')
    if (response.status !== 200 && typeof response !== typeof 'undefined') throw new Error('Failed to fetch dep data')

    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export
  default async function DashBoard() {

  return <TableDash 
            onGetDeps={onFetchingDepartmentsData()}
            onGetDashs={onFetchingDashsData()}
         />
}