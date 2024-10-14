import { Label } from "@/components/ui/label";
import Image from "next/image";
import logoImage from "../logoVKB.png"
import Link from "next/link";
import { NewsTable } from "./components/newsTable";

export default function Home() {




    return (
      <section>

      <header>
        <div className="flex p-6 gap-6">
          <Image src={logoImage} alt="logo image" width={283}/>
          <Label className="text-6xl block subpixel-antialiased tracking-wide p-4">корпоративный портал</Label>
        </div>
      </header>

      <div className="flex flex-row p-4 gap-2 ">



        <div className="
        basis-3/5 rounded-md shadow-sm overflow-auto p-4
        grid grid-cols-3 gap-4 h-[40vh]
        "
        >

          
          <Link href={'http://192.168.0.148:3000/table'} target="blank" className="
          border h-[15vh] rounded-md p-4 flex justify-center content-center
          shadow-md hover:bg-green-100 
          "
          >
            <p className="p-2 text-lg font-semibold">Журнал нежелательных случаев</p>
          </Link>





          <Link href={'http://192.168.0.148:5006/'} target="blank" className="
          border h-[15vh] rounded-md p-4 flex justify-center content-center
          shadow-md hover:bg-green-100 
          "
          >
            <p className="p-2 text-lg font-semibold">Система учета заявок</p>
          </Link>
          <Link href={'http://192.168.0.148:5010/'} target="blank" className="
          border h-[15vh] rounded-md p-4 flex justify-center content-center
          shadow-md hover:bg-green-100 
          "
          >
            <p className="p-2 text-lg font-semibold">Журнал БРНС</p>
          </Link>
          <Link href={'/priemnoe'} target="blank" className="
          border h-[15vh] rounded-md p-4 flex justify-center content-center
          shadow-md hover:bg-green-100
          "
          >
            <p className="p-2 text-lg font-semibold">Панель мониторинга приемного отделения</p>
          </Link>

          <Link href={"/bdKnowledge"} className="
          border h-[15vh] rounded-md p-4 flex justify-center content-center
          shadow-md hover:bg-green-100
          "
          >{/*\\192.168.0.5\база знаний*/}
            <p className="p-2 text-lg font-semibold">База знаний</p>
          </Link>

        </div>




        <NewsTable />
      </div>

      </section>
    )
  }

  
  /**<Label className="
        mt-4 text-xl block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500
        ">
        Experimental 1.1 version "DashBoard Update"
  </Label> */