import {Car} from "@/models/Car";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req,res);

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Car.findOne({_id:req.query.id}))
        } else {
            res.json(await Car.find());
        }
    }

    if (method === 'POST') {
        const {title,description,price,images,mileage,year,category,properties} = req.body;
        const carDoc = await Car.create({
            title,
            description,
            price,
            images,
            mileage,
            year,
            category:category || undefined,
            properties,
        })
        res.json(carDoc);
    }

    if (method === 'PUT') {
        const {title,description,price,images,mileage,year,category,properties,_id} = req.body;
        await Car.updateOne(
            {_id},
            {
                title,
                description,
                price,
                images,
                mileage,
                year,
                category:category || undefined,
                properties,
            });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Car.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}