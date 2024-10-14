import { Department } from "./components/Department";
import { Indicators } from "./components/Indicators";
import { InfoPanel } from "./components/InfoPanel";
import { TaskTable } from "./components/TaskTable";
import { UserInfo } from "./components/UserInfo";

export default function Lk() {
    return (
      <div
        className="
            px-4
            py-2
            sm:px-2
            lg:px-2
            flex
            flex-row
            flex-wrap
            justify-center
            h-full
        "
      >
        <Department />
       {/** <Indicators />
        <UserInfo />
        <TaskTable />
        <InfoPanel />*/} 
      </div>
    )
  }
  