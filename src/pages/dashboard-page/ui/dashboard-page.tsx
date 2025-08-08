import { onGetDashs } from "../api/route";
import { TableDash } from "./dashboard-table-dash";

export
  async function DashboardPage (
) {

  const dashs = await onGetDashs()

  console.log(dashs)

  return <TableDash dashs={dashs}/>
}