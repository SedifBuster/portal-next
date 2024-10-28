import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { $Enums } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { HiPencil } from "react-icons/hi2";

export
  default function AccountChangePopover({
    row
  }: {
    row: Row<{
        id: number;
        login: string;
        name: string;
        password: string;
        role: $Enums.Role;
        token: string;
        createdAt: Date;
        updatedAt: Date;
    }>
  }
) {

  return <Dialog>
    <DialogTrigger asChild>
      <Button variant={'outline'}><HiPencil /></Button>
    </DialogTrigger>
    <DialogContent className="">
      <DialogHeader>
        <DialogTitle>Изменить пользователя</DialogTitle>
        <DialogDescription>
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            ФИО
          </Label>
          <Input className="col-span-3"/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Роль
          </Label>
          инпут
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Логин
          </Label>
          <Input className="col-span-3"/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Пароль
          </Label>
          <Input className="col-span-3"/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Потвердить пароль
          </Label>
          <Input className="col-span-3"/>
        </div>
      </div>
      <DialogFooter>
      <Button type="submit">Сохранить изменения</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

//<Input id="name" value={isName} onChange={(e) => setName(e.target.value)} className="col-span-3" />
//<Button type="submit" onClick={() => onChangeCategory(id, isName)}>Сохранить изменения</Button>