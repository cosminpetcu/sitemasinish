import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import {mongooseConnect} from "@/lib/mongoose";
import {Car} from "@/models/Car";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import CarImages from "@/components/CarImages";
import ButtonLink from "@/components/ButtonLink";
import Button from "@/components/Button";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
`

const InfoRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
 font-size: 1.4rem;
`;

export default function CarPage({car}) {
    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <CarImages images={car.images} />
                    </WhiteBox>
                    <div>
                        <Title>{car.title}</Title>
                        <p>{car.description}</p>
                        <InfoRow>
                            <div>
                                <Price>€{car.price}</Price>
                            </div>
                            <div>
                                <Button primary>Go to source site</Button>
                            </div>
                        </InfoRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const car = await Car.findById(id);
    return {
        props: {
            car: JSON.parse(JSON.stringify(car)),
        }
    }
}