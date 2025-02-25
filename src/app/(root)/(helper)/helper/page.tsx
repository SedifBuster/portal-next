import { FormHelper } from "./components/FormHelper";
import { InfoPanel } from "./components/InfoPanel";
import { SheetIds } from "./components/SheetIds";

export default function Helper() {
  return (
    <div 
      className="
        px-4
        py-10
        sm:px-6
        lg:px-8
        h-full
        flex
        flex-row
        gap-4
      "
    >
      {/*<h1>helperPage</h1>*/}
      <div
        className="
          w-4/6
        "  
      >
        <FormHelper />
      </div>
      <div 
        className="
          flex
          flex-col
          w-2/6
        "
      >
        <InfoPanel />
        <SheetIds />
      </div>
    </div>
  )
}
