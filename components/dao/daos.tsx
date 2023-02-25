import { Grid } from "@chakra-ui/react";

import { DaoCard } from "./dao-card";

export const Daos = ({ addresses }: { addresses: string[] }) => {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
      {addresses.map((address, i) => (
        <DaoCard key={i} address={address} />
      ))}
    </Grid>
  );
};
