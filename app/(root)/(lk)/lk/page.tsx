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
            sm:px-6
            lg:px-8
            flex
            flex-row
            flex-wrap
            justify-center
            bg-emerald-50
        "
      >
        <Indicators />
        <UserInfo />
        <TaskTable />
        <InfoPanel />
      </div>
    )
  }
  