import styled from "styled-components";
import Link from "next/link";

const CarWrapper = styled.div`
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const CarInfoBox = styled.div`
  margin-top: 5px;
`;

const Title = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  color:inherit;
  text-decoration: none;
  margin:0;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const MileageYearRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
`;

const Mileage = styled.div`
  font-weight: normal;
  font-size: .9rem;
  color:inherit;
  text-decoration: none;
  margin:0;
`;

const Year = styled.div`
  font-weight: normal;
  font-size: .9rem;
  color:inherit;
  text-decoration: none;
  margin:0;
`;

export default function CarBox({_id,title,price,mileage,year,images}) {
    const url = '/car/'+_id;
    return (
        <CarWrapper>
            <WhiteBox href={url}>
                <div>
                    <img src={images?.[0]} alt=""/>
                </div>
            </WhiteBox>
            <CarInfoBox>
                <Title href={url}>{title}</Title>
                <MileageYearRow>
                    <Mileage>
                        {mileage} km
                    </Mileage>
                    <Year>{year}</Year>
                </MileageYearRow>
                <PriceRow>
                    <Price>
                        €{price}
                    </Price>
                </PriceRow>
            </CarInfoBox>
        </CarWrapper>
    );
}