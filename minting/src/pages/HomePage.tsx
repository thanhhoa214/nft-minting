import AllNftListing from "@/components/sections/AllNftListing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <Card className="bg-white">
        <CardContent className="pt-6">
          <p>
            <strong>Phenon</strong>
          </p>
          <h2 className="text-3xl font-semibold">Create your own NFT</h2>
          <p className="text-muted-foreground">
            The world's leading NFT marketplace for your awesome artworks.
          </p>
          <div className="mt-4 space-x-2">
            <Link to={"/mint"}>
              <Button>Go minting now!</Button>
            </Link>
            <Button variant="outline">Learn more</Button>
          </div>
        </CardContent>
      </Card>
      <AllNftListing />
    </>
  );
}
