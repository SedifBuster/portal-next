import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiDocument } from "react-icons/hi2";
import { HiFolder } from "react-icons/hi2";


export
  default function BdKnowledge(
) {

    //получаем файлы

  return <section>
    <div>
      <Link href={'/'}>
        <Button variant={'secondary'} className="m-2" >на главную</Button>
      </Link>
    </div>
    
    <div>
        <div>
            <HiDocument />
            <p>name</p>
        </div>

        <iframe src="c:\">
            
        </iframe>

        <div>
        <HiFolder />
            <p>name</p>
        </div>

        <div>
            <HiDocument />
            <p>name</p>
        </div>

        <div>
        <HiFolder />
            <p>name</p>
        </div>

        <div>
            <HiDocument />
            <p>name</p>
        </div>

        <div>
        <HiFolder />
            <p>name</p>
        </div>

    </div>

  </section>
}