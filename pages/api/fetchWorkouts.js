import clientPromise from '/lib/mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) { 
    if (req.method !== 'GET') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

  try {
    const session = await getSession({ req });
    if (!session) {
      // Handle unauthorized access
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const client = await clientPromise;
    const db = client.db("powerhourdb");
    const workoutsCollection = db.collection("UserCustomWorkouts");
    const cursor = await workoutsCollection.find({ username: session.user.username});
    const result = await cursor.toArray();
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Error getting workouts", error: error.message });
  }
}
