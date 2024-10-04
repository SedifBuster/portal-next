import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiDocument } from "react-icons/hi2";
import { HiFolder } from "react-icons/hi2";
import fs from "node:fs/promises";


export default async function BdKnowledge() {
  const files = await fs.readdir("./public/uploads");
  const images = files
    //.filter((file) => file.endsWith(".jpg"))
    .map((file) => `/uploads/${file}`);

  return (
    <main>
      <div className="flex flex-wrap">
        {images.map((image) => (
          <div key={image} className="px-2 h-auto w-1/2">
           <a href={image}>{image}</a> 
          </div>
        ))}
      </div>
    </main>
  );
}

/* 
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

*/