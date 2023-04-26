import { FC, PropsWithChildren } from "react";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { gridClasses } from "@/app/constants";

interface IListingsList {
  title: string;
  subtitle: string;
}

const ListingsList: FC<PropsWithChildren<IListingsList>> = ({ title, subtitle, children }) => (
  <Container>
    <Heading title={title} subtitle={subtitle} />
    <div className={`${gridClasses} mt-10`}>{children}</div>
  </Container>
);

export default ListingsList;
