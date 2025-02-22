import { auth } from '~/server/auth';
import { db } from '~/server/db';



import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
	const session = await auth();
	console.log('session', session);
	if (!session) {
		return
	}

	
	const body = req.body;
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
    // res.status(200).json({ result })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
