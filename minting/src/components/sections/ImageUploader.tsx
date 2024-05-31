import { useCallback, useState } from "react";
import Dropzone, { DropzoneOptions } from "react-dropzone";
import { MediaRenderer } from "thirdweb/react";
import { Button } from "../ui/button";
import { CloudDownload, Expand } from "lucide-react";
import { thirdwebClient } from "@/lib/thirdweb";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function ImageUploader({
  onFileChange,
  isError,
}: {
  onFileChange: (file: File | null) => void;
  isError?: boolean;
}) {
  const [file, setFile] = useState<string>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const onDrop = useCallback<NonNullable<DropzoneOptions["onDrop"]>>(
    ([firstFile]: File[]) => {
      onFileChange(firstFile);
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => setFile(reader.result as string);
      reader.readAsDataURL(firstFile);
    },
    [onFileChange]
  );

  return (
    <>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="relative">
            <div
              {...getRootProps()}
              className={cn(
                "h-60 w-full bg-primary/20 rounded-2xl flex flex-col items-center justify-center text-primary border-dashed border cursor-pointer",
                isError && "border-destructive"
              )}
            >
              <input {...getInputProps()} accept="image/*" />
              {file ? (
                <>
                  <MediaRenderer
                    client={thirdwebClient}
                    src={file}
                    className="max-h-56 rounded-2xl"
                  />
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"ghost"}
                    className="absolute top-2 right-2"
                    onClick={(event) => {
                      event.stopPropagation();
                      setDialogOpen(true);
                    }}
                  >
                    <Expand size={20} />
                  </Button>
                </>
              ) : (
                <>
                  <CloudDownload size={50} />
                  <strong>Drag & drop your artwork here,</strong>{" "}
                  <span>or click to select it</span>
                </>
              )}
            </div>
          </section>
        )}
      </Dropzone>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[96vw] max-h-[96vh]">
          <MediaRenderer
            client={thirdwebClient}
            src={file}
            style={{
              width: "96vw",
              height: "calc(100vh - 6rem)",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
