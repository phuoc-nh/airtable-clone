import { auth } from '~/server/auth';
import { db } from '~/server/db';

async function POST(req: , res: NextApiResponse) {

	const session = await auth();

	console.log('session', session);
	if (!session) {
		return
	}

	// try {
	// 	const newBase = await insertBase({ name: req.body.name, userId: session.user.id });
	// 	return res.status(200).json(newBase);
	// } catch (error) {
	// 	console.error('Error inserting base:', error);
	// 	return res.status(500).json({ error: 'Failed to insert base' });
	// }
	const body = await req.json();
	console.log('body >>>', body);
	const newBase = await db.base.create({
		data: {
			  name: body.name,
			  userId: session.user.id
		},
	  });
	// try {
	// 	const newBase = await db.base.create({
	// 	  data: {
	// 			name: req.body.name,
	// 			userId: session.user.id
	// 	  },
	// 	});
	// 	return res.json(newBase);
	//   } catch (error) {
	// 	console.error("Error inserting base:", error);
	// 	throw new Error("Failed to insert base");
	//   }
}

export {
	POST
}