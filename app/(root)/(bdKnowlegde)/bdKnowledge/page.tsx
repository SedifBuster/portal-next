
import fs from "node:fs/promises";
import { FilesContainer } from "./components/FilesContainer";

export default async function BdKnowledge() {
  const files = await fs.readdir("./public/uploads")

  return <FilesContainer files={files}/>
}
/*(
    <main>
      <div>
        <Link href={'/'}>
          <Button variant={'secondary'} className="m-2" >на главную</Button>
        </Link>
      </div>
      <div className="flex flex-wrap">
        {files.map((image) => (
          <div key={image} className="px-2 h-auto w-1/2">
           <a href={`/uploads/${image}`} target="_blank">{image}</a> 
          </div>
        ))}
      </div>
      <FilesContainer  files={files}/>
    </main>
  );*/

 //console.log(files)
  //const images = files
    //.filter((file) => file.endsWith(".jpg"))
   // .map((file) => `/uploads/${file}`);
    //console.log(files)
    //filter razbiv na object
    //filter po objectam
    //done
    /*const inObjectFileNames = (files: string[]) => {
      let splitFileNames: any = []
      for(let i = 0; i < splitFileNames.length; i++) {
        console.log(files[i], "tut")
        splitFileNames.push(files[i].split('_'))
        console.log(files[i], "tut")
      }
      
      //console.log(inObjectFileNames(files))
      
      return splitFileNames
    }

    console.log(inObjectFileNames(files))

    console.log(files[0].split('_'))*/

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