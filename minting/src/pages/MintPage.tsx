import { useEffect, useState } from "react";
import {
  useActiveAccount,
  useConnectModal,
  useSendTransaction,
} from "thirdweb/react";
import { mintTo } from "thirdweb/extensions/erc721";
import { upload } from "thirdweb/storage";
import { contract, thirdwebClient } from "@/lib/thirdweb";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/sections/ImageUploader";
import {
  Ban,
  Loader2,
  Package,
  PartyPopper,
  PlusCircle,
  ReceiptText,
  UploadCloud,
  Wallet2,
  X,
} from "lucide-react";
import { useCountdown, useStep, useWindowSize } from "usehooks-ts";
import Confetti from "react-confetti";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link, useNavigate } from "react-router-dom";
import { waitForReceipt } from "thirdweb";
import { cn } from "@/lib/utils";
import { TransactionReceipt } from "thirdweb/transaction";
import { sepoliaEtherscanUrl } from "@/lib/constants";

const formSchema = z.object({
  name: z.string().min(2, { message: "must be at least 2 characters." }),
  description: z.string().optional(),
  properties: z.array(
    z.object({
      trait_type: z.string(),
      value: z.string(),
    })
  ),
  animation_url: z.string().optional(),
  background_color: z.string().optional(),
  external_url: z.string().optional(),
});

