import { Label } from "@/components/ui/label";
import Image from "next/image";
import logoImage from "../logoVKB.png"
import Link from "next/link";

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

          <Link href={"file://c/"} className="
          border h-[15vh] rounded-md p-4 flex justify-center content-center
          shadow-md bg-gray-100 text-gray-500
          "
          >{/*\\192.168.0.5\база знаний*/}
            <p className="p-2 text-lg font-semibold">База знаний</p>
          </Link>

        </div>




        <div className="basis-2/5 h-[80vh] rounded-md p-4 border-green-100 border-2 shadow-sm overflow-auto flex flex-col gap-4">

          <div className="w-full border-2 border-gray-200 flex p-4 flex-col shadow-md">
            <Label className="text-xl border-b w-full">Заголовок новости</Label>
            <p className="text-sm border-b w-full mb-2">Дата новости</p>
            <p className="mb-4">Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            </p>
          </div>

          <div className="w-full border-2 border-gray-200 flex p-4 flex-col shadow-md">
            <Label className="text-xl border-b w-full">Заголовок новости</Label>
            <p className="text-sm border-b w-full mb-2">Дата новости</p>
            <p  className="mb-4">Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            </p>
          </div>

          <div className="w-full border-2 border-gray-200 flex p-4 flex-col shadow-md">
            <Label className="text-xl border-b w-full">Заголовок новости</Label>
            <p className="text-sm border-b w-full mb-2">Дата новости</p>
            <p className="mb-4">Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            </p>
          </div>

          <div className="w-full border-2 border-gray-200 flex p-4 flex-col shadow-md">
            <Label className="text-xl border-b w-full">Заголовок новости</Label>
            <p className="text-sm border-b w-full mb-2">Дата новости</p>
            <p className="mb-4">Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            </p>
          </div>

        </div>
      </div>

      </section>
    )
  }

  
  /**<Label className="
        mt-4 text-xl block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500
        ">
        Experimental 1.1 version "DashBoard Update"
  </Label> */