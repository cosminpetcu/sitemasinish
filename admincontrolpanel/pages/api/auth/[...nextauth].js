import NextAuth, {getServerSession} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const adminEmails = ['cosminpetcu32@gmail.com','petcucosmin.contact@gmail.com'];

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session: ({session,token,user}) => {
            if(adminEmails.includes(session?.user?.email)) {
                return session;
            } else {
                return false;
            }
        },
    },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req,res) {
    const session = await getServerSession(req,res,authOptions);
    if (!adminEmails.includes(session?.user?.email)) {
        res.status(401);
        res.end();
        throw 'Not an admin.';
    }
}