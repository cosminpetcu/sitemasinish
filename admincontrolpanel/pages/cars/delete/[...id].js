import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function DeleteCarPage() {
    const router = useRouter();
    const [carInfo,setCarInfo] = useState();
    const {id} = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/cars?id='+id).then(response => {
            setCarInfo(response.data);
        })
    }, [id]);
    function goBack() {
        router.push('/cars');
    }
    async function deleteCar() {
        await axios.delete('/api/cars?id='+id);
        goBack();
    }
    return (
        <Layout>
            <h1 className="text-center">
                Do you really want to delete &nbsp;&quot;{carInfo?.title}&quot;?
            </h1>
            <div className="flex gap-2 justify-center">
                <button
                    onClick={deleteCar}
                    className="btn-red">
                    Yes
                </button>
                <button
                    className="btn-default"
                    onClick={goBack}>
                    No
                </button>
            </div>
        </Layout>
    );
}