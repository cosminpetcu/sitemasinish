import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Car} from "@/models/Car";
import CarsGrid from "@/components/CarsGrid";
import Title from "@/components/Title";

export default function CarsPage({cars}) {
    return (
      <>
          <Header />
          <Center>
              <Title>All cars</Title>
              <CarsGrid key={cars._id} cars={cars} />
          </Center>
      </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const cars = await Car.find({}, null, {sort:{'_id':-1}});
    return {
        props:{
            cars: JSON.parse(JSON.stringify(cars)),
        }}
}