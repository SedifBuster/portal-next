import { HelperForm } from "./helper-form";
import { HelperInfoPanel } from "./helper-info-panel";
import { HelperSheetIds } from "./helper-sheet-ids";


export
  function HelperPage() {
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
        <HelperForm />
      </div>
      <div 
        className="
          flex
          flex-col
          w-2/6
        "
      >
        <HelperInfoPanel />
        <HelperSheetIds />
      </div>
    </div>
  )
}
