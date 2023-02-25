import { Link, Text } from "@chakra-ui/react";

import Divider from "../../components/ui/divider";
import ContainerSpaced from "../ui/container-spaced";

export const ExploreInfo = () => {
  return (
    <ContainerSpaced>
      <Text>
        The explore page lists DAOs from hardcoded addresses to prevent spamming
        of the main UI
      </Text>
      <Link href="https://github.com/lumtis/cantodao/blob/817602a3d94cce9b1e6c3d27004ca8d7ec5fec46/interface/config/addresses.ts#L34">
        {"->"} Everyone is invited to make a pull request in the repository to
        add a DAO {"<-"}
      </Link>
      <Divider />
      <Text>
        To list all DAOs you can also run the front-end locally and set
        `PERMISSIONLESS_LISTING` to `true` in the `.env` file
      </Text>
    </ContainerSpaced>
  );
};
