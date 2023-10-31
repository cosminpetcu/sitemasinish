import Center from "@/components/Center";
import styled from "styled-components";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: .8rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 40px;
  img{
    max-width: 100%;
  }
`;

export default function Featured() {
    return (
        <Bg>
            <Center>
                <Wrapper>
                    <div>
                        <h1>Pro anywhere</h1>
                        <Desc>
                            -Posibilitate finantare leasing persoane juridice dobanda 7.70%
                            -Avans 20%- 17871 Euro TVA inclus contract 60 luni, Rata lunara 1307 Euro TVA inclus, 230 Euro rata lunara CASCO
                            -FARA valoare reziduala, este inclusa in rate
                            -Se emite factura cu tva deductibil
                        </Desc>
                    </div>
                    <div>
                        <img src="https://next-masinish.s3.amazonaws.com/1698244229615.jpeg" alt=""/>
                    </div>
                </Wrapper>
            </Center>
        </Bg>
    );
}