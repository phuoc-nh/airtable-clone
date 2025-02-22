import { db } from "~/server/db";

interface InsertBaseParams {
  name: string;
  userId: string;
}

export async function insertBase({ name, userId }: InsertBaseParams) {
  try {
    const newBase = await db.base.create({
	  data: {
			name,
		  	userId
	  },
	});
    return newBase;
  } catch (error) {
    console.error("Error inserting base:", error);
    throw new Error("Failed to insert base");
  }
}
