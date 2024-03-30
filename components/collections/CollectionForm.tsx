"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
// import { url } from "inspector";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(200).trim(),
  image: z.string(),
});

interface CollectionFormProps {
  initialData?: CollectionType | null;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
    ? initialData
    : {
        title: "",
        description: "",
        image: "",
      },
});

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setloading(true);
      const url = initialData ? `/api/collections/${initialData._id}` : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setloading(false);
        toast.success(`Collection ${initialData ? "updated" : "created"}`);
        window.location.href = "/collections";
        router.push("/collections");
      }
    } catch (err) {
      console.log("[collections_POST]", err);
      toast.success("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="p-10">
      { initialData ? (
        <div className="flex items-center justify-between">
          <p className="font-bold text-xl ">Edit Collections</p>
          <Delete item="collection"  id={initialData._id}/>
        </div>
      ) : ( <p className="font-bold text-xl ">Create Collections</p> 
      )}
      <Separator className="bg-green-700 my-10 " />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} rows={5} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-6">
            <Button
              className="rounded-3xl bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              type="submit"
            >
              Submit
            </Button>
            <Button
              className="rounded-3xl bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              type="button"
              onClick={() => router.push("/collections")}
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
