import {Car} from "@/models/Car";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Car.findOne({_id:req.query.id}))
        } else {
            res.json(await Car.find());
        }
    }

    if (method === 'POST') {
        const {title,description,price,images} = req.body;
        const carDoc = await Car.create({
            title,description,price,images,
        })
        res.json(carDoc);
    }

    if (method === 'PUT') {
        const {title,description,price,images,_id} = req.body;
        await Car.updateOne({_id}, {title,description,price,images});
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Car.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}