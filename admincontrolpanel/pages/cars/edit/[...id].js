import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import CarForm from "@/components/CarForm";

export default function EditCarPage() {
    const [carInfo, setCarInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/cars?id='+id).then(response => {
            setCarInfo(response.data);
        })
    }, [id]);
    return (
        <Layout>
            <h1>Edit car</h1>
            {carInfo && (
                <CarForm {...carInfo} />
            )}
        </Layout>
    )
}