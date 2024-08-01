"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useState } from "react";

const DrawerAI = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="flex float-right p-2 mr-2 bg-white border border-gray-300 hover:text-blue-500 text-black text-sm shadow-sm hover:bg-gray-100 w-[20vh] items-center justify-center">
          Mail Master AI 🎩
        </DrawerTrigger>
        <DrawerContent className="bg-blue-300 text-black">
          <DrawerHeader>
            <DrawerTitle className="text-2xl">
              Hmmm What Do We Have Here? 📝
            </DrawerTitle>
            <DrawerDescription className="text-sm">
              Bla bla bla bla bla bla bla
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default DrawerAI;