export default function MintPage() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const activeAccount = useActiveAccount();
  const { connect, isConnecting } = useConnectModal();
  const [file, setFile] = useState<File | null>(null);
  const [fileRequired, setFileRequired] = useState(false);
  const [mintStatus, setMintStatus] = useState<"idle" | "pending" | "finished">(
    "idle"
  );
  const [counter, { startCountdown }] = useCountdown({
    countStart: 5,
    intervalMs: 1000,
    isIncrement: false,
  });
  const { mutateAsync: sendTransaction } = useSendTransaction();
  const [txReceipt, setTxReceipt] = useState<TransactionReceipt>();
  const [step, { goToNextStep }] = useStep(4);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      animation_url: "",
      background_color: "",
      external_url: "",
      properties: [{ trait_type: "", value: "" }],
    },
  });
  const propertiesField = useFieldArray({
    control: form.control,
    name: "properties",
    keyName: "key",
  });

  useEffect(() => {
    if (mintStatus === "finished") {
      startCountdown();
      setTimeout(() => navigate("/"), 5000);
    }
  }, [mintStatus, navigate, startCountdown]);

  useEffect(() => {
    !activeAccount && connect({ client: thirdwebClient });
  }, [activeAccount, connect]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!activeAccount) return;
    if (!file) {
      setFileRequired(true);
      return;
    }
    setMintStatus("pending");
    const uri = await upload({ client: thirdwebClient, files: [file] });
    goToNextStep();
    const transaction = mintTo({
      contract,
      to: activeAccount.address,
      nft: {
        ...values,
        image: uri,
        properties: values.properties.filter(
          (property) => property.trait_type && property.value
        ),
      },
    });
    const tx = await sendTransaction(transaction);
    goToNextStep();
    const receipt = await waitForReceipt(tx);
    setTxReceipt(receipt);
    goToNextStep();
    setTimeout(() => setMintStatus("finished"), 200);
  };
  return (
    <div className="py-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-8">Minting NFT</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-12 md:flex-row"
        >
          <div className="space-y-5 md:w-1/2">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Metadata</h2>

            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Name</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Display name"
                      {...field}
                      className={fieldState.error && "border-destructive"}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your NFT's public display name.
                  </FormDescription>
                </FormItem>
              )}
            />

            <div>
              <ImageUploader
                onFileChange={(file) => {
                  setFileRequired(false);
                  setFile(file);
                }}
                isError={fileRequired}
              />
              {fileRequired && (
                <p className="font-medium text-sm text-right text-destructive mt-1">
                  Your artwork is missing.
                </p>
              )}
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe more about your NFT here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <header className="flex justify-between items-center mb-1">
                <FormLabel>Properties</FormLabel>
                <Button
                  type="button"
                  size={"sm"}
                  variant={"destructiveGhost"}
                  onClick={() =>
                    form.setValue("properties", [{ trait_type: "", value: "" }])
                  }
                  className="gap-1"
                >
                  <Ban size={16} /> Reset
                </Button>
              </header>
              {propertiesField.fields.map((property, propertyIndex) => (
                <div
                  key={property.key}
                  className="flex items-center gap-2 !mt-2"
                >
                  <FormField
                    control={form.control}
                    name={`properties.${propertyIndex}.trait_type`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Property Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`properties.${propertyIndex}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Property Value" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"destructiveGhost"}
                    onClick={() => propertiesField.remove(propertyIndex)}
                    className="h-8 w-8"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                size={"sm"}
                onClick={() => {
                  propertiesField.append({ trait_type: "", value: "" });
                }}
                className="gap-1 !mt-2"
              >
                <PlusCircle size={20} /> Add a property
              </Button>
            </FormItem>
          </div>
          <div className="space-y-5 md:w-1/2">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Make your NFT more accessible
            </h2>

            <FormField
              control={form.control}
              name="background_color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Color</FormLabel>
                  <FormControl>
                    <Input placeholder="Background Color" {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be a six-character hexadecimal with a pre-pended #.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="external_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External URL</FormLabel>
                  <FormControl>
                    <Input placeholder="External URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the URL that will appear below the asset's image on
                    OpenSea and will allow users to leave OpenSea and view the
                    item on your site.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="animation_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Animation URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Animation URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    If you already have your NFT Animation URL preuploaded, you
                    can set the URL or URI here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {activeAccount ? (
              <Button type="submit" size={"lg"} className="gap-1 w-full">
                Mint NFT
              </Button>
            ) : (
              <Button
                type="button"
                size={"lg"}
                className="gap-2 w-full"
                onClick={() => connect({ client: thirdwebClient })}
              >
                <Wallet2 />{" "}
                {isConnecting ? "Connecting..." : "Connect Wallet to Mint"}
              </Button>
            )}
          </div>
        </form>
      </Form>

      <AlertDialog open={mintStatus === "pending"}>
        <AlertDialogContent className="max-w-5xl pb-12">
          <AlertDialogHeader>
            <p className="text-5xl text-center">🥘</p>
            <h2 className="text-2xl font-semibold text-center mb-2">
              Minting Process
            </h2>
            <div className="flex items-center gap-2">
              <Step currentStep={step} step={1}>
                {<UploadCloud />}
              </Step>
              <div className="w-1/2 flex flex-col justify-center relative">
                <div className="w-full h-px bg-primary-foreground rounded" />
                <span className="w-full inline-block text-sm absolute left-1/2 -bottom-6 -translate-x-1/2">
                  {step === 1 ? "Uploading" : "Uploaded"} onto IPFS
                </span>
              </div>
              <Step currentStep={step} step={2}>
                {<Package />}
              </Step>
              <div className="w-1/2 flex flex-col justify-center relative">
                <div className="w-full h-px bg-primary-foreground rounded" />
                <span className="w-full inline-block text-sm absolute left-1/2 -bottom-6 -translate-x-1/2">
                  {step < 2
                    ? "Send transaction"
                    : step === 2
                    ? "Waiting for confirmation"
                    : "Transaction confirmed."}
                </span>
              </div>
              <Step currentStep={step} step={3}>
                {<ReceiptText />}
              </Step>
              <div className="w-1/2 flex flex-col justify-center relative">
                <div className="w-full h-px bg-primary-foreground rounded" />
                <span className="w-full inline-block text-sm absolute left-1/2 -bottom-6 -translate-x-1/2">
                  {step < 3
                    ? "Wait for receipt"
                    : step === 3
                    ? "Waiting for receipt"
                    : "Receipt received!"}
                </span>
              </div>
              <Step currentStep={step} step={4}>
                {<PartyPopper />}
              </Step>
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={mintStatus === "finished"}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <strong className="text-6xl">🎉</strong>
            <AlertDialogTitle>You minted a masterpiece!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Congratualaions! Your NFT has been minted successfully.
              Automatically redirecting to your NFT page in{" "}
              <span className="text-foreground">{counter}</span> seconds.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Link
                to={`${sepoliaEtherscanUrl}/tx/${txReceipt?.transactionHash}`}
                target="_blank"
              >
                <Button>View transaction</Button>
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {mintStatus === "finished" && (
        <Confetti width={width} height={height} className="!z-[51]" />
      )}
    </div>
  );
}

function Step({
  currentStep,
  step,
  children,
}: { currentStep: number; step: number } & React.PropsWithChildren) {
  return (
    <div
      className={cn(
        "p-2 rounded-full shrink-0 relative group",
        currentStep !== step && "border-2 border-foreground",
        currentStep > step && "bg-primary-foreground/80 text-primary"
      )}
    >
      {currentStep === step && (
        <Loader2
          size={56}
          className="absolute -top-2 -left-2 animate-spin"
          strokeWidth={1}
        />
      )}

      {children}
    </div>
  );
}
