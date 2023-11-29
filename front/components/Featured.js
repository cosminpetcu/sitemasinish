import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  img{
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top: 25px;
`

export default function Featured({car}) {
    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{car.title}</Title>
                            <Desc>{car.description}</Desc>
                            <ButtonsWrapper>
                                <ButtonLink href={'/car/' + car._id} white={1} outline={1}>Read more</ButtonLink>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src="https://next-masinish.s3.amazonaws.com/1701224453018.png" alt=""/>
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    );
}