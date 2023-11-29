import Header from "@/components/Header";
import Featured from "@/components/Featured";
import {Car} from "@/models/Car";
import {mongooseConnect} from "@/lib/mongoose";
import NewCars from "@/components/NewCars";

export default function HomePage({featuredCar,newCars}){
  return (
      <div>
        <Header />
        <Featured car={featuredCar} />
        <NewCars cars={newCars} />
      </div>
  );
}

export async function getServerSideProps() {
    const featuredCarId = '653926c336dabdb89453fad6';
    await mongooseConnect();
    const featuredCar = await Car.findById(featuredCarId);
    const newCars = await Car.find({}, null, {sort: {'_id':-1}, limit:10});
    return {
        props: {
            featuredCar: JSON.parse(JSON.stringify(featuredCar)),
            newCars: JSON.parse(JSON.stringify(newCars)),
    }}
}