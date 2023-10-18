import {useRouter} from "next/router";
import axios from "axios";
import {useState} from "react";

export default function CarForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images,
}) {
    const [title,setTitle] = useState(existingTitle || '');
    const [description,setDescription] = useState(existingDescription || '');
    const [price,setPrice] = useState(existingPrice || '');
    const [goToCars,setGoToCars] = useState(false);
    const router = useRouter();
    async function saveCar(ev) {
        ev.preventDefault();
        const data = {title,description,price};
        if (_id) {
            //update
            await axios.put('/api/cars', {...data,_id});
        } else {
            //create
            await axios.post('/api/cars', data);
        }
        setGoToCars(true);
    }
    if (goToCars) {
        router.push('/cars');
    }
    return (
            <form onSubmit={saveCar}>
                <label>Car Name</label>
                <input
                    type="text"
                    placeholder="car name"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}/>
                <label>
                    Photos
                </label>
                <div className="mb-2">
                    {!images?.length && (
                        <div>No photos for this car</div>
                    )}
                </div>
                <label>Description</label>
                <textarea
                    placeholder="description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}></textarea>
                <label>Price (in EUR)</label>
                <input
                    type="number"
                    placeholder="price"
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}/>
                <button
                    type="submit"
                    className="btn-primary">Save</button>
            </form>
    );
}