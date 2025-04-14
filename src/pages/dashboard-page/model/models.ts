import { Dash, DashDepartment } from "@prisma/client";

export
  interface ChartsProps {
    data: DashDepartment[],
}

export
  interface DashInit extends Dash {
    table: DashDepartment[]
}