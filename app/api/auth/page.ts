import { NextApiRequest, NextApiResponse } from 'next';
const jwt = require('jsonwebtoken');
import { setUser, setToken } from '../../../redux/auth/auth.slice';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

      const { authorization } = req.headers

      if (!authorization) {
        return res.status(401).json({error: 'Authorization required'})
      }
    
      const token = authorization.split(' ')[1]
    
      try {
        const userData = jwt.verify(token, 'SecretKey123');
        setUser(userData as { username: string });
        setToken(token);
        res.status(200).json({ message: 'User is authenticated', user: userData });
      } 
      catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
      }
    }
}