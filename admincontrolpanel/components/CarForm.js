import {useRouter} from "next/router";
import axios from "axios";
import {useEffect, useState} from "react";
import Spinner from "@/components/Spinner";
import {ReactSortable} from "react-sortablejs";

export default function CarForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images:existingImages,
    mileage:existingMileage,
    year:existingYear,
    category:existingCategory,
    properties:assignedProperties,
}) {
    const [title,setTitle] = useState(existingTitle || '');
    const [description,setDescription] = useState(existingDescription || '');
    const [category,setCategory] = useState(existingCategory || '');
    const [productProperties,setProductProperties] = useState(assignedProperties || {});
    const [price,setPrice] = useState(existingPrice || '');
    const [mileage,setMileage] = useState(existingMileage || '');
    const [year,setYear] = useState(existingYear || '');
    const [images,setImages] = useState(existingImages || []);
    const [goToCars,setGoToCars] = useState(false);
    const [isUploading,setIsUploading] = useState(false);
    const [categories,setCategories] = useState([]);
    const router = useRouter();
    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }, []);
    async function saveCar(ev) {
        ev.preventDefault();
        const data = {title,description,price,images,mileage,year,category,properties:productProperties};
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
    async function uploadImages(ev) {
        const files = ev.target?.files;
        if(files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
    function updateImagesOrder(images) {
        setImages(images);
    }
    function setProductProp(propName,value) {
        setProductProperties(prevState => {
            const newProductProps = {...prevState};
            newProductProps[propName] = value;
            return newProductProps;
        });
    }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({_id}) => _id === category);
        if(catInfo.properties) {
            propertiesToFill.push(...catInfo.properties);
        }
        while(catInfo?.parent?._id) {
            const parentCat = categories.find(({_id}) => _id ===
                catInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
        }
    }

    return (
            <form onSubmit={saveCar}>
                <label>Car Name*</label>
                <input
                    type="text"
                    placeholder="car name"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}/>
                <label>Category</label>
                <select value={category}
                        onChange={ev => setCategory(ev.target.value)}>
                    <option value="">Uncategorized</option>
                    {categories.length > 0 && categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
                {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                    <div key={p._id} className="flex gap-1">
                        <div>{p.name}</div>
                        <select value={productProperties[p.name]} onChange={ev => setProductProp(p.name,ev.target.value)}>
                            {p.values.map(v => (
                                <option key={v._id} value={v}>{v}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <label>
                    Photos
                </label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <ReactSortable list={images} className="flex flex-wrap gap-1" setList={updateImagesOrder}>
                        {!!images?.length && images.map(link => (
                            <div key={link} className="h-24">
                                <img src={link} alt="" className="rounded-lg"/>
                            </div>
                        ))}
                    </ReactSortable>
                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <Spinner />
                        </div>
                    )}
                    <label className="w-24 h-24 text-center cursor-pointer
                    flex items-center justify-center text-sm gap-1
                    text-gray-500 rounded-lg bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Upload
                        </div>
                        <input type="file" onChange={uploadImages} className="hidden"/>
                    </label>
                </div>
                <label>Description</label>
                <textarea
                    placeholder="description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}></textarea>
                <label>Year*</label>
                <input
                    type="number"
                    placeholder="year"
                    value={year}
                    onChange={ev => setYear(ev.target.value)}/>
                <label>Mileage*</label>
                <input
                    type="number"
                    placeholder="mileage"
                    value={mileage}
                    onChange={ev => setMileage(ev.target.value)}/>
                <label>Price (in EUR)*</label>
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