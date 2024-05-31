import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div
      id="error-page"
      className="flex flex-col justify-center items-center h-screen"
    >
      <h1 className="text-5xl font-bold">Oops!</h1>
      <p className="text-2xl font-bold mt-4">Sorry, page not found.</p>
      <p className="mb-4 text-foreground/70">
        Please reach out if you think our page got trouble.
      </p>
      <Button size={"lg"} onClick={() => window.history.back()}>
        Go back
      </Button>
    </div>
  );
}
