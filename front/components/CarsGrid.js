import styled from "styled-components";
import CarBox from "@/components/CarBox";

const StyledCarsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;
export default function CarsGrid({cars}) {
    return (
        <StyledCarsGrid>
            {cars?.length > 0 && cars.map(car => (
                <CarBox {...car} />
            ))}
        </StyledCarsGrid>
    )
}