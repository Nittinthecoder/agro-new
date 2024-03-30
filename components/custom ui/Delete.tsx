"use client";

import React, { useState } from "react";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import toast, { ToastBar } from "react-hot-toast";

interface DeleteProps {
  item: string;
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const itemtype = item === "product" ? "products" : "collections"
      const res = await fetch(`/api/${itemtype}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLoading(false);
        window.location.href = `/${itemtype}`;
        toast.success(`${item} deleted`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-text text-white hover:bg-red-600 hover:text-text">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="block w-full rounded-md border-0 py-1.5 hover:bg-black bg-black text-white shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400  sm:text-sm sm:leading-6">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="block w-full rounded-md border-0 py-1.5 hover:bg-red-600 hover:text-text bg-black text-white shadow-sm  sm:text-sm sm:leading-6"
            onClick={onDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
