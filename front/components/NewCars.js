import styled from "styled-components";
import Center from "@/components/Center";
import CarsGrid from "@/components/CarsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

export default function NewCars({cars}) {
    return (
        <Center>
            <Title>New Arrivals</Title>
            <CarsGrid key={cars._id} cars={cars} />
        </Center>
    );
}